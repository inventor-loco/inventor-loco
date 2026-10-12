#!/usr/bin/env node
// Build the collaborating-institutions database behind the publications map.
//
// Reads every DOI listed in publications.html, resolves author affiliations
// through OpenAlex (normalised institutions with ROR ids and coordinates) and
// writes data/affiliations.json (read by scripts/collab-map.js) plus a flat
// data/affiliations.csv.
//
// Papers without a DOI, organisations OpenAlex doesn't know (e.g. companies)
// and corrections to OpenAlex's matching live in data/affiliations-manual.json.
//
// Run it after every change to the publication list; the step-by-step workflow
// is in the "HOW TO ADD A PUBLICATION" comment at the top of the list in
// publications.html.
//
// Usage (Node 18+, no dependencies, no API key):
//   node scripts/build-affiliations.mjs           # rebuild the database
//   node scripts/build-affiliations.mjs --audit   # also cross-check raw Crossref affiliation strings

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLICATIONS = join(ROOT, 'publications.html');
const MANUAL = join(ROOT, 'data', 'affiliations-manual.json');
const OUT_JSON = join(ROOT, 'data', 'affiliations.json');
const OUT_CSV = join(ROOT, 'data', 'affiliations.csv');

const MAILTO = 'vmat.icaza@gmail.com';
const USER_AGENT = `inventor-loco-affiliations/1.0 (mailto:${MAILTO})`;
const OPENALEX = 'https://api.openalex.org';
const CROSSREF = 'https://api.crossref.org';
const BATCH = 40;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(url, params = {}) {
  const qs = new URLSearchParams({ ...params, mailto: MAILTO }).toString().replace(/%3A/g, ':').replace(/%7C/g, '|');
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(`${url}?${qs}`, { headers: { 'User-Agent': USER_AGENT } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) { // network hiccup or rate limit
      if (attempt === 3) throw err;
      console.error(`  retrying ${url} (${err.message})`);
      await sleep(1000 * 2 ** attempt);
    }
  }
}

const shortId = (openalexUrl) => openalexUrl.split('/').pop();

function unescapeHtml(s) {
  const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === '#') return String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    return named[e.toLowerCase()] ?? m;
  });
}
const stripTags = (s) => unescapeHtml(s.replace(/<[^>]+>/g, '')).trim();

