# Jeevan Reddy — DevOps Portfolio

Single-page portfolio built with React 19, Vite 7, Tailwind 3 and GSAP, plus four
case-study pages (Cloud Armor & load balancing, CI/CD pipeline, disaster recovery, Infrastructure as Code).

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run lint
npm test           # vitest: route helpers + case-study data integrity
npm run test:e2e   # Playwright: routing, axe accessibility, mobile overflow (set PW_CHROMIUM_PATH to reuse a local Chromium)
npm run build      # build for a root host (Netlify, Vercel, custom domain)
npm run build:ghpages  # build for https://<user>.github.io/The-Portfolio/
```

## Deploying

- **GitHub Pages** — `.github/workflows/deploy.yml` lints, runs unit and browser tests, builds with
  `--base=/The-Portfolio/` and publishes `dist/` to `gh-pages` on every push to `main`.
  `public/404.html` redirects deep links (e.g. `/case-studies/...`) back to the SPA.
- **Netlify / other root hosts** — use `npm run build`; `public/_redirects` provides the SPA fallback.

The deploy base is set at build time (`vite build --base=...`). All internal links and
the resume URL go through `src/lib/paths.js`, so never hardcode `/The-Portfolio/`.

## Content

Everything on the site should be traceable to `public/resume.pdf`. When the resume changes, update
the experience, skills, stats and case-study text to match.

- **Resume** — drop your PDF at `public/resume.pdf`. The Resume buttons in the navbar and
  hero only appear when that file exists.
- **Case studies** — edit `src/data/caseStudies.js`; one template (`src/pages/CaseStudyPage.jsx`)
  renders them all. To add one, add an entry there, add its slug to `CASE_STUDY_SLUGS` in
  `src/lib/paths.js`, and link it from `src/components/SelectedWorks.jsx`. Tests fail if the
  two lists drift apart.
- **Smooth scrolling** — Lenis inertial scrolling plus a hero parallax (`src/lib/smoothScroll.js`, `HeroSection.jsx`). It is off for users with reduced-motion enabled, and touch devices keep native scrolling. Route in-page links through `scrollToTarget` rather than `scrollIntoView`.
- **Fonts** — self-hosted through `@fontsource` (imported in `src/main.jsx`), no third-party font requests.
- **Dependencies** — Dependabot opens monthly update PRs (`.github/dependabot.yml`).
- **SEO** — `index.html` (meta/OG tags), `public/og-image.png` (social preview, 1200×630),
  `public/sitemap.xml`, `public/robots.txt`. Update the URLs there if the site moves to a new domain.
