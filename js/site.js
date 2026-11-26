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

  // Intro: label, heading and lead slide in on load.
  gsap.from('main > .label, main > h1, main > .lead', {
    y: 16,
    autoAlpha: 0,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.08
  });

  // Title block: rows appear one after another, like a drawing sheet being filled in.
  gsap.utils.toArray('.title-block').forEach(function (table) {
    gsap.from(table.querySelectorAll('tr'), {
      x: -12,
      autoAlpha: 0,
      duration: 0.4,
      ease: 'power2.out',
      stagger: 0.06,
      scrollTrigger: { trigger: table, start: 'top 85%', once: true }
    });
  });

  // Section headings and figures fade up as they enter the screen.
  gsap.utils.toArray('main h2, main figure').forEach(function (el) {
    gsap.from(el, {
      y: 20,
      autoAlpha: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  // Project cards come in as a staggered group.
  gsap.utils.toArray('.cards').forEach(function (list) {
    gsap.from(list.children, {
      y: 24,
      autoAlpha: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: { trigger: list, start: 'top 85%', once: true }
    });
  });
})();
