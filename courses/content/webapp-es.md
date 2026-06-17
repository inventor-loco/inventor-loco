<!-- slug: 01 -->
## Qué vas a construir — y la jungla de la IA para código

Al terminar este taller tendrás una **página web real en internet** — una landing page para un proyecto de tu elección, accesible por cualquiera que tenga el enlace, y actualizable en minutos.

La idea más importante primero: **no necesitas saber escribir código.** Necesitas saber cómo *orquestarlo*. Tu trabajo es describir lo que quieres con claridad, dejar que una herramienta de IA lo escriba, revisar el resultado y publicarlo. Las habilidades son *leer*, *juzgar* e *iterar* — no memorizar sintaxis.

> **Lo que "full stack" significa para nosotros.** Un producto terminado necesita un **frontend** (lo que la gente ve) y un **backend** (la maquinaria detrás — almacenar datos, enviar correos). En este taller ensamblamos una versión mínima de ambos, funcionando juntos, con herramientas gratuitas. Verás las definiciones precisas en la siguiente lección.

### La jungla de la IA para código

Hace dos años, generar código funcional a partir de lenguaje natural era una novedad. Hoy es todo un ecosistema — y cambia mes a mes. No necesitas todas estas herramientas; necesitas **una** a la que tengas acceso. Elige tu machete y adéntrate en la jungla.

| Herramienta | Qué es | Dónde corre |
|-------------|--------|-------------|
| **Cursor** | Un editor de código con IA integrada (una bifurcación de VS Code) con ediciones en línea y un modo "agente" autónomo | App de escritorio |
| **Claude Code** | La herramienta de codificación agente de Anthropic — funciona en la terminal y como extensión de IDE/escritorio | Terminal · IDE · Escritorio |
| **Google Antigravity** | La plataforma de desarrollo agente de Google basada en los modelos Gemini | App de escritorio |
| **OpenAI Codex** | El agente de codificación de OpenAI, disponible como CLI y agente en la nube | Terminal · Nube |
| **Pi** | Un asistente de IA conversacional — más ligero para codificación práctica, útil para explicaciones | Web · Móvil |

> **La lista cambia constantemente.** GitHub Copilot, Windsurf y otros pertenecen a la misma jungla, y aparecen nuevos participantes todo el tiempo. El *flujo de trabajo* que aprenderás aquí es agnóstico a la herramienta — cambia de herramienta libremente; el bucle sigue siendo el mismo.

### Lo que NO necesitas

- **No** necesitas un plan de hosting de pago — cada herramienta de nuestra fórmula tiene un nivel gratuito.
- **No** necesitas tener un servidor ni gestionar una base de datos.
- **No** necesitas memorizar HTML, CSS ni JavaScript — aunque absorberás mucho simplemente leyendo lo que produce la IA.

Lo que **sí** necesitas: una cuenta de GitHub, una herramienta de IA para código, y un proyecto para el que quieras una página.

<!-- slug: 02 -->
## Frontend, backend y el stack completo

Dos palabras se usan constantemente. Vamos a precisarlas, porque todo el taller depende de la distinción.

### Frontend — todo lo que ocurre en el navegador

El **frontend** es todo lo que se ejecuta en el dispositivo del *visitante*, dentro de su navegador web. Tiene tres capas:

| Capa | Tecnología | Piénsalo como… |
|------|-----------|-----------------|
| **Contenido / estructura** | **HTML** | Los ladrillos — encabezados, párrafos, botones, imágenes |
| **Estilo** | **CSS** | La pintura — colores, fuentes, espaciado, disposición |
| **Funcionalidad** | **JavaScript** | El cableado — clics, animaciones, obtención de datos |

Los tres archivos que verás más a menudo son `index.html`, `styles.css` y `app.js`.

### Backend — la maquinaria en un servidor

El **backend** corre *en otro lugar* — en un servidor, no en la máquina del visitante. Un punto de confusión habitual: la **base de datos no es el backend**. La base de datos solo **almacena** datos. El backend es el **código del lado del servidor** que se sitúa delante de la base de datos y hace el trabajo real:

