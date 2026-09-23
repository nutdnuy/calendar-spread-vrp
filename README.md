# Calendar Spread under VRP

A standalone QuantCorner reading site in Thai based on Triphop Mahithitarmmatorn's paper “การวิเคราะห์ค่ากรีกในกลยุทธ์ Calendar Spread ภายใต้สภาวะ Volatility Risk Premium”. The site organizes the research into five lessons plus an appendix, retaining the paper's equations, tables, figures, citations, and model limitations. It adds a deterministic Calendar Greek explorer.

- Website: https://nutdnuy.github.io/calendar-spread-vrp/
- Repository: https://github.com/nutdnuy/calendar-spread-vrp
- Local project: `~/Desktop/QuantConnet Content/calendar-spread-vrp`

## Run locally

```sh
npm ci
npm test
npm run build:pages
npm run dev
```

The preview runs at http://127.0.0.1:8767/. With it running, use `npm run check:site` for desktop/mobile, accessibility, search, theme, image, and interaction checks.

## Contents

| Source | Lesson |
| --- | --- |
| `intro.md` | Series landing page and VRP regime map |
| `foundations.md` | BSM, PDE, Martingale, Bachelier and Black-76 |
| `greeks.md` | Delta, Gamma, Theta, Vega, Rho and the Greek explorer |
| `calendar-structure.md` | Calendar structure, VRP and payoff |
| `experiment.md` | Parameters and stochastic setup |
| `results.md` | Results, tables, discussion and conclusion |
| `appendix-net-vega.md` | Reproducible Net Vega code and references |
| `glossary.md` | Stable definitions used across the site |

The source figures are retained unchanged under `assets/images/source-figures/`. Generated root HTML/JavaScript and `_site/` are build outputs.

## Public review

The web lessons include documented mathematical and editorial corrections. See [the September 2026 review](data/public-review-2026-09-23.md). Original source figures remain unchanged. `build:pages` validates equation references and local anchors; `check:site` checks actual desktop/mobile viewports in light and dark themes.

## Interactive visualizations

Four additional labs bring this series to five interactive labs. Each new lab supports reset, keyboard controls, responsive SVG and offline export. Line charts include a sample-value table.

- [Expiry P&L](calendar-structure.html#expiry-lab): Long European far Call less short near Call, settle near leg intrinsically, reprice far leg with residual IV; subtract initial debit grown at r until near expiry.
- [Time decay](calendar-structure.html#decay-lab): Spot and each IV fixed for all elapsed days 0..30; 30/180-day European Call legs; financed P&L at each point. This is a conditional scenario, not an expected path.
- [Separate IV shifts](results.html#iv-shift-lab): Exact BSM repricing versus first-order vegaLong*dIVLong-vegaShort*dIVShort, instantaneous shock at fixed spot and remaining maturity.
- [Local hedged carry](experiment.html#carry-lab): One-day local P&L: 0.5*GammaNet*S^2*(RV^2-IV^2)/365. Continuous Delta hedge with stock and option financing, fixed common IV, no transaction costs/jumps/IV shocks. Gamma frozen locally.

Implementation: `src/interactive-viz.jsx`, `src/viz-math.mjs`, and `src/viz-ui.jsx`. See `data/interactive-viz-provenance.json` for methods and assumptions. Numerical checks run through `npm test`; browser and offline checks through `npm run check:site`.
