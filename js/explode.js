/* Sentinel exploded view: scroll-linked, vanilla JavaScript, no libraries.
   - Without this script, or when the visitor prefers reduced motion, the section stays
     a static, fully exploded drawing with every label visible (see css/explode.css).
   - Nothing is pinned and scrolling is never intercepted: the page scrolls normally and
     the parts separate as the drawing moves into view, finishing when its centre
     reaches the middle of the window. The value eases towards its target every frame,
     so the motion glides instead of stepping with each scroll-wheel notch.
   - The drawing is sized from the real window and column, so it always fits. */
(function () {
  'use strict';

  var section = document.querySelector('.explode');
  if (!section) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches) return;

  var grid = section.querySelector('.explode-grid');
  var figure = section.querySelector('.explode-figure');
  var canvas = section.querySelector('.explode-canvas');
  var list = section.querySelector('.explode-parts');
  var labels = Array.prototype.slice.call(section.querySelectorAll('.explode-part'));
  var header = document.querySelector('.site-header');
  var wide = window.matchMedia('(min-width: 60rem)');

  var RATIO = 647 / 793;     // drawing box width / height
  var EXTENT = 2.15;         // full exploded height, in drawing-box heights

  var shifts = {};
  section.querySelectorAll('.explode-layer').forEach(function (img) {
    shifts[img.dataset.part] = parseFloat(img.style.getPropertyValue('--shift')) || 0;
  });
  var parts = labels.map(function (li) {
    return {
      el: li,
      shift: shifts[li.dataset.part] || 0,
      anchor: parseFloat(li.dataset.anchor),
      reveal: parseFloat(li.dataset.reveal)
    };
  });

  section.classList.add('is-live');

  var headerH = 0;
  var current = 0;   // explosion shown on screen
  var target = 0;    // explosion the scroll position asks for
  var running = false;

  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function smooth(t) { return t * t * (3 - 2 * t); }

  // Fit the fully exploded drawing inside the visible window (below the sticky header)
  // and inside its column.
  function size() {
    headerH = header ? header.offsetHeight : 0;
    var room = window.innerHeight - headerH - 32;
    var colW = figure.clientWidth || grid.clientWidth;
    var ch = Math.min(room / EXTENT, colW / RATIO, 640);
    section.style.setProperty('--ch', Math.max(160, Math.floor(ch)) + 'px');
  }

  // 0 while the drawing's centre is near the bottom of the window,
  // 1 once it reaches the middle of the space under the header.
  function readTarget() {
    var r = figure.getBoundingClientRect();
    var centre = r.top + r.height / 2;
    var start = window.innerHeight * 0.95;
    var end = headerH + (window.innerHeight - headerH) / 2;
    target = smooth(clamp((start - centre) / (start - end)));
  }

  function render(e) {
    section.style.setProperty('--e', e.toFixed(4));

    var active = null;
    parts.forEach(function (part) {
      var shown = e >= part.reveal;
      part.el.classList.toggle('is-shown', shown);
      if (shown && (!active || part.reveal > active.reveal)) active = part;
    });
    parts.forEach(function (part) { part.el.classList.toggle('is-active', part === active); });

    // Desktop: keep each label level with its part, without overlapping the one above.
    if (wide.matches) {
      var c = canvas.getBoundingClientRect();
      var listTop = list.getBoundingClientRect().top;
      var floor = -Infinity;
      parts.forEach(function (part) {
        var y = c.top + (part.anchor + part.shift * e) * c.height - listTop - 12;
        y = Math.max(y, floor);
        part.el.style.setProperty('--y', y.toFixed(1) + 'px');
        floor = y + part.el.offsetHeight + 16;
      });
    } else {
      parts.forEach(function (part) { part.el.style.removeProperty('--y'); });
    }
  }

  // Ease the shown value towards the target each frame; stop when it has arrived.
  function frame() {
    var diff = target - current;
    if (Math.abs(diff) < 0.0008) {
      current = target;
      render(current);
      running = false;
      return;
    }
    current += diff * 0.14;
    render(current);
    window.requestAnimationFrame(frame);
  }

  function kick() {
    readTarget();
    if (!running) {
      running = true;
      window.requestAnimationFrame(frame);
    }
  }

  function relayout() {
    size();
    readTarget();
    current = target;      // jump straight to the right state after a resize
    render(current);
  }

  window.addEventListener('scroll', kick, { passive: true });
  window.addEventListener('resize', relayout);
  window.addEventListener('load', relayout);
  wide.addEventListener('change', relayout);

  // If the visitor turns on reduced motion while the page is open, fall back to the static view.
  reduce.addEventListener('change', function () {
    if (reduce.matches) {
      window.removeEventListener('scroll', kick);
      section.classList.remove('is-live');
      section.style.removeProperty('--e');
      section.style.removeProperty('--ch');
      labels.forEach(function (li) { li.style.removeProperty('--y'); });
    }
  });

  relayout();
})();