// One entry per .pub-item: key, title, year, doi (or null).
function parsePublications() {
  const src = readFileSync(PUBLICATIONS, 'utf8').replace(/<!--[\s\S]*?-->/g, ''); // ignore the how-to template comment
  return src.split('<div class="pub-item').slice(1).map((block) => {
    const title = block.match(/<div class="pub-title">([\s\S]*?)(?:<span class="pub-badge|<\/div>)/);
    const venue = block.match(/<div class="pub-venue">([\s\S]*?)<\/div>/);
    const doi = block.match(/href="https:\/\/doi\.org\/([^"]+)"/);
    const key = block.match(/downloadBib\('([^']+)'\)/);
    const years = (venue ? stripTags(venue[1]) : '').match(/\b(?:19|20)\d{2}\b/g) || [];
    return {
      key: key ? key[1] : null,
      title: title ? stripTags(title[1]) : '',
      year: years.length ? Number(years[years.length - 1]) : null,
      doi: doi ? doi[1].toLowerCase() : null,
    };
  });
}

async function fetchWorks(dois) {
  const works = {};
  for (let i = 0; i < dois.length; i += BATCH) {
    const data = await getJson(`${OPENALEX}/works`, {
      filter: 'doi:' + dois.slice(i, i + BATCH).join('|'),
      'per-page': '50',
      select: 'doi,authorships',
    });
    for (const w of data.results || []) works[w.doi.replace('https://doi.org/', '').toLowerCase()] = w;
    await sleep(200);
  }
  return works;
}

async function fetchInstitutions(ids) {
  const insts = {};
  for (let i = 0; i < ids.length; i += BATCH) {
    const data = await getJson(`${OPENALEX}/institutions`, {
      filter: 'openalex_id:' + ids.slice(i, i + BATCH).join('|'),
      'per-page': '50',
      select: 'id,ror,display_name,geo,type',
    });
    for (const inst of data.results || []) insts[shortId(inst.id)] = inst;
    await sleep(200);
  }
  return insts;
}

const AUDIT_STOPWORDS = new Set([
  'university', 'universidad', 'universidade', 'universitat', 'department', 'departamento',
  'faculty', 'facultad', 'institute', 'instituto', 'school', 'escuela', 'technology', 'technical',
  'electrical', 'engineering', 'sciences', 'science', 'research', 'center', 'centre', 'national',
]);
const words = (s) => s.toLowerCase().match(/[a-zà-ÿ]+/g) || [];

// Print Crossref affiliation strings that share no distinctive word with the
// paper's OpenAlex institutions, so misattributions can be fixed by hand.
async function audit(papers, insts) {
  console.log('\nCrossref audit (raw strings with no OpenAlex counterpart):');
  let flagged = 0;
  for (const p of papers) {
    if (!p.doi) continue;
    let msg;
    try {
      msg = (await getJson(`${CROSSREF}/works/${p.doi}`)).message;
    } catch (err) {
      console.log(`  ${p.doi}: crossref error ${err.message}`);
      continue;
    }
    const known = new Set();
    for (const iid of p.institutions) {
      for (const w of words(`${insts[iid].name} ${insts[iid].city}`)) if (w.length > 3 && !AUDIT_STOPWORDS.has(w)) known.add(w);
    }
    const raws = new Set((msg.author || []).flatMap((au) => (au.affiliation || []).map((a) => unescapeHtml(a.name))));
    for (const raw of [...raws].sort()) {
      if (!words(raw).some((w) => known.has(w))) {
        flagged++;
        console.log(`  ${p.doi}: ${raw}`);
      }
    }
    await sleep(100);
  }
  console.log(flagged ? `  ${flagged} string(s) flagged` : '  nothing flagged');
}

function csvField(v) {
  const s = v == null ? '' : String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

async function main() {
  const doAudit = process.argv.includes('--audit');
  const manual = JSON.parse(readFileSync(MANUAL, 'utf8'));
  const merge = manual.merge || {};
  const hide = new Set(manual.hide || []);
  const override = manual.override || {};
  const custom = manual.custom || {};
  const manualPapers = manual.papers || {};
  const added = manual.add || {};
  const home = manual.home;

  const pubs = parsePublications();
  const dois = pubs.filter((p) => p.doi).map((p) => p.doi);
  console.log(`publications.html: ${pubs.length} items, ${dois.length} with DOI`);

  const works = await fetchWorks(dois);
  const missing = dois.filter((d) => !works[d]);
  if (missing.length) console.log(`  not found in OpenAlex: ${missing.join(', ')}`);

  const resolve = (iid) => {
    const id = merge[iid] || iid;
    return hide.has(id) ? null : id;
  };

  const papers = [];
  for (const p of pubs) {
    let authors;
    if (works[p.doi]) {
      authors = works[p.doi].authorships.map((a) => ({
        name: a.author.display_name,
        institutions: [...new Set((a.institutions || []).filter((i) => i.id).map((i) => resolve(shortId(i.id))).filter(Boolean))].sort(),
      }));
    } else if (manualPapers[p.key]) {
      authors = [{ name: null, institutions: manualPapers[p.key].map(resolve).filter(Boolean) }];
    } else {
      if (!p.doi) console.log(`  skipped (no DOI, not in manual file): ${p.key}`);
      continue;
    }
    const extra = (added[p.doi || ''] || []).map(resolve).filter(Boolean);
    const instIds = [...new Set([...authors.flatMap((a) => a.institutions), ...extra])].sort();
    papers.push({ ...p, institutions: instIds, authors });
  }

  const allIds = [...new Set([...papers.flatMap((p) => p.institutions), home])].sort();
  const raw = await fetchInstitutions(allIds.filter((i) => !custom[i]));
  for (const [iid, c] of Object.entries(custom)) {
    raw[iid] = {
      id: iid, ror: c.ror ?? null, display_name: c.name, type: c.type ?? null,
      geo: { city: c.city, country: c.country, country_code: c.country_code, latitude: c.lat, longitude: c.lng },
    };
  }

  const insts = {};
  for (const iid of allIds) {
    const r = raw[iid];
    if (!r) {
      console.log(`  institution not found in OpenAlex: ${iid}`);
      continue;
    }
    const geo = r.geo || {};
    insts[iid] = {
      id: iid,
      ror: r.ror ?? null,
      name: r.display_name,
      type: r.type ?? null,
      city: geo.city ?? null,
      country: geo.country ?? null,
      country_code: geo.country_code ?? null,
      lat: geo.latitude ?? null,
      lng: geo.longitude ?? null,
      papers: [],
      ...override[iid],
    };
  }
  for (const p of papers) {
    p.institutions = p.institutions.filter((i) => insts[i]);
    for (const iid of p.institutions) insts[iid].papers.push(p.doi || p.key);
  }
  for (const inst of Object.values(insts)) inst.count = inst.papers.length;

  const ordered = Object.values(insts).sort((a, b) => b.count - a.count || (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  const noGeo = ordered.filter((i) => i.lat == null).map((i) => i.name);

  const out = {
    generated: today(),
    source: 'OpenAlex (api.openalex.org) + data/affiliations-manual.json',
    home,
    institutions: ordered,
    papers: papers.map((p) => ({
      doi: p.doi, key: p.key, title: p.title, year: p.year, institutions: p.institutions, authors: p.authors,
    })),
  };
  writeFileSync(OUT_JSON, JSON.stringify(out, null, 1) + '\n');

  const header = ['openalex_id', 'ror', 'name', 'type', 'city', 'country', 'country_code', 'lat', 'lng', 'joint_papers'];
  const rows = ordered.map((i) => [i.id, i.ror, i.name, i.type, i.city, i.country, i.country_code, i.lat, i.lng, i.count]);
  writeFileSync(OUT_CSV, [header, ...rows].map((r) => r.map(csvField).join(',')).join('\n') + '\n');

  const countries = new Set(ordered.map((i) => i.country_code).filter(Boolean));
  console.log(`papers mapped: ${papers.length} | institutions: ${ordered.length} | countries: ${countries.size}`);
  if (noGeo.length) console.log(`  missing coordinates: ${noGeo.join(', ')}`);
  console.log(`wrote ${relative(ROOT, OUT_JSON)} and ${relative(ROOT, OUT_CSV)}`);

  if (doAudit) await audit(papers, insts);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
