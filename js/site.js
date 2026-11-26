/* Smooth scrolling (Lenis) and subtle scroll reveals (GSAP + ScrollTrigger).
   Progressive enhancement: pages are fully readable without this file.
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

  // Intro: label, heading, lead and buttons slide in on load.
  gsap.from('.hero > div > *, .project-head > div > *, main > .label, main > h1, main > .lead', {
    y: 24,
    autoAlpha: 0,
    duration: 0.8,
    ease: ease,
    stagger: 0.08
  });

  // Large photos open like a drawing being unrolled, from top to bottom.
  gsap.utils.toArray('.hero-figure img, .cover img, .cover .sheet').forEach(function (el) {
    gsap.from(el, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 1.1,
      ease: 'power3.inOut',
      delay: 0.2,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true }
    });
  });

  // Title block: rows appear one after another, like a drawing sheet being filled in.
  gsap.utils.toArray('.title-block').forEach(function (table) {
    gsap.from(table.querySelectorAll('tr'), {
      x: -12,
      autoAlpha: 0,
      duration: 0.4,
      ease: 'power2.out',
      stagger: 0.06,
      scrollTrigger: { trigger: table, start: 'top 88%', once: true }
    });
  });

  // Project rows: photo and text come in from opposite sides.
  gsap.utils.toArray('.project-row').forEach(function (row) {
    var tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 80%', once: true } });
    tl.from(row.querySelector('.project-media'), { y: 40, autoAlpha: 0, duration: 0.8, ease: ease })
      .from(row.querySelectorAll('.project-media + div > *'), { y: 20, autoAlpha: 0, duration: 0.6, ease: ease, stagger: 0.07 }, '-=0.5');
  });

  // Section headings, stand-alone headings and gallery figures fade up.
  gsap.utils.toArray('.section-head, main > h2, .gallery figure, main > figure:not(.cover)').forEach(function (el) {
    gsap.from(el, {
      y: 24,
      autoAlpha: 0,
      duration: 0.7,
      ease: ease,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  // Numbered interests tick in one by one.
  gsap.utils.toArray('.numbered').forEach(function (list) {
    gsap.from(list.children, {
      y: 16,
      autoAlpha: 0,
      duration: 0.5,
      ease: ease,
      stagger: 0.07,
      scrollTrigger: { trigger: list, start: 'top 85%', once: true }
    });
  });
})();
