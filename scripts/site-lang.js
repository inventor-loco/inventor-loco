// Site-wide EN/ES language switching.
//
// Any element carrying a data-es attribute has its English innerHTML preserved
// (captured into data-en on first switch) and swapped for the Spanish text when
// Spanish is selected. Buttons marked data-lang-btn="en|es" drive
// window.setSiteLang() and reflect the active language. The choice is stored in
// localStorage under 'site-lang' (falling back to the legacy 'cv-lang' key) so
// it persists across pages and reloads.
//
// The public bio lives ONLY in /bio.json. Elements marked data-bio="tagline"
// (or "short", "medium", "long") and the CV profile elements marked
// data-cv="summary" are filled from that file. data-cv="summary" uses
// bios.short. The fetch runs only when such an element is present, so this
// script is safe to include on every page (including courses/ subpages).
// A data-es fallback on the same node still applies if bio.json fails to load.
//
// A 'sitelangchange' event (aliased as 'cvlangchange') is dispatched on every
// switch so other scripts (e.g. the course video player) can react.
(function () {
  var STORAGE_KEY = 'site-lang';
  var bio = null;
  var needsBio = !!document.querySelector('[data-bio], [data-cv="summary"]');

  function localized(value, lang) {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (lang === 'es' && value.es) return value.es;
    return value.en || value.es || '';
  }

  function loadBio() {
    return fetch('bio.json')
      .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function (data) { bio = data; })
      .catch(function (e) { console.warn('bio.json not loaded:', e); });
  }

  function applyBio(lang) {
    if (!bio) return;
    document.querySelectorAll('[data-bio]').forEach(function (el) {
      var key = el.getAttribute('data-bio');
      var value = key === 'tagline'
        ? localized(bio.tagline, lang)
        : localized(bio.bios && bio.bios[key], lang);
      if (value) el.textContent = value;
    });
    var summary = localized(bio.bios && bio.bios.short, lang);
    if (!summary) return;
    document.querySelectorAll('[data-cv="summary"]').forEach(function (el) {
      el.textContent = summary;
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
    if (needsBio) applyBio(lang);
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

  // Apply data-es immediately so the page does not wait on the network.
  // When bio.json arrives, apply it on top (CV summary, and any data-bio node).
  window.setSiteLang(initial);
  if (needsBio) {
    loadBio().then(function () { window.setSiteLang(initial); });
  }
})();
