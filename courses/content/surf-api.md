<!-- slug: 01 -->
## Welcome to the workshop

Today you'll build a **real web application**: a live dashboard of ocean conditions at **La Cícer Beach** in Las Palmas de Gran Canaria — tides, wind, and waves, updated from real data every time you open it.

You don't need to know how to code. You only need to read, copy a few prompts, and watch the browser.

**This is what your app will look like at the end:**

![Finished app](figs/surf-api/final.png)

### What is a "web dashboard", exactly?

A dashboard is a page that gathers live information in one glance — like the instrument panel of a car. Ours will show:

- The **tide** right now, and whether it's rising or falling.
- The **wind** speed and direction.
- The **wave** height, in meters and in surfer words ("Knee–waist high", "Overhead"…).
- A **chart** of the tide hour by hour.
- A **table** with the forecast up to 4 days ahead.

### What you'll learn

- How to think about a software project — **in small pieces**, one step at a time.
- How to ask **Claude Code** to write the code for you.
- How to see your changes **live in the browser**.
- How to make the project your own: change the beach, the colors, add more data.

### What you do NOT need

> **No coding experience. No technical English. No networking knowledge.** Just follow the steps. Every piece of code in this workshop is written *for* you by Claude Code — your job is to direct it, check the result, and understand what happened.

**Estimated time:** about 2 hours.

| | |
|---|---|
| **Where** | Agüita House · Sustainability Lab — Las Palmas de Gran Canaria |
| **When** | June 11, 2026 |
| **By** | Nicola Gasparro & Vicente Matus |
| **Sponsored by** | IDeTIC · ULPGC |

<!-- slug: 02 -->
## Your toolkit

Before we start, you need four things on your laptop. They're all free. If you already have them, skip ahead to the checklist at the bottom.

### What is VS Code?

**Visual Studio Code** is a *code editor* — a text editor designed for writing programs. Think of it as Word for code: instead of fonts and margins, it gives you colors that make code readable (syntax highlighting), a file explorer for your project, and — crucially for us — a **built-in terminal**, so everything happens in one window.

Download it from <https://code.visualstudio.com/> and open it. You should see a dark window with a sidebar menu.

### What is the terminal?

The **terminal** (also called *command line* or *console*) is the oldest way of talking to a computer: instead of clicking icons, you **type commands** as text and press Enter. It looks intimidating — a blinking cursor on a dark screen — but it's just a conversation:

```
you type:    ls
it answers:  index.html   styles.css   app.js
```

Why do programmers use it? Because it's **precise** (a command does exactly one thing), **repeatable** (press ↑ to repeat), and because most programming tools — including Claude Code — live there.

**The six terminal moves you'll use all day:**

| Command | What it does |
|---|---|
| `cd folder` | **c**hange **d**irectory — go *into* a folder |
| `cd ..` | go *up* one folder |
| `ls` | **l**i**s**t what's in the current folder |
| `pwd` | **p**rint **w**orking **d**irectory — "where am I?" |
| ↑ (up arrow) | repeat the last command |
| `Ctrl + C` | stop something that's running |

> **Tip:** the terminal always has a "current folder" — like having one folder window open in Finder/Explorer. `pwd` tells you which one it is. If you ever feel lost, type `pwd` and `ls`.

### What is Python (and why do we need it)?

**Python** is a programming language — but we won't write any Python today. We need it for exactly one thing: it ships with a **tiny web server** we can start with one command. A web server is the program that *hands files to a browser*; running one locally makes the browser treat our project like a real website.

- **macOS and Linux** already have Python.
- **Windows:** download it from <https://python.org>.

### Claude Code and a Claude account

**Claude Code** is the AI assistant we'll meet properly in the next lesson. Install it following the instructions at <https://claude.com/claude-code>, and sign up for a free account at <https://claude.ai/> — the first time you open Claude Code, it will ask you to log in.

### The setup checklist

| Tool | How to install | How to check it works |
|---|---|---|
| **VS Code** | Download from <https://code.visualstudio.com/> | A dark window opens with a sidebar menu |
| **Python 3** | macOS/Linux: already there. Windows: <https://python.org> | Terminal: `python3 --version` → replies `Python 3.x.x` |
| **Claude Code** | Instructions at <https://claude.com/claude-code> | Terminal: `claude --version` → replies with a number |
| **Claude account** | Sign up free at <https://claude.ai/> | Claude Code asks you to log in the first time |

> **Stuck on installation?** Raise your hand — this is the one part of the workshop where a human helper is faster than any prompt.

<!-- slug: 03 -->
## Meet Claude Code

**Claude Code** is like having an expert programmer sitting next to you. You speak to it in plain language — English, Spanish, Italian, whatever — and it writes the code for you, directly into your project files.

### What is an "AI coding agent"?

A chatbot answers questions. An **agent** goes further: it can *read your files*, *write and edit them*, and *run commands* — with your permission. That's what makes today possible: you describe what you want, and Claude Code edits `index.html`, `styles.css`, and `app.js` for you, right there on your disk. You watch every change, and you can always say "undo that" or "I'd prefer it differently".

### How to open it

