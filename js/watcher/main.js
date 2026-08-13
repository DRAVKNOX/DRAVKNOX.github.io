// Payne-less: Watch — renders every data-driven section of the page from PAYNEWATCH_CONTENT,
// plus small nav behaviors (mobile menu toggle, active link highlight).

(function () {
  var ICONS = {
    android: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 18V9.5a6 6 0 0 1 12 0V18" stroke-linecap="round"/><path d="M4 13h2M18 13h2" stroke-linecap="round"/><path d="M8 21v-2M16 21v-2" stroke-linecap="round"/><path d="M8.5 6 7 4M15.5 6 17 4" stroke-linecap="round"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.4 9.4 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7 4 12l5 5M15 7l5 5-5 5"/></svg>'
  };

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }


  function renderPreviewCard(card) {
    var classes = 'preview-card' + (card.compact ? ' compact' : '');
    var node = el('div', classes);
    node.appendChild(el('div', 'accent-rail'));
    var body = el('div');
    if (card.meta) body.appendChild(el('em', null, card.meta));
    body.appendChild(el('strong', null, card.time));
    body.appendChild(el('span', null, card.label));
    if (card.progress) body.appendChild(el('i', 'progress'));
    node.appendChild(body);
    if (card.control === 'toggle') {
      node.appendChild(el('button', 'toggle-dot', ''));
    } else if (card.control) {
      node.appendChild(el('button', null, card.control));
    }
    return node;
  }

  function renderWatchPreview(modeName) {
    var preview = document.getElementById('watchPreview');
    var tabs = document.getElementById('watchPreviewTabs');
    if (!preview || !tabs || !PAYNEWATCH_CONTENT.previewModes) return;

    var mode = PAYNEWATCH_CONTENT.previewModes[modeName] || PAYNEWATCH_CONTENT.previewModes.alarm;
    preview.innerHTML = '';
    preview.classList.remove('is-switching');
    void preview.offsetWidth;
    preview.classList.add('is-switching');

    if (mode.ring) {
      var ring = el('div', 'alarm-ring');
      var eyes = el('div', 'googly-preview', '<span></span><span></span>');
      ring.appendChild(eyes);
      ring.appendChild(el('strong', null, mode.ring.time));
      ring.appendChild(el('b', null, mode.ring.label));
      ring.appendChild(el('span', null, mode.ring.note));
      preview.appendChild(ring);
    } else if (mode.stopwatch) {
      var timer = el('div', 'preview-card compact');
      timer.appendChild(el('div', 'accent-rail'));
      var timerBody = el('div');
      timerBody.appendChild(el('strong', null, mode.stopwatch.time));
      timerBody.appendChild(el('span', null, mode.stopwatch.primary + ' · ' + mode.stopwatch.secondary));
      timer.appendChild(timerBody);
      preview.appendChild(timer);
      mode.stopwatch.laps.forEach(function (lap) {
        preview.appendChild(el('div', 'lap-row', '<span>' + lap[0] + '</span><b>' + lap[1] + '</b>'));
      });
    } else {
      mode.cards.forEach(function (card) { preview.appendChild(renderPreviewCard(card)); });
      if (mode.fab) preview.appendChild(el('button', 'preview-fab', mode.fab));
    }

    tabs.innerHTML = '';
    ['alarm', 'timer', 'stopwatch', 'world'].forEach(function (key) {
      var tabActive = key === modeName || (modeName === 'ring' && key === 'alarm');
      var item = el('span', tabActive ? 'active' : '', PAYNEWATCH_CONTENT.previewModes[key].tab);
      tabs.appendChild(item);
    });
  }

  function initWatchPreview() {
    var chips = document.querySelectorAll('[data-watch-mode]');
    if (!chips.length) return;
    renderWatchPreview('alarm');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (other) {
          other.classList.remove('active');
          other.setAttribute('aria-selected', 'false');
        });
        chip.classList.add('active');
        chip.setAttribute('aria-selected', 'true');
        renderWatchPreview(chip.dataset.watchMode);
      });
    });
  }

  function renderFeatures() {
    var grid = document.getElementById('featureGrid');
    if (!grid) return;
    PAYNEWATCH_CONTENT.features.forEach(function (f) {
      var card = el('div', 'feature-card');
      card.setAttribute('role', 'region');
      card.setAttribute('aria-label', f.title);
      card.appendChild(el('h3', null, f.title));
      card.appendChild(el('p', null, f.body));
      grid.appendChild(card);
    });
  }

  function renderStats() {
    var grid = document.getElementById('statsGrid');
    if (!grid) return;
    // Wrap stats in a list container for better screen reader navigation
    var list = el('ul', 'stat-list');
    list.setAttribute('role', 'list');
    PAYNEWATCH_CONTENT.stats.forEach(function (s) {
      var card = el('li', 'stat-card');
      card.setAttribute('role', 'listitem');
      card.setAttribute('aria-label', s.value + ' ' + s.unit + ' ' + s.label);
      card.appendChild(el('div', 'stat-value', s.value + '<span class="stat-unit">' + s.unit + '</span>'));
      card.appendChild(el('div', 'stat-label', s.label));
      list.appendChild(card);
    });
    grid.appendChild(list);
  }

  function renderRequirements() {
    var minCard = document.getElementById('reqMin');
    var maxCard = document.getElementById('reqMax');
    if (minCard) {
      var minList = el('ul', 'req-list');
      minList.setAttribute('role', 'list');
      PAYNEWATCH_CONTENT.requirements.min.forEach(function (pair) {
        var row = el('li', 'req-row');
        row.setAttribute('role', 'listitem');
        row.setAttribute('aria-label', pair[0] + ': ' + pair[1]);
        row.appendChild(el('span', 'label', pair[0]));
        row.appendChild(el('span', 'value', pair[1]));
        minList.appendChild(row);
      });
      minCard.appendChild(minList);
    }
    if (maxCard) {
      var maxList = el('ul', 'req-list');
      maxList.setAttribute('role', 'list');
      PAYNEWATCH_CONTENT.requirements.max.forEach(function (pair) {
        var row = el('li', 'req-row');
        row.setAttribute('role', 'listitem');
        row.setAttribute('aria-label', pair[0] + ': ' + pair[1]);
        row.appendChild(el('span', 'label', pair[0]));
        row.appendChild(el('span', 'value', pair[1]));
        maxList.appendChild(row);
      });
      maxCard.appendChild(maxList);
    }
  }

  function renderAudience() {
    var yes = document.getElementById('audienceYes');
    var no  = document.getElementById('audienceNo');
    if (yes) PAYNEWATCH_CONTENT.forYou.forEach(function (line) {
      var li = el('li', null, line);
      li.setAttribute('role', 'listitem');
      li.setAttribute('aria-label', 'Probable match: ' + line);
      yes.appendChild(li);
    });
    if (no)  PAYNEWATCH_CONTENT.notForYou.forEach(function (line) {
      var li = el('li', null, line);
      li.setAttribute('role', 'listitem');
      li.setAttribute('aria-label', 'Improbable match: ' + line);
      no.appendChild(li);
    });
  }

  function renderGallery() {
    var grid = document.getElementById('galleryGrid');
    if (!grid) return;
    PAYNEWATCH_CONTENT.screenshots.forEach(function (shot) {
      var item = el('div', 'gallery-item');
      var img = document.createElement('img');
      img.src = shot.file;
      img.alt = shot.label;
      img.loading = 'lazy';
      img.dataset.lightbox    = '';
      img.dataset.lightboxSrc = shot.file;
      img.dataset.lightboxAlt = shot.label;
      item.appendChild(img);
      item.appendChild(el('div', 'gallery-caption', shot.label));
      grid.appendChild(item);
    });
  }

  function renderLinkCards(containerId, items) {
    var grid = document.getElementById(containerId);
    if (!grid) return;
    items.forEach(function (item) {
      var card = el('div', 'link-card' + (item.primary ? ' primary' : ''));
      if (item.icon) card.appendChild(el('div', 'link-icon', ICONS[item.icon] || ''));
      card.appendChild(el('h3', null, item.name));
      card.appendChild(el('p', null, item.desc));
      var link = el('a', 'btn ' + (item.primary ? 'btn-primary' : 'btn-ghost'), 'Open ↗');
      link.href = item.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      card.appendChild(link);
      grid.appendChild(card);
    });
  }

  function initNav() {
    var toggle = document.getElementById('navToggle');
    var nav    = document.getElementById('mainNav');
    if (toggle && nav) {
      toggle.addEventListener('click', function () { nav.classList.toggle('open'); });
      nav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { nav.classList.remove('open'); });
      });
    }
  }

  // ── Clock hand rotation ──────────────────────────────────────────
  function updateClock() {
    var now = new Date();
    var hours = now.getHours() % 12;
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    var hourDeg = (hours * 30) + (minutes * 0.5) + (seconds / 120);
    var minuteDeg = (minutes * 6) + (seconds * 0.1);
    var secondDeg = seconds * 6;

    var hourHand = document.getElementById('hourHand');
    var minuteHand = document.getElementById('minuteHand');
    var secondHand = document.getElementById('secondHand');
    if (!hourHand || !minuteHand || !secondHand) return;

    hourHand.style.transform = 'rotate(' + hourDeg + 'deg)';
    minuteHand.style.transform = 'rotate(' + minuteDeg + 'deg)';
    secondHand.style.transform = 'rotate(' + secondDeg + 'deg)';
  }

  // ── Googly eyes wiggle ──────────────────────────────────────────
  function initGooglyEyes() {
    var pupils = document.querySelectorAll('.googly-pupil');
    if (!pupils.length) return;
    var MAX_OFFSET = 2.4;

    pupils.forEach(function (pupil) {
      pupil.dataset.baseCx = pupil.getAttribute('cx');
      pupil.dataset.baseCy = pupil.getAttribute('cy');
    });

    function randomOffset() {
      var angle = Math.random() * Math.PI * 2;
      var dist = Math.random() * MAX_OFFSET;
      return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
    }

    function wiggle() {
      pupils.forEach(function (pupil) {
        var baseX = parseFloat(pupil.dataset.baseCx);
        var baseY = parseFloat(pupil.dataset.baseCy);
        var offset = randomOffset();
        pupil.style.transition = 'cx 0.35s ease, cy 0.35s ease';
        pupil.setAttribute('cx', baseX + offset.x);
        pupil.setAttribute('cy', baseY + offset.y);
      });
    }

    function scheduleNext() {
      var delay = 900 + Math.random() * 1800;
      setTimeout(function () {
        wiggle();
        scheduleNext();
      }, delay);
    }

    wiggle();
    scheduleNext();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    updateClock();
    setInterval(updateClock, 1000);
    initGooglyEyes();
    initWatchPreview();
    renderFeatures();
    renderStats();
    renderRequirements();
    renderAudience();
    renderGallery();
    renderLinkCards('downloadGrid', PAYNEWATCH_CONTENT.downloads);
    renderLinkCards('codeGrid', PAYNEWATCH_CONTENT.codeLinks);
  });
}());