- expone **APIs** (puntos de acceso que otros programas pueden llamar),
- ejecuta la **lógica de negocio** (las reglas de tu aplicación),
- gestiona la **autenticación** (quién tiene permiso para hacer qué),
- realiza **búsquedas y consultas** sobre los datos almacenados.

Una imagen más precisa: **backend = código del servidor *más* base de datos**, donde la base de datos guarda el conjunto de datos y el código del servidor proporciona la funcionalidad y la búsqueda.

<img src="figs/webapp/diagram-frontend-backend-es.svg" alt="Arquitectura frontend y backend" style="width:100%;max-width:640px;display:block;margin:1rem 0" />

### El giro: un stack completo sin servidor propio

Aquí viene la parte liberadora. **Puedes publicar un producto completo sin gestionar nunca tu propio backend ni base de datos.** En su lugar, delegas los trabajos del backend a *servicios gestionados* que otros operan:

- ¿Necesitas recibir un mensaje de un formulario de contacto? → **Web3Forms** lo hace.
- ¿Necesitas algo un poco más inteligente, como una respuesta por correo personalizada? → **Google Apps Script** lo hace.

Tu sitio sigue siendo un conjunto de archivos frontend estáticos, y el "backend" se convierte en un par de llamadas a APIs a servicios que gestionan los servidores por ti. Esa es la fórmula — y es la siguiente.

<!-- slug: 03 -->
## La fórmula — tu stack para publicar rápido

Cada herramienta de abajo es **gratuita para empezar** y hace exactamente **un trabajo**. Juntas forman una cadena completa desde "idea" hasta "sitio web en vivo."

| Trabajo | Herramienta | Rol en una línea |
|---------|-------------|------------------|
| **Base de código** | **GitHub** | Almacena tu código y su historial; la única fuente de verdad |
| **Despliegue** | **Vercel** | Observa GitHub y publica tu sitio en una URL pública automáticamente |
| **Formularios simples** | **Web3Forms** | Convierte un formulario HTML en correos en tu bandeja — sin backend |
| **Formularios/lógica avanzados** | **Google Apps Script** | Un backend programable diminuto que puede enviar correos desde *tu* Gmail |

### Cómo se conectan

<img src="figs/webapp/diagram-formula-stack-es.svg" alt="El stack de la fórmula y el flujo de trabajo" style="width:100%;max-width:680px;display:block;margin:1rem 0" />

El bucle en el que vivirás: **editar localmente → push a GitHub → Vercel redespiega → comprobar la URL en vivo.** Los formularios se añaden una vez que la página tiene buen aspecto.

> **¿Por qué GitHub *y* Vercel?** GitHub es donde el código *vive*; Vercel es lo que lo *publica*. Cada vez que haces push a GitHub, Vercel reconstruye y redespiega automáticamente — así que "guardar tu trabajo" y "actualizar el sitio" se convierten en la misma acción.

### Una nota sobre Apps Script generando formularios

Google Apps Script no es solo un lugar para *recibir* datos — también puede **generar un Google Form de manera programática** con unas pocas líneas de código. Y como es solo código, **tu herramienta de IA puede escribirlo por ti.** Lo verás en la Unidad 4. Por ahora, guarda la idea: incluso las piezas del "backend" de este taller son cosas que puedes describir a una IA y tener escritas.

En la siguiente unidad sentamos las bases: GitHub, Vercel y tu entorno de construcción local.

<!-- slug: 04 -->
## GitHub — tu código y una web gratuita al instante

**GitHub** es donde vive tu código. Piénsalo como Google Drive para código, con memoria perfecta: cada cambio se guarda como una instantánea a la que puedes volver.

