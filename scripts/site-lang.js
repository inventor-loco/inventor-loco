// Site-wide EN/ES language switching.
//
// Any element carrying a data-es attribute has its English innerHTML preserved
// (captured into data-en on first switch) and swapped for the Spanish text when
// Spanish is selected. Buttons marked data-lang-btn="en|es" drive
// window.setSiteLang() and reflect the active language. The choice is stored in
// localStorage under 'site-lang' (falling back to the legacy 'cv-lang' key) so
// it persists across pages and reloads.
//
// On the CV pages the profile summary text lives ONLY in the cv-master markdown
// files (cv-master.md / cv-master-es.md) and is injected into elements marked
// data-cv="summary". That fetch only runs when such an element is present, so
// this script is safe to include on every page (including courses/ subpages).
//
// A 'sitelangchange' event (aliased as 'cvlangchange') is dispatched on every
// switch so other scripts (e.g. the course video player) can react.
(function () {
  var STORAGE_KEY = 'site-lang';
  var summaries = {};
  var hasSummary = !!document.querySelector('[data-cv="summary"]');

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
    // Inputs/textareas use placeholder attributes rather than innerHTML.
    document.querySelectorAll('[data-es-placeholder]').forEach(function (el) {
      if (el.getAttribute('data-en-placeholder') === null) {
        el.setAttribute('data-en-placeholder', el.getAttribute('placeholder') || '');
      }
      el.setAttribute('placeholder',
        (lang === 'es') ? el.getAttribute('data-es-placeholder') : el.getAttribute('data-en-placeholder'));
    });
  }

  window.setSiteLang = function (lang) {
    lang = (lang === 'es') ? 'es' : 'en';
    document.documentElement.lang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    applyDataLang(lang);
    if (hasSummary) applySummary(lang);
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      var on = b.getAttribute('data-lang-btn') === lang;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    document.dispatchEvent(new CustomEvent('sitelangchange', { detail: { lang: lang } }));
    document.dispatchEvent(new CustomEvent('cvlangchange', { detail: { lang: lang } }));
  };

  // Backward-compatible alias for existing inline handlers.
  window.cvSetLang = window.setSiteLang;

  var stored;
  try {
    stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('cv-lang');
  } catch (e) {}
  var initial = (stored === 'es') ? 'es' : 'en';

  if (hasSummary) {
    Promise.all([
      loadSummary('en', 'cv-master.md'),
      loadSummary('es', 'cv-master-es.md')
    ]).then(function () { window.setSiteLang(initial); });
  } else {
    window.setSiteLang(initial);
  }
})();
