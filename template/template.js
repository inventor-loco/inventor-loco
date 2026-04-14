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
    document.title = course.title + ' — Vicente Matus, PhD';
    document.getElementById('sidebar-badge').textContent  = course.badge;
    document.getElementById('sidebar-title').textContent  = course.title;

    const flat = flatLessons(course);
    document.getElementById('sidebar-meta').textContent =
      flat.length + ' lessons · Vicente Matus, PhD';

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
            makeIframe(lesson.video || PLACEHOLDER_VID) +
          '</div>' +
        '</div>' +

        /* ── content pane ── */
        '<div class="slide-content-pane">' +
          '<div class="slide-header">' +
            '<div class="slide-kicker">Unit ' + unitNum + ' · Lesson ' + lessonNum + '</div>' +
            '<h1 class="slide-title">' + escHtml(lesson.title) + '</h1>' +
            '<p class="slide-subtitle">' + escHtml(lesson.subtitle || '') + '</p>' +
          '</div>' +
          '<div class="slide-body">' +
            lessonDisclaimer() +
            (lesson.objective
              ? '<div class="objective"><strong>Objective.</strong> ' + escHtml(lesson.objective) + '</div>'
              : '') +
            '<div class="md-body" id="md-body-' + idx + '">' +
              defaultBody(lesson, isFirst, course) +
            '</div>' +

            (lesson.tags
              ? '<div class="tag-row">' + lesson.tags.map(t => '<span class="tag">' + escHtml(t) + '</span>').join('') + '</div>'
              : '') +
          '</div>' + /* /slide-body */
        '</div>'; /* /slide-content-pane */

      container.appendChild(slide);
    });
  }

  /* ── MARKDOWN CONTENT LOADER ─────────────────────────────── */
  var mdCache = {};
  var mdLoaded = false;

  function loadAllMarkdown() {
    if (mdLoaded) return Promise.resolve();
    mdLoaded = true;
    var file = 'content/' + courseId + '.md';
    return fetch(file).then(function (res) {
      if (!res.ok) return '';
      return res.text();
    }).then(function (text) {
      if (!text) return;
      var parts = text.split(/<!--\s*slug:\s*(\d+)\s*-->/);
      for (var i = 1; i < parts.length; i += 2) {
        var idx = parseInt(parts[i], 10) - 1;
        mdCache[idx] = parts[i + 1].trim();
      }
    }).catch(function () { /* no combined .md file */ });
  }

  function renderMarkdown(idx) {
    var el = document.getElementById('md-body-' + idx);
    if (el && mdCache[idx] && typeof marked !== 'undefined') {
      el.innerHTML = marked.parse(mdCache[idx]);
    }
  }

  function loadMarkdown(idx) {
    if (mdCache[idx] !== undefined) {
      renderMarkdown(idx);
      return;
    }
    loadAllMarkdown().then(function () { renderMarkdown(idx); });
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

  function lessonDisclaimer() {
    return '<div class="lesson-disclaimer" role="note" aria-label="Lesson disclaimer">' +
      '<strong>Disclaimer.</strong> Some materials in these lessons were generated with AI. ' +
      'The author is currently validating and updating the information for maximum accuracy.' +
      '</div>';
  }

  /* ── COVER PAGE ──────────────────────────────────────────────── */
  var showingCover = true;

  function buildCover(course) {
    var flat = flatLessons(course);
    var container = document.getElementById('slide-container');
    var cover = document.createElement('div');
    cover.className = 'cover-page';
    cover.id = 'cover-page';

    /* ── TOC (collapsible units) ── */
    var tocHtml = '';
    var globalIdx = 0;
    course.units.forEach(function (unit, ui) {
      var unitLabel = unit.name.replace(/^Unit\s*\d+\s*[—–\-]\s*/, '');
      tocHtml += '<div class="cover-unit-card">' +
        '<button class="cover-unit-header" onclick="this.parentElement.classList.toggle(\'open\')">' +
          '<span><span class="cover-unit-num">Unit ' + (ui + 1) + '</span>' +
          '<span class="cover-unit-name">' + escHtml(unitLabel) + '</span></span>' +
          '<span class="cover-unit-chevron">&#9662;</span>' +
        '</button><ul class="cover-unit-lessons">';
      unit.lessons.forEach(function (lesson, li) {
        var idx = globalIdx++;
        tocHtml += '<li><a onclick="window._course.goTo(' + idx + ')">' +
          '<span class="toc-num">' + String(idx + 1).padStart(2, '0') + '</span> ' +
          escHtml(lesson.title) + '</a></li>';
      });
      tocHtml += '</ul></div>';
    });

    /* ── Nav guide (shared across all courses) ── */
    var navHtml =
      '<div class="nav-guide-grid">' +
        '<div class="nav-guide-card">' +
          '<div class="nav-guide-keys"><kbd>PgUp</kbd> <kbd>PgDn</kbd></div>' +
          '<div class="nav-guide-title">Keyboard</div>' +
          '<div class="nav-guide-desc">Page Up to go back<br>Page Down to advance</div>' +
        '</div>' +
        '<div class="nav-guide-card">' +
          '<div class="nav-guide-keys">&#9776;</div>' +
          '<div class="nav-guide-title">Sidebar</div>' +
          '<div class="nav-guide-desc">Open the index and<br>click any lesson</div>' +
        '</div>' +
        '<div class="nav-guide-card">' +
          '<div class="nav-guide-keys">&lsaquo; swipe &rsaquo;</div>' +
          '<div class="nav-guide-title">Touch</div>' +
          '<div class="nav-guide-desc">Swipe left or right<br>on mobile devices</div>' +
        '</div>' +
        '<div class="nav-guide-card">' +
          '<div class="nav-guide-keys">F11</div>' +
          '<div class="nav-guide-title">Fullscreen</div>' +
          '<div class="nav-guide-desc">Immersive mode for<br>distraction-free study</div>' +
        '</div>' +
      '</div>';

    cover.innerHTML =
      /* ── Hero ── */
      '<div class="cover-hero">' +
        '<img src="figs/' + course.slug + '/cover.png" class="cover-hero-img" ' +
          'onerror="this.remove()" alt="" />' +
        '<div class="cover-hero-overlay">' +
          '<span class="cover-badge-lg">' + escHtml(course.badge) + '</span>' +
          '<h1 class="cover-hero-title">' + escHtml(course.title) + '</h1>' +
          '<p class="cover-hero-meta">' + flat.length + ' lessons &middot; ' +
            course.units.length + ' units &middot; Vicente Matus, PhD</p>' +
        '</div>' +
      '</div>' +

      /* ── Body ── */
      '<div class="cover-body">' +
        '<section class="cover-section">' +
          '<h2>Welcome</h2>' +
          '<p>This course walks you through <strong>' + escHtml(course.title) + '</strong> ' +
          'from foundational concepts to applied practice. Each lesson includes written ' +
          'material, diagrams, and (when available) a short video explanation. ' +
          'Work at your own pace, revisit any lesson, and download the full course for offline reading.</p>' +
        '</section>' +

        '<section class="cover-section">' +
          '<h2>Video</h2>' +
          '<div class="cover-nav-video" id="cover-nav-video">' +
            '<iframe src="https://www.youtube-nocookie.com/embed/-DQ233YbOq8?rel=0" ' +
              'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ' +
              'allowfullscreen loading="lazy"></iframe>' +
          '</div>' +
        '</section>' +

        '<section class="cover-section">' +
          '<h2>Course Contents</h2>' +
          '<div class="cover-toc-grid">' + tocHtml + '</div>' +
        '</section>' +

        '<section class="cover-section cover-actions-block">' +
          '<h2>Start or Download</h2>' +
          '<p>Begin with the first lesson now, or download the complete PDF version for offline reading.</p>' +
          '<div class="cover-actions">' +
            '<button class="cover-btn cover-btn-start" onclick="window._course.goTo(0)">' +
              'Start Lesson 1 &rarr;</button>' +
            '<button class="cover-btn cover-btn-download" onclick="window._course.downloadPDF()">' +
              '&#128196; Download Full Course (PDF)</button>' +
          '</div>' +
        '</section>' +

        '<section class="cover-section cover-section-annex">' +
          '<h2>How to Navigate</h2>' + navHtml +
        '</section>' +
      '</div>';

    container.prepend(cover);
  }

  function showCover() {
    showingCover = true;
    var cover = document.getElementById('cover-page');
    if (cover) cover.classList.add('active');

    // hide current lesson slide
    var oldSlide = document.getElementById('slide-' + current);
    if (oldSlide) oldSlide.classList.remove('active');
    var oldItem = document.querySelector('.lesson-item.active');
    if (oldItem) oldItem.classList.remove('active');

    // topbar
    var counterEl = document.getElementById('lesson-counter');
    if (counterEl) counterEl.textContent = 'Cover';
    var titleEl = document.getElementById('lesson-title-top');
    if (titleEl) titleEl.textContent = 'Welcome';

    // buttons
    var prevBtn = document.getElementById('prev-btn');
    var nextBtn = document.getElementById('next-btn');
    if (prevBtn) prevBtn.disabled = true;
    if (nextBtn) nextBtn.disabled = false;

    // progress
    var fill = document.getElementById('progress-fill');
    if (fill) fill.style.width = '0%';
    var pill = document.getElementById('progress-pill');
    if (pill) pill.textContent = 'Cover';

    updateCarouselDots(-1);

    var area = document.getElementById('lesson-area');
    if (area) area.scrollTop = 0;
  }

  function hideCover() {
    if (!showingCover) return;
    showingCover = false;
    var cover = document.getElementById('cover-page');
    if (cover) cover.classList.remove('active');
  }

  /* ── 3. NAVIGATION STATE ────────────────────────────────────── */
  let current = 0;
  let total   = 0;
  let courseId = '';

  function init(course) {
    courseId = course.slug;
    total    = flatLessons(course).length;
    buildCarouselDots(total);
    buildCover(course);
    showCover();
  }

  /* ── CAROUSEL DOTS (mobile) ────────────────────────────────── */
  var DOT_SIZE = 7, DOT_GAP = 6, DOT_STEP = DOT_SIZE + DOT_GAP; // 13px per dot

  function buildCarouselDots(count) {
    var container = document.createElement('div');
    container.className = 'carousel-dots';
    container.id = 'carousel-dots';
    var track = document.createElement('div');
    track.className = 'carousel-dots-track';
    track.id = 'carousel-dots-track';
    for (var i = 0; i < count; i++) {
      var dot = document.createElement('span');
      dot.className = 'carousel-dot';
      dot.setAttribute('data-idx', i);
      track.appendChild(dot);
    }
    container.appendChild(track);
    document.body.appendChild(container);
  }

  function updateCarouselDots(idx) {
    var track = document.getElementById('carousel-dots-track');
    if (!track) return;
    var dots = track.querySelectorAll('.carousel-dot');
    // Center active dot: shift track so dot[idx] sits in the middle of the 85px window
    // Middle of window = 42.5px, center of dot[idx] = idx * 13 + 3.5
    var offset = 42.5 - (idx * DOT_STEP + DOT_SIZE / 2);
    track.style.transform = 'translateX(' + offset + 'px)';
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('active', i === idx);
    }
  }

  function goTo(n, silent, dir) {
    if (n < 0 || n >= total) return;
    hideCover();

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

    // carousel dots
    updateCarouselDots(current);

    // load markdown content for this lesson (lazy, cached)
    loadMarkdown(current);

    // scroll lesson area back to top
    if (!silent) {
      const area = document.getElementById('lesson-area');
      if (area) area.scrollTop = 0;
    }
  }

  function next() {
    if (showingCover) { goTo(0, false, 'fwd'); }
    else { goTo(current + 1, false, 'fwd'); }
  }
  function prev() {
    if (current === 0 && !showingCover) { showCover(); }
    else if (!showingCover) { goTo(current - 1, false, 'bwd'); }
  }

  /* ── 4. KEYBOARD & SCROLL ───────────────────────────────────── */
  function setupKeyboard() {
    document.addEventListener('keydown', function (e) {
      // Don't hijack when typing in an input/textarea
      const tag = document.activeElement && document.activeElement.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      switch (e.key) {
        case 'PageDown':
          e.preventDefault(); next(); break;
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
  var PLACEHOLDER_VID = 'nzCJcHLkNmQ';

  function makeIframe(vid) {
    return '<iframe src="https://www.youtube-nocookie.com/embed/' + vid +
      '?rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="no-referrer-when-downgrade" allowfullscreen loading="lazy"></iframe>';
  }

  function restoreYT() {
    for (let i = 0; i < total; i++) {
      const saved = localStorage.getItem('yt-' + courseId + '-' + i);
      if (!saved) continue;
      const wrap  = document.getElementById('yt-wrap-' + i);
      if (wrap)  wrap.innerHTML = makeIframe(saved);
    }
  }

  /* (Figures and notes sections removed — now handled by MD files) */

  /* ── PDF DOWNLOAD ───────────────────────────────────────────── */
  function downloadPDF() {
    loadAllMarkdown().then(function () {
      var course = window.COURSE;
      var flat = flatLessons(course);
      var baseUrl = window.location.href.replace(/[^/]*$/, '');

      var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>' +
        '<base href="' + baseUrl + '"/>' +
        '<title>' + escHtml(course.title) + ' — Vicente Matus, PhD</title>' +
        '<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet"/>' +
        '<style>' + pdfStyles() + '</style></head><body>';

      /* cover */
      html += '<div class="pdf-cover">' +
        '<div class="pdf-badge">' + escHtml(course.badge) + '</div>' +
        '<h1>' + escHtml(course.title) + '</h1>' +
        '<p class="pdf-meta">' + flat.length + ' lessons &middot; ' + course.units.length + ' units</p>' +
        '<p class="pdf-author">Vicente Matus, PhD<br>IDeTIC &middot; ULPGC &middot; Las Palmas de Gran Canaria, Spain</p>' +
        '</div>';

      /* table of contents */
      html += '<div class="pdf-toc"><h2>Table of Contents</h2>';
      var tocIdx = 0;
      course.units.forEach(function (unit) {
        html += '<h3>' + escHtml(unit.name) + '</h3><ol start="' + (tocIdx + 1) + '">';
        unit.lessons.forEach(function (lesson) {
          html += '<li>' + escHtml(lesson.title) + '</li>';
          tocIdx++;
        });
        html += '</ol>';
      });
      html += '</div>';

      /* lessons */
      flat.forEach(function (item, idx) {
        html += '<div class="pdf-lesson">' +
          '<div class="pdf-lesson-kicker">Lesson ' + String(idx + 1).padStart(2, '0') + '</div>' +
          '<h2>' + escHtml(item.lesson.title) + '</h2>';
        if (item.lesson.subtitle) {
          html += '<p class="pdf-subtitle">' + escHtml(item.lesson.subtitle) + '</p>';
        }
        if (mdCache[idx]) {
          html += '<div class="pdf-content">' + marked.parse(mdCache[idx]) + '</div>';
        } else {
          html += '<p class="pdf-placeholder">Content is being developed.</p>';
        }
        html += '</div>';
      });

      /* footer */
      html += '<div class="pdf-footer">' +
        '<p>&copy; Vicente Matus, PhD &mdash; IDeTIC, ULPGC, Spain</p>' +
        '<p>Generated on ' + new Date().toLocaleDateString('en-GB') + '</p></div>';

      html += '</body></html>';

      var win = window.open('', '_blank');
      if (win) {
        win.document.write(html);
        win.document.close();
        setTimeout(function () { win.print(); }, 600);
      }
    });
  }

  function pdfStyles() {
    return 'body{font-family:"IBM Plex Sans",sans-serif;font-weight:300;color:#0d0d0d;' +
      'max-width:800px;margin:0 auto;padding:2rem;line-height:1.6}' +
      '.pdf-cover{text-align:center;padding:4rem 0 3rem;border-bottom:2px solid #0d0d0d;margin-bottom:2rem;page-break-after:always}' +
      '.pdf-cover h1{font-size:2.2rem;font-weight:600;margin:.5rem 0;letter-spacing:-.02em}' +
      '.pdf-badge{font-family:"IBM Plex Mono",monospace;font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;color:#666}' +
      '.pdf-meta{font-size:.9rem;color:#666;margin:.5rem 0}' +
      '.pdf-author{font-size:.95rem;color:#333;margin-top:2rem}' +
      '.pdf-toc{margin-bottom:2rem;page-break-after:always}' +
      '.pdf-toc h2{font-size:1.4rem;margin-bottom:1rem}' +
      '.pdf-toc h3{font-size:.85rem;font-family:"IBM Plex Mono",monospace;color:#666;text-transform:uppercase;letter-spacing:.06em;margin:1.2rem 0 .4rem}' +
      '.pdf-toc ol{padding-left:1.5rem;margin:0}.pdf-toc li{font-size:.9rem;margin-bottom:.2rem}' +
      '.pdf-lesson{margin-bottom:2rem;page-break-before:auto}' +
      '.pdf-lesson-kicker{font-family:"IBM Plex Mono",monospace;font-size:.65rem;text-transform:uppercase;letter-spacing:.1em;color:#888;margin-bottom:.3rem}' +
      '.pdf-lesson h2{font-size:1.3rem;font-weight:600;margin-bottom:.3rem}' +
      '.pdf-subtitle{font-size:.9rem;color:#666;border-bottom:1px solid #e0e0e0;padding-bottom:1rem;margin-bottom:1rem}' +
      '.pdf-content h1,.pdf-content h2,.pdf-content h3{margin:1em 0 .4em;font-weight:600}' +
      '.pdf-content h1{font-size:1.15rem}.pdf-content h2{font-size:1.05rem}.pdf-content h3{font-size:.95rem}' +
      '.pdf-content p{margin:.5em 0}.pdf-content ul,.pdf-content ol{padding-left:1.4em;margin:.5em 0}' +
      '.pdf-content li{margin-bottom:.2em}' +
      '.pdf-content img{max-width:100%;height:auto;margin:.8em 0}' +
      '.pdf-content code{font-family:"IBM Plex Mono",monospace;font-size:.85em;background:#f2f2f2;padding:.1em .3em;border-radius:2px}' +
      '.pdf-content pre{background:#f5f5f5;padding:.8rem 1rem;border-radius:4px;overflow-x:auto;font-size:.82rem;margin:.6em 0}' +
      '.pdf-content pre code{background:none;padding:0}' +
      '.pdf-content blockquote{border-left:3px solid #ccc;margin:.6em 0;padding:.3em .8em;color:#4a4a4a}' +
      '.pdf-content table{width:100%;border-collapse:collapse;margin:.6em 0;font-size:.85rem}' +
      '.pdf-content th,.pdf-content td{border:1px solid #ddd;padding:.4em .6em;text-align:left}' +
      '.pdf-content th{background:#f5f5f5;font-weight:500}' +
      '.pdf-placeholder{color:#999;font-style:italic}' +
      '.pdf-footer{text-align:center;padding-top:2rem;border-top:1px solid #e0e0e0;margin-top:3rem;color:#888;font-size:.8rem}' +
      '@media print{.pdf-cover{page-break-after:always}.pdf-lesson{page-break-inside:avoid}body{padding:0}}' +
      '@page{margin:2cm}';
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

  /* ── 10. LIGHTBOX ───────────────────────────────────────────── */
  function setupLightbox() {
    // Inject overlay element
    const lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.innerHTML =
      '<span id="lightbox-close" title="Close">&#x2715;</span>' +
      '<img id="lightbox-img" src="" alt="">';
    document.body.appendChild(lb);

    const lbImg = document.getElementById('lightbox-img');

    function openLightbox(src, alt) {
      lbImg.src = src;
      lbImg.alt = alt || '';
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
    }

    // Backdrop click closes, image click does not
    lb.addEventListener('click', closeLightbox);
    lbImg.addEventListener('click', function (e) { e.stopPropagation(); });
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);

    // Escape key closes
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });

    // Delegate clicks on course figures
    const slides = document.getElementById('slide-container');
    if (slides) {
      slides.addEventListener('click', function (e) {
        if (e.target.matches('.md-body img')) {
          openLightbox(e.target.src, e.target.alt);
        }
      });
    }
  }

  /* ── 11. SIDEBAR RESIZE ──────────────────────────────────────── */
  function setupSidebarResize() {
    var sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    var handle = document.createElement('div');
    handle.className = 'sidebar-resize-handle';
    sidebar.appendChild(handle);

    var startX, startW;

    function onMouseDown(e) {
      if (window.innerWidth <= 768) return;
      e.preventDefault();
      startX = e.clientX;
      startW = sidebar.offsetWidth;
      handle.classList.add('dragging');
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }

    function onMouseMove(e) {
      var newW = Math.max(200, Math.min(500, startW + (e.clientX - startX)));
      document.documentElement.style.setProperty('--sidebar-w', newW + 'px');
    }

    function onMouseUp() {
      handle.classList.remove('dragging');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    handle.addEventListener('mousedown', onMouseDown);
  }

  /* ── 11. UTILITY ─────────────────────────────────────────────── */
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
    }, 0);

    setupSidebarResize();
    setupLightbox();

    // expose methods needed by inline onclick handlers
    window._course = {
      next:         next,
      prev:         prev,
      goTo:         goTo,
      showCover:    showCover,
      downloadPDF:  downloadPDF,
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
