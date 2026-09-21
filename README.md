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
