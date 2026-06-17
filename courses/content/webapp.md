<!-- slug: 01 -->
## What you'll build — and the AI coding jungle

By the end of this workshop you will have a **real website on the real internet** — a landing page for a project of your choice, reachable by anyone with the link, and updatable in minutes.

Here is the most important idea first: **you do not need to know how to write code.** You need to know how to *orchestrate* it. Your job is to describe what you want clearly, let an AI coding tool write it, check the result, and ship it. The skills are *reading*, *judging*, and *iterating* — not memorising syntax.

> **What "full stack" means for us.** A finished product needs a **frontend** (what people see) and a **backend** (the machinery behind it — storing data, sending email). In this workshop we assemble a minimal version of both, working together, using free tools. You'll meet the precise definitions in the next lesson.

### The AI coding jungle

Two years ago, generating working code from plain language was a novelty. Today it is an entire ecosystem — and it changes month to month. You don't need all of these; you need **one** that you have access to. Pick your machete and walk into the jungle.

| Tool | What it is | Where it runs |
|------|------------|---------------|
| **Cursor** | An AI-first code editor (a fork of VS Code) with inline edits and an autonomous "agent" mode | Desktop app |
| **Claude Code** | Anthropic's agentic coding tool — works in your terminal and as IDE/desktop extensions | Terminal · IDE · Desktop |
| **Google Antigravity** | Google's agentic development platform built around the Gemini models | Desktop app |
| **OpenAI Codex** | OpenAI's coding agent, available as a CLI and a cloud agent | Terminal · Cloud |
| **Pi** | A conversational AI assistant — lighter for hands-on coding, handy for explanations | Web · Mobile |

> **The lineup changes constantly.** GitHub Copilot, Windsurf, and others belong in the same jungle, and new entrants appear all the time. The *workflow* you'll learn here is tool-agnostic — switch tools freely; the loop stays the same.

### What you do NOT need

- You do **not** need a paid hosting plan — every tool in our formula has a free tier.
- You do **not** need to own a server or run a database.
- You do **not** need to memorise HTML, CSS, or JavaScript — though you'll absorb a lot just by reading what the AI produces.

What you **do** need: a GitHub account, one AI coding tool, and a project you'd like a page for.

<!-- slug: 02 -->
## Frontend, backend, and the full stack

Two words get thrown around constantly. Let's pin them down precisely, because the whole workshop hangs on the distinction.

### Frontend — everything in the browser

The **frontend** is everything that runs on the *visitor's* device, inside their web browser. It has three layers:

| Layer | Technology | Think of it as… |
|-------|-----------|-----------------|
| **Content / structure** | **HTML** | The bricks — headings, paragraphs, buttons, images |
| **Style** | **CSS** | The paint — colours, fonts, spacing, layout |
| **Functionality** | **JavaScript** | The wiring — clicks, animations, fetching data |

So your instinct was right: the frontend *is* "style, content, and functionalities" living in a codebase. The three files you'll most often see are `index.html`, `styles.css`, and `app.js`.

### Backend — the machinery on a server

The **backend** runs *somewhere else* — on a server, not on the visitor's machine. A common point of confusion: the **database is not the backend**. The database only **stores** data. The backend is the **server-side code** that sits in front of the database and does the real work:

- exposes **APIs** (endpoints other programs can call),
- runs the **business logic** (the rules of your app),
- handles **authentication** (who is allowed to do what),
- performs **searches and queries** over the stored data.

So a more accurate picture is **backend = server code *plus* database**, where the database holds the dataset and the server code provides the functionality and search.

<img src="figs/webapp/diagram-frontend-backend.svg" alt="Frontend and backend architecture" style="width:100%;max-width:640px;display:block;margin:1rem 0" />

### The twist: a full stack with no server of your own

Here is the liberating part. **You can ship a complete product without ever running your own backend or database.** Instead, you delegate the backend jobs to *managed services* that someone else operates:

- Need to receive a contact-form message? → **Web3Forms** does it.
- Need something a little smarter, like a custom email reply? → **Google Apps Script** does it.

Your site stays a pile of static frontend files, and the "backend" becomes a couple of API calls to services that handle the servers for you. That is the formula — and it's next.

<!-- slug: 03 -->
## The formula — your stack for shipping fast

Every tool below is **free to start** and does exactly **one job**. Together they form a complete pipeline from "idea" to "live website."

