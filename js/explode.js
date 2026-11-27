/* Exploded views: scroll-linked, vanilla JavaScript, no libraries. One component for
   every .explode section on the page (Sentinel and Scout).
   - Without this script, or when the visitor prefers reduced motion, each section stays
     a static, fully exploded drawing with every label visible (see css/explode.css).
   - Nothing is pinned and scrolling is never intercepted: the page scrolls normally and
     each robot's parts separate as its drawing moves into view, finishing when the
     drawing's centre reaches the middle of the window. The shown value eases towards
     its target every frame, so the motion glides.
   - Each layer moves by --dx / --dy (fractions of the drawing's width / height), so parts
     can move up, down, left or right. Every drawing is sized from the real window and its
     column, with room reserved on each side, so it always fits. */
(function () {
  'use strict';

  var pair = document.querySelector('.explode-pair');
  var sections = Array.prototype.slice.call(document.querySelectorAll('.explode'));
  if (!sections.length) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches) return;

  var header = document.querySelector('.site-header');
  var wide = window.matchMedia('(min-width: 60rem)');
  var headerH = 0;
  var running = false;

  function num(el, name) { return parseFloat(el.style.getPropertyValue(name)) || 0; }
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function smooth(t) { return t * t * (3 - 2 * t); }

  var robots = sections.map(function (section) {
    var canvas = section.querySelector('.explode-canvas');
    var offsets = {};
    section.querySelectorAll('.explode-layer').forEach(function (img) {
      offsets[img.dataset.part] = { dx: num(img, '--dx'), dy: num(img, '--dy') };
    });
    var labels = Array.prototype.slice.call(section.querySelectorAll('.explode-part'));
    section.classList.add('is-live');
    return {
      section: section,
      figure: section.querySelector('.explode-figure'),
      canvas: canvas,
      list: section.querySelector('.explode-parts'),
      ratio: num(canvas, '--ratio') || 0.8,
      extentY: 1 + num(canvas, '--mt') + num(canvas, '--mb'),
      extentX: 1 + num(canvas, '--ml') + num(canvas, '--mr'),
      parts: labels.map(function (li) {
        var o = offsets[li.dataset.part] || { dx: 0, dy: 0 };
        return { el: li, dy: o.dy, anchor: parseFloat(li.dataset.anchor), reveal: parseFloat(li.dataset.reveal) };
      }),
      current: 0,
      target: 0
    };
  });
  if (pair) pair.classList.add('is-live');

  // Fit each fully exploded drawing inside the visible window (below the sticky header)
  // and inside its own column, including the room its parts need on every side.
  function size(r) {
    var room = window.innerHeight - headerH - 32;
    var colW = r.figure.clientWidth;
    var ch = Math.min(room / r.extentY, colW / (r.ratio * r.extentX), 640);
    r.canvas.style.setProperty('--ch', Math.max(140, Math.floor(ch)) + 'px');
  }

  // 0 while the drawing's centre is near the bottom of the window,
  // 1 once it reaches the middle of the space under the header.
  function readTarget(r) {
    var b = r.figure.getBoundingClientRect();
    var centre = b.top + b.height / 2;
    var start = window.innerHeight * 0.95;
    var end = headerH + (window.innerHeight - headerH) / 2;
    r.target = smooth(clamp((start - centre) / (start - end)));
  }

  function render(r) {
    var e = r.current;
    r.section.style.setProperty('--e', e.toFixed(4));

    var active = null;
    r.parts.forEach(function (p) {
      var shown = e >= p.reveal;
      p.el.classList.toggle('is-shown', shown);
      if (shown && (!active || p.reveal > active.reveal)) active = p;
    });
    r.parts.forEach(function (p) { p.el.classList.toggle('is-active', p === active); });

    // Wide screens: keep each label level with its part, without overlapping the one above.
    if (wide.matches) {
      var c = r.canvas.getBoundingClientRect();
      var listTop = r.list.getBoundingClientRect().top;
      var floor = -Infinity;
      r.parts.forEach(function (p) {
        var y = c.top + (p.anchor + p.dy * e) * c.height - listTop - 12;
        y = Math.max(y, floor);
        p.el.style.setProperty('--y', y.toFixed(1) + 'px');
        floor = y + p.el.offsetHeight + 16;
      });
    } else {
      r.parts.forEach(function (p) { p.el.style.removeProperty('--y'); });
    }
  }

  // Ease every robot towards its target each frame; stop once all have arrived.
  function frame() {
    var moving = false;
    robots.forEach(function (r) {
      var diff = r.target - r.current;
      if (Math.abs(diff) < 0.0008) {
        if (r.current !== r.target) { r.current = r.target; render(r); }
      } else {
        r.current += diff * 0.14;
        render(r);
        moving = true;
      }
    });
    if (moving) window.requestAnimationFrame(frame);
    else running = false;
  }

  function kick() {
    robots.forEach(readTarget);
    if (!running) {
      running = true;
      window.requestAnimationFrame(frame);
    }
  }

  function relayout() {
    headerH = header ? header.offsetHeight : 0;
    robots.forEach(size);
    robots.forEach(function (r) {
      readTarget(r);
      r.current = r.target;   // jump straight to the right state after a resize
      render(r);
    });
  }

  window.addEventListener('scroll', kick, { passive: true });
  window.addEventListener('resize', relayout);
  window.addEventListener('load', relayout);
  wide.addEventListener('change', relayout);

  // If the visitor turns on reduced motion while the page is open, fall back to the static view.
  reduce.addEventListener('change', function () {
    if (!reduce.matches) return;
    window.removeEventListener('scroll', kick);
    if (pair) pair.classList.remove('is-live');
    robots.forEach(function (r) {
      r.section.classList.remove('is-live');
      r.section.style.removeProperty('--e');
      r.canvas.style.removeProperty('--ch');
      r.parts.forEach(function (p) { p.el.style.removeProperty('--y'); });
    });
  });

  relayout();
})();