1. Open **VS Code**.
2. In the top menu, choose **Terminal → New Terminal**.
3. In that terminal, type `claude` and press **Enter**.
4. A box appears where you can type. That's your line to Claude.

### Three examples of how to talk to it

```text
Read the structure of this project and explain what's in each file.
```

```text
Create a file called hello.html with a big title that says "Hello world".
```

```text
The browser console shows an error that says "Failed to fetch".
Read it, find it in my code, and fix it.
```

Notice the pattern: each prompt says **what** you want, **where** (which file), and gives **context** (the error message). The more of those three you provide, the better the result.

### The golden rule: be specific

Instead of saying:

> *"make a nice page"* ❌

say:

> *"make a page with a dark blue background, a centered white title, and three light blue buttons"* ✅

Vague prompts produce generic results. Specific prompts produce *your* result.

### And if it gets it wrong?

No problem — this is a conversation, not a one-shot command. Just say *"that's not it, I'd prefer…"* and Claude will change it. You never need to start over.

> **Mindset for today:** you are the architect, Claude is the builder. You decide what gets built and check the result; Claude handles the bricks.

<!-- slug: 04 -->
## The project we're building

**Surf API** is a web page that shows, live, the ocean conditions at La Cícer:

- The **tide** right now and whether it's rising or falling.
- The **wind** (speed and direction).
- The **waves** (significant height).
- A **chart** of how the tide changes hour by hour.
- A **table** with the hourly forecast, up to 4 days ahead.

### The tech, in one sentence

A web page made of **three plain files** — HTML (structure), CSS (styling), and JavaScript (logic) — that asks **Open-Meteo** for data.

**No frameworks. No build step. No dependencies.** Just three files that any web browser can open.

### HTML, CSS, JavaScript — who does what?

Every website you've ever visited is built from these three languages. A useful way to remember them:

| Language | Role | House metaphor |
|---|---|---|
| **HTML** | *Structure* — what's on the page | The walls and rooms |
| **CSS** | *Appearance* — what it looks like | The paint and furniture |
| **JavaScript** | *Behavior* — what it does | The electricity and plumbing |

```
   index.html  ──►  "there are three cards and a table here"
   styles.css  ──►  "make them dark blue, rounded, glowing"
   app.js      ──►  "fill them with live ocean data"
```

The browser reads all three and assembles the page. Change any file, refresh, and you see the new version — that's the whole development loop.

![Component map](figs/surf-api/component-map.png)

### What is an API?

**API** stands for *Application Programming Interface*, but the everyday meaning is simple: **a service on the internet that gives data to programs instead of pages to humans**.

When *you* visit a weather website, you get a page with menus and ads. When a *program* asks a weather API, it gets pure data — numbers and labels in a format called **JSON**, which looks like this:

```json
{
  "hourly": {
    "time": ["2026-06-11T00:00", "2026-06-11T01:00"],
    "wave_height": [0.8, 0.9]
  }
}
```

Our app will ask, the API will answer with JSON, and our JavaScript will turn those numbers into cards, charts, and tables.

### Where the data comes from

**Open-Meteo** is a free, open weather service. No signup, no API key, no credit card:

- Tides and waves: `marine-api.open-meteo.com`
- Wind: `api.open-meteo.com`

> **Why two URLs?** Open-Meteo splits its data into services: the *marine* API knows about the sea (waves, sea level), the *weather* API knows about the air (wind, temperature, UV). We'll fetch both and merge them — that's Step 6.

<!-- slug: 05 -->
## Step 1 — Create the project

### Goal

A folder called `surf-api` with three empty files (`index.html`, `styles.css`, `app.js`) being served by a tiny local web server, and you can open it in the browser.

### Do it

Open the terminal in the folder where you keep your projects (e.g. `~/Documents`):

```bash
cd ~/Documents
mkdir surf-api
cd surf-api
touch index.html styles.css app.js
```

