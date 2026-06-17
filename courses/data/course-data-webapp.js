/* course-data-webapp.js — Ship Your Own Website with AI */
window.COURSE = {
  "slug": "webapp",
  "backUrl": "../courses.html",
  "coverVideo": null,
  "badge": "Workshop · Full-Stack · AI Coding · GitHub · Vercel",
  "title": "Ship Your Own Website with AI",
  "accent": "var(--c-webapp)",
  "acc2": "var(--c-webapp-soft)",
  "welcome": "Build and publish your own website — a real, live landing page for your project — without writing the code yourself. You become the <strong>orchestrator</strong>: you describe what you want, an AI coding tool writes it, and free tools like <strong>GitHub</strong> and <strong>Vercel</strong> put it on the internet. By the end you'll have a deployed site you can update from your laptop or even your phone.",
  "units": [
    {
      "name": "Unit 1 — The Big Picture",
      "lessons": [
        {
          "title": "What you'll build — and the AI coding jungle",
          "subtitle": "A live landing page for your project, shipped to the internet — orchestrated by you, written by AI. First, a map of today's AI coding tools.",
          "objective": "Understand the goal of the workshop (a deployed landing page), the role you play as the orchestrator, and the current landscape of AI coding tools.",
          "tags": ["Overview", "AI Tools", "Orchestration", "Landing Page"]
        },
        {
          "title": "Frontend, backend, and the full stack",
          "subtitle": "What runs in the browser, what runs on a server, and why this workshop replaces the server with smart APIs.",
          "objective": "Define frontend (HTML/CSS/JS in the browser) and backend (server code + database), and understand the serverless 'formula' this workshop uses instead.",
          "tags": ["Frontend", "Backend", "Full-Stack", "Concepts"]
        },
        {
          "title": "The formula — your stack for shipping fast",
          "subtitle": "GitHub for the code, Vercel for the deploy, Web3Forms and Google Apps Script for the 'backend'. Free, simple, powerful.",
          "objective": "Map each tool in the stack to the job it does, and see how they connect into a single build-and-ship workflow.",
          "tags": ["GitHub", "Vercel", "Web3Forms", "Apps Script"]
        }
      ]
    },
    {
      "name": "Unit 2 — Set Up Your Foundations",
      "lessons": [
        {
          "title": "GitHub — your codebase and a free instant website",
          "subtitle": "Create a repository, and learn the magic trick: a repo named after your username publishes a website at your-username.github.io.",
          "objective": "Create a GitHub repository and understand GitHub Pages — including the special username.github.io repo that publishes a site instantly.",
          "tags": ["GitHub", "Repository", "GitHub Pages", "Hosting"]
        },
        {
          "title": "Vercel — deploy in two clicks",
          "subtitle": "Give Vercel permission on GitHub, import your repo, and it's live at reponame.vercel.app. No config, no servers.",
          "objective": "Connect Vercel to GitHub, import a repository, and get an automatic deployment URL that rebuilds on every push.",
          "tags": ["Vercel", "Deployment", "Continuous Deploy", "Hosting"]
        },
        {
          "title": "The local workshop — GitHub Desktop + an AI coding tool",
          "subtitle": "Clone your repo with a friendly GUI, open the folder in your AI coding tool, and you're ready to build.",
          "objective": "Connect a local repository to GitHub using GitHub Desktop, and set up your chosen AI coding tool to work inside that folder.",
          "tags": ["GitHub Desktop", "Local Repo", "AI Tool", "Setup"]
        }
      ]
    },
    {
      "name": "Unit 3 — Build, Deploy, Iterate",
      "lessons": [
        {
          "title": "Build your landing page with a prompt",
          "subtitle": "Hand the AI a description of your project — even a PDF — and ask for a landing page. Open index.html and see it locally.",
          "objective": "Write an effective first prompt to generate a landing page from a project description, and preview index.html locally in the browser.",
          "tags": ["Prompting", "index.html", "Local Preview", "HTML"]
        },
        {
          "title": "The loop — prompt, test, commit, push, check",
          "subtitle": "The rhythm of modern development: small changes, tested locally, pushed live, verified in the browser. Then repeat.",
          "objective": "Practice the core iteration loop with GitHub Desktop — commit and push a change, then confirm it on your deployed URL.",
          "tags": ["Iteration", "Commit", "Push", "Workflow"]
        },
        {
          "title": "Add a contact form with Web3Forms",
          "subtitle": "A working contact form with zero backend. Drop in one access key and visitor messages land in your inbox.",
          "objective": "Add a Web3Forms-powered contact form to your page so visitors can email you without any server or database.",
          "tags": ["Web3Forms", "Forms", "Contact", "No-Backend"]
        }
      ]
    },
    {
      "name": "Unit 4 — Going Further",
      "lessons": [
        {
          "title": "Maintain your site from your phone",
          "subtitle": "Run a prompt, open a pull request, and merge it — all from your pocket. Your website, maintainable anywhere.",
          "objective": "Use a phone-based workflow to make a change, open a Pull Request, and merge it so the site automatically redeploys.",
          "tags": ["Mobile", "Pull Request", "Merge", "GitOps"]
        },
        {
          "title": "A smarter backend — Google Apps Script",
          "subtitle": "When a simple form isn't enough: a Google Apps Script endpoint that emails from your Gmail — and can even be generated by AI.",
          "objective": "Understand how a Google Apps Script web app receives form data and replies from your Gmail, and how AI can write the script for you.",
          "tags": ["Apps Script", "Google", "Email", "Automation"]
        },
        {
          "title": "Recap & where to go next",
          "subtitle": "You shipped a real site. Here's the mental model to keep, and the next rungs on the ladder.",
          "objective": "Consolidate the full workflow and identify next steps: custom domains, richer backends, and how to keep learning.",
          "tags": ["Recap", "Next Steps", "Domains", "Growth"]
        }
      ]
    }
  ]
};
