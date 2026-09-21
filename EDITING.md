# Editing the site

Edit the root Markdown lessons, `_toc.yml`, `_config.yml`, `src/`, and maintained assets. Root HTML, `app.js`, `site.js`, `search-index.js`, `build-manifest.json`, and `_site/` are generated.

The Greek explorer uses `src/math.mjs` and `src/calendar-lab.jsx`. Source figures from the user-supplied paper live in `assets/images/source-figures/` and must remain source-faithful.

## Checks

```sh
npm test
npm run build:pages
npm run dev
npm run check:site
git diff --check
```

State whether Theta is annual or daily and whether Vega/Rho is per unit or per percentage point. Separate simulated results from observed market data. Sampling error and model error are different; more simulated paths do not validate the market model.