> **No vamos a guiarte por el registro en GitHub.** Cambia con frecuencia y está bien documentado. Crea una cuenta gratuita en [github.com](https://github.com) y vuelve. Lo único que debes hacer aquí es **crear un repositorio** (un "repo" — una carpeta de proyecto que GitHub rastrea).

### Crea tu repositorio

Cuando crees un repo, dale un nombre, hazlo **Público**, y marca **"Add a README file"** para que no esté vacío. Listo — ya tienes una base de código, aunque todavía no haya nada en ella.

### El truco mágico: una web gratuita a partir de tu nombre de usuario

GitHub tiene un regalo oculto llamado **GitHub Pages**. Hay un nombre de repositorio especial que publica un sitio web *automáticamente*:

```
Un repo llamado exactamente:  tu-usuario.github.io
se convierte en un sitio en: https://tu-usuario.github.io
```

Si tu nombre de usuario de GitHub es `marialopez`, crea un repo llamado **`marialopez.github.io`**, pon un `index.html` en él, y en un minuto ese archivo es un sitio web público. Sin configuración, sin botón de despliegue.

> **Pruébalo ahora (opcional pero divertido):** crea tu repo `usuario.github.io`, añade un `index.html` de una línea que diga *"Hola, mundo — sitio en construcción"* y visita la URL. Ver tu propio nombre resolverse en una página web real es el momento en que todo encaja.

Este es el despliegue más sencillo posible. En la siguiente lección usamos **Vercel**, que ofrece la misma publicación automática para *cualquier* repo (no solo el de nombre especial) más algunas comodidades adicionales.

<!-- slug: 05 -->
## Vercel — despliega en dos clics

**Vercel** es un servicio de hosting que se conecta a GitHub y **publica tu sitio por ti**. La propuesta: nunca tocas un servidor, y cada push a GitHub actualiza el sitio en vivo en segundos.

> **No haremos un recorrido por las funciones de Vercel.** Solo necesitas el camino directo que viene a continuación.

### La configuración completa, de principio a fin

1. Ve a [vercel.com](https://vercel.com) y **regístrate con tu cuenta de GitHub** (es el camino más fácil — los vincula automáticamente).
2. Vercel te pedirá **permiso para acceder a tus repositorios de GitHub**. Concédelo — puedes limitarlo a repositorios específicos si lo prefieres.
3. Haz clic en **"Add New… → Project"**, busca tu repositorio en la lista y haz clic en **Import**.
4. Deja cada configuración en su valor predeterminado y haz clic en **Deploy**.

Listo. Tras unos segundos obtienes una URL pública:

```
https://nombre-de-tu-repo.vercel.app
```

### Qué acaba de ocurrir — y por qué importa

Vercel ahora está **vigilando tu repositorio**. A partir de ahora, cada vez que hagas push de un cambio a GitHub, Vercel reconstruye y redespiega automáticamente. Esto se llama **despliegue continuo**, y es el superpoder silencioso de todo este taller:

<img src="figs/webapp/diagram-continuous-deploy-es.svg" alt="Flujo de despliegue continuo" style="width:100%;max-width:620px;display:block;margin:1rem 0" />

Nunca volverás a hacer clic en "desplegar". **Hacer push de tu código *es* desplegarlo.** Mantén esa URL `*.vercel.app` abierta en una pestaña — la refrescarás constantemente mientras construyes.

<!-- slug: 06 -->
## El taller local — GitHub Desktop + una herramienta de IA

*Podrías* editar archivos directamente en el sitio web de GitHub, pero la forma cómoda de trabajar es **en tu propio ordenador**, con dos herramientas una al lado de la otra:

- **GitHub Desktop** — una aplicación gráfica amigable que mueve cambios entre tu ordenador y GitHub. Sin memorizar comandos.
- **Tu herramienta de IA** — Cursor, Claude Code, Antigravity, Codex, la que tengas. Esta es la que realmente escribe el código.

### Conecta una copia local con GitHub Desktop

1. Instala **GitHub Desktop** desde [desktop.github.com](https://desktop.github.com) e inicia sesión con tu cuenta de GitHub.
2. Elige **File → Clone repository**, selecciona el repo que creaste y elige una carpeta en tu ordenador donde guardarlo.
3. Ahora tienes una **carpeta local** vinculada a GitHub. Los archivos que cambies aquí pueden enviarse ("push") con un clic.

> **Tres palabras que usarás todo el día.** **Commit** = guardar una instantánea etiquetada de tus cambios. **Push** = enviar tus commits a GitHub (lo que activa Vercel). **Pull** = traer los cambios hechos en otro lugar (p. ej., desde tu móvil). GitHub Desktop tiene un botón grande para cada uno.

### Apunta tu herramienta de IA a la carpeta

Abre esa misma carpeta local en tu herramienta de IA:

- **Cursor / aplicaciones estilo VS Code:** *File → Open Folder* y selecciona la carpeta clonada.
- **Claude Code / Codex (terminal):** abre un terminal *en* esa carpeta y lanza la herramienta desde ahí.

Ahora la IA puede ver tu proyecto desde dentro — leer los archivos, crear nuevos y editarlos siguiendo tus instrucciones. Todo está en su lugar. En la siguiente unidad, construyes.

<!-- slug: 07 -->
## Construye tu landing page con un prompt

Hora de crear la página. El truco para un gran primer resultado es **darle contexto a la IA**, no solo una frase. Si tu proyecto está descrito en un documento, entrégaselo.

### Tu primer prompt

En tu herramienta de IA, prueba algo como:

```
Crea un sitio de una sola página para el proyecto descrito
en el documento adjunto. Usa solo index.html, styles.css
y app.js — sin frameworks, sin pasos de compilación.
Incluye una sección hero con el nombre y eslogan del proyecto,
una sección "Acerca de", una sección "Características" y una
sección "Contacto" vacía que rellenaremos después.
Hazlo limpio, moderno y responsivo.
```

Adjunta el **PDF** de tu proyecto (la mayoría de las herramientas de IA permiten arrastrar un archivo). Cuanto más diga el documento sobre tu proyecto, mejor quedará la página.

> **La regla de oro del prompting: sé específico.** "Ponlo bonito" no le da a la IA ningún objetivo. Nombra las secciones que quieres, el estilo que buscas ("calmado y minimalista", "audaz y lúdico") y las restricciones ("solo HTML/CSS/JS, sin frameworks"). Entrada específica, salida específica.

### Pruébala localmente

Una vez que la IA escriba los archivos, tendrás un `index.html` en tu carpeta. **Ábrelo en el navegador** para ver tu página:

- Haz doble clic en `index.html`, **o bien**
- en muchos editores de IA, haz clic derecho y elige *"Open with Live Server"* / *"Open in browser"*.

Mírala de manera crítica. ¿Demasiado comprimida? ¿Colores incorrectos? ¿El texto del hero no es lo suficientemente impactante? **No lo corrijas a mano — describe el cambio y deja que lo haga la IA:**

```
El hero es demasiado sencillo. Pon un fondo con un gradiente suave
en el color de marca del proyecto, aumenta el tamaño del título y
añade un botón de llamada a la acción que lleve a la sección Contacto.
```

Repite hasta que la página se vea bien *localmente*. Aún no has publicado nada — eso es la siguiente lección, donde esto se convierte en un ritmo.

<!-- slug: 08 -->
## El bucle — prompt, prueba, commit, push, verifica

Este es el latido de todo el taller. Una vez que sea memoria muscular, podrás construir cualquier cosa.

<img src="figs/webapp/diagram-loop-es.svg" alt="El bucle prompt-prueba-commit-push-verifica" style="width:100%;max-width:680px;display:block;margin:1rem 0" />

### Una vuelta completa

1. **Prompt** — pide a la IA un cambio enfocado ("añade un pie de página con mis redes sociales").
2. **Prueba** — recarga `index.html` en el navegador. ¿Contento? Continúa. ¿No? Haz otro prompt.
3. **Commit** — en **GitHub Desktop** verás los archivos cambiados. Escribe un mensaje corto como *"Añade pie de página con redes sociales"* y haz clic en **Commit to main**.
4. **Push** — haz clic en **Push origin**. Tu código ya está en GitHub.
5. **Verifica** — espera unos segundos y recarga tu URL `tu-repo.vercel.app`. Tu cambio está en vivo para el mundo.

Luego vuelve a empezar. Y otra vez.

> **Commits pequeños, commits frecuentes.** Cada commit es un punto de guardado al que puedes volver. Si un cambio empeora las cosas, puedes revertir al último commit bueno. Los commits pequeños y bien etiquetados son un regalo para tu yo futuro.

> **¿Por qué probar *antes* de hacer push?** Hacer push publica. Detectar un problema localmente (en el paso 2) mantiene los errores fuera del sitio en vivo. La "verificación" en vivo del paso 5 es tu confirmación final, no tu primera vista.

Sigue en el bucle hasta que tu landing page sea exactamente lo que quieres. Cuando la página en sí esté lista, queda una cosa para hacerla *útil*: una forma de que los visitantes te contacten.

<!-- slug: 09 -->
## Añade un formulario de contacto con Web3Forms

Una landing page a la que nadie puede responder es un cartel. Añadamos un **formulario de contacto** — y hagámoslo con **cero backend**, usando **Web3Forms**.

### Cómo funciona Web3Forms

Normalmente, un formulario necesita un servidor para recibir lo que la gente escribe. Web3Forms *es* ese servidor, gestionado por ellos. Le das a tu formulario una **clave de acceso** secreta, y Web3Forms envía cada envío directamente a tu bandeja de entrada.

1. Ve a [web3forms.com](https://web3forms.com), introduce el correo donde quieres recibir mensajes, y recibirás una **Clave de Acceso** gratuita (una cadena larga).
2. Dásela a tu herramienta de IA y pídele que conecte la sección Contacto:

```
En la sección Contacto, añade un formulario (nombre, email, mensaje)
que envíe datos a Web3Forms usando mi clave de acceso:
TU-CLAVE-DE-ACCESO-AQUÍ.
Muestra un mensaje amigable "¡Gracias, me pongo en contacto pronto!"
tras un envío exitoso, y mantén el estilo coherente con la página.
```

La IA producirá un formulario HTML estándar cuya `action` apunta al endpoint de Web3Forms, con tu clave en un campo oculto. Lo esencial tiene este aspecto:

```html
<form action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="TU-CLAVE-DE-ACCESO-AQUÍ">
  <input type="text"  name="name"    placeholder="Tu nombre"   required>
  <input type="email" name="email"   placeholder="Tu email"    required>
  <textarea          name="message" placeholder="Tu mensaje"   required></textarea>
  <button type="submit">Enviar</button>
</form>
```

### Prueba todo el pipeline

Ejecuta el bucle una vez más: **commit → push → verifica**, luego abre el sitio en vivo y **envíate un mensaje de prueba**. Cuando llegue a tu bandeja, habrás publicado una funcionalidad *full-stack* — un formulario frontend hablando con un backend gestionado — sin haber ejecutado ningún servidor.

> **¿Adónde fue el "backend"?** Son los servidores de Web3Forms, no los tuyos. Esta es la fórmula sin servidor de la Unidad 1, hecha realidad: el trabajo de base de datos y servidor se delega a una API gestionada.

Ya tienes un sitio web completo, funcional y al que se puede contactar. Todo lo que sigue es **más potencia**.

<!-- slug: 10 -->
## Mantén tu sitio desde el móvil

Todo tu flujo de trabajo vive en GitHub — lo que significa que puedes ejecutarlo desde un móvil. ¿Ves un error tipográfico en el autobús? Corrígelo antes de llegar a tu parada.

### El kit del móvil

- La **app de GitHub** (iOS/Android) te permite explorar archivos, editarlos y — crucialmente — abrir y fusionar **Pull Requests**.
- Varias herramientas de IA ya ofrecen una **app móvil o web** que puede hacer cambios en tu repo con un prompt. (Claude Code, por ejemplo, puede correr desde la web y proponer cambios como un Pull Request.)

### ¿Qué es un Pull Request?

Un **Pull Request (PR)** es un conjunto de cambios propuestos, separado de tu código en vivo hasta que lo apruebes. Es la forma segura de cambiar cosas cuando no estás en tu escritorio:

<img src="figs/webapp/diagram-pull-request-es.svg" alt="Flujo de un pull request" style="width:100%;max-width:640px;display:block;margin:1rem 0" />

### El bucle de bolsillo

1. Desde tu móvil, pide a tu herramienta de IA (o edita directamente en la app de GitHub) un cambio pequeño — *"cambia el eslogan a '…'"*.
2. La herramienta abre un **Pull Request** con el cambio.
3. Abre el PR en la app de GitHub, echa un vistazo a lo que cambió y pulsa **Merge**.
4. Fusionar actualiza tu rama `main` → Vercel redespiega → el sitio en vivo refleja tu edición, todo desde tu bolsillo.

> **¿Por qué un PR en lugar de editar `main` directamente?** En movimiento, no puedes previsualizar fácilmente en local. Un PR te da un momento para *mirar antes de saltar* — y una forma limpia de descartar el cambio si está mal.

<!-- slug: 11 -->
## Conviértelo en una app — añádela a la pantalla de inicio

Recuerda el título: sitio web *y* **app** web. Aquí es donde llega la "app". Tu sitio es solo una URL — pero con un toque en el móvil puedes darle un **icono en la pantalla de inicio** que se abre a pantalla completa, sin barra de direcciones, exactamente como una app nativa que descargarías de una tienda. Sin tienda, sin archivo de instalación, sin código adicional.

> **Por qué funciona esto.** Un sitio web moderno *es* una app. Los móviles pueden "instalar" cualquier página web como un acceso directo que se lanza en su propia ventana. Esto es el lado ligero de lo que la industria llama **Progressive Web App (PWA)**.

### En iPhone / iPad (usa **Safari**)

La opción de pantalla de inicio solo aparece en el navegador propio de Apple, así que debe hacerse en **Safari** — no en Chrome ni en otra app.

1. Abre **Safari** y ve a tu sitio en vivo (`https://tu-repo.vercel.app`).
2. Pulsa el botón **Compartir** (el cuadrado con una flecha hacia arriba) en la barra de herramientas.
3. Desplázate hacia abajo y pulsa **Añadir a pantalla de inicio**.
4. Edita el nombre si quieres y pulsa **Añadir**.

Ahora hay un icono en tu pantalla de inicio. Al pulsarlo, tu sitio se lanza a pantalla completa.

### En Android (usa **Chrome**)

1. Abre **Chrome** y ve a tu sitio en vivo.
2. Pulsa el menú **⋮** (tres puntos, arriba a la derecha).
3. Pulsa **Añadir a pantalla de inicio** (puede decir **Instalar app**).
4. Confirma el nombre y pulsa **Añadir** / **Instalar**.

> **Atención:** la redacción varía entre versiones de sistema operativo y navegador, y **se requiere el navegador nativo** — Safari en iOS, Chrome en Android. Si no ves la opción, probablemente estés en el navegador equivocado o en un navegador dentro de una app (como el de Instagram).

### Haz que el icono y el nombre queden bien (opcional)

Por defecto, el icono es una captura de tu página. Para controlar cómo se ve la app instalada — un icono propio, un nombre, un color de lanzamiento — tu sitio necesita dos pequeñas cosas, y **tu herramienta de IA puede añadirlas por ti**:

- un **manifiesto de web app** (`site.webmanifest`) que describe el nombre, el icono y el color de tema;
- un **apple-touch-icon** (un PNG cuadrado) para que iOS use *tu* logotipo.

Un prompt como este es suficiente:

```
Añade un manifiesto de web app y un apple-touch-icon para que
mi sitio se instale bien en la pantalla de inicio del móvil.
Usa mi logo (logo.png) como icono, pon el nombre de la app
a "<tu proyecto>" y el color de tema <tu color de marca>.
Enlázalos correctamente en index.html.
```

Commit, push, verifica — luego vuelve a añadirlo a la pantalla de inicio para ver tu propio icono. Ahora tienes un sitio web que *también* vive en tu bolsillo como una app.

<!-- slug: 12 -->
## Un backend más inteligente — Google Apps Script

Web3Forms es perfecto para "envíame un mensaje." Pero a veces quieres **lógica**: enviar al visitante una respuesta automática, guardar los envíos en una hoja de cálculo, o crear un formulario personalizado. Para eso, conoce **Google Apps Script** — un backend diminuto y gratuito que vive dentro de tu cuenta de Google.

### Qué es

**Google Apps Script** te permite ejecutar pequeños programas JavaScript en los servidores de Google, con acceso integrado a tu Gmail, Google Sheets, Google Forms y más. Desplegado como **Web App**, un script se convierte en una URL a la que tu página puede enviar datos — un endpoint backend genuino, sin ningún servidor que gestionar.

<img src="figs/webapp/diagram-apps-script-es.svg" alt="Abanico de Google Apps Script" style="width:100%;max-width:560px;display:block;margin:1rem 0" />

### Dos cosas que desbloquea

**1. Responde desde tu propio Gmail.** Un script puede leer los datos enviados y llamar a `MailApp.sendEmail(...)` para enviar una confirmación **desde tu dirección de Gmail** — algo que una página estática no puede hacer por sí sola.

**2. Puede generar formularios por código.** Apps Script puede construir un **Google Form programáticamente** con unas pocas líneas:

```javascript
function crearFormulario() {
  const form = FormApp.create('Registro al Proyecto');
  form.addTextItem().setTitle('Tu nombre');
  form.addTextItem().setTitle('Tu email');
  form.addParagraphTextItem().setTitle('Cuéntame sobre tu proyecto');
  Logger.log('URL del formulario: ' + form.getPublishedUrl());
}
```

Y como eso es *solo código*, **tu herramienta de IA puede escribirlo por ti.** Describe el formulario que quieres — "un formulario de registro con nombre, email y un campo de mensaje, y que me envíe cada respuesta por correo" — y deja que la IA produzca el script. Lo pegas en [script.google.com](https://script.google.com), lo ejecutas una vez para conceder permisos, y lo despliegas.

> **Web3Forms vs Apps Script — cuándo usar cuál.** Usa **Web3Forms** cuando solo necesitas mensajes en tu bandeja (5 minutos, sin código). Usa **Apps Script** cuando necesitas *comportamiento* — respuestas automáticas, guardar en una hoja de cálculo, o generar formularios — y no te importa un poco de código escrito por IA.

<!-- slug: 13 -->
## Resumen y próximos pasos

Empezaste con nada y terminaste con un **sitio web en vivo y contactable que construiste orquestando IA.** Conserva el modelo mental — escala a cosas mucho más grandes.

### El modelo que debes conservar

<img src="figs/webapp/diagram-recap-es.svg" alt="Resumen del modelo mental full-stack" style="width:100%;max-width:640px;display:block;margin:1rem 0" />

Todo el taller es realmente **un bucle y unos pocos servicios gestionados.** Domina el bucle y podrás construir casi cualquier cosa cambiando las piezas por otras más capaces.

### La lista de lo que completaste

- ✅ Creaste un repositorio en **GitHub** (y conociste el truco del sitio gratuito con `usuario.github.io`)
- ✅ Conectaste **Vercel** para el despliegue automático en cada push
- ✅ Trabajaste localmente con **GitHub Desktop** + una **herramienta de IA**
- ✅ Construiste una landing page a partir de un prompt y un documento del proyecto
- ✅ Viviste el bucle **prompt → prueba → commit → push → verifica**
- ✅ Añadiste un formulario de contacto con **Web3Forms** — un backend sin servidor
- ✅ Aprendiste a mantener el sitio **desde el móvil** mediante Pull Requests
- ✅ Instalaste el sitio como **app en la pantalla de inicio del móvil**
- ✅ Conociste **Google Apps Script** para backends más inteligentes generados por IA

### Próximos peldaños

- **Un dominio personalizado.** Compra un nombre (p. ej., en Namecheap o Cloudflare) y apúntalo a tu proyecto en Vercel — `tuproyecto.com` en lugar de `*.vercel.app`.
- **Un backend real, cuando lo necesites.** Las bases de datos gestionadas y las funciones serverless (Supabase, Firebase, Vercel Functions) son el siguiente escalón respecto a Web3Forms y Apps Script.
- **Sigue leyendo el código.** Cada vez que la IA escriba algo, échale un vistazo y pregúntate *"¿por qué?"*. Estarás escribiendo el tuyo propio antes de que te des cuenta.

> **La conclusión.** La barrera para publicar software ya no es *escribir código* — es *saber qué pedir y saber juzgar lo que recibes.* Ahora tienes ambas cosas. Ve a construir lo que tienes en mente.
