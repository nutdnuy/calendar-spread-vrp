# Calendar Spread public review — 2026-09-23

Scope: targeted corrections to public lesson prose, equations, and attribution. Original figure assets remain unchanged. This maintenance note is outside the Pages export allowlist.

## Corrections

- Removed the repeated import/conversion banner (parent task).
- Corrected positive Net Vega: a common IV rise adds value; a common fall reduces value. Distinguished a parallel IV shift from differing changes in the two maturities.
- Removed advice to enter because IV is about to fall and unqualified claims of consistent profits.
- Corrected Theta at identical remaining maturity: original maturity T0 does not enter the BSM Greeks. Corrected Net Theta as LONG minus SHORT.
- Qualified Net Greek signs and VRP regime claims by moneyness and model assumptions. IV > RV does not itself mean IV is high or predict its future direction.
- Distinguished the website's simplified IV minus RV volatility spread from the variance premium (and sign convention) studied by Carr and Wu. Removed the unverified 3–5% numeric claim.
- Removed the unverified Cahill (2020) citation and associated empirical-return claim; exact-title searches did not establish a primary publication record. This is not a finding that the source cannot exist.
- Labeled the IV pricing model and RV simulation as different models. A measure change does not replace the diffusion coefficient of one GBM. Added Delta hedging, fixed IV, financing, and excluded-cost/jump assumptions to the P&L interpretation.
- Replaced calendar dates with the 30/180-day maturities actually used by the displayed calculations.
- Distinguished P&L (net of initial debit) from payoff and financing-adjusted P&L. Retained the source graph, noting its title says Payoff while its vertical axis is Profit / Loss. Added residual IV notation and removed the assertion that the ATM peak must be positive.
- Removed the incorrect edition number attached to the 1994 Natenberg reference; retained author/title/year from existing bibliography.
- Added visible figure numbers 1–9, table labels 2/9/10 where cited, and direct cross-page links. Corrected a Greek discussion reference from figure 5 to figure 6. Promoted Calendar headings to a sequential accessible hierarchy.

## Evidence

- Options Industry Council, Long Call Calendar Spread: https://www.optionseducation.org/strategies/all-strategies/long-call-calendar-spread-call-horizontal (accessed 2026-09-23). Describes positive effect of common IV increases and differing IVs by maturity.
- Carr and Wu, Variance Risk Premiums, Review of Financial Studies 22(3), 1311–1341, DOI https://doi.org/10.1093/rfs/hhn038 (primary abstract checked 2026-09-23). Defines its empirical premium using realized variance minus variance swap rate.
- McGraw-Hill first-edition listing confirms the edition correction: https://www.mheducation.com/highered/mhp/product/option-volatility-pricing-advanced-trading-strategies-techniques.html (accessed 2026-09-23).
- Algebraic checks use existing BSM formulas and src/math.mjs. For S = K = 100, r = 2%, Tshort = 30/365, Tlong = 180/365, reducing common IV from 20% to 19% changes spread value from 3.7071396400 to 3.5439197540.
- All nine Net Vega table rows (K 80 to 120 in steps of 5) match src/math.mjs to the displayed two decimals.

## Limits

This is a scoped public-readiness pass, not an independent replication of the source paper or its original figure-generation pipeline. Original images were not altered. The supplied IV/RV figure is illustrative simulated data; this pass did not recover its generating code or random seed. Cross-reference rendering, browser QA, and deployment are handled by the parent task.
