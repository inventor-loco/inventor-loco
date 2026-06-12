// Single-source CV text: fetches cv-master.md and injects canonical fragments
// into elements marked with data-cv. The text lives ONLY in cv-master.md.
(function () {
  fetch('cv-master.md')
    .then(function (r) { return r.ok ? r.text() : Promise.reject(r.status); })
    .then(function (md) {
      // Profile summary: the blockquote under "## 2. Profile summary"
      var m = md.match(/##\s*2\.\s*Profile summary[\s\S]*?((?:^>.*$\n?)+)/m);
      if (m) {
        var text = m[1].replace(/^>\s?/gm, '').replace(/\s+/g, ' ').trim();
        document.querySelectorAll('[data-cv="summary"]').forEach(function (el) {
          el.textContent = text;
        });
      }
    })
    .catch(function (e) { console.warn('cv-master.md not loaded:', e); });
})();
