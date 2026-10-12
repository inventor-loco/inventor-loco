// Logo carousel of co-author institutions on publications.html.
//
// Same component as the collaborators carousel on cv.html (styles in
// styles/main-pages.css), but filled from window.COLLAB_DATA (data/affiliations.js,
// built by scripts/build-affiliations.mjs), so it always matches the map.
// Logos come from the "logos" section of data/affiliations-manual.json;
// institutions without one show their name instead.
(function () {
  var track = document.getElementById('collab-logos-track');
  var data = window.COLLAB_DATA;
  if (!track || !data) return;

  function label(inst) {
    var es = document.documentElement.lang === 'es';
    var n = inst.count;
    return inst.name + ' · ' + n + (es ? (n === 1 ? ' publicación conjunta' : ' publicaciones conjuntas')
                                      : (n === 1 ? ' joint paper' : ' joint papers'));
  }

  // Home institution first, then by number of joint papers.
  var insts = data.institutions.slice().sort(function (a, b) {
    return (b.id === data.home) - (a.id === data.home) || b.count - a.count;
  });

  function item(inst, hidden) {
    var el = document.createElement('div');
    el.className = 'lc-item' + (inst.logo ? '' : ' no-logo');
    if (hidden) el.setAttribute('aria-hidden', 'true');
    var name = document.createElement('span');
    name.className = 'lc-name';
    name.textContent = inst.name;
    if (inst.logo) {
      var img = document.createElement('img');
      img.src = inst.logo;
      img.alt = hidden ? '' : inst.name;
      img.loading = 'lazy';
      if (inst.logo_light) img.className = 'is-light';
      img.onerror = function () { el.classList.add('no-logo'); img.remove(); };
      el.appendChild(img);
    }
    el.appendChild(name);
    el.title = label(inst);
    return el;
  }

  // Two copies so the -50% translate loops seamlessly; the copy is hidden from screen readers.
  insts.forEach(function (i) { track.appendChild(item(i, false)); });
  insts.forEach(function (i) { track.appendChild(item(i, true)); });
  // Keep roughly the CV carousel's pace (40s for 14 logos) whatever the count.
  track.style.animationDuration = Math.round(insts.length * 2.9) + 's';

  document.addEventListener('sitelangchange', function () {
    var els = track.children;
    for (var k = 0; k < els.length; k++) els[k].title = label(insts[k % insts.length]);
  });
})();
