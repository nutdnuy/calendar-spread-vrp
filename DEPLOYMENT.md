# GitHub Pages deployment

- Repository: https://github.com/nutdnuy/calendar-spread-vrp
- Published path: https://nutdnuy.github.io/calendar-spread-vrp/
- Branch: `main`
- Workflow: **Publish book** in `.github/workflows/pages.yml`

A push to `main` installs locked dependencies, runs the numerical checks, exports `_site/`, and deploys it through GitHub Pages. For initial setup, set **Settings → Pages → Source** to **GitHub Actions**.

Before pushing, run the checks in `EDITING.md`. A successful local build does not establish that the public site has changed; verify the workflow and live URLs after deployment.
