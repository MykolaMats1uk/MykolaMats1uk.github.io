# CLAUDE.md

Personal engineering portfolio, hosted on GitHub Pages. The owner is a second-year mechanical engineering student applying for summer 2027 internships in Ireland.

## Rules

- Plain HTML and CSS only. No frameworks and no build step. The one exception is the self-hosted animation scripts below.
- Mobile first: base styles target phones, and `min-width` media queries add wider layouts.
- Images go in `/images`, resized to about 1600 px wide, with descriptive alt text.
- Remove location and other metadata from images before adding them. Original photos stay outside the repo.
- No trackers or external scripts. This also covers external fonts and embedded video players.
- Never invent numbers, dates or claims. Use only facts from files in `/content`.
- If a fact is missing, leave a visible TODO on the page instead of guessing.
- Everything in this repo is public, including `/content`. Do not add private details.

## Version 1 scope

- Home page with a short bio
- About page
- Projects index
- One page each for the Sentinel robot (finished), the 2 m glider (finished) and the 3 m glider (in progress)

Other projects come later.

## Structure

```
/
├── index.html
├── about.html
├── projects/
│   ├── index.html
│   ├── sentinel.html
│   ├── glider-2m.html
│   └── glider-3m.html
├── css/style.css
├── js/site.js
├── js/vendor/{gsap,ScrollTrigger,lenis}.min.js
├── images/{profile,sentinel,glider-2m,glider-3m}/
├── content/{site,home,about,sentinel,glider-2m,glider-3m}.md
├── .nojekyll
├── CLAUDE.md
└── README.md
```

- Use relative links, so pages also work when opened locally.
- The header and footer are repeated in every page. When changing one, update all pages.
- JavaScript is limited to motion: GSAP 3.15.1 + ScrollTrigger and Lenis 1.3.28, self-hosted in `js/vendor/` (never loaded from a CDN), driven by `js/site.js`. Every page loads them with `defer` before `</body>`.
- Motion is progressive enhancement only: every page must stay fully readable with JavaScript off, and `js/site.js` does nothing when the visitor prefers reduced motion. Keep animations subtle (short fades and slides); no scroll-jacking or pinned sections.

## Visual direction

Engineering report meets drawing sheet: clean and technical, not generic.

- Warm palette sampled from the owner's portrait (`images/profile/mykola-matsiuk.jpg`): cream paper background (`--bg`, from the shirt), warm sand panels and footer (`--tint`), espresso text (`--text`), hair-brown secondary text (`--muted`), skin-tone lines (`--line`) and one copper accent (`--accent`, from the warm lights) for links and buttons. All colours are tokens in `:root` in `css/style.css`; keep every text colour at WCAG AA (the token comments list the ratios).
- Theme browser surfaces from the palette too: text selection, caret, scrollbar and accent colour.
- Rounded corners (12–20px) and pill-shaped buttons; the home hero is a warm drawing-sheet panel with a round portrait (`images/profile/`).
- Scroll animations must never hide content by default: elements are hidden only at the moment they scroll into view (see `reveal()` in `js/site.js`).
- Home page project photos stay small (three cards with 16:9 thumbnails) so the projects don't dominate; the Projects page uses the larger alternating rows.
- System sans-serif for text; system monospace for specs, dates and figure labels.
- Project pages open with a "title block" table (status, dates, role, key specs), followed by numbered figures with captions.
- Status is written out as "Finished" or "In progress", never shown by colour alone.
- One column on phones, wider grids on larger screens.
- Photo-led and bold, after the reference portfolios katieheinemann.space, davisryan.tech and ramitkrishnan.com: a large-name hero with a photo, numbered section heads ("01 Projects"), project rows on the Projects page that alternate photo and text sides with big titles and "View project" buttons, numbered interest lists, and a warm sand footer with a contact call to action.
- Project pages: heading and title block side by side on desktop, then a large cover photo, then sections with a two-column gallery of numbered figures.
- Projects without photos show an empty drawing-sheet grid with a TODO, never a stock image.
- Photos of events: blur or crop out bystanders and anything identifying, such as number plates, before adding them.
- No gradients, heavy shadows, stock icons or skill percentage bars.
