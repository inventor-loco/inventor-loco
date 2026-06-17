/* course-data-surf-api.js — Surf API from Zero · by Nicola Gasparro & Vicente Matus (Agüita House Sustainability Lab) */
window.COURSE = {
  "slug": "surf-api",
  "backUrl": "../courses.html",
  "coverVideo": null,
  "badge": "Workshop · HTML · CSS · JavaScript · Claude Code",
  "title": "Surf API from Zero",
  "accent": "var(--c-surf-api)",
  "acc2": "var(--c-surf-api-soft)",
  "authors": "Nicola Gasparro & Vicente Matus",
  "heroImage": "assets/final.png",
  "pdfUrl": "figs/surf-api/workshop-guide.pdf",
  "welcome": "Build a real web application: a live dashboard of ocean conditions at <strong>La Cícer Beach</strong> — tides, wind, and waves. You don't need to know how to code: you'll read, copy a few prompts into <strong>Claude Code</strong>, and watch your app come alive in the browser. Agüita House · Sustainability Lab · Las Palmas de Gran Canaria.",
  "units": [
    {
      "name": "Unit 1 — Get Ready",
      "lessons": [
        {
          "title": "Welcome — what you'll build today",
          "subtitle": "A live ocean-conditions dashboard for La Cícer Beach, built from zero in about two hours. No coding experience needed.",
          "objective": "Understand what the finished app does, what you will learn along the way, and what you do NOT need to know to follow this workshop.",
          "tags": ["Welcome", "Dashboard", "No-Code Start", "2 Hours"]
        },
        {
          "title": "Your toolkit — VS Code, the terminal, Python",
          "subtitle": "Three tools, all free. Learn what each one actually is, install them, and master the six terminal commands you'll use all day.",
          "objective": "Install and verify VS Code, Python 3, Claude Code, and a Claude account — and understand what the terminal is and why programmers love it.",
          "tags": ["VS Code", "Terminal", "Python", "Setup"]
        },
        {
          "title": "Meet Claude Code",
          "subtitle": "An expert programmer sitting next to you. You speak plain language; it writes the code.",
          "objective": "Open Claude Code inside VS Code, understand how an AI coding agent works, and learn the golden rule of prompting: be specific.",
          "tags": ["Claude Code", "AI Agent", "Prompts", "Golden Rule"]
        },
        {
          "title": "The project — anatomy of a web app",
          "subtitle": "Three plain files — HTML, CSS, JavaScript — that ask a free API for ocean data. No frameworks, no build step, no dependencies.",
          "objective": "Explain the role of index.html, styles.css, and app.js, and understand what an API is and where the data comes from (Open-Meteo).",
          "tags": ["HTML", "CSS", "JavaScript", "API", "Open-Meteo"]
        }
      ]
    },
    {
      "name": "Unit 2 — Build It, Step by Step",
      "lessons": [
        {
          "title": "Step 1 — Create the project",
          "subtitle": "A folder, three empty files, and a tiny local web server. Your app exists — it's just blank.",
          "objective": "Create the surf-api folder with index.html, styles.css, and app.js, start a Python web server on port 8000, and open it in the browser.",
          "tags": ["mkdir", "touch", "Local Server", "localhost:8000"]
        },
        {
          "title": "Step 2 — Open the project with Claude Code",
          "subtitle": "Let Claude read your project from the inside, then make it write your first line of HTML.",
          "objective": "Open the surf-api folder in VS Code, launch Claude Code in a second terminal, and use it to inspect the project and write a first 'Hello, ocean!' heading.",
          "tags": ["Open Folder", "Two Terminals", "First Prompt"]
        },
        {
          "title": "Step 3 — Build the HTML structure",
          "subtitle": "One big prompt gives you the full skeleton: header, status bar, three cards, day buttons, chart canvas, table, footer.",
          "objective": "Generate a complete index.html with every placeholder the app needs, and understand what the DOM is and why ids matter.",
          "tags": ["HTML5", "Structure", "DOM", "ids"]
        },
        {
          "title": "Step 4 — Style it: the dark ocean theme",
          "subtitle": "CSS variables, gradients, and a responsive grid turn the bare skeleton into a dark, glowing dashboard.",
          "objective": "Generate styles.css with a CSS-variable design system, understand how :root variables work, and try changing the accent color with one prompt.",
          "tags": ["CSS Variables", "Grid", "Gradients", "Responsive"]
        },
        {
          "title": "Step 5 — Data sources & the boot script",
          "subtitle": "app.js begins: define where the data lives (Open-Meteo) and fetch it the moment the page loads.",
          "objective": "Write the LOCATION constant, the two API URLs, the fetchJSON helper, and an async init() that loads both feeds in parallel — and understand fetch, JSON, and async/await.",
          "tags": ["fetch", "JSON", "async/await", "Promise.all"]
        },
        {
          "title": "Step 6 — Merge the two data feeds",
          "subtitle": "Marine data and weather data arrive separately. mergeData() combines them into one tidy hour-by-hour list.",
          "objective": "Implement mergeData() with a Map lookup, plus the small helpers (compass, fmt, dayKey, waveWord), and inspect the merged HOURS array in the browser console.",
          "tags": ["Arrays", "Map", "Data Merging", "Console"]
        },
        {
          "title": "Step 7 — Current conditions cards",
          "subtitle": "The three cards come alive: tide in meters, wind with a rotating arrow, waves with a human description.",
          "objective": "Implement renderCurrent() to find the hour closest to now and write real values into the DOM — your first real DOM manipulation.",
          "tags": ["DOM", "renderCurrent", "Wind Arrow", "Live Data"]
        },
        {
          "title": "Step 8 — Day selector",
          "subtitle": "Today, Fri, Sat, Sun — four pill buttons that switch the whole dashboard between days.",
          "objective": "Implement renderDayNav() and renderDay(), and understand events, state (activeDay), and how clicks re-render the page.",
          "tags": ["Events", "State", "Buttons", "Re-render"]
        },
        {
          "title": "Step 9 — Tide chart on a canvas",
          "subtitle": "A smooth tide curve drawn pixel by pixel on a <canvas> — no chart library, just the 2D context.",
          "objective": "Implement drawTideChart() with grid lines, axis labels, a gradient fill, and a 'now' dot — and understand what canvas and devicePixelRatio are.",
          "tags": ["Canvas", "2D Context", "Charts", "devicePixelRatio"]
        },
        {
          "title": "Step 10 — Hourly table",
          "subtitle": "24 rows per day: tide, wind direction with arrows, and wave bars. The current hour glows. You're done! 🎉",
          "objective": "Implement renderTable() with template strings, highlight the current hour, and celebrate a fully working app.",
          "tags": ["Tables", "Template Strings", "Finished App"]
        }
      ]
    },
    {
      "name": "Unit 3 — Make It Yours",
      "lessons": [
        {
          "title": "Customize it — your beach, your colors, new data",
          "subtitle": "Change the location, repaint the theme, add a UV index card. Three prompts, three superpowers.",
          "objective": "Point the app at any beach on Earth, restyle it with CSS variables, and extend it with a new Open-Meteo data field.",
          "tags": ["LOCATION", "Themes", "UV Index", "Customization"]
        },
        {
          "title": "When things break — debugging with Claude",
          "subtitle": "Blank page? Failed to fetch? Gray dot forever? Every bug has a prompt that fixes it.",
          "objective": "Use the troubleshooting table to diagnose the seven most common failures, and learn the golden rule: paste the full error message to Claude.",
          "tags": ["Debugging", "Console", "Errors", "Troubleshooting"]
        },
        {
          "title": "Ship it online & keep learning",
          "subtitle": "Your app is three static files — put it on the internet for free in one minute, then keep going.",
          "objective": "Deploy with Netlify Drop, GitHub Pages, or Vercel; join the Agüita community; and keep the glossary close as you continue learning.",
          "tags": ["Deploy", "Netlify", "Vercel", "Glossary", "Community"]
        }
      ]
    }
  ]
};
