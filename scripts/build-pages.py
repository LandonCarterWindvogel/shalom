#!/usr/bin/env python3
"""Prepare the site for deployment as a GitHub Pages project site.

The production site uses Netlify clean URLs and root-relative asset paths.
GitHub Pages serves this repository below /shalom/, so the deployment copy
needs relative links and explicit .html page targets. The source files stay
unchanged and therefore remain compatible with the existing Netlify setup.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROUTES = {
    "/": "index.html",
    "/school-uniforms": "school-uniforms.html",
    "/services": "services.html",
    "/about": "about.html",
    "/contact": "contact.html",
    "/shop": "shop.html",
}

QUOTES = r'''["'`]'''


def rewrite(text: str) -> str:
    """Rewrite site-local URLs while leaving external URLs untouched."""
    for route, target in ROUTES.items():
        if route == "/":
            text = re.sub(rf'({QUOTES})/({QUOTES})', r'\1index.html\2', text)
            continue

        # Handle quoted route references in HTML and JavaScript, preserving
        # query strings and fragments such as /contact?item=foo#enquiry.
        pattern = rf'({QUOTES}){re.escape(route)}(?=[?#"\'`])'
        text = re.sub(pattern, rf'\1{target}', text)

    # Asset paths are identical on every root-level HTML page and in JS data
    # modules. Convert only quoted local paths.
    for directory in ("css", "js", "images", "data"):
        text = re.sub(
            rf'({QUOTES})/{directory}/',
            rf'\1{directory}/',
            text,
        )

    return text


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: build-pages.py <site-directory>", file=sys.stderr)
        return 2

    root = Path(sys.argv[1]).resolve()
    if not root.is_dir():
        print(f"Build directory does not exist: {root}", file=sys.stderr)
        return 1

    for path in root.rglob("*"):
        if path.suffix.lower() not in {".html", ".js"}:
            continue
        if not path.is_file():
            continue

        original = path.read_text(encoding="utf-8")
        rewritten = rewrite(original)
        if rewritten != original:
            path.write_text(rewritten, encoding="utf-8")

    print(f"Prepared GitHub Pages site: {root}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
