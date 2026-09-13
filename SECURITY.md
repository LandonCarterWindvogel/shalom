# Security

Shalom Designs is a public static website repository. Do not commit secrets, passwords, API keys, private customer information or credentials.

## Reporting a security issue

Please do not publish sensitive details in a public issue. Contact the repository owner privately through GitHub before disclosing a vulnerability.

## Development security baseline

- Keep all external resources on HTTPS.
- Prefer DOM APIs and `textContent` for dynamic content.
- Validate and constrain user-controlled data before using it.
- Never place secrets in client-side JavaScript; anything shipped to the browser is public.
- Keep the production Netlify `_headers` policy strict and review security headers when adding third-party resources.
- Keep third-party scripts to a minimum and review their permissions before introducing them.
