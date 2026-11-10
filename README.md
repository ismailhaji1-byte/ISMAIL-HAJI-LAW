# ADV. ISMAIL HAJI LAW OFFICE — ismailhajilaw

English-only static website for the law office, including generated public pages, search data, a WordPress content handover, and project documentation.

## Build and test

Requires Node.js 22 or later. There are no third-party runtime dependencies.

```bash
npm test
npm run build
```

The build writes the deployable static website to `dist/`. It generates the 32 English pages, assets, search index, security headers, 404 page, and WordPress draft blocks.

## Cloudflare Pages

For Git integration, select this repository and branch `main`, choose **No framework**, set the build command to `node scripts/build.mjs`, and set the output directory to `dist`. Request the project name `ismailhajilaw`; Cloudflare will assign the `pages.dev` subdomain if that name is available.

## Important before public use

The contact form currently validates in the browser only. It does not send, store, or transmit enquiries. Do not use it for confidential client information until a secure backend and privacy process are configured.

Legal articles and case studies are editorial/educational drafts. A qualified lawyer must review and approve them before publication as professional advice or real court records. Hypothetical cases must remain clearly labelled as hypothetical.
