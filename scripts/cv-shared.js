// Single-source CV text + language switching.
//
// Profile summary text lives ONLY in the cv-master markdown files
// (cv-master.md for English, cv-master-es.md for Spanish) and is injected into
// elements marked data-cv="summary".
//
// In-page EN/ES toggle: any element carrying a data-es attribute has its English
// innerHTML preserved (captured into data-en on first switch) and swapped for the
// Spanish text when Spanish is selected. Buttons marked data-lang-btn="en|es"
// drive window.cvSetLang() and reflect the active language. The choice is stored
// in localStorage so it persists across pages and reloads.
(function () {
  var summaries = {};

  function extractSummary(md) {
    var m = md.match(/##\s*2\.[^\n]*\n[\s\S]*?((?:^>.*$\n?)+)/m);
    return m ? m[1].replace(/^>\s?/gm, '').replace(/\s+/g, ' ').trim() : null;
  }

  function loadSummary(lang, file) {
    return fetch(file)
      .then(function (r) { return r.ok ? r.text() : Promise.reject(r.status); })
      .then(function (md) { summaries[lang] = extractSummary(md); })
      .catch(function (e) { console.warn(file + ' not loaded:', e); });
  }

  function applySummary(lang) {
    var text = summaries[lang] || summaries.en;
    if (!text) return;
    document.querySelectorAll('[data-cv="summary"]').forEach(function (el) {
      el.textContent = text;
    });
  }

  function applyDataLang(lang) {
    document.querySelectorAll('[data-es]').forEach(function (el) {
      if (el.getAttribute('data-en') === null) {
        el.setAttribute('data-en', el.innerHTML);
      }
      el.innerHTML = (lang === 'es') ? el.getAttribute('data-es') : el.getAttribute('data-en');
    });
  }

  window.cvSetLang = function (lang) {
    lang = (lang === 'es') ? 'es' : 'en';
    document.documentElement.lang = lang;
    try { localStorage.setItem('cv-lang', lang); } catch (e) {}
    applyDataLang(lang);
    applySummary(lang);
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      var on = b.getAttribute('data-lang-btn') === lang;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    document.dispatchEvent(new CustomEvent('cvlangchange', { detail: { lang: lang } }));
  };

  var stored;
  try { stored = localStorage.getItem('cv-lang'); } catch (e) {}
  var initial = (stored === 'es') ? 'es' : 'en';

  Promise.all([
    loadSummary('en', 'cv-master.md'),
    loadSummary('es', 'cv-master-es.md')
  ]).then(function () { window.cvSetLang(initial); });
})();
