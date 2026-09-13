# Contributing

Thank you for helping keep Shalom Designs maintainable.

## Before you change code

Read the relevant HTML page, feature module and source-of-truth data file before editing. Avoid duplicating pricing, product names or routes across multiple places.

## Code expectations

- Use semantic HTML and preserve the existing heading hierarchy.
- Keep CSS mobile-first and reuse the design tokens in `css/base.css`.
- Keep JavaScript modular and dependency-free unless there is a strong reason to add a dependency.
- Prefer safe DOM APIs such as `textContent`, `createElement` and `URLSearchParams` for dynamic content.
- Do not introduce inline event handlers or unsafe HTML injection.
- Respect `prefers-reduced-motion` for new animations.
- Test keyboard navigation and narrow mobile layouts before merging.

## Commit style

Use clear, scoped commit messages, for example:

```text
feat: add embroidery service section
fix: correct Formosa rainsuit price
perf: lazy-load partner imagery
refactor: simplify quote form validation
docs: update deployment notes
```

## Deployment

Pushes to `main` deploy the GitHub Pages preview automatically through `.github/workflows/deploy-pages.yml`. Production deployment remains independent.
