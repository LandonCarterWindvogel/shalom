# Shalom Designs

> A production-ready static website for Shalom Designs — school uniforms, embroidery, custom clothing and related work in the Garden Route, South Africa.

[![Live preview](https://img.shields.io/badge/Live%20preview-GitHub%20Pages-082b73?style=for-the-badge)](https://landoncarterwindvogel.github.io/shalom/)
[![Production](https://img.shields.io/badge/Production-shalomdesigns.co.za-c9a24a?style=for-the-badge)](https://shalomdesigns.co.za/)

## Project standards

This repository is intentionally framework-free. It uses semantic HTML5, modern CSS, native ES modules and small focused JavaScript modules.

- **No frontend framework:** vanilla HTML, CSS and JavaScript.
- **Architecture:** page markup → feature modules → `data/` → pricing service.
- **Styling:** layered CSS (`base`, `layout`, `components`, `pages`) with shared design tokens.
- **Accessibility:** skip navigation, semantic landmarks, keyboard-visible focus, meaningful image alternatives and reduced-motion support.
- **Security:** DOM updates prefer `textContent` / DOM APIs over HTML injection; production security headers are maintained in `_headers` for Netlify.
- **SEO:** semantic document structure, page-specific metadata, canonical URLs, Open Graph metadata, `robots.txt` and `sitemap.xml`.
- **Performance:** responsive images, lazy loading for below-the-fold media, `fetchpriority="high"` for the hero and minimal JavaScript dependencies.

## Repository structure

```text
.
├── .github/
│   └── workflows/
│       └── deploy-pages.yml     # GitHub Pages CI/CD
├── css/
│   ├── base.css                 # reset, tokens, typography, utilities
│   ├── layout.css               # page structure and responsive layout
│   ├── components.css            # reusable UI components
│   └── pages.css                # page-specific presentation
├── data/
│   ├── images.js                # product image mapping
│   └── pricing.js                # catalogue and pricing source of truth
├── images/                      # optimised site media
├── js/
│   ├── main.js                  # application entry point
│   ├── pricing.js               # pricing domain service
│   └── ...                      # focused feature modules
├── scripts/
│   └── build-pages.py           # GitHub Pages project-path build step
├── about.html
├── contact.html
├── index.html
├── school-uniforms.html
├── services.html
├── shop.html
├── 404.html
├── _headers                     # Netlify security headers
├── _redirects                   # Netlify clean URLs
├── robots.txt
└── sitemap.xml
```

## Development

No build toolchain is required for normal development.

Open the project with a local static server so ES modules behave exactly as they do in production. For example, in VS Code use Live Server, or run any equivalent static HTTP server from the repository root.

The production site can continue using Netlify. GitHub Pages is provided as an automatic public preview and deploys from `main` through GitHub Actions.

## GitHub Pages

Every push to `main` runs `.github/workflows/deploy-pages.yml`.

The workflow creates a deployment copy of the static site, rewrites root-relative URLs and clean Netlify routes for the `/shalom/` project-site path, uploads the result as a Pages artifact, and deploys it with GitHub's Pages deployment actions.

Live preview:

**https://landoncarterwindvogel.github.io/shalom/**

GitHub Pages supports custom workflows through Actions; the official workflow pattern uses `configure-pages`, `upload-pages-artifact` and `deploy-pages`. citeturn260825search1turn260825search2

## Updating catalogue data

Product and pricing content belongs in `data/pricing.js`. Image mappings belong in `data/images.js`.

Keeping catalogue data separate from presentation means a price change does not require editing multiple page templates.

## Deployment model

The repository supports two deployment targets:

1. **Netlify / production** — retains the existing `_redirects` and `_headers` behaviour.
2. **GitHub Pages / preview** — builds a deployment copy under the repository's project-site path and publishes it automatically from `main`.

Do not put API keys, passwords, private customer information or other secrets into this repository. Public static files are visible to anyone with access to the repository.

## Contributing

Keep changes small and intentional. Prefer one concern per commit, preserve semantic HTML and accessibility, avoid unnecessary dependencies, and update the source-of-truth data instead of duplicating catalogue values across templates.