| Job | Tool | One-line role |
|-----|------|---------------|
| **Codebase** | **GitHub** | Stores your code and its history; the single source of truth |
| **Deployment** | **Vercel** | Watches GitHub and publishes your site to a public URL automatically |
| **Simple forms** | **Web3Forms** | Turns a plain HTML form into emails in your inbox — no backend |
| **Powerful forms / logic** | **Google Apps Script** | A tiny programmable backend that can email from *your* Gmail |

### How they connect

<img src="figs/webapp/diagram-formula-stack.svg" alt="The formula stack and workflow" style="width:100%;max-width:680px;display:block;margin:1rem 0" />

The loop you'll live in: **edit locally → push to GitHub → Vercel redeploys → check the live URL.** Forms are bolted on once the page looks good.

> **Why GitHub *and* Vercel?** GitHub is where the code *lives*; Vercel is what *publishes* it. Every time you push to GitHub, Vercel automatically rebuilds and redeploys — so "saving your work" and "updating the website" become the same action.

### A note on Apps Script generating forms

Google Apps Script isn't just a place to *receive* data — it can also **generate a Google Form programmatically** with a few lines of code. And since it's just code, **your AI tool can write that code for you.** You'll see this in Unit 4. For now, just hold the idea: even the "backend" pieces of this workshop are things you can describe to an AI and have written for you.

In the next unit we lay the foundations: GitHub, Vercel, and your local build environment.

<!-- slug: 04 -->
## GitHub — your codebase and a free instant website

**GitHub** is where your code lives. Think of it as Google Drive for code, with a perfect memory: every change is saved as a snapshot you can return to.

> **We won't walk through GitHub sign-up.** It changes often and is well documented. Create a free account at [github.com](https://github.com), then come back. The only thing you must do here is **create a repository** (a "repo" — a project folder that GitHub tracks).

### Create your repository

When you create a repo, give it a name, make it **Public**, and tick **"Add a README file"** so it isn't empty. That's it — you now have a codebase, even though there's nothing in it yet.

### The magic trick: a free website from your username

GitHub has a hidden gift called **GitHub Pages**. There is one special repository name that publishes a website *automatically*:

```
A repo named exactly:   your-username.github.io
becomes a live site at: https://your-username.github.io
```

If your GitHub username is `marialopez`, create a repo called **`marialopez.github.io`**, put an `index.html` in it, and within a minute that file is a public website. No configuration, no deploy button.

> **Try it now (optional but fun):** create your `username.github.io` repo, add a one-line `index.html` that says *"Hello, world — site coming soon"*, and visit the URL. Seeing your own name resolve to a real web page is the moment it clicks.

This is the simplest possible deployment. In the next lesson we use **Vercel**, which gives the same automatic publishing for *any* repo (not just the special-named one) plus a few conveniences.

<!-- slug: 05 -->
## Vercel — deploy in two clicks

**Vercel** is a hosting service that connects to GitHub and **publishes your site for you**. The pitch: you never touch a server, and every push to GitHub updates the live site within seconds.

> **We won't tour Vercel's features.** You only need the happy path below.

### The whole setup, start to finish

