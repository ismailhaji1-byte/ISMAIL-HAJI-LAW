# ismailhajilaw

A complete English-only static legal website project with a Cloudflare Pages-ready production build and WordPress.com Free handover. Updated 5 November 2026: reference-led dark and gold layout, Somalia-only content and the user-supplied profile photograph.

## Deploy the public static website

The deployable files are in `dist/`. The project uses no third-party runtime packages.
For Cloudflare Pages Direct Upload, upload the contents of `dist/` (or the provided
`ismaillaw-cloudflare-pages.zip`) as static assets. The free Pages subdomain is assigned
by Cloudflare after the project is created; `ismailhajilaw.pages.dev` is only available
if that Pages project name is not already taken. Request project name `ismailhajilaw`; if the exact subdomain is already in use, Cloudflare will require another available name.

The public contact form currently validates in the browser only. It does not email,
store, or transmit enquiries. Telephone, email and WhatsApp links work on click.
Do not publish confidential client details.

## Open the local preview

On Windows, double-click `START-WEBSITE.cmd`. It starts the existing built website in a hidden background process, or reuses it if it is already running. Open http://127.0.0.1:4173/en/ and refresh your browser. You may close the launcher window. Run it again after restarting Windows; this does not install a Windows service or publish anything. Startup logs are in `artifacts/preview-server*.log`.

Alternatively, start the background preview from PowerShell with `node scripts/start-preview.mjs`.

For rebuilding and running a foreground development server:

From `D:\ISMAILHAJI` in PowerShell:

```powershell
node scripts/build.mjs
node scripts/serve.mjs
```

- English: http://127.0.0.1:4173/en/
- Stop the server with Ctrl+C in its terminal. If port 4173 is occupied by this preview, reuse it.
- Requires Node 22 or later. Tested with Node 24.22.1. No npm installation or third-party dependencies.
- Serve over HTTP; opening individual HTML files through `file://` will not support root-relative links or search.
- The server binds only to loopback. Nothing is published or accessible as a public website.

## What is built

32 fully rendered English content pages. This includes Home, About, Practice Areas, all nine practice details, Articles, Cases, News, Research, Resources, Contact, Search, Privacy, Legal Notice, Editorial Standards, and 10 individual library records. A root entry and a real HTTP 404 page are also included.

The initial library contains three articles, four clearly fictional Somali case studies, one historical news item, one research checklist, and one historical constitutional resource. Two Somali source records preserve provenance and access limitations. All legal summaries remain editorial drafts pending qualified human review.

Search supports keywords and original source terms, case number/court text, content type, topic, jurisdiction and date. It is a local lexical search, not AI. The contact form is a validation demonstration: it sends and saves nothing. Telephone, email and WhatsApp links are wired correctly and open their respective services only when clicked by the visitor.

## Project map

| Location | Purpose |
| --- | --- |
| `content/site.mjs` | Contact details, all interface labels, nine practice subjects |
| `content/library.mjs` | English editorial records, original case fields and source registry |
| `src/templates.mjs` | Reusable page, header, footer, card and source components |
| `src/partials/` | Editable English About, Contact, Search and policy page copy |
| `src/styles.css`, `src/premium.css` | Responsive design system, focus styles, print and reduced-motion rules |
| `src/app.js`, `src/search-core.js` | Small browser interactions and deterministic search |
| `src/assets/` | One supplied profile photograph and two illustrative JPGs, SVG legal artwork and favicon; no remote images/fonts |
| `scripts/build.mjs` | Static production build and English search index |
| `scripts/serve.mjs` | Loopback-only preview server and response security headers |
| `scripts/wordpress.mjs` | Native content-block drafts and migration map |
| `dist/` | Generated local preview; rebuild instead of editing directly |
| `wordpress/` | 32 native block drafts, manifest and target URL mapping |
| `architecture/` | Future database and AI design inputs; no service is provisioned |
| `tests/` | Meaningful route, source-model, search and safety checks |
| `docs/` | Migration, compatibility, editorial, security and test documentation |

## Checks

```powershell
node --test tests/site.test.mjs tests/architecture.test.mjs
node scripts/check-http.mjs
```

The second command expects the local server to be running. See `docs/TEST-RESULTS.md` for actual results and limitations.

## Read before launch

1. `docs/WORDPRESS-COMPATIBILITY.md`: what Free supports and what changes.
2. `docs/WORDPRESS-MIGRATION.md`: the manual page/post and design workflow.
3. `docs/CONTENT-AND-SOURCES.md`: legal source limits and required reviews.
4. `docs/ADMINISTRATION.md`: daily editorial workflow using native WordPress.
5. `docs/AI-ARCHITECTURE.md`: future RAG, database and verification design.
6. `docs/SECURITY-AND-SEO.md`: privacy, security and SEO decisions.
7. `docs/DELIVERY-STATUS.md`: completion inventory and outstanding work.

This repository is not an uploadable WordPress.com Free theme. The standalone CSS and JavaScript stay with the local preview. WordPress Free must use its native editor and allowed theme features. No account was created, no credentials requested, no messages sent, no paid service activated and nothing published.
