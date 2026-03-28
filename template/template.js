/* ============================================================
   template.js — shared runtime for all Vicente Matus courses
   Depends on: window.COURSE (set by each course-data-*.js)
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. INJECT CSS TOKENS FROM COURSE DATA ───────────────── */
  function applyTokens(course) {
    const root = document.documentElement;
    root.style.setProperty('--accent', course.accent || '#1a56db');
    root.style.setProperty('--acc2',   course.acc2   || '#e8f0fe');
  }

  /* ── 2. BUILD DOM FROM COURSE DATA ──────────────────────────
     Populates:
       #sidebar-badge  .course-badge text
       #sidebar-title  .sidebar-title text
       #sidebar-meta   lesson count
       #lesson-nav     unit labels + lesson items
       #slide-container  one .slide per lesson
       #progress-fill  (width updated on nav)
       document title
  ─────────────────────────────────────────────────────────── */
  function buildDOM(course) {
    document.title = course.title + ' — Vicente Matus Icaza';
    document.getElementById('sidebar-badge').textContent  = course.badge;
    document.getElementById('sidebar-title').textContent  = course.title;

    const flat = flatLessons(course);
    document.getElementById('sidebar-meta').textContent =
      flat.length + ' lessons · Vicente Matus Icaza';

    // back link
    const backLink = document.getElementById('back-link');
    if (backLink) backLink.href = course.backUrl || '../courses.html';

    buildNav(course, flat);
    buildSlides(course, flat);
  }

  function flatLessons(course) {
    const out = [];
    course.units.forEach(unit => {
      unit.lessons.forEach(lesson => {
        out.push({ unitName: unit.name, unitIdx: unit.unitIdx, lesson });
      });
    });
    return out;
  }

  function buildNav(course, flat) {
    const nav = document.getElementById('lesson-nav');
    nav.innerHTML = '';

    let lessonGlobalIdx = 0;
    course.units.forEach((unit) => {
      const label = document.createElement('div');
      label.className = 'unit-label';
      label.textContent = unit.name;
      nav.appendChild(label);

      unit.lessons.forEach((lesson, li) => {
        const a = document.createElement('a');
        a.className = 'lesson-item' + (lessonGlobalIdx === 0 ? ' active' : '');
        a.dataset.idx = lessonGlobalIdx;
        a.innerHTML =
          '<span class="lesson-num">' + String(lessonGlobalIdx + 1).padStart(2, '0') + '</span>' +
          '<span class="lesson-name">' + escHtml(lesson.title) + '</span>';
        a.addEventListener('click', () => goTo(parseInt(a.dataset.idx)));
        nav.appendChild(a);
        lessonGlobalIdx++;
      });
    });
  }

  function buildSlides(course, flat) {
    const container = document.getElementById('slide-container');
    container.innerHTML = '';

    flat.forEach((item, idx) => {
      const unitNum    = course.units.indexOf(
        course.units.find(u => u.name === item.unitName)) + 1;
      const lessonNum  = String(idx + 1).padStart(2, '0');
      const total      = flat.length;
      const lesson     = item.lesson;
      const isFirst    = idx === 0;

      const slide = document.createElement('div');
      slide.className = 'slide' + (isFirst ? ' active' : '');
      slide.id = 'slide-' + idx;

      slide.innerHTML =
        /* ── video pane ── */
        '<div class="slide-video-pane">' +
          '<div class="video-portrait" id="yt-wrap-' + idx + '">' +
            (lesson.video
              ? '<iframe src="https://www.youtube.com/embed/' + lesson.video + '?rel=0" allowfullscreen loading="lazy"></iframe>'
              : '<div class="video-placeholder"><div class="yt-play-icon"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div><div class="video-placeholder-label">No video yet</div></div>') +
          '</div>' +
          '<div class="yt-input-row">' +
            '<div class="yt-input-label">Lesson video</div>' +
            '<div class="yt-input-group">' +
              '<input class="yt-id-input" id="yt-input-' + idx + '" placeholder="youtu.be/… or video ID" />' +
            '</div>' +
          '</div>' +
        '</div>' +

        /* ── content pane ── */
        '<div class="slide-content-pane">' +
          '<div class="slide-kicker">Unit ' + unitNum + ' · Lesson ' + lessonNum + '</div>' +
          '<h1 class="slide-title">' + escHtml(lesson.title) + '</h1>' +
          '<p class="slide-subtitle">' + escHtml(lesson.subtitle || '') + '</p>' +
          (lesson.objective
            ? '<div class="objective"><strong>Objective.</strong> ' + escHtml(lesson.objective) + '</div>'
            : '') +
          (lesson.body || defaultBody(lesson, isFirst, course)) +

          /* figure + notes */
          '<div class="lesson-media">' +
            '<div class="media-block">' +
              '<div class="media-label">Figure</div>' +
              '<div class="svg-figure">' +
                '<div class="svg-drop-zone" id="svg-zone-' + idx + '" style="display:none">' +
                  '<div class="svg-drop-icon">📐</div>' +
                  '<div class="svg-drop-label"><strong>Drop your SVG here</strong><br>or click to browse · PNG/JPG also accepted</div>' +
                '</div>' +
                '<div class="svg-preview" id="svg-preview-' + idx + '" style="display:block"><img src="example-figure.svg" alt="Figure" /></div>' +
                '<div class="svg-caption-wrap">' +
                  '<input class="svg-caption" id="svg-caption-' + idx + '" placeholder="Figure caption…" />' +
                  '<button class="svg-clear-btn" onclick="window._course.clearFigure(' + idx + ')">✕</button>' +
                '</div>' +
                '<input type="file" id="svg-input-' + idx + '" accept=".svg,.png,.jpg,.jpeg,.webp" style="display:none" />' +
              '</div>' +
            '</div>' +
            '<div class="media-block">' +
              '<div class="media-label">Lesson notes</div>' +
              '<div class="text-block">' +
                '<div class="text-block-header">' +
                  '<span class="text-block-label">Notes</span>' +
                  '<button class="text-edit-btn" id="text-edit-btn-' + idx + '" onclick="window._course.editText(' + idx + ')">Edit</button>' +
                '</div>' +
                '<div class="text-block-body">' +
                  '<div class="text-view" id="text-view-' + idx + '" data-raw="">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>' +
                  '<textarea class="text-editor" id="text-editor-' + idx + '" placeholder="Notes, references, or explanations…"></textarea>' +
                '</div>' +
                '<button class="text-save-btn" id="text-save-btn-' + idx + '" onclick="window._course.saveText(' + idx + ')">Save</button>' +
              '</div>' +
            '</div>' +
          '</div>' + /* /lesson-media */

          (lesson.tags
            ? '<div class="tag-row">' + lesson.tags.map(t => '<span class="tag">' + escHtml(t) + '</span>').join('') + '</div>'
            : '') +
        '</div>'; /* /slide-content-pane */

      container.appendChild(slide);
    });
  }

  function defaultBody(lesson, isFirst, course) {
    if (isFirst) {
      return '<div class="content-grid">' +
        '<div class="card"><div class="card-title">Seminar structure</div><ul>' +
        course.units.map(u => '<li>' + escHtml(u.name) + ': ' + u.lessons.length + ' lessons</li>').join('') +
        '</ul></div>' +
        '<div class="card"><div class="card-title">How to navigate</div><ul>' +
        '<li>Click any lesson in the left index</li>' +
        '<li>Use Page Up / Page Down or ← →</li>' +
        '<li>Scroll within this pane to read</li>' +
        '<li>Press <strong>F11</strong> for fullscreen</li>' +
        '</ul></div>' +
        '</div>';
    }
    return '<div class="callout info"><span class="callout-icon">📝</span><span>Content for the lessons is being developed and updated. Please <a href="../contact.html" style="color:var(--accent);text-decoration:underline;">show interest</a> if you need further information.</span></div>';
  }

  /* ── 3. NAVIGATION STATE ────────────────────────────────────── */
  let current = 0;
  let total   = 0;
  let courseId = '';

  function init(course) {
    courseId = course.slug;
    total    = flatLessons(course).length;
    goTo(0, true);
  }

  function goTo(n, silent, dir) {
    if (n < 0 || n >= total) return;

    // deactivate old
    const oldSlide = document.getElementById('slide-' + current);
    const oldItem  = document.querySelector('.lesson-item.active');
    if (oldSlide) oldSlide.classList.remove('active');
    if (oldItem)  oldItem.classList.remove('active');

    current = n;

    // activate new
    const newSlide = document.getElementById('slide-' + current);
    const newItem  = document.querySelector('.lesson-item[data-idx="' + current + '"]');
    if (newSlide) {
      newSlide.classList.add('active');
      // animate entry if a direction was provided
      if (dir) {
        const cls = dir === 'fwd' ? 'anim-forward' : 'anim-backward';
        newSlide.classList.add(cls);
        setTimeout(function () { newSlide.classList.remove(cls); }, 260);
      }
    }
    if (newItem)  {
      newItem.classList.add('active');
      newItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // topbar
    const num = String(current + 1).padStart(2, '0');
    const counterEl = document.getElementById('lesson-counter');
    const titleEl   = document.getElementById('lesson-title-top');
    if (counterEl) counterEl.textContent = num + ' / ' + total;
    if (titleEl) {
      const nameEl = newItem && newItem.querySelector('.lesson-name');
      if (nameEl) titleEl.textContent = nameEl.textContent;
    }

    // buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current === total - 1;

    // progress
    const fill = document.getElementById('progress-fill');
    if (fill) fill.style.width = ((current + 1) / total * 100) + '%';

    // progress pill
    const pill = document.getElementById('progress-pill');
    if (pill) pill.textContent = (current + 1) + ' / ' + total;

    // scroll lesson area back to top
    if (!silent) {
      const area = document.getElementById('lesson-area');
      if (area) area.scrollTop = 0;
    }
  }

  function next() { goTo(current + 1, false, 'fwd'); }
  function prev() { goTo(current - 1, false, 'bwd'); }

  /* ── 4. KEYBOARD & SCROLL ───────────────────────────────────── */
  function setupKeyboard() {
    document.addEventListener('keydown', function (e) {
      // Don't hijack when typing in an input/textarea
      const tag = document.activeElement && document.activeElement.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault(); next(); break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault(); prev(); break;
      }
    });
  }

  /* Scroll within the lesson content pane does NOT trigger slide change.
     Only scrolling the outer lesson-area (which has scroll-snap) does. */
  function setupScrollSnap() {
    const area = document.getElementById('lesson-area');
    if (!area) return;
    let scrollTimer;
    area.addEventListener('scroll', function () {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () {
        // find which slide is currently most visible
        const slides = area.querySelectorAll('.slide.active');
        // with scroll-snap there's always one active; we just sync the counter
        // Actually snap handles it — we just need to detect if user scrolled between slides
        // Since only one slide is display:flex at a time, scrolling within it is fine.
        // This listener is here for future multi-slide scroll if needed.
      }, 80);
    });
  }


  /* ── 6. SWIPE (mobile) ──────────────────────────────────────── */
  function setupSwipe() {
    const area = document.getElementById('lesson-area');
    if (!area) return;

    // Edge hint elements — appear while the user is dragging
    const hintPrev = document.createElement('div');
    hintPrev.className = 'swipe-hint swipe-hint-prev';
    hintPrev.textContent = '❮';
    const hintNext = document.createElement('div');
    hintNext.className = 'swipe-hint swipe-hint-next';
    hintNext.textContent = '❯';
    document.body.appendChild(hintPrev);
    document.body.appendChild(hintNext);

    const THRESHOLD = 48;
    let startX = 0, startY = 0, tracking = false;

    function hideHints() {
      hintPrev.style.opacity = 0;
      hintNext.style.opacity = 0;
    }

    area.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      tracking = true;
    }, { passive: true });

    area.addEventListener('touchmove', function (e) {
      if (!tracking) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      // Only show hints when horizontal movement is dominant
      if (Math.abs(dx) > Math.abs(dy)) {
        const ratio = Math.min(Math.abs(dx) / THRESHOLD, 1);
        if (dx < 0) { hintNext.style.opacity = ratio * 0.85; hintPrev.style.opacity = 0; }
        else        { hintPrev.style.opacity = ratio * 0.85; hintNext.style.opacity = 0; }
      }
    }, { passive: true });

    area.addEventListener('touchend', function (e) {
      tracking = false;
      hideHints();
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > THRESHOLD) {
        if (dx < 0) next();   // swipe left  → next lesson
        else        prev();   // swipe right → prev lesson
      }
    }, { passive: true });

    area.addEventListener('touchcancel', hideHints, { passive: true });
  }

  /* ── 7. YOUTUBE ─────────────────────────────────────────────── */
  function loadYT(idx) {
    const wrap  = document.getElementById('yt-wrap-' + idx);
    const input = document.getElementById('yt-input-' + idx);
    if (!wrap || !input) return;
    const raw = input.value.trim();
    const m   = raw.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
    const vid = m ? m[1] : (raw.length >= 11 ? raw.substring(0, 11) : null);
    if (!vid) return;
    wrap.innerHTML =
      '<iframe src="https://www.youtube.com/embed/' + vid +
      '?rel=0" allowfullscreen loading="lazy"></iframe>';
    localStorage.setItem('yt-' + courseId + '-' + idx, vid);
  }

  function restoreYT() {
    for (let i = 0; i < total; i++) {
      const saved = localStorage.getItem('yt-' + courseId + '-' + i);
      if (!saved) continue;
      const wrap  = document.getElementById('yt-wrap-' + i);
      const input = document.getElementById('yt-input-' + i);
      if (wrap)  wrap.innerHTML =
        '<iframe src="https://www.youtube.com/embed/' + saved +
        '?rel=0" allowfullscreen loading="lazy"></iframe>';
      if (input) input.value = saved;
    }
  }

  /* ── 7. SVG / IMAGE FIGURES ─────────────────────────────────── */
  function setupFigures() {
    for (let i = 0; i < total; i++) {
      setupFigure(i);
    }
  }

  function setupFigure(idx) {
    const zone    = document.getElementById('svg-zone-' + idx);
    const input   = document.getElementById('svg-input-' + idx);
    const caption = document.getElementById('svg-caption-' + idx);
    const key     = 'svg-' + courseId + '-' + idx;
    const capKey  = 'svg-cap-' + courseId + '-' + idx;

    const savedSrc = localStorage.getItem(key);
    const savedCap = localStorage.getItem(capKey);
    if (savedSrc) showFigurePreview(idx, savedSrc);
    if (savedCap && caption) caption.value = savedCap;

    if (!zone) return;
    zone.addEventListener('click', () => input && input.click());
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone.addEventListener('drop', e => {
      e.preventDefault(); zone.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file) readFigureFile(file, idx, key);
    });
    if (input) input.addEventListener('change', () => {
      if (input.files[0]) readFigureFile(input.files[0], idx, key);
    });
    if (caption) caption.addEventListener('input', () => {
      localStorage.setItem(capKey, caption.value);
    });
  }

  function readFigureFile(file, idx, key) {
    const reader = new FileReader();
    reader.onload = function (e) {
      localStorage.setItem(key, e.target.result);
      showFigurePreview(idx, e.target.result);
    };
    reader.readAsDataURL(file);
  }

  function showFigurePreview(idx, src) {
    const zone    = document.getElementById('svg-zone-' + idx);
    const preview = document.getElementById('svg-preview-' + idx);
    if (!zone || !preview) return;
    zone.style.display    = 'none';
    preview.style.display = 'block';
    const img = preview.querySelector('img');
    if (img) img.src = src;
  }

  function clearFigure(idx) {
    const key    = 'svg-' + courseId + '-' + idx;
    const capKey = 'svg-cap-' + courseId + '-' + idx;
    localStorage.removeItem(key);
    localStorage.removeItem(capKey);
    const zone    = document.getElementById('svg-zone-' + idx);
    const preview = document.getElementById('svg-preview-' + idx);
    const caption = document.getElementById('svg-caption-' + idx);
    if (zone)    zone.style.display    = '';
    if (preview) { preview.style.display = 'none'; const img = preview.querySelector('img'); if (img) img.src = ''; }
    if (caption) caption.value = '';
  }

  /* ── 8. TEXT NOTES ──────────────────────────────────────────── */
  function restoreNotes() {
    for (let i = 0; i < total; i++) {
      const key    = 'text-' + courseId + '-' + i;
      const saved  = localStorage.getItem(key);
      if (!saved) continue;
      const view = document.getElementById('text-view-' + i);
      if (!view) continue;
      view.dataset.raw  = saved;
      view.textContent  = saved;
      view.className    = 'text-view';
    }
  }

  function editText(idx) {
    const view   = document.getElementById('text-view-' + idx);
    const editor = document.getElementById('text-editor-' + idx);
    const btn    = document.getElementById('text-edit-btn-' + idx);
    const save   = document.getElementById('text-save-btn-' + idx);
    if (!view || !editor) return;
    editor.value         = view.dataset.raw || '';
    view.style.display   = 'none';
    editor.style.display = 'block';
    save.style.display   = 'inline-block';
    btn.textContent      = 'Cancel';
    btn.onclick          = function () { cancelText(idx); };
    editor.focus();
  }

  function cancelText(idx) {
    const view   = document.getElementById('text-view-' + idx);
    const editor = document.getElementById('text-editor-' + idx);
    const btn    = document.getElementById('text-edit-btn-' + idx);
    const save   = document.getElementById('text-save-btn-' + idx);
    view.style.display   = '';
    editor.style.display = 'none';
    save.style.display   = 'none';
    btn.textContent      = 'Edit';
    btn.onclick          = function () { editText(idx); };
  }

  function saveText(idx) {
    const view   = document.getElementById('text-view-' + idx);
    const editor = document.getElementById('text-editor-' + idx);
    const key    = 'text-' + courseId + '-' + idx;
    const text   = editor.value.trim();
    localStorage.setItem(key, text);
    view.dataset.raw = text;
    if (text) {
      view.textContent = text;
      view.className   = 'text-view';
    } else {
      view.textContent = 'No notes yet — click Edit to add text.';
      view.className   = 'text-view empty';
    }
    cancelText(idx);
  }

  /* ── 9. SIDEBAR TOGGLE ──────────────────────────────────────── */
  function setupMobileMenu() {
    const toggle   = document.getElementById('menu-toggle');
    const sidebar  = document.getElementById('sidebar');
    const mainArea = document.getElementById('main-area');
    const backdrop = document.getElementById('sidebar-backdrop');
    const progBar  = document.getElementById('progress-bar');
    if (!toggle || !sidebar) return;

    function isMobile() { return window.innerWidth <= 768; }

    function openSidebar() {
      sidebar.classList.add('open');
      toggle.classList.add('active');
      toggle.textContent = '✕';
      if (isMobile()) {
        backdrop && backdrop.classList.add('visible');
      } else {
        mainArea && mainArea.classList.add('shifted');
        progBar  && progBar.classList.add('shifted');
      }
    }

    function closeSidebar() {
      sidebar.classList.remove('open');
      toggle.classList.remove('active');
      toggle.textContent = '☰';
      backdrop && backdrop.classList.remove('visible');
      mainArea && mainArea.classList.remove('shifted');
      progBar  && progBar.classList.remove('shifted');
    }

    function toggleSidebar() {
      sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    }

    toggle.addEventListener('click', toggleSidebar);

    // Close when backdrop clicked (mobile)
    backdrop && backdrop.addEventListener('click', closeSidebar);

    // Close when a lesson is tapped on mobile
    document.getElementById('lesson-nav').addEventListener('click', function () {
      if (isMobile()) closeSidebar();
    });

    // Re-evaluate shift on resize (switching between mobile and desktop)
    window.addEventListener('resize', function () {
      if (sidebar.classList.contains('open')) {
        if (isMobile()) {
          mainArea && mainArea.classList.remove('shifted');
          progBar  && progBar.classList.remove('shifted');
          backdrop && backdrop.classList.add('visible');
        } else {
          backdrop && backdrop.classList.remove('visible');
          mainArea && mainArea.classList.add('shifted');
          progBar  && progBar.classList.add('shifted');
        }
      }
    });
  }

  /* ── 10. UTILITY ─────────────────────────────────────────────── */
  function escHtml(str) {
    if (!str) return '';
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  /* ── 11. BOOT ────────────────────────────────────────────────── */
  function boot() {
    const course = window.COURSE;
    if (!course) { console.error('template.js: window.COURSE is not defined'); return; }

    // assign unitIdx for internal use
    course.units.forEach((u, i) => u.unitIdx = i);

    applyTokens(course);
    buildDOM(course);
    init(course);

    setupKeyboard();
    setupScrollSnap();
    setupSwipe();
    setupMobileMenu();

    // defer restore so DOM is fully ready
    setTimeout(function () {
      restoreYT();
      setupFigures();
      restoreNotes();
    }, 0);

    // expose methods needed by inline onclick handlers
    window._course = {
      loadYT:       loadYT,
      clearFigure:  clearFigure,
      editText:     editText,
      saveText:     saveText,
      next:         next,
      prev:         prev,
      goTo:         goTo,
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