1. Go to [vercel.com](https://vercel.com) and **sign up with your GitHub account** (this is the easiest path — it links the two automatically).
2. Vercel will ask for **permission to access your GitHub repositories**. Grant it — you can limit it to specific repos if you prefer.
3. Click **"Add New… → Project"**, find your repository in the list, and click **Import**.
4. Leave every setting at its default and click **Deploy**.

That's it. After a few seconds you get a public URL:

```
https://your-repo-name.vercel.app
```

### What just happened — and why it matters

Vercel is now **watching your repository**. From now on, every time you push a change to GitHub, Vercel automatically rebuilds and redeploys. This is called **continuous deployment**, and it's the quiet superpower of this whole workshop:

<img src="figs/webapp/diagram-continuous-deploy.svg" alt="Continuous deployment pipeline" style="width:100%;max-width:620px;display:block;margin:1rem 0" />

You will never click "deploy" again. **Pushing your code *is* deploying it.** Keep that `*.vercel.app` URL open in a tab — you'll refresh it constantly as you build.

<!-- slug: 06 -->
## The local workshop — GitHub Desktop + an AI coding tool

You *could* edit files directly on GitHub's website, but the comfortable way to work is **on your own computer**, with two tools side by side:

- **GitHub Desktop** — a friendly graphical app that moves changes between your computer and GitHub. No memorising commands.
- **Your AI coding tool** — Cursor, Claude Code, Antigravity, Codex, whichever you have. This is what actually writes the code.

### Connect a local copy with GitHub Desktop

1. Install **GitHub Desktop** from [desktop.github.com](https://desktop.github.com) and sign in with your GitHub account.
2. Choose **File → Clone repository**, pick the repo you created, and select a folder on your computer to put it in.
3. You now have a **local folder** that is linked to GitHub. Files you change here can be sent up ("pushed") with a click.

> **Three words you'll use all day.** **Commit** = save a labelled snapshot of your changes. **Push** = send your commits up to GitHub (which triggers Vercel). **Pull** = bring down changes made elsewhere (e.g. from your phone). GitHub Desktop has a big button for each.

### Point your AI tool at the folder

Open that same local folder in your AI coding tool:

- **Cursor / VS Code-style apps:** *File → Open Folder* and pick the cloned folder.
- **Claude Code / Codex (terminal):** open a terminal *in* that folder and launch the tool there.

Now the AI can see your project from the inside — read the files, create new ones, and edit them on your instructions. Everything is in place. In the next unit, you build.

<!-- slug: 07 -->
## Build your landing page with a prompt

Time to create the page. The trick to a great first result is to **give the AI context**, not just a one-liner. If your project is described in a document, hand that document over.

### Your first prompt

In your AI tool, try something like:

```
Make a single-page landing site for the project described in the
attached document. Use only index.html, styles.css, and app.js —
no frameworks, no build step. Include a hero section with the
project name and tagline, an "About" section, a "Features" section,
and an empty "Contact" section I'll fill in later. Make it clean,
modern, and responsive.
```

Attach your project's **PDF** (most AI tools let you drag a file in). The more the document says about your project, the better the page.

> **The golden rule of prompting: be specific.** "Make it nice" gives the AI nothing to aim at. Name the sections you want, the feeling you're after ("calm and minimal", "bold and playful"), and the constraints ("plain HTML/CSS/JS, no frameworks"). Specific in, specific out.

### Test it locally

After the AI writes the files, you'll have an `index.html` in your folder. **Open it in your browser** to see your page:

- Double-click `index.html`, **or**
- in many AI editors, right-click it and choose *"Open with Live Server"* / *"Open in browser"*.

Look at it critically. Too cramped? Wrong colours? The hero text not punchy enough? **Don't fix it by hand — describe the change and let the AI do it:**

```
The hero is too plain. Make the background a soft gradient in the
project's brand colour, increase the title size, and add a call-to-
action button that scrolls to the Contact section.
```

Repeat until the page looks right *locally*. You haven't published anything yet — that's the next lesson, where this becomes a rhythm.

<!-- slug: 08 -->
## The loop — prompt, test, commit, push, check

This is the heartbeat of the entire workshop. Once it's muscle memory, you can build anything.

<img src="figs/webapp/diagram-loop.svg" alt="The prompt-test-commit-push-check loop" style="width:100%;max-width:680px;display:block;margin:1rem 0" />

### Walking one full lap

1. **Prompt** — ask the AI for one focused change ("add a footer with my social links").
2. **Test** — refresh `index.html` in your browser. Happy? Continue. Not happy? Prompt again.
3. **Commit** — in **GitHub Desktop**, you'll see the changed files listed. Type a short message like *"Add footer with social links"* and click **Commit to main**.
4. **Push** — click **Push origin**. Your code is now on GitHub.
5. **Check** — wait a few seconds, then refresh your `your-repo.vercel.app` URL. Your change is live for the world.

Then go around again. And again.

> **Commit small, commit often.** Each commit is a save point you can return to. If a change makes things worse, you can roll back to the last good commit. Small, well-labelled commits are a gift to your future self.

> **Why test *before* you push?** Pushing publishes. Catching a problem locally (in step 2) keeps mistakes off the live site. The live "check" in step 5 is your final confirmation, not your first look.

Keep looping until your landing page is exactly what you want. When the page itself is done, there's one thing left to make it *useful*: a way for visitors to reach you.

<!-- slug: 09 -->
## Add a contact form with Web3Forms

A landing page that nobody can respond to is a poster. Let's add a **contact form** — and do it with **zero backend**, using **Web3Forms**.

### How Web3Forms works

Normally, a form needs a server to receive what people type. Web3Forms *is* that server, run for you. You give your form a secret **access key**, and Web3Forms emails every submission straight to your inbox.

1. Go to [web3forms.com](https://web3forms.com), enter the email where you want messages delivered, and you'll receive a free **Access Key** (a long string).
2. Hand it to your AI tool and ask it to wire up the Contact section:

```
In the Contact section, add a form (name, email, message) that
submits to Web3Forms using my access key: YOUR-ACCESS-KEY-HERE.
Show a friendly "Thanks, I'll be in touch!" message after a
successful send, and keep the styling consistent with the page.
```

The AI will produce a standard HTML form whose `action` points at the Web3Forms endpoint, with your key in a hidden field. The essence looks like this:

```html
<form action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="YOUR-ACCESS-KEY-HERE">
  <input type="text"  name="name"    placeholder="Your name"   required>
  <input type="email" name="email"   placeholder="Your email"  required>
  <textarea          name="message" placeholder="Your message" required></textarea>
  <button type="submit">Send</button>
</form>
```

### Test the whole pipeline

Run the loop one more time: **commit → push → check**, then open the live site and **send yourself a test message**. When it lands in your inbox, you have just shipped a *full-stack* feature — a frontend form talking to a managed backend — without running a single server.

> **Where did the "backend" go?** It's Web3Forms' servers, not yours. This is the serverless formula from Unit 1, made real: the database-and-server work is delegated to a managed API.

You now have a complete, working, contactable website. Everything from here is **extra power**.

<!-- slug: 10 -->
## Maintain your site from your phone

Your whole workflow lives on GitHub — which means you can run it from a phone. Spot a typo on the bus? Fix it before your stop.

### The phone toolkit

- The **GitHub mobile app** (iOS/Android) lets you browse files, edit them, and — crucially — open and merge **Pull Requests**.
- Several AI coding tools now offer a **mobile or web app** that can make changes to your repo on a prompt. (Claude Code, for example, can run from the web and propose changes as a Pull Request.)

### What's a Pull Request?

A **Pull Request (PR)** is a proposed set of changes, kept separate from your live code until you approve it. It's the safe way to change things when you're not at your desk:

<img src="figs/webapp/diagram-pull-request.svg" alt="Pull request workflow" style="width:100%;max-width:640px;display:block;margin:1rem 0" />

### The pocket loop

1. From your phone, ask your AI tool (or edit directly in the GitHub app) for a small change — *"change the tagline to '…'"*.
2. It opens a **Pull Request** with the change.
3. Open the PR in the GitHub app, glance at what changed, and tap **Merge**.
4. Merging updates your `main` branch → Vercel redeploys → the live site reflects your edit, all from your pocket.

> **Why a PR instead of editing `main` directly?** On the go, you can't easily preview locally. A PR gives you a moment to *look before you leap* — and a clean way to discard the change if it's wrong.

<!-- slug: 11 -->
## Turn it into an app — add it to your home screen

Remember the title: website *and* web-**app**. Here's where the "app" arrives. Your site is just a URL — but with one tap on your phone you can give it an **icon on your home screen** that opens full-screen, with no address bar, exactly like a native app you'd download from a store. No store, no install file, no extra code required.

> **Why this works.** A modern website *is* an app. Phones can "install" any web page as a shortcut that launches in its own window. This is the lightweight side of what the industry calls a **Progressive Web App (PWA)**.

### On iPhone / iPad (use **Safari**)

The home-screen option only appears in Apple's own browser, so this must be done in **Safari** — not Chrome or another app.

1. Open **Safari** and go to your live site (`https://your-repo.vercel.app`).
2. Tap the **Share** button (the square with an upward arrow) in the toolbar.
3. Scroll down and tap **Add to Home Screen**.
4. Edit the name if you like, then tap **Add**.

An icon now sits on your home screen. Tapping it launches your site full-screen.

### On Android (use **Chrome**)

1. Open **Chrome** and go to your live site.
2. Tap the **⋮** menu (three dots, top-right).
3. Tap **Add to Home screen** (it may say **Install app**).
4. Confirm the name and tap **Add** / **Install**.

> **Heads-up:** the wording moves around between OS and browser versions, and the **native browser is required** — Safari on iOS, Chrome on Android. If you don't see the option, you're probably in the wrong browser or an in-app browser (like the one inside Instagram).

### Make the icon and name look right (optional)

By default the icon is a snapshot of your page. To control how the installed app looks — a proper icon, a name, a launch colour — your site needs two small things, and **your AI tool can add them for you**:

- a **web app manifest** (`site.webmanifest`) describing the name, icon, and theme colour;
- an **apple-touch-icon** (a square PNG) so iOS uses *your* logo.

A prompt like this is enough:

```
Add a web app manifest and an apple-touch-icon so my site installs
nicely to a phone home screen. Use my logo (logo.png) for the icon,
set the app name to "<your project>", and a theme colour of <your
brand colour>. Link them correctly in index.html.
```

Commit, push, check — then re-add to your home screen to see your own icon. You now have a website that *also* lives in your pocket as an app.

<!-- slug: 12 -->
## A smarter backend — Google Apps Script

Web3Forms is perfect for "send me a message." But sometimes you want **logic**: send the visitor an automatic reply, save submissions to a spreadsheet, or build a custom form. For that, meet **Google Apps Script** — a tiny, free backend that lives inside your Google account.

### What it is

**Google Apps Script** lets you run small JavaScript programs on Google's servers, with built-in access to your Gmail, Google Sheets, Google Forms, and more. Deployed as a **Web App**, a script becomes a URL your page can send data to — a genuine backend endpoint, with no server to manage.

<img src="figs/webapp/diagram-apps-script.svg" alt="Google Apps Script fan-out" style="width:100%;max-width:560px;display:block;margin:1rem 0" />

### Two things it unlocks

**1. Reply from your own Gmail.** A script can read the submitted data and call `MailApp.sendEmail(...)` to send a confirmation **from your Gmail address** — something a static page can't do on its own.

**2. It can generate forms by code.** Apps Script can build a **Google Form** programmatically:

```javascript
function makeForm() {
  const form = FormApp.create('Project Sign-up');
  form.addTextItem().setTitle('Your name');
  form.addTextItem().setTitle('Your email');
  form.addParagraphTextItem().setTitle('Tell me about your project');
  Logger.log('Form URL: ' + form.getPublishedUrl());
}
```

And because that's *just code*, **your AI tool can write it for you.** Describe the form you want — "a sign-up form with name, email, and a message box, and email me each response" — and let the AI produce the script. You paste it into [script.google.com](https://script.google.com), run it once to grant permissions, and deploy.

> **Web3Forms vs Apps Script — when to use which.** Reach for **Web3Forms** when you just need messages in your inbox (5 minutes, no code). Reach for **Apps Script** when you need *behaviour* — auto-replies, saving to a spreadsheet, or generating forms — and don't mind a little AI-written code.

<!-- slug: 13 -->
## Recap & where to go next

You started with nothing and finished with a **live, contactable website you built by orchestrating AI.** Hold on to the mental model — it scales to far bigger things.

### The model to keep

<img src="figs/webapp/diagram-recap.svg" alt="Full-stack mental model recap" style="width:100%;max-width:640px;display:block;margin:1rem 0" />

The whole workshop is really **one loop and a few managed services.** Master the loop and you can build almost anything by swapping in more capable pieces.

### The checklist you completed

- ✅ Created a **GitHub** repository (and met the `username.github.io` free-site trick)
- ✅ Connected **Vercel** for automatic deployment on every push
- ✅ Worked locally with **GitHub Desktop** + an **AI coding tool**
- ✅ Built a landing page from a prompt and a project document
- ✅ Lived the **prompt → test → commit → push → check** loop
- ✅ Added a **Web3Forms** contact form — a backend without a server
- ✅ Learned to maintain the site **from your phone** via Pull Requests
- ✅ Installed the site as an **app on your phone's home screen**
- ✅ Met **Google Apps Script** for smarter, AI-generated backends

### Next rungs on the ladder

- **A custom domain.** Buy a name (e.g. from Namecheap or Cloudflare) and point it at your Vercel project — `yourproject.com` instead of `*.vercel.app`.
- **A real backend, when you need one.** Managed databases and serverless functions (Supabase, Firebase, Vercel Functions) are the next step up from Web3Forms and Apps Script.
- **Keep reading the code.** Every time the AI writes something, skim it and ask *"why?"*. You'll be writing your own before you realise it.

> **The takeaway.** The barrier to shipping software is no longer *typing code* — it's *knowing what to ask for, and judging what you get back.* You now have both. Go build the thing.
