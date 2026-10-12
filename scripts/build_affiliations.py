#!/usr/bin/env python3
"""Build the collaborating-institutions database behind the publications map.

Reads every DOI listed in publications.html, resolves author affiliations
through OpenAlex (normalised institutions with ROR ids and coordinates) and
writes data/affiliations.json (read by scripts/collab-map.js) plus a flat
data/affiliations.csv.

Papers without a DOI, organisations OpenAlex doesn't know (e.g. companies)
and corrections to OpenAlex's matching live in data/affiliations-manual.json.

Run it after every change to the publication list; the step-by-step workflow
is in the "HOW TO ADD A PUBLICATION" comment at the top of the list in
publications.html.

Usage:
  python3 scripts/build_affiliations.py           # rebuild the database
  python3 scripts/build_affiliations.py --audit   # also cross-check raw Crossref affiliation strings

Stdlib only; no API key needed.
"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import html
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLICATIONS = ROOT / "publications.html"
MANUAL = ROOT / "data" / "affiliations-manual.json"
OUT_JSON = ROOT / "data" / "affiliations.json"
OUT_CSV = ROOT / "data" / "affiliations.csv"

MAILTO = "vmat.icaza@gmail.com"
USER_AGENT = f"inventor-loco-affiliations/1.0 (mailto:{MAILTO})"
OPENALEX = "https://api.openalex.org"
CROSSREF = "https://api.crossref.org"
BATCH = 40


def get_json(url: str, params: dict[str, str] | None = None) -> dict:
    params = dict(params or {}, mailto=MAILTO)
    full = f"{url}?{urllib.parse.urlencode(params, safe=':|,')}"
    req = urllib.request.Request(full, headers={"User-Agent": USER_AGENT})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                return json.load(resp)
        except Exception as exc:  # network hiccup or rate limit
            if attempt == 3:
                raise
            print(f"  retrying {url} ({exc})", file=sys.stderr)
            time.sleep(2 ** attempt)
    return {}


def short_id(openalex_url: str) -> str:
    return openalex_url.rsplit("/", 1)[-1]


def strip_tags(s: str) -> str:
    return html.unescape(re.sub(r"<[^>]+>", "", s)).strip()


def parse_publications() -> list[dict]:
    """One dict per .pub-item: key, title, year, doi (or None)."""
    src = PUBLICATIONS.read_text(encoding="utf-8")
    src = re.sub(r"<!--.*?-->", "", src, flags=re.S)  # ignore the how-to template comment
    items = re.split(r'<div class="pub-item', src)[1:]
    pubs = []
    for block in items:
        title = re.search(r'<div class="pub-title">(.*?)(?:<span class="pub-badge|</div>)', block, re.S)
        venue = re.search(r'<div class="pub-venue">(.*?)</div>', block, re.S)
        doi = re.search(r'href="https://doi\.org/([^"]+)"', block)
        key = re.search(r"downloadBib\('([^']+)'\)", block)
        years = re.findall(r"\b(?:19|20)\d{2}\b", strip_tags(venue.group(1)) if venue else "")
        pubs.append({
            "key": key.group(1) if key else None,
            "title": strip_tags(title.group(1)) if title else "",
            "year": int(years[-1]) if years else None,
            "doi": doi.group(1).lower() if doi else None,
        })
    return pubs


def fetch_works(dois: list[str]) -> dict[str, dict]:
    works = {}
    for i in range(0, len(dois), BATCH):
        chunk = dois[i:i + BATCH]
        data = get_json(f"{OPENALEX}/works", {
            "filter": "doi:" + "|".join(chunk),
            "per-page": "50",
            "select": "doi,authorships",
        })
        for w in data.get("results", []):
            works[w["doi"].replace("https://doi.org/", "").lower()] = w
        time.sleep(0.2)
    return works


def fetch_institutions(ids: list[str]) -> dict[str, dict]:
    insts = {}
    for i in range(0, len(ids), BATCH):
        chunk = ids[i:i + BATCH]
        data = get_json(f"{OPENALEX}/institutions", {
            "filter": "openalex_id:" + "|".join(chunk),
            "per-page": "50",
            "select": "id,ror,display_name,geo,type",
        })
        for inst in data.get("results", []):
            insts[short_id(inst["id"])] = inst
        time.sleep(0.2)
    return insts


AUDIT_STOPWORDS = {
    "university", "universidad", "universidade", "universitat", "department", "departamento",
    "faculty", "facultad", "institute", "instituto", "school", "escuela", "technology", "technical",
    "electrical", "engineering", "sciences", "science", "research", "center", "centre", "national",
}


def audit(papers: list[dict], insts: dict[str, dict]) -> None:
    """Print Crossref affiliation strings that share no distinctive word with
    the paper's OpenAlex institutions, so misattributions can be fixed by hand."""
    print("\nCrossref audit (raw strings with no OpenAlex counterpart):")
    flagged = 0
    for p in papers:
        if not p["doi"]:
            continue
        try:
            msg = get_json(f"{CROSSREF}/works/{p['doi']}")["message"]
        except Exception as exc:
            print(f"  {p['doi']}: crossref error {exc}")
            continue
        words = set()
        for iid in p["institutions"]:
            name = f'{insts[iid]["name"]} {insts[iid]["city"]}'.lower()
            words |= {w for w in re.findall(r"[a-zà-ÿ]+", name) if len(w) > 3 and w not in AUDIT_STOPWORDS}
        raws = {html.unescape(a["name"]) for au in msg.get("author", []) for a in au.get("affiliation", [])}
        for raw in sorted(raws):
            tokens = set(re.findall(r"[a-zà-ÿ]+", raw.lower()))
            if not tokens & words:
                flagged += 1
                print(f"  {p['doi']}: {raw}")
        time.sleep(0.1)
    print(f"  {flagged} string(s) flagged" if flagged else "  nothing flagged")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--audit", action="store_true", help="cross-check against raw Crossref affiliations")
    args = ap.parse_args()

    manual = json.loads(MANUAL.read_text(encoding="utf-8"))
    merge: dict[str, str] = manual.get("merge", {})
    hide: set[str] = set(manual.get("hide", []))
    override: dict[str, dict] = manual.get("override", {})
    custom: dict[str, dict] = manual.get("custom", {})
    manual_papers: dict[str, list[str]] = manual.get("papers", {})
    added: dict[str, list[str]] = manual.get("add", {})
    home = manual["home"]

    pubs = parse_publications()
    dois = [p["doi"] for p in pubs if p["doi"]]
    print(f"publications.html: {len(pubs)} items, {len(dois)} with DOI")

    works = fetch_works(dois)
    missing = [d for d in dois if d not in works]
    if missing:
        print(f"  not found in OpenAlex: {missing}")

    def resolve(iid: str) -> str | None:
        iid = merge.get(iid, iid)
        return None if iid in hide else iid

    papers = []
    for p in pubs:
        authors = []
        if p["doi"] in works:
            for a in works[p["doi"]]["authorships"]:
                ids = [resolve(short_id(i["id"])) for i in a.get("institutions", []) if i.get("id")]
                authors.append({"name": a["author"]["display_name"], "institutions": sorted({i for i in ids if i})})
        elif p["key"] in manual_papers:
            authors = [{"name": None, "institutions": [resolve(i) for i in manual_papers[p["key"]] if resolve(i)]}]
        else:
            if not p["doi"]:
                print(f"  skipped (no DOI, not in manual file): {p['key']}")
            continue
        extra = [resolve(i) for i in added.get(p["doi"] or "", [])]
        inst_ids = sorted({i for a in authors for i in a["institutions"]} | {i for i in extra if i})
        papers.append({**p, "institutions": inst_ids, "authors": authors})

    all_ids = sorted({i for p in papers for i in p["institutions"]} | {home})
    raw = fetch_institutions([i for i in all_ids if i not in custom])
    for iid, c in custom.items():
        raw[iid] = {"id": iid, "ror": c.get("ror"), "display_name": c["name"], "type": c.get("type"),
                    "geo": {"city": c.get("city"), "country": c.get("country"), "country_code": c.get("country_code"),
                            "latitude": c.get("lat"), "longitude": c.get("lng")}}

    insts: dict[str, dict] = {}
    for iid in all_ids:
        r = raw.get(iid)
        if not r:
            print(f"  institution not found in OpenAlex: {iid}")
            continue
        geo = r.get("geo") or {}
        insts[iid] = {
            "id": iid,
            "ror": r.get("ror"),
            "name": r["display_name"],
            "type": r.get("type"),
            "city": geo.get("city"),
            "country": geo.get("country"),
            "country_code": geo.get("country_code"),
            "lat": geo.get("latitude"),
            "lng": geo.get("longitude"),
            "papers": [],
        }
        insts[iid].update(override.get(iid, {}))
    for p in papers:
        p["institutions"] = [i for i in p["institutions"] if i in insts]
        for iid in p["institutions"]:
            insts[iid]["papers"].append(p["doi"] or p["key"])
    for inst in insts.values():
        inst["count"] = len(inst["papers"])

    ordered = sorted(insts.values(), key=lambda x: (-x["count"], x["name"]))
    no_geo = [i["name"] for i in ordered if i["lat"] is None]

    out = {
        "generated": dt.date.today().isoformat(),
        "source": "OpenAlex (api.openalex.org) + data/affiliations-manual.json",
        "home": home,
        "institutions": ordered,
        "papers": [
            {"doi": p["doi"], "key": p["key"], "title": p["title"], "year": p["year"],
             "institutions": p["institutions"], "authors": p["authors"]}
            for p in papers
        ],
    }
    OUT_JSON.write_text(json.dumps(out, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")

    with OUT_CSV.open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["openalex_id", "ror", "name", "type", "city", "country", "country_code", "lat", "lng", "joint_papers"])
        for i in ordered:
            w.writerow([i["id"], i["ror"], i["name"], i["type"], i["city"], i["country"],
                        i["country_code"], i["lat"], i["lng"], i["count"]])

    countries = {i["country_code"] for i in ordered if i["country_code"]}
    print(f"papers mapped: {len(papers)} | institutions: {len(ordered)} | countries: {len(countries)}")
    if no_geo:
        print(f"  missing coordinates: {no_geo}")
    print(f"wrote {OUT_JSON.relative_to(ROOT)} and {OUT_CSV.relative_to(ROOT)}")

    if args.audit:
        audit(papers, insts)


if __name__ == "__main__":
    main()
