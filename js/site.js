/* Smooth scrolling (Lenis) and subtle scroll reveals (GSAP + ScrollTrigger).
   Progressive enhancement: pages are fully readable without this file.
   Content stays visible by default: an element is only hidden at the moment it
   scrolls into view, then animated in, so screenshots, link previews and search
   engines always see the whole page.
   Nothing runs when the visitor prefers reduced motion. */

(function () {
  'use strict';

  if (!window.gsap || !window.ScrollTrigger || !window.Lenis) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  // Smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync.
  var lenis = new Lenis({ autoRaf: false, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  // Thin accent line at the top that tracks reading progress.
  var progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);
  gsap.to(progress, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: true }
  });

  var ease = 'power3.out';

  // Animate `targets` in when `trigger` first enters the screen; until then they stay visible.
  function reveal(trigger, targets, vars) {
    if (!trigger) return;
    ScrollTrigger.create({
      trigger: trigger,
      start: 'top bottom-=40',
      once: true,
      onEnter: function () { gsap.from(targets || trigger, vars); }
    });
  }

  // Focal moment (home page): the wing section draws itself like a technical drawing,
  // then the name and intro settle in over it. Lines are fully drawn by default, so
  // nothing is missing if this script never runs.
  var draw = document.querySelector('.hero .draw');
  if (draw) {
    var strokes = draw.querySelectorAll('.draw-main, circle.draw-line');
    var details = draw.querySelectorAll('.draw-thin, .draw-label');
    var tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
    strokes.forEach(function (el, i) {
      var len = el.getTotalLength();
      tl.fromTo(el, { strokeDasharray: len, strokeDashoffset: len },
        { strokeDashoffset: 0, duration: i === 0 ? 1.8 : 0.7,
          onComplete: function () { el.style.strokeDasharray = ''; } }, i === 0 ? 0 : 1.2);
    });
    tl.from(details, { autoAlpha: 0, duration: 0.8, stagger: 0.12, ease: 'power1.out' }, 0.9);
  }

  // Intro: heading, lead and buttons slide in on load.
  gsap.from('.hero-text > *, .page-head-text > *, main > h1, main > .lead', {
    y: 24, autoAlpha: 0, duration: 0.8, ease: ease, stagger: 0.08, delay: draw ? 0.5 : 0
  });

  // Photo backgrounds drift slower than the page, so the bands feel layered.
  gsap.utils.toArray('.hero-bg, .band-bg, .page-head-bg').forEach(function (bg) {
    gsap.fromTo(bg, { yPercent: -6 }, {
      yPercent: 6,
      ease: 'none',
      scrollTrigger: { trigger: bg.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  // Portrait scales in gently.
  gsap.from('.portrait img', { scale: 0.9, autoAlpha: 0, duration: 1, ease: ease, delay: 0.2 });

  // Large photos open like a drawing being unrolled, from top to bottom.
  gsap.utils.toArray('.cover img, .cover .sheet').forEach(function (el) {
    reveal(el, el, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'power3.inOut' });
  });

  // Title block: rows appear one after another, like a drawing sheet being filled in.
  gsap.utils.toArray('.title-block').forEach(function (table) {
    reveal(table, table.querySelectorAll('tr'), { x: -12, autoAlpha: 0, duration: 0.4, ease: 'power2.out', stagger: 0.06 });
  });

  // Home project cards come in as a staggered group.
  gsap.utils.toArray('.project-cards').forEach(function (list) {
    reveal(list, list.children, { y: 24, autoAlpha: 0, duration: 0.6, ease: ease, stagger: 0.1 });
  });

  // Projects page rows: photo first, then the text.
  gsap.utils.toArray('.project-row').forEach(function (row) {
    reveal(row, row.querySelectorAll('.project-media, .project-media + div > *'), { y: 24, autoAlpha: 0, duration: 0.6, ease: ease, stagger: 0.07 });
  });

  // Section headings, bio, stand-alone headings and gallery figures fade up.
  gsap.utils.toArray('.section-head, .bio-text, .fact-card, main > h2, .doc-section, .gallery figure, .pager').forEach(function (el) {
    reveal(el, el, { y: 20, autoAlpha: 0, duration: 0.7, ease: ease });
  });

  // Numbered interests tick in one by one.
  gsap.utils.toArray('.numbered').forEach(function (list) {
    reveal(list, list.children, { y: 16, autoAlpha: 0, duration: 0.5, ease: ease, stagger: 0.07 });
  });
})();
