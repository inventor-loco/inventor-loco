// Renders bio.html from /bio.json. The hero tagline is filled by site-lang.js
// (data-bio="tagline"); this script fills the copy blocks and the structured
// sections, and re-renders when the EN/ES toggle fires sitelangchange.
(function () {
  var bio = null;

  function lang() {
    return document.documentElement.lang === 'es' ? 'es' : 'en';
  }

  function L(value) {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    var text = lang() === 'es' ? value.es : value.en;
    if (text) return text;
    return value.en || value.es || '';
  }

  function words(text) {
    var trimmed = (text || '').trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function copyText(text) {
    function legacy() {
      return new Promise(function (resolve, reject) {
        var area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.left = '-9999px';
        document.body.appendChild(area);
        area.select();
        try {
          if (!document.execCommand('copy')) throw new Error('copy failed');
          resolve();
        } catch (err) {
          reject(err);
        } finally {
          document.body.removeChild(area);
        }
      });
    }
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(legacy);
    }
    return legacy();
  }

  function copyButton(label, text) {
    var btn = el('button', 'tiny-btn', label);
    btn.type = 'button';
    btn.addEventListener('click', function () {
      var previous = btn.textContent;
      copyText(text).then(function () {
        btn.textContent = lang() === 'es' ? 'Copiado' : 'Copied';
        window.setTimeout(function () { btn.textContent = previous; }, 1400);
      }).catch(function () {
        btn.textContent = lang() === 'es' ? 'No se pudo copiar' : 'Copy failed';
        window.setTimeout(function () { btn.textContent = previous; }, 1600);
      });
    });
    return btn;
  }

  var ui = {
    en: {
      textsKicker: 'Copy-ready',
      texts: 'Texts',
      tagline: 'Tagline',
      short: 'Short bio',
      medium: 'Medium bio',
      long: 'Long bio',
      copyEn: 'Copy English',
      copyEs: 'Copy Spanish',
      positionsKicker: 'Appointments',
      positions: 'Positions',
      current: 'Current',
      incoming: 'Incoming',
      educationKicker: 'Degrees',
      education: 'Education',
      interestsKicker: 'Topics',
      interests: 'Research interests',
      linksKicker: 'Profiles',
      links: 'Links',
      supervisor: 'Memoria supervisor: ',
      nationality: function (list) { return list.join(' and ') + ' nationality.'; }
    },
    es: {
      textsKicker: 'Listo para copiar',
      texts: 'Textos',
      tagline: 'Eslogan',
      short: 'Biografía corta',
      medium: 'Biografía media',
      long: 'Biografía larga',
      copyEn: 'Copiar inglés',
      copyEs: 'Copiar español',
      positionsKicker: 'Cargos',
      positions: 'Cargos',
      current: 'Actuales',
      incoming: 'Próximo',
      educationKicker: 'Títulos',
      education: 'Formación',
      interestsKicker: 'Temas',
      interests: 'Intereses de investigación',
      linksKicker: 'Perfiles',
      links: 'Enlaces',
      supervisor: 'Dirección de la memoria: ',
      nationality: function (list) { return 'Nacionalidad ' + list.join(' y ') + '.'; }
    }
  };

  function T() {
    return ui[lang()];
  }

  function safeUrl(url) {
    return typeof url === 'string' && /^(https:\/\/|mailto:)/.test(url) ? url : '';
  }

  function renderTexts(root) {
    var t = T();
    var blocks = [
      { title: t.tagline, value: bio.tagline },
      { title: t.short, value: bio.bios && bio.bios.short },
      { title: t.medium, value: bio.bios && bio.bios.medium },
      { title: t.long, value: bio.bios && bio.bios.long }
    ];
    clear(root);
    root.hidden = false;
    root.appendChild(el('div', 'section-kicker', t.textsKicker));
    root.appendChild(el('h2', null, t.texts));
    blocks.forEach(function (block) {
      if (!block.value) return;
      var english = typeof block.value === 'string' ? block.value : (block.value.en || '');
      var spanish = typeof block.value === 'string' ? block.value : (block.value.es || '');
      var card = el('article', 'card');
      card.style.marginTop = '1rem';
      card.appendChild(el('div', 'card-kicker', 'EN ' + words(english) + ' · ES ' + words(spanish)));
      card.appendChild(el('h3', null, block.title));
      var body = el('p', 'bio-text', L(block.value));
      card.appendChild(body);
      var actions = el('div', 'hero-actions bio-actions');
      if (english) actions.appendChild(copyButton(t.copyEn, english));
      if (spanish) actions.appendChild(copyButton(t.copyEs, spanish));
      card.appendChild(actions);
      root.appendChild(card);
    });
  }

  function timeline(items, mapRow) {
    var list = el('div', 'timeline');
    (items || []).forEach(function (item) {
      var row = el('div', 'timeline-row');
      row.appendChild(el('div', 'year', L(item.dates)));
      row.appendChild(mapRow(item));
      list.appendChild(row);
    });
    return list;
  }

  function renderPositions(root) {
    var t = T();
    var current = (bio.positions && bio.positions.current) || [];
    var incoming = (bio.positions && bio.positions.incoming) || [];
    clear(root);
    root.hidden = false;
    root.appendChild(el('div', 'section-kicker', t.positionsKicker));
    root.appendChild(el('h2', null, t.positions));
    if (current.length) {
      root.appendChild(el('h3', 'bio-subhead', t.current));
      root.appendChild(timeline(current, positionBody));
    }
    if (incoming.length) {
      root.appendChild(el('h3', 'bio-subhead', t.incoming));
      root.appendChild(timeline(incoming, positionBody));
    }
    var names = (bio.nationality || []).map(L).filter(Boolean);
    if (names.length) {
      var note = el('p', 'muted', T().nationality(names));
      note.style.marginTop = '1rem';
      root.appendChild(note);
    }
  }

  function positionBody(item) {
    var body = el('div');
    body.appendChild(el('div', 'timeline-title', L(item.role)));
    var org = [item.organization, L(item.department), L(item.location)].filter(Boolean).join(' · ');
    if (org) body.appendChild(el('div', 'timeline-org', org));
    var summary = L(item.summary);
    if (summary) body.appendChild(el('p', 'timeline-desc', summary));
    return body;
  }

  function renderEducation(root) {
    var t = T();
    clear(root);
    root.hidden = false;
    root.appendChild(el('div', 'section-kicker', t.educationKicker));
    root.appendChild(el('h2', null, t.education));
    var list = el('div', 'timeline');
    list.style.marginTop = '1.1rem';
    (bio.education || []).forEach(function (item) {
      var row = el('div', 'timeline-row');
      row.appendChild(el('div', 'year', L(item.dates)));
      var body = el('div');
      body.appendChild(el('div', 'timeline-title', L(item.credential)));
      var org = [item.organization, L(item.location)].filter(Boolean).join(' · ');
      if (org) body.appendChild(el('div', 'timeline-org', org));
      var bits = [];
      if (L(item.notes)) bits.push(L(item.notes));
      if (item.supervisor && item.supervisor.name) bits.push(t.supervisor + item.supervisor.name + '.');
      if (bits.length) body.appendChild(el('p', 'timeline-desc', bits.join(' ')));
      row.appendChild(body);
      list.appendChild(row);
    });
    root.appendChild(list);
  }

  function renderInterests(root) {
    var t = T();
    clear(root);
    root.hidden = false;
    root.appendChild(el('div', 'section-kicker', t.interestsKicker));
    root.appendChild(el('h2', null, t.interests));
    var tags = el('div', 'tag-row');
    (bio.research_interests || []).forEach(function (item) {
      var label = L(item);
      if (label) tags.appendChild(el('span', 'tag', label));
    });
    root.appendChild(tags);
    if (bio.languages && bio.languages.length) {
      var line = bio.languages.map(function (item) {
        var name = L(item);
        var level = L(item.level);
        return level ? name + ' (' + level + ')' : name;
      }).join(' · ');
      var note = el('p', 'muted', line);
      note.style.marginTop = '0.9rem';
      root.appendChild(note);
    }
  }

  function renderLinks(root) {
    var t = T();
    clear(root);
    root.hidden = false;
    root.appendChild(el('div', 'section-kicker', t.linksKicker));
    root.appendChild(el('h2', null, t.links));
    var list = el('div', 'mini-list');
    list.style.marginTop = '1.1rem';
    Object.keys(bio.links || {}).forEach(function (key) {
      var item = bio.links[key];
      var href = safeUrl(item && item.url);
      if (!href) return;
      var row = el('div', 'mini-item');
      row.appendChild(el('div', 'mini-k', L(item.label) || key));
      var value = el('div', 'mini-v');
      var anchor = document.createElement('a');
      anchor.href = href;
      anchor.textContent = href.replace(/^mailto:/, '');
      if (href.indexOf('https://') === 0) {
        anchor.target = '_blank';
        anchor.rel = 'noopener';
      }
      value.appendChild(anchor);
      row.appendChild(value);
      list.appendChild(row);
    });
    root.appendChild(list);
  }

  function renderTodos() {
    var root = document.getElementById('bio-todos');
    var list = document.getElementById('bio-todo-list');
    if (!root || !list || !bio.todos || !bio.todos.length) return;
    clear(list);
    bio.todos.forEach(function (item) {
      var li = document.createElement('li');
      li.textContent = item.text || '';
      if (item.id) li.setAttribute('data-todo', item.id);
      list.appendChild(li);
    });
    root.hidden = false;
  }

  function render() {
    if (!bio) return;
    var texts = document.getElementById('bio-texts');
    var positions = document.getElementById('bio-positions');
    var education = document.getElementById('bio-education');
    var interests = document.getElementById('bio-interests');
    var links = document.getElementById('bio-links');
    if (texts) renderTexts(texts);
    if (positions) renderPositions(positions);
    if (education) renderEducation(education);
    if (interests) renderInterests(interests);
    if (links) renderLinks(links);
    renderTodos();
  }

  document.addEventListener('sitelangchange', render);

  fetch('bio.json')
    .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
    .then(function (data) {
      bio = data;
      render();
    })
    .catch(function (err) {
      console.warn('bio.json not loaded:', err);
    });
})();
