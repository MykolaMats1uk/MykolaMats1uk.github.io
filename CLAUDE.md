# CLAUDE.md

Personal engineering portfolio, hosted on GitHub Pages. The owner is a second-year mechanical engineering student applying for summer 2027 internships in Ireland.

## Rules

- Plain HTML and CSS only. No frameworks and no build step. The one exception is the self-hosted animation scripts below.
- Mobile first: base styles target phones, and `min-width` media queries add wider layouts.
- Images go in `/images`, resized to about 1600 px wide, with descriptive alt text.
- Remove location and other metadata from images before adding them. Original photos stay outside the repo.
- No trackers or external scripts. This also covers external fonts and embedded video players. Fonts are self-hosted in `/fonts`.
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
├── fonts/                (self-hosted WOFF2, SIL Open Font License)
├── js/site.js
├── js/vendor/{gsap,ScrollTrigger,lenis}.min.js
├── images/{profile,sentinel,glider-2m,glider-3m,backgrounds}/
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
- Rounded corners (12–20px) and pill-shaped buttons.
- Dark photo bands, after the engineer portfolios on sitebuilderreport.com/inspiration/engineer-portfolios: the home hero (full width, name in cream over a darkened photo, round portrait), the home Projects band, and the footer on every page. Dark-band tokens are `--dark`, `--on-dark`, `--muted-on-dark`, `--line-on-dark` and `--accent-bright`; add the `on-dark` class for light-on-dark buttons.
- Background pictures come only from the owner's own photos, turned into warm duotones in `images/backgrounds/` and darkened with a solid overlay (no gradients). Never stock images.
- The home hero has an engineering drawing of a wing section (inline SVG, class `draw`). It is decoration only: never label it with a specific airfoil or numbers that could be read as a project spec.
- Motion: one focal moment on the home page, the wing section drawing itself while the name rises letter by letter. Every page shares the same motion language:
  - Page titles (`.hero h1`, `.page-head h1`) rise letter by letter; section headings and the footer call to action rise word by word out of a mask (`splitText()` in `js/site.js`; the plain text stays in `aria-label`; headings containing links are left alone).
  - Report-section dividers draw across from the left, then the section content rises; lists tick in item by item; title-block rows fill in one by one.
  - Photos are revealed with clip-path wipes: covers top to bottom, gallery photos bottom up, Projects-page photos sideways (alternating sides), portraits bottom up.
  - The About timeline line draws down with scroll; previous/next project links slide in from their own side.
  - Nav underline slides to the hovered link; buttons give press feedback and their arrows nudge; slow background parallax; photo zoom inside the frame on card hover (the card itself never moves).
- Design references for motion and components: motion.dev, animejs.com, kokonutui.com and 21st.dev, used for ideas only. Build every effect with the existing GSAP/CSS; do not add their libraries.
- Home page components: a ruled spec strip of labelled cells under the hero (`.spec-strip`) and a static tools strip (`.tools-list`). No auto-scrolling tickers or marquees.
- When CSS or JS changes, bump the `?v=` number on the `style.css` and `site.js` links in every page so browsers fetch the new files.
- The owner tried a bold chocolate/copper theme with square corners and rejected it: keep this warm, softer design.
- Scroll animations must never hide content by default: elements are hidden only at the moment they scroll into view (see `reveal()` in `js/site.js`).
- Home page project photos stay small (three cards with 16:9 thumbnails) so the projects don't dominate; the Projects page uses the larger alternating rows.
- Type: Archivo (`--display`) for headings, IBM Plex Sans (`--sans`) for body text, navigation and buttons, IBM Plex Mono (`--mono`) only for data: specs, dates, table labels, figure labels and meta lines. Never use monospace as decoration.
- Inner pages (About, Projects and each project) open with a dark photo header band (`.page-head`, one background per page via `.page-head--<name>`), followed by report-style sections (`.doc-section`): heading in a sticky left column, content on the right on desktop.
- Project pages: breadcrumb, title, one-line summary and the "title block" table (status, dates, role, key specs) in the header band, then the cover figure, numbered figures with captions, and previous/next project links (`.pager`) at the bottom.
- Education, experience and teams use timeline entries (`.entry`).
- Copy is first person, plain and specific. Rewording facts is fine; adding new facts is not.
- Status is written out as "Finished" or "In progress", never shown by colour alone.
- One column on phones, wider grids on larger screens.
- Photo-led and bold, after the reference portfolios katieheinemann.space, davisryan.tech and ramitkrishnan.com: a large-name hero with a photo, numbered section heads ("01 Projects"), project rows on the Projects page that alternate photo and text sides with big titles and "View project" buttons, numbered interest lists, and a warm sand footer with a contact call to action.
- Projects without photos show an empty drawing-sheet grid with a TODO, never a stock image.
- Photos of events: blur or crop out bystanders and anything identifying, such as number plates, before adding them.
- No gradients, heavy shadows, stock icons or skill percentage bars.