Reading those commands like sentences: *go to Documents, make a folder `surf-api`, go into it, create three empty files*. (`touch` creates an empty file if it doesn't exist.)

> **On Windows**, replace `touch index.html styles.css app.js` with `type nul > index.html`, then repeat for the other two files.

Now start a local web server in this folder:

```bash
python3 -m http.server 8000
```

### What you should see

The terminal prints something like `Serving HTTP on :: port 8000`. Open <http://localhost:8000> in your browser → you'll see a mostly blank page (because the files are empty). **That blank page is your app.** It exists; it's just empty.

### Going deeper: what just happened?

- **`localhost`** means "this computer". The browser isn't going to the internet — it's asking *your own machine* for the page.
- **`8000` is a port** — think of your computer as a building and ports as numbered doors. The Python server is standing at door 8000 handing out your files. Browsers normally use door 80/443 for websites; for local work, any free door works.
- **Why a server at all?** You could double-click `index.html` and the browser would open it as a *file*. But browsers restrict what file-pages can do (for security) — including fetching data from APIs. Served pages get the full powers, so we serve.

### Try it yourself

Leave the terminal running — that window now *is* your web server. From now on, any change saved to these files shows up when you refresh the browser tab. (If you ever need to stop the server: `Ctrl + C`.)

<!-- slug: 06 -->
## Step 2 — Open the project with Claude Code

### Goal

Get Claude Code to know your project and help you from the inside.

### Do it

1. In VS Code: **File → Open Folder → `surf-api`**.
2. Open a *new* terminal in VS Code (**Terminal → New Terminal**) — keep the one running the server alone.
3. Type `claude` and press Enter.

> **Why two terminals?** Terminal #1 is busy being a web server — it's running `http.server` and can't take new commands. Terminal #2 is where you talk to Claude. Server in one window, conversation in the other. You'll keep both open all workshop.

When Claude is ready, ask it:

```text
Read the structure of this project and explain to me, in plain English,
what's in this folder.
```

### What you should see

Claude will tell you there are three empty files and explain what each one will be for. Perfect — that's our starting point.

### Going deeper: how does Claude "see" the project?

When you launch `claude` inside a folder, that folder becomes its workspace. It can list the files, read their contents, and — when you ask for changes — edit them. It shows you what it's doing as it goes. That's why we opened the `surf-api` folder *first*: Claude now has exactly the right context, nothing more, nothing less.

### Try it yourself

Ask it:

```text
Write a single line of HTML in index.html that shows "Hello, ocean!"
as a big title.
```

Save the file if VS Code asks, refresh the browser tab, and you'll see the text. **You just shipped your first feature** — you described, Claude wrote, the browser showed.

<!-- slug: 07 -->
## Step 3 — Build the HTML structure

### Goal

A complete `index.html` with all the placeholders for our app: header, status bar, three condition cards, day buttons, tide chart canvas, hourly table, and footer.

### Do it

This is the biggest prompt of the day — it describes the *entire skeleton* of the page. Copy it whole:

```text
Replace the contents of index.html with a complete HTML5 document containing:

1. A <head> with charset, viewport meta, the page title "Agüita House
   Sustainability Lab — La Cícer Beach Conditions", a description meta tag,
   <link rel="preconnect"> to both marine-api.open-meteo.com and
   api.open-meteo.com, and a <link> to styles.css.

2. A <header class="site-header"> with two parts:
   - A <div class="brand"> containing a 🌊 emoji in <div class="brand-mark">
     and a <div class="brand-text"> with <h1>Agüita House
     <span>Sustainability Lab</span></h1> and <p class="brand-sub">La Cícer
     Beach · Las Palmas de Gran Canaria</p>.
   - A <div class="credits"> with "by Nicola Gasparro & Vicente Matus" and
     "Sponsored by IDeTIC · ULPGC".

3. A <main class="container"> containing:
   - <section class="status-bar"> with a <span class="dot" id="statusDot">
     and a <span id="statusText">Loading live data…</span>.
   - <section class="cards"> with three <article class="card"> elements for
     Tide (id curTide, trend id curTideTrend), Wind (id curWind, direction id
     curWindDir, arrow id curWindArrow), and Waves (id curWave, subtitle id
     curWaveSub). Each card has an <h2>, a big number, a unit, and a subtitle.
   - <nav class="day-nav" id="dayNav"> (empty — JavaScript fills it).
   - <section class="panel"> with <h2>Tide by the hour</h2> and a
     <canvas id="tideChart" height="220">.
   - <section class="panel"> with <h2>Hourly forecast</h2> and a
     <table class="hourly"> with <thead> (columns: Hour, Tide (m), Wind,
     Wave (m)) and an empty <tbody id="hourlyBody">.
   - A <footer class="site-footer"> with a paragraph linking to Open-Meteo
     and a <p class="coords" id="coords"> (empty — JavaScript fills it).

4. Finally, a <script src="app.js"></script> just before </body>.
```

### What you should see

Refresh the browser. You'll see the title, the wave emoji, the cards (with dashes), the headings… everything **unstyled and ugly, but all there**. That's exactly right.

### Going deeper: tags, ids, and the DOM

- **Tags** like `<header>`, `<section>`, `<table>` are the bricks of HTML. Each one says *what kind of thing* its content is. Semantic names (`header`, `nav`, `footer`) make the page understandable — to browsers, to screen readers, and to Claude.
- **`id` attributes** (`id="curTide"`, `id="statusDot"`) are name tags. They exist so that JavaScript can later find *exactly that element* and change it. Every dash you see on the page right now is a placeholder waiting for `app.js` to fill it by id.
- **The DOM** (*Document Object Model*) is what the browser builds from your HTML: a living tree of elements. JavaScript doesn't edit your HTML file — it edits the DOM in memory, and the screen updates instantly. That's the trick behind every "live" page on the web.

### Try it yourself

Look at the page in the browser. Without styling it's a list of plain text — like a house with walls but no paint. That's normal: the next step makes it pretty.

<!-- slug: 08 -->
## Step 4 — Style it: the dark ocean theme

### Goal

A `styles.css` that turns the bare HTML into the dark, ocean-themed dashboard you saw in the screenshot.

### Do it

```text
Write the file styles.css for a dark "ocean" themed dashboard. Use:

1. A :root block with CSS variables: --bg: #061826, --bg-soft: #0b2538,
   --panel: #0f2e44, --line: #1d4d6e, --text: #eaf6ff, --muted: #8fb6cf,
   --accent: #2bd9c4, --accent-2: #3aa0ff, --warn: #ffd166, --radius: 16px,
   and a --shadow like 0 10px 30px rgba(0,0,0,0.35).

2. body with the --text color, a system-ui font, and a background that
   combines two radial-gradients in blue/turquoise on top of --bg.

3. .site-header: flex, space-between, sticky-feeling with
   backdrop-filter: blur(6px), bottom border in --line. The 🌊 emoji is big
   with a soft drop-shadow in the accent color. The word "Sustainability Lab"
   inside the <h1> is in --accent.

4. .container: max-width ~1100px, centered, padded.

5. .status-bar: small, horizontal, with a colored .dot (gray when loading,
   turquoise --accent when .ok, red #ef4444 when .err).

6. .cards: a CSS grid of 3 columns on desktop, 1 on mobile (use
   repeat(auto-fit, minmax(220px, 1fr))). Each .card is a rounded panel
   using --panel and --shadow, with a large .big number and a small .unit.

7. .day-nav: horizontal flex with rounded .day-btn pills. The active pill
   (.day-btn.active) has the gradient
   linear-gradient(135deg, var(--accent-2), var(--accent)).

8. .panel: same rounded panel style as cards. Holds the chart and the table.

9. .hourly table: full width, comfortable padding, the .now row highlighted
   with a faint accent background. The .wind-arrow rotates via transform.
   The .bar is a small horizontal bar next to wave values, using a gradient.

10. Make it responsive — the cards collapse to one column on phones.
```

### What you should see

Refresh. The page transforms: dark blue background, glowing wave emoji, the three cards laid out nicely (still with dashes), and clear typography.

### Going deeper: CSS variables — a design system in ten lines

Look at point 1 of the prompt. We define every color **once**, with a name, in `:root`:

```css
:root {
  --bg: #061826;       /* page background  */
  --accent: #2bd9c4;   /* turquoise accent */
  --accent-2: #3aa0ff; /* blue accent      */
}
```

Everywhere else, the CSS says `var(--accent)` instead of repeating the color code. The payoff: **change one line, re-theme the whole app**. That's also why "make it orange" will be a one-line change in the experiment below — and a one-prompt change in Lesson 15.

Two other ideas hiding in this prompt:

- **`repeat(auto-fit, minmax(220px, 1fr))`** is CSS Grid's way of saying: *fit as many 220px-minimum columns as you can, stretch them evenly* — responsive design in one line, no breakpoints needed.
- **Those `#061826`-style codes** are hex colors: red, green, and blue, each from `00` to `ff`. `#061826` = almost no red, a little green, some blue = deep ocean.

### Try it yourself

Ask Claude:

```text
Make the accent color orange instead of turquoise. Change only the CSS variable.
```

You'll see every accent (the "Sustainability Lab" word, the active day pill, the chart line) turn orange — one variable, total re-theme. Change it back to `#2bd9c4` when you're done.

<!-- slug: 09 -->
## Step 5 — Data sources & the boot script

### Goal

Start `app.js`: define where the data comes from (Open-Meteo) and write the boot function that fetches it when the page loads.

### Do it

```text
Open app.js and write the first part:

1. A LOCATION constant with: name: "La Cícer Beach", lat: 28.138,
   lon: -15.443, timezone: "Atlantic/Canary".

2. Two URL constants built with template strings:
   - MARINE_URL → https://marine-api.open-meteo.com/v1/marine with parameters
     latitude, longitude, hourly=wave_height,sea_level_height_msl, timezone
     (URL-encoded), and forecast_days=4.
   - WEATHER_URL → https://api.open-meteo.com/v1/forecast with
     hourly=wind_speed_10m,wind_direction_10m and the same location/timezone
     parameters.

3. A COMPASS array with the 16 cardinal points: N, NNE, NE, ENE, E, ESE, SE,
   SSE, S, SSW, SW, WSW, W, WNW, NW, NNW.

4. A tiny $ helper: const $ = (id) => document.getElementById(id);

5. Three module-scoped variables: let HOURS = []; let DAYS = [];
   let activeDay = null;

6. A setStatus(kind, text) function that updates the #statusDot class
   (add ok or err) and writes the message into #statusText.

7. An async function init() that:
   - Writes the location string into #coords (something like
     "La Cícer Beach · 28.138°N, 15.443°W · Atlantic/Canary").
   - Calls setStatus("loading", "Fetching live data from Open-Meteo…").
   - Uses Promise.all with fetchJSON(MARINE_URL) and fetchJSON(WEATHER_URL)
     to grab both responses in parallel.
   - On success: calls setStatus("ok", "Live data · updated HH:MM …") with
     the current time.
   - On failure: catches the error and calls
     setStatus("err", "Could not load data: ...").

8. A helper async function fetchJSON(url) that calls fetch(url), throws if
   !res.ok, and returns res.json().

9. At the bottom: document.addEventListener("DOMContentLoaded", init);

Don't implement mergeData or the renderers yet — leave them for the next steps.
```

### What you should see

Refresh. The status dot should briefly be gray ("Fetching…") and then turn green ("Live data · updated …"). If you open the browser console (**F12**), you should see no red errors. The cards still show dashes — that's next.

### Going deeper: fetch, JSON, and "I'll have it in a moment"

This step contains the three most important ideas in modern web programming:

- **`fetch(url)`** is JavaScript's way of making a request over the internet: *"Open-Meteo, give me the marine data for these coordinates."* It's the same thing your browser does for every page, but under your control.
- **JSON** is the answer format — nested `name: value` pairs, readable by humans and machines alike. `res.json()` turns the raw response into a JavaScript object you can walk through.
- **A Promise** is JavaScript's IOU: *"I don't have the answer yet, but I will."* The network takes time, and the page can't freeze while waiting. `async`/`await` lets us write "wait here for the answer" in plain sequential style — and **`Promise.all`** says *"fire both requests at once, wake me when both are back"*. Two requests in the time of one.

The boot sequence, drawn:

```
page loads ──► DOMContentLoaded ──► init()
                                      │
                          ┌───────────┴───────────┐
                          ▼                       ▼
                   fetch MARINE_URL        fetch WEATHER_URL
                          └───────────┬───────────┘
                                Promise.all
                                      ▼
                          status dot turns green ●
```

### Try it yourself

Disconnect your wifi for a moment and reload. The status should turn **red** with an error message — that's your `catch` branch doing its job. Reconnect and reload.

<!-- slug: 10 -->
## Step 6 — Merge the two data feeds

### Goal

Take the two JSON responses (marine + weather) and combine them into one tidy list, where each entry has the time, tide, wave, wind speed, and wind direction.

### Do it

```text
Add to app.js:

1. A numOrNull(v) helper that returns null if v is null/undefined/NaN,
   otherwise Number(v).

2. A mergeData(marine, weather) function that:
   - Reads marine.hourly.time, marine.hourly.sea_level_height_msl,
     marine.hourly.wave_height.
   - Reads weather.hourly.time, weather.hourly.wind_speed_10m,
     weather.hourly.wind_direction_10m.
   - Builds a Map from each weather time to { windSpeed, windDir }.
   - Maps each marine time t to an object: { time: t, date: new Date(t),
     day: t.slice(0,10), hour: new Date(t).getHours(), tide, wave,
     windSpeed, windDir }, looking up the matching wind from the map
     (or null if missing).
   - Returns the array.

3. Update init() so that after the two fetches succeed it stores the result:
   HOURS = mergeData(marine, weather); and throws if HOURS.length === 0.
   Then computes DAYS = [...new Set(HOURS.map(h => h.day))]; and sets
   activeDay = dayKey(new Date()) (using a helper, see next).

4. Add four small helpers: compass(deg) returns
   COMPASS[Math.round(deg/22.5) % 16]; fmt(v, dp) returns "—" if null else
   v.toFixed(dp); dayKey(d) returns YYYY-MM-DD from a Date; dayLabel(key)
   returns a short label like "Thu 11" using
   toLocaleDateString("en-GB", { weekday: "short", day: "numeric" }).

5. Add waveWord(m): returns "Flat" if <0.3, "Small" <0.6,
   "Knee–waist high" <1.0, "Chest high" <1.5, "Overhead" <2.5,
   otherwise "Big".
```

### What you should see

The page still looks the same — we're only preparing the data. Open the browser console and type `HOURS.length` → it should print a number around **96** (24 hours × 4 days). Type `HOURS[0]` → you'll see one row of merged data.

### Going deeper: why merge at all?

The marine API and the weather API each return their own list of hours. They cover the same hours, but they arrive as **two separate JSON objects**. Working with two parallel lists everywhere would be painful — so we zip them into **one array of complete rows**:

```
marine:   00:00 tide 1.2  wave 0.8        weather:  00:00 wind 18  dir 40°
          01:00 tide 1.4  wave 0.9                  01:00 wind 17  dir 38°
                        │                                    │
                        └────────── mergeData ───────────────┘
                                       ▼
HOURS:    { time 00:00, tide 1.2, wave 0.8, windSpeed 18, windDir 40 }
          { time 01:00, tide 1.4, wave 0.9, windSpeed 17, windDir 38 }
```

The **`Map`** is the matchmaker: we index the weather rows by their timestamp, then for each marine row we look up its partner in constant time. This *transform the data first, render second* pattern is how nearly all data apps are built.

One more gem: `waveWord()` translates meters into surfer language. `1.2` is data; **"Chest high"** is meaning. Good dashboards do both.

### Try it yourself

In the console, type `DAYS` to see the four upcoming days, and:

```js
HOURS.find(h => h.tide > 1)
```

to find the first hour with a tide above 1 meter.

<!-- slug: 11 -->
## Step 7 — Current conditions cards

### Goal

Fill the three cards (Tide / Wind / Waves) with the values of **the hour closest to now**.

### Do it

```text
Add to app.js a renderCurrent() function that:

1. Finds the entry in HOURS whose date is closest to Date.now().
   Call it cur.

2. Writes the values into the DOM:
   - $("curTide").textContent = fmt(cur.tide, 2);
   - $("curWind").textContent = fmt(cur.windSpeed, 0);
   - $("curWave").textContent = fmt(cur.wave, 2);

3. If cur.windDir is not null: write `${compass(cur.windDir)}
   (${Math.round(cur.windDir)}°)` into #curWindDir, and set
   $("curWindArrow").style.transform = "rotate(" + cur.windDir + "deg)".

4. Tide trend: look at the next hour (HOURS[indexOf(cur) + 1]). If its tide
   is greater, write "rising ▲" into #curTideTrend; if less, "falling ▼".

5. If cur.wave is not null: write `${waveWord(cur.wave)} · significant
   height` into #curWaveSub.

In init(), call renderCurrent() after the data is loaded.
```

### What you should see

The three cards now show **real numbers**: the current tide in meters, the wind speed in km/h with a rotating arrow, and the wave height with a description like "Chest high · significant height".

### Going deeper: your first real DOM manipulation

Remember the ids from Step 3? This is the moment they pay off:

```js
$("curTide").textContent = fmt(cur.tide, 2);
```

reads as: *find the element with id `curTide`, replace its text with the formatted tide value*. No page reload, no HTML editing — JavaScript reaches into the living page and changes one element. Every dynamic site you've ever used (mail inboxes, chat apps, stock tickers) is doing exactly this, thousands of times a minute.

The wind arrow is the same idea applied to *style* instead of text: `style.transform = "rotate(42deg)"` physically rotates the arrow to match the wind direction. Data → pixels, one property at a time.

### Try it yourself

Ask Claude:

```text
Make the wind arrow bigger and add a CSS transition so it animates smoothly
when the value updates.
```

<!-- slug: 12 -->
## Step 8 — Day selector

### Goal

A row of buttons (Today, Fri 12, Sat 13, Sun 14) that lets you pick which day's data to look at.

### Do it

```text
Add to app.js:

1. renderDayNav() that:
   - Clears #dayNav.innerHTML.
   - For each day in DAYS, creates a <button class="day-btn">. Its label is
     "Today" if day === dayKey(new Date()), otherwise dayLabel(day).
   - Adds the class active to the one that matches activeDay.
   - On click: set activeDay = day, remove active from all buttons, add
     active to the clicked one, then call renderDay(day).
   - Appends each button to #dayNav.

2. renderDay(day) that:
   - Filters HOURS to rows = HOURS.filter(h => h.day === day).
   - Calls drawTideChart(rows) (Step 9) and renderTable(rows) (Step 10) —
     leave the calls in place even though the functions don't exist yet.
   - Computes the low and high tide of those rows and writes into
     #tideRange: low X.XX m · high Y.YY m.

In init(), call renderDayNav() and renderDay(activeDay) after renderCurrent().
```

### What you should see

A row of four pills appears under the cards. The first ("Today") is highlighted in turquoise. Clicking another one moves the highlight. The browser console will show errors about `drawTideChart` / `renderTable` not being defined — **that's fine**; we add them next.

### Going deeper: events and state

Two ideas make every interactive interface tick:

- **Events.** The browser constantly announces what the user does: *clicked here, typed there, resized the window*. `button.addEventListener("click", …)` says "when this button is clicked, run this code". Until now our app only acted on page load; now it **reacts to you**.
- **State.** `activeDay` is one variable holding the answer to "which day is the user looking at?" — that's *state*. The click handler does exactly two things: **update the state**, then **re-render from the state** (`renderDay(day)`). UI = a drawing of your state. This one sentence is the core idea behind React, Vue, and every modern framework — you're just seeing it without the wrapping paper.

```
click "Sat 13" ──► activeDay = "2026-06-13" ──► renderDay()
                                                 ├─ drawTideChart(rows)
                                                 └─ renderTable(rows)
```

### Try it yourself

Click the buttons. Notice how only the highlight changes for now — the chart and table are waiting for Steps 9 and 10.

<!-- slug: 13 -->
## Step 9 — Tide chart on a canvas

### Goal

A custom line chart drawn on a `<canvas>` showing the tide curve hour by hour for the selected day.

### Do it

```text
Add to app.js a function drawTideChart(rows) that draws on the
<canvas id="tideChart">. Use the 2D context, no chart library.

1. Resize the canvas for crisp rendering: get
   dpr = window.devicePixelRatio || 1; set canvas.width = cssW * dpr and
   canvas.height = 220 * dpr (where cssW = canvas.clientWidth || 800);
   then ctx.setTransform(dpr, 0, 0, dpr, 0, 0) and clearRect.

2. Filter rows to those where tide != null → pts. If fewer than 2 points,
   return.

3. Compute padding (padL=40, padR=16, padT=16, padB=28), the inner width w
   and height h, and the value range [min, max] of the tide values. Add a
   small visual padding to the range. Define helpers x(i) (horizontal
   position) and y(v) (vertical position).

4. Draw a faint horizontal grid (4 lines) with Y-axis labels in --muted
   color (#8fb6cf). Use ctx.font = "11px system-ui, sans-serif".

5. Draw X-axis labels every 3 hours ("00h", "03h", …).

6. Fill the area under the curve with a vertical gradient from
   rgba(58,160,255,0.35) at the top to rgba(58,160,255,0.02) at the bottom.

7. Draw the line on top: strokeStyle = "#3aa0ff", lineWidth = 2.5.

8. If the day shown is today, draw a turquoise dot (#2bd9c4) at the current
   hour with a dark outline.

Also: add a window resize listener that, if activeDay is set, recalls
drawTideChart(HOURS.filter(h => h.day === activeDay)).
```

### What you should see

A smooth curve of the tide for the selected day, with hour labels along the bottom and meter values on the left. If you're viewing today, a turquoise dot marks the current hour. Switching days redraws the chart.

### Going deeper: what is a canvas?

Everything else on our page is made of *elements* — boxes the browser lays out for us. **`<canvas>` is different: it's a blank sheet of pixels**, and JavaScript paints on it directly: *move here, draw a line there, fill this area with a gradient*. Total freedom, zero help — which is why it's perfect for custom charts, games, and visualizations.

Two professional details hiding in this prompt:

- **`devicePixelRatio`** — modern "retina" screens pack 2–3 physical pixels into every CSS pixel. If you draw at CSS size, the chart looks blurry. The fix: make the canvas bitmap 2–3× bigger and scale the drawing context to match. Crisp lines on every screen.
- **Mapping data to pixels.** The `x(i)` and `y(v)` helpers are tiny converters: *hour number → horizontal pixel*, *tide in meters → vertical pixel*. Every chart ever drawn — by any library — is built on exactly this pair of functions. Today you wrote them yourself.

### Try it yourself

Resize the browser window. The chart should redraw itself to fit — that's your resize listener working.

<!-- slug: 14 -->
## Step 10 — Hourly table

### Goal

A table with one row per hour of the selected day, showing tide, wind direction + speed, and wave height with a small bar.

### Do it

```text
Add to app.js a function renderTable(rows) that:

1. Clears #hourlyBody.innerHTML.
2. Computes nowHour = new Date().getHours(), today = dayKey(new Date()),
   and maxWave = Math.max(0.1, ...rows.map(r => r.wave ?? 0)).
3. For each r in rows, creates a <tr>. If r.day === today &&
   r.hour === nowHour, sets tr.className = "now".
4. Each row's HTML has four cells:
   - Hour as "HH:00".
   - Tide formatted with fmt(r.tide, 2).
   - Wind cell: an arrow <span class="wind-arrow"
     style="transform:rotate(${r.windDir ?? 0}deg)">↑</span>, then
     ${fmt(r.windSpeed, 0)} km/h, then a <span class="dir-label"> with the
     compass letters.
   - Wave: ${fmt(r.wave, 2)} plus a <span class="bar"> whose width in px is
     Math.round((r.wave / maxWave) * 60).

Make sure renderDay() (from Step 8) is calling renderTable(rows) — it
should already.
```

### What you should see

Below the chart, a clean table appears with 24 rows. The row for the current hour is highlighted. The wind arrows point in different directions. The little bars next to wave heights give a quick visual sense of which hour has the biggest waves.

**You're done! 🎉** Status dot green, cards live, day pills switching, tide curve drawn, table glowing at the current hour. You built a complete, real web application.

### Going deeper: template strings and tiny visualizations

- **Template strings** — the backtick strings like `` `${fmt(r.windSpeed, 0)} km/h` `` — let JavaScript build HTML by filling values into a text mold. One template, 24 rows: that's how lists are rendered everywhere, from search results to social feeds.
- **The wave bar is a mini chart with no canvas.** A `<span>` with a computed width — `(r.wave / maxWave) * 60` pixels — turns a number into something the eye compares instantly. Notice we divide by `maxWave`, the biggest wave *of that day*: the bars are relative, so the scale always fits.
- **`??` (nullish coalescing)** means "or, if that's missing": `r.windDir ?? 0` uses the wind direction, or 0 when the API had a gap. Small guards like this are what make apps not crash on imperfect data.

### Try it yourself

Ask Claude:

```text
Add a fifth column called "Surf?" that shows a 🏄 emoji if the wave is
between 0.6 and 1.5 meters, and a 😴 emoji otherwise.
```

<!-- slug: 15 -->
## Make it yours

You have a working app. Now make it **yours** — that's the difference between following a tutorial and owning a project. Three customizations, in increasing order of ambition:

### 1. Change the beach 🌍

The whole app is anchored to one constant: `LOCATION` in `app.js`. Change the coordinates, change the ocean. Grab the latitude and longitude of your favorite beach from Google Maps (right-click on a point → copy coordinates), then:

```text
Change LOCATION in app.js to point to Las Canteras Beach
(latitude 28.142, longitude -15.439, timezone "Atlantic/Canary").
```

> Works for any coast on Earth — Hawaii, Sydney, your hometown. Open-Meteo covers the whole planet, free.

### 2. Change the colors 🎨

Remember Step 4: every color lives in one `:root` block. Re-theming is a one-prompt job:

```text
Change the theme colors to a sunset palette: keep the dark background, but
change --accent to a warm orange and --accent-2 to a soft pink.
```

### 3. Add a new data field ☀️

Open-Meteo has many more fields: water temperature, UV index, rain. Adding one exercises the **entire data pipeline** you built — URL → merge → HTML → render:

```text
Add the UV index to the dashboard. You need to:
1. Add uv_index to the hourly= parameters in WEATHER_URL.
2. Read it in mergeData() and add it as a uv field on each row.
3. In index.html, add a fourth card alongside Tide/Wind/Waves with
   id="curUv".
4. In renderCurrent(), write the value into #curUv.
```

> Notice how this prompt names all four files/functions to touch. After ten steps of building, **you know the architecture well enough to give Claude a map**. That's the real skill you learned today.

Browse everything Open-Meteo offers at <https://open-meteo.com/en/docs> — each parameter you find there is one prompt away from your dashboard.

<!-- slug: 16 -->
## When things break

Things break. For programmers, that's not a disaster — it's a normal Tuesday. The skill is not avoiding errors; it's **reading them and asking the right question**.

### The troubleshooting table

| What you see | Ask Claude |
|---|---|
| The page is blank | "The page is blank. Open `index.html` and check the structure for an error." |
| "Failed to fetch" in the browser console | "The browser console says 'Failed to fetch'. Check if I'm online and verify the URLs in `app.js`." |
| Status dot stays gray forever | "The status dot stays on 'loading'. Look at `init()` in `app.js` and check whether the fetch is completing." |
| Cards still show "—" | "The cards aren't getting filled. Make sure `renderCurrent()` is called inside `init()` after the data loads." |
| "Port 8000 is already in use" | "Port 8000 is busy. Start the Python server on port 8001 instead." |
| `python3: command not found` | "The `python3` command isn't found. Help me check whether Python 3 is installed and on the PATH." |
| Chart canvas is empty | "The tide chart is blank. Open the console, look for an error in `drawTideChart`, and fix it." |

### Your two diagnostic windows

When something is wrong, the truth is in one of two places:

- **The browser console** (press **F12**, tab "Console") — where JavaScript errors appear, in red, with the file and line number. This is the page telling you what hurt.
- **The terminal** running your server — where you'd see if the server itself stopped or a file wasn't found.

### The golden rule of debugging

> **Copy the full error message — from the console or the terminal — and paste it to Claude, whole.** Don't summarize it, don't retype it, don't trim the "boring" parts. The boring parts are where the clues live. Half the time, the fix comes back in 30 seconds.

This is exactly how professional developers work with AI tools, by the way. Error messages are written *for* this: they name the file, the line, and the reason. You just have to deliver them to something that reads them carefully.

<!-- slug: 17 -->
## Ship it online & keep learning

### Put your app online (free, in 1 minute)

Your app is just three static files — no server logic, no database — so you can drop them almost anywhere:

| Service | How |
|---|---|
| **Netlify Drop** | Open <https://app.netlify.com/drop>, drag your `surf-api` folder into the page. Done — you get a public URL. |
| **GitHub Pages** | Push the folder to a GitHub repo, enable Pages in the repo settings. |
| **Vercel CLI** | From the project folder, run `npx vercel` (needs Node.js). |

> "Static files" is why this is so easy: a host only has to *hand the files to browsers* — the JavaScript runs on your visitors' machines, and the data comes straight from Open-Meteo. Zero maintenance, zero cost.

### Join the Agüita community

- WhatsApp: <https://wa.me/34603786656>
- Come to the next workshop. **Bring a friend.**

### Keep learning

- <https://developer.mozilla.org/en-US/docs/Learn> — MDN's tutorials for HTML, CSS, and JavaScript. The reference the pros use.
- <https://open-meteo.com/en/docs> — all the free weather data you can request.
- <https://docs.claude.com/claude-code> — every Claude Code trick.

### Glossary — the words you earned today

| Term | Meaning |
|---|---|
| **HTML** | The language that describes the *structure* of a web page (headings, paragraphs, images…). |
| **CSS** | The language that describes *how it looks* (colors, fonts, layout). |
| **JavaScript** | The language that *makes it do things* (reacts to clicks, fetches data, updates the screen). |
| **DOM** | "Document Object Model" — the tree of elements the browser builds from your HTML. JavaScript reads and changes it via `document.getElementById(...)`. |
| **API** | A service on the internet you ask for data. Open-Meteo is an API. |
| **Endpoint** | The exact URL of an API. `MARINE_URL` is an endpoint. |
| **JSON** | The format APIs return data in — a nested list of "name: value" pairs. |
| **`fetch`** | The JavaScript function that asks an API for data. Returns a *Promise*. |
| **Promise** | JavaScript's way of saying "I'll have the answer in a moment". `async`/`await` lets you wait for it. |
| **Canvas** | An HTML element you can draw on pixel by pixel with JavaScript. Our tide chart uses one. |
| **Prompt** | The instruction you give Claude Code. The more specific, the better the result. |

---

**Thanks for coming to the workshop.**

*Agüita House · Sustainability Lab · 2026*
