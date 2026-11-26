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

  // Split a plain-text heading into masked words (and optionally letters) that can rise
  // into place. Screen readers get the original text from aria-label. Headings that
  // contain links or other markup are left alone.
  function splitText(el, byChar) {
    if (!el || el.children.length && !/^(BR)$/.test(el.children[0].tagName)) return null;
    var lines = el.innerHTML.split(/<br\s*\/?>/i).map(function (t) { return t.replace(/\s+/g, ' ').trim(); });
    el.setAttribute('aria-label', lines.join(' '));
    el.innerHTML = lines.map(function (line) {
      return '<span class="split-line" aria-hidden="true">' + line.split(' ').map(function (word) {
        var inner = byChar ? word.split('').map(function (c) { return '<span class="char">' + c + '</span>'; }).join('') : '<span class="char">' + word + '</span>';
        return '<span class="word">' + inner + '</span>';
      }).join(' ') + '</span>';
    }).join('');
    return el.querySelectorAll('.char');
  }

  // Page titles: the home page name rises letter by letter; inner-page titles word by word.
  var heroChars = splitText(document.querySelector('.hero h1'), true);
  if (heroChars) gsap.from(heroChars, { yPercent: 115, duration: 0.9, ease: 'expo.out', stagger: 0.035, delay: 0.35 });
  var pageChars = splitText(document.querySelector('.page-head h1'), true);
  if (pageChars) gsap.from(pageChars, { yPercent: 115, duration: 0.8, ease: 'expo.out', stagger: 0.03, delay: 0.15 });

  // Intro: everything else in the header slides in after the title.
  gsap.from('.hero-text > :not(h1), .page-head-text > :not(h1), main > h1, main > .lead', {
    y: 24, autoAlpha: 0, duration: 0.8, ease: ease, stagger: 0.08, delay: draw ? 0.7 : 0.45
  });

  // Section headings and the footer call to action: words rise out of a mask on scroll.
  gsap.utils.toArray('.section-head h2, .doc-section > h2, .project-title, .footer-cta').forEach(function (h) {
    var words = splitText(h, false);
    if (words) reveal(h, words, { yPercent: 110, duration: 0.8, ease: 'expo.out', stagger: 0.06 });
  });

  // Navigation underline slides to whichever link is hovered or focused,
  // then returns to the current page.
  var navList = document.querySelector('.site-nav ul');
  var current = navList && navList.querySelector('a[aria-current]');
  if (navList && current) {
    var bar = document.createElement('span');
    bar.className = 'nav-indicator';
    bar.setAttribute('aria-hidden', 'true');
    navList.appendChild(bar);
    navList.parentElement.classList.add('has-indicator');
    var place = function (a, instant) {
      gsap.to(bar, { x: a.offsetLeft, width: a.offsetWidth, duration: instant ? 0 : 0.35, ease: 'power3.out' });
    };
    place(current, true);
    navList.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('mouseenter', function () { place(a); });
      a.addEventListener('focus', function () { place(a); });
    });
    navList.addEventListener('mouseleave', function () { place(current); });
    navList.addEventListener('focusout', function () { place(current); });
    window.addEventListener('resize', function () { place(current, true); });
  }

  // Tools strip: items fade up one after another when the strip scrolls into view.
  gsap.utils.toArray('.tools-list').forEach(function (list) {
    reveal(list, list.children, { y: 12, autoAlpha: 0, duration: 0.5, ease: ease, stagger: 0.05 });
  });

  // About timeline: an accent line draws down the entries as you scroll past them.
  document.querySelectorAll('.doc-body').forEach(function (body) {
    if (!body.querySelector('.entry')) return;
    body.classList.add('timeline');
    gsap.fromTo(body, { '--progress': 0 }, {
      '--progress': 1,
      ease: 'none',
      scrollTrigger: { trigger: body, start: 'top 80%', end: 'bottom 55%', scrub: true }
    });
  });

  // Photo backgrounds drift slower than the page, so the bands feel layered.
  gsap.utils.toArray('.hero-bg, .band-bg, .page-head-bg').forEach(function (bg) {
    gsap.fromTo(bg, { yPercent: -6 }, {
      yPercent: 6,
      ease: 'none',
      scrollTrigger: { trigger: bg.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  // Portraits are uncovered from the bottom up, like a print being pulled.
  gsap.from('.portrait img, .hero-portrait img', {
    clipPath: 'inset(100% 0 0 0)', duration: 1.1, ease: 'power3.inOut', delay: 0.3
  });

  // Large photos open like a drawing being unrolled, from top to bottom.
  gsap.utils.toArray('.cover img, .cover .sheet, .photo-strip img').forEach(function (el) {
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

  // Projects page rows: the photo wipes open sideways, then the text follows.
  gsap.utils.toArray('.project-row').forEach(function (row, i) {
    var media = row.querySelector('.project-media img, .project-media .sheet');
    var fromLeft = i % 2 === 0;
    reveal(row, media, { clipPath: fromLeft ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)', duration: 1, ease: 'power3.inOut' });
    reveal(row, row.querySelectorAll('.project-media + div > :not(.project-title)'), { y: 20, autoAlpha: 0, duration: 0.6, ease: ease, stagger: 0.07, delay: 0.3 });
  });

  // Report sections: the divider line draws across from the left, then the content rises.
  gsap.utils.toArray('.doc-section').forEach(function (sec) {
    sec.classList.add('has-rule');
    ScrollTrigger.create({
      trigger: sec, start: 'top bottom-=40', once: true,
      onEnter: function () {
        gsap.fromTo(sec, { '--rule': 0 }, { '--rule': 1, duration: 0.9, ease: 'power3.inOut' });
        gsap.from(sec.querySelectorAll('.doc-body > :not(.gallery):not(.title-block):not(ul)'), { y: 18, autoAlpha: 0, duration: 0.6, ease: ease, stagger: 0.08, delay: 0.15 });
      }
    });
  });

  // Lists inside sections and the facts card tick in one item at a time.
  gsap.utils.toArray('.doc-body > ul, .facts').forEach(function (list) {
    reveal(list, list.children, { x: -14, autoAlpha: 0, duration: 0.45, ease: ease, stagger: 0.07, delay: 0.2 });
  });

  // Gallery photos wipe up into view one after another; captions follow.
  gsap.utils.toArray('.gallery').forEach(function (g) {
    reveal(g, g.querySelectorAll('img'), { clipPath: 'inset(100% 0 0 0)', duration: 0.9, ease: 'power3.inOut', stagger: 0.15 });
    reveal(g, g.querySelectorAll('figcaption'), { autoAlpha: 0, y: 8, duration: 0.5, ease: ease, stagger: 0.15, delay: 0.6 });
  });

  // Previous / next project links slide in from their own side.
  gsap.utils.toArray('.pager-prev, .pager-next').forEach(function (link) {
    reveal(link, link, { x: link.classList.contains('pager-prev') ? -40 : 40, autoAlpha: 0, duration: 0.7, ease: ease });
  });

  // Home page blocks that are not headings fade up.
  gsap.utils.toArray('.spec-strip, .bio-text, .fact-card').forEach(function (el) {
    reveal(el, el, { y: 20, autoAlpha: 0, duration: 0.7, ease: ease });
  });

  // Interests: words rise in one after another, rippling out from the middle (anime.js-style stagger).
  gsap.utils.toArray('.numbered, .interests').forEach(function (list) {
    reveal(list, list.children, { y: 20, autoAlpha: 0, duration: 0.5, ease: ease, stagger: { each: 0.06, from: 'center' } });
  });
})();
