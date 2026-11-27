# Mykola Matsiuk – engineering portfolio

My personal portfolio as a second-year Mechanical Engineering student at Trinity College Dublin. I'm looking for an engineering internship in Ireland for summer 2027.

**Live site: [mykolamats1uk.github.io](https://mykolamats1uk.github.io)**

## What's on the site

| Page | What it shows |
|---|---|
| [Home](https://mykolamats1uk.github.io/) | Who I am, my bio, highlights and my three projects |
| [About](https://mykolamats1uk.github.io/about.html) | Education, awards, certifications, experience, skills and languages |
| [Sentinel robot](https://mykolamats1uk.github.io/projects/sentinel.html) | A two-robot air-quality monitor for the E3 MakerSpace, with scroll-driven exploded views of both robots |
| [2 m glider](https://mykolamats1uk.github.io/projects/glider-2m.html) | My first major glider, designed and built by hand |
| [3 m glider](https://mykolamats1uk.github.io/projects/glider-3m.html) | An FPV glider I'm building now |

## How it's built

- Plain HTML and CSS with no framework and no build step, hosted on GitHub Pages.
- Animation with vanilla JavaScript plus self-hosted [GSAP](https://gsap.com) and [Lenis](https://lenis.darkroom.engineering). No trackers and no external scripts.
- Self-hosted fonts: Archivo, IBM Plex Sans and IBM Plex Mono.
- Every page works without JavaScript, and all motion switches off when a visitor's device is set to reduce motion.
- The exploded views use SolidWorks renders of my CAD models, cut out and layered as WebP images.

## Folder structure

```
index.html, about.html     Home and About pages
projects/                  Projects list and one page per project
css/style.css              Site styles
css/explode.css            Exploded-view styles (Sentinel page only)
js/site.js                 Scroll animations and the header
js/explode.js              Exploded-view animation (Sentinel page only)
js/vendor/                 Self-hosted GSAP, ScrollTrigger and Lenis
images/                    Photos, backgrounds and exploded-view layers
fonts/                     Self-hosted fonts (SIL Open Font License)
content/                   My notes for each page: the facts the pages are written from
CLAUDE.md                  Design and writing rules for the site
```

## Run it locally

From the project folder:

```bash
python -m http.server 8765
```

Then open [http://127.0.0.1:8765](http://127.0.0.1:8765).

## Contact

- Email: [matsiukm@tcd.ie](mailto:matsiukm@tcd.ie)
- LinkedIn: [Mykola Matsiuk](https://www.linkedin.com/in/mykola-matsiuk-b7b0a23a3)
