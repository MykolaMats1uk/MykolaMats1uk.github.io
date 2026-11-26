# CLAUDE.md

Personal engineering portfolio, hosted on GitHub Pages. The owner is a second-year mechanical engineering student applying for summer 2027 internships in Ireland.

## Rules

- Plain HTML and CSS only. No frameworks and no build step.
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
├── images/{profile,sentinel,glider-2m,glider-3m}/
├── content/{site,home,about,sentinel,glider-2m,glider-3m}.md
├── .nojekyll
├── CLAUDE.md
└── README.md
```

- Use relative links, so pages also work when opened locally.
- The header and footer are repeated in every page. When changing one, update all pages.
- No JavaScript is needed for version 1.

## Visual direction

Engineering report meets drawing sheet: clean and technical, not generic.

- Off-white background, near-black text, thin rules and one blueprint-blue accent.
- System sans-serif for text; system monospace for specs, dates and figure labels.
- Project pages open with a "title block" table (status, dates, role, key specs), followed by numbered figures with captions.
- Status is written out as "Finished" or "In progress", never shown by colour alone.
- One column on phones, wider grids on larger screens.
- No gradients, heavy shadows, stock icons or skill percentage bars.
