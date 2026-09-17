# Shalom Designs

This is the website I am building for **Shalom Designs** — a South African business working with school uniforms, embroidery, custom clothing and related services in the Garden Route.

I am treating this project as both a real client-facing build and a serious portfolio piece. The goal is not just to make the site look expensive. It needs to be easy to use, easy to maintain and reliable when the catalogue grows.

[![Live preview](https://img.shields.io/badge/Live%20preview-GitHub%20Pages-082b73?style=for-the-badge)](https://landoncarterwindvogel.github.io/shalom/)
[![Production](https://img.shields.io/badge/Production-shalomdesigns.co.za-c9a24a?style=for-the-badge)](https://shalomdesigns.co.za/)

## What I am building

The site brings together:

- school uniforms
- catalogue products
- embroidery and custom clothing services
- pricing and size information
- business information and contact options
- a structured shopping experience

One of my biggest priorities is keeping the catalogue trustworthy. If a product exists in the source data, I do not want a redesign, chatbot or clever UI decision quietly making it disappear.

## How I built it

I deliberately kept the project framework-free:

- **HTML5** for semantic page structure
- **CSS** split into base, layout, component and page layers
- **Native ES modules** for focused JavaScript functionality
- **Data files** for catalogue and pricing information
- **Small services/modules** instead of one enormous JavaScript file

The basic flow is:

```text
Page markup → feature modules → data → pricing service
```

That separation matters because changing a school uniform price should not require hunting through six different HTML pages hoping I remembered every occurrence.

## Accessibility

I want the site to work for people, not just screenshots.

The implementation includes:

- skip navigation
- semantic landmarks
- visible keyboard focus
- meaningful image alternatives
- reduced-motion support
- accessible navigation and controls
- responsive layouts for small and large screens

## Security

I keep client-side DOM updates on the safer side of the fence by preferring `textContent` and DOM APIs over unnecessary HTML injection.

Netlify security headers are maintained in `_headers` for the production deployment.

I do not put API keys, passwords, private customer information or other secrets into this repository. If something needs to stay secret, it does not belong in a public static file.

## SEO and performance

I have built the technical foundations into the site rather than leaving SEO as a final-minute checkbox:

- page-specific titles and descriptions
- canonical URLs
- Open Graph metadata
- `robots.txt`
- `sitemap.xml`
- semantic HTML
- structured content
- responsive images
- lazy loading for below-the-fold media
- high priority loading for the hero image
- minimal JavaScript dependencies

The objective is straightforward: give search engines useful information and give users a fast website.

## Repository structure

```text
.
├── .github/workflows/
│   └── deploy-pages.yml
├── css/
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   └── pages.css
├── data/
│   ├── images.js
│   └── pricing.js
├── images/
├── js/
│   ├── main.js
│   ├── pricing.js
│   └── ...
├── scripts/
│   └── build-pages.py
├── about.html
├── contact.html
├── index.html
├── school-uniforms.html
├── services.html
├── shop.html
├── 404.html
├── _headers
├── _redirects
├── robots.txt
└── sitemap.xml
```

## Catalogue data

The source of truth for product and pricing information is `data/pricing.js`.

Image mappings live in `data/images.js`.

I keep this data separate from the page templates so the catalogue can change without turning every content update into a full website surgery session.

## Development

I do not need a large build toolchain just to work on the site.

I use a local static HTTP server so native ES modules behave properly. VS Code Live Server works well, but any equivalent static server from the repository root is fine.

## Deployment

I currently support two deployment targets:

1. **Netlify** for the production site, including `_redirects` and `_headers`.
2. **GitHub Pages** as an automatic public preview from `main`.

Every push to `main` runs `.github/workflows/deploy-pages.yml`, which creates the `/shalom/` project-site version and publishes it through GitHub Pages.

Preview:

https://landoncarterwindvogel.github.io/shalom/

Production:

https://shalomdesigns.co.za/

## A note to future me

If I am about to duplicate a price in three HTML files, stop.

If I am about to add a framework because one component feels annoying, stop.

If I am about to "clean up" the catalogue by removing something that looks unnecessary, check the actual business data first.

And if the school uniforms page suddenly starts scrolling sideways, I should probably investigate the CSS before declaring that the browser has personally offended me.

Keep the data accurate, keep the code modular, test the actual pages and make changes for a reason.
