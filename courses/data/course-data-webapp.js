/* course-data-webapp.js — Ship Your Own Website with AI */
window.COURSE = {
  "slug": "webapp",
  "backUrl": "../courses.html",
  "coverVideo": null,
  "badge":    "Workshop · Full-Stack · AI Coding · GitHub · Vercel",
  "badge_es": "Taller · Full-Stack · Programación con IA · GitHub · Vercel",
  "title":    "Ship Your Own Website with AI",
  "title_es": "Publica Tu Web con Inteligencia Artificial",
  "accent": "var(--c-webapp)",
  "acc2":   "var(--c-webapp-soft)",
  "welcome":    "Build and publish your own website — a real, live landing page for your project — without writing the code yourself. You become the <strong>orchestrator</strong>: you describe what you want, an AI coding tool writes it, and free tools like <strong>GitHub</strong> and <strong>Vercel</strong> put it on the internet. By the end you'll have a deployed site you can update from your laptop or even your phone.",
  "welcome_es": "Construye y publica tu propia web — una landing page real y en vivo para tu proyecto — sin escribir el código tú mismo. Tú eres el <strong>orquestador</strong>: describes lo que quieres, una herramienta de IA lo escribe, y herramientas gratuitas como <strong>GitHub</strong> y <strong>Vercel</strong> lo publican en internet. Al terminar tendrás un sitio en producción que podrás actualizar desde tu ordenador o incluso desde el móvil.",
  "units": [
    {
      "name":    "Unit 1 — The Big Picture",
      "name_es": "Unidad 1 — El panorama general",
      "lessons": [
        {
          "title":        "What you'll build — and the AI coding jungle",
          "title_es":     "Qué vas a construir — y la jungla de la IA para código",
          "subtitle":     "A live landing page for your project, shipped to the internet — orchestrated by you, written by AI. First, a map of today's AI coding tools.",
          "subtitle_es":  "Una landing page en vivo para tu proyecto, publicada en internet — orquestada por ti, escrita por IA. Primero, un mapa de las herramientas actuales de IA para código.",
          "objective":    "Understand the goal of the workshop (a deployed landing page), the role you play as the orchestrator, and the current landscape of AI coding tools.",
          "objective_es": "Entender el objetivo del taller (una landing page publicada), el papel que tú juegas como orquestador, y el panorama actual de herramientas de IA para programar.",
          "tags": ["Overview", "AI Tools", "Orchestration", "Landing Page"]
        },
        {
          "title":        "Frontend, backend, and the full stack",
          "title_es":     "Frontend, backend y el stack completo",
          "subtitle":     "What runs in the browser, what runs on a server, and why this workshop replaces the server with smart APIs.",
          "subtitle_es":  "Qué se ejecuta en el navegador, qué se ejecuta en un servidor, y por qué este taller sustituye el servidor con APIs inteligentes.",
          "objective":    "Define frontend (HTML/CSS/JS in the browser) and backend (server code + database), and understand the serverless 'formula' this workshop uses instead.",
          "objective_es": "Definir frontend (HTML/CSS/JS en el navegador) y backend (código del servidor + base de datos), y entender la 'fórmula' sin servidor que usa este taller.",
          "tags": ["Frontend", "Backend", "Full-Stack", "Concepts"]
        },
        {
          "title":        "The formula — your stack for shipping fast",
          "title_es":     "La fórmula — tu stack para publicar rápido",
          "subtitle":     "GitHub for the code, Vercel for the deploy, Web3Forms and Google Apps Script for the 'backend'. Free, simple, powerful.",
          "subtitle_es":  "GitHub para el código, Vercel para el despliegue, Web3Forms y Google Apps Script para el 'backend'. Gratuito, sencillo, potente.",
          "objective":    "Map each tool in the stack to the job it does, and see how they connect into a single build-and-ship workflow.",
          "objective_es": "Asignar a cada herramienta del stack la tarea que cumple, y ver cómo se conectan en un único flujo de construcción y publicación.",
          "tags": ["GitHub", "Vercel", "Web3Forms", "Apps Script"]
        }
      ]
    },
    {
      "name":    "Unit 2 — Set Up Your Foundations",
      "name_es": "Unidad 2 — Prepara las bases",
      "lessons": [
        {
          "title":        "GitHub — your codebase and a free instant website",
          "title_es":     "GitHub — tu código y una web gratuita al instante",
          "subtitle":     "Create a repository, and learn the magic trick: a repo named after your username publishes a website at your-username.github.io.",
          "subtitle_es":  "Crea un repositorio y aprende el truco mágico: un repositorio con tu nombre de usuario publica un sitio web en tu-usuario.github.io.",
          "objective":    "Create a GitHub repository and understand GitHub Pages — including the special username.github.io repo that publishes a site instantly.",
          "objective_es": "Crear un repositorio en GitHub y entender GitHub Pages — incluido el repositorio especial usuario.github.io que publica un sitio al instante.",
          "tags": ["GitHub", "Repository", "GitHub Pages", "Hosting"]
        },
        {
          "title":        "Vercel — deploy in two clicks",
          "title_es":     "Vercel — despliega en dos clics",
          "subtitle":     "Give Vercel permission on GitHub, import your repo, and it's live at reponame.vercel.app. No config, no servers.",
          "subtitle_es":  "Da permiso a Vercel en GitHub, importa tu repositorio y ya está en vivo en nombrerepo.vercel.app. Sin configuración, sin servidores.",
          "objective":    "Connect Vercel to GitHub, import a repository, and get an automatic deployment URL that rebuilds on every push.",
          "objective_es": "Conectar Vercel a GitHub, importar un repositorio y obtener una URL de despliegue automático que se reconstruye en cada push.",
          "tags": ["Vercel", "Deployment", "Continuous Deploy", "Hosting"]
        },
        {
          "title":        "The local workshop — GitHub Desktop + an AI coding tool",
          "title_es":     "El taller local — GitHub Desktop + una herramienta de IA",
          "subtitle":     "Clone your repo with a friendly GUI, open the folder in your AI coding tool, and you're ready to build.",
          "subtitle_es":  "Clona tu repositorio con una interfaz gráfica amigable, abre la carpeta en tu herramienta de IA y estás listo para construir.",
          "objective":    "Connect a local repository to GitHub using GitHub Desktop, and set up your chosen AI coding tool to work inside that folder.",
          "objective_es": "Conectar un repositorio local a GitHub con GitHub Desktop, y configurar tu herramienta de IA para trabajar dentro de esa carpeta.",
          "tags": ["GitHub Desktop", "Local Repo", "AI Tool", "Setup"]
        }
      ]
    },
    {
      "name":    "Unit 3 — Build, Deploy, Iterate",
      "name_es": "Unidad 3 — Construye, despliega, itera",
      "lessons": [
        {
          "title":        "Build your landing page with a prompt",
          "title_es":     "Construye tu landing page con un prompt",
          "subtitle":     "Hand the AI a description of your project — even a PDF — and ask for a landing page. Open index.html and see it locally.",
          "subtitle_es":  "Dale a la IA una descripción de tu proyecto — incluso un PDF — y pídele una landing page. Abre index.html y mírala localmente.",
          "objective":    "Write an effective first prompt to generate a landing page from a project description, and preview index.html locally in the browser.",
          "objective_es": "Escribir un primer prompt efectivo para generar una landing page a partir de una descripción del proyecto, y previsualizar index.html localmente en el navegador.",
          "tags": ["Prompting", "index.html", "Local Preview", "HTML"]
        },
        {
          "title":        "The loop — prompt, test, commit, push, check",
          "title_es":     "El bucle — prompt, prueba, commit, push, verifica",
          "subtitle":     "The rhythm of modern development: small changes, tested locally, pushed live, verified in the browser. Then repeat.",
          "subtitle_es":  "El ritmo del desarrollo moderno: cambios pequeños, probados localmente, publicados en vivo, verificados en el navegador. Y repetir.",
          "objective":    "Practice the core iteration loop with GitHub Desktop — commit and push a change, then confirm it on your deployed URL.",
          "objective_es": "Practicar el bucle de iteración principal con GitHub Desktop — hacer commit y push de un cambio, y luego confirmarlo en tu URL de producción.",
          "tags": ["Iteration", "Commit", "Push", "Workflow"]
        },
        {
          "title":        "Add a contact form with Web3Forms",
          "title_es":     "Añade un formulario de contacto con Web3Forms",
          "subtitle":     "A working contact form with zero backend. Drop in one access key and visitor messages land in your inbox.",
          "subtitle_es":  "Un formulario de contacto funcional sin ningún backend. Añade una clave de acceso y los mensajes de los visitantes llegan a tu bandeja de entrada.",
          "objective":    "Add a Web3Forms-powered contact form to your page so visitors can email you without any server or database.",
          "objective_es": "Añadir un formulario de contacto con Web3Forms para que los visitantes puedan enviarte un email sin ningún servidor ni base de datos.",
          "tags": ["Web3Forms", "Forms", "Contact", "No-Backend"]
        }
      ]
    },
    {
      "name":    "Unit 4 — Going Further",
      "name_es": "Unidad 4 — Yendo más allá",
      "lessons": [
        {
          "title":        "Maintain your site from your phone",
          "title_es":     "Mantén tu sitio desde el móvil",
          "subtitle":     "Run a prompt, open a pull request, and merge it — all from your pocket. Your website, maintainable anywhere.",
          "subtitle_es":  "Lanza un prompt, abre un pull request y fusiónalo — todo desde el bolsillo. Tu web, mantenible desde cualquier lugar.",
          "objective":    "Use a phone-based workflow to make a change, open a Pull Request, and merge it so the site automatically redeploys.",
          "objective_es": "Usar un flujo de trabajo desde el móvil para hacer un cambio, abrir un Pull Request y fusionarlo para que el sitio se redespliegue automáticamente.",
          "tags": ["Mobile", "Pull Request", "Merge", "GitOps"]
        },
        {
          "title":        "Turn it into an app — add it to your home screen",
          "title_es":     "Conviértelo en una app — añádela a la pantalla de inicio",
          "subtitle":     "Open your live site in your phone's browser and 'Add to Home Screen'. Now it launches with its own icon, like a native app.",
          "subtitle_es":  "Abre tu sitio en el navegador del móvil y elige «Añadir a pantalla de inicio». Ahora se lanza con su propio icono, como una app nativa.",
          "objective":    "Install your deployed site to your phone's home screen as a web app using Safari (iOS) or Chrome (Android), and understand what makes it feel native.",
          "objective_es": "Instalar tu sitio desplegado en la pantalla de inicio del móvil como web app usando Safari (iOS) o Chrome (Android), y entender qué la hace sentir nativa.",
          "tags": ["Web App", "Home Screen", "iOS", "Android"]
        },
        {
          "title":        "A smarter backend — Google Apps Script",
          "title_es":     "Un backend más inteligente — Google Apps Script",
          "subtitle":     "When a simple form isn't enough: a Google Apps Script endpoint that emails from your Gmail — and can even be generated by AI.",
          "subtitle_es":  "Cuando un formulario simple no basta: un endpoint de Google Apps Script que envía correos desde tu Gmail — e incluso puede ser generado por IA.",
          "objective":    "Understand how a Google Apps Script web app receives form data and replies from your Gmail, and how AI can write the script for you.",
          "objective_es": "Entender cómo una web app de Google Apps Script recibe datos del formulario y responde desde tu Gmail, y cómo la IA puede escribir el script por ti.",
          "tags": ["Apps Script", "Google", "Email", "Automation"]
        },
        {
          "title":        "Recap & where to go next",
          "title_es":     "Resumen y próximos pasos",
          "subtitle":     "You shipped a real site. Here's the mental model to keep, and the next rungs on the ladder.",
          "subtitle_es":  "Has publicado un sitio real. Aquí está el modelo mental que debes conservar y los siguientes peldaños de la escalera.",
          "objective":    "Consolidate the full workflow and identify next steps: custom domains, richer backends, and how to keep learning.",
          "objective_es": "Consolidar el flujo de trabajo completo e identificar los siguientes pasos: dominios personalizados, backends más completos y cómo seguir aprendiendo.",
          "tags": ["Recap", "Next Steps", "Domains", "Growth"]
        }
      ]
    }
  ]
};
