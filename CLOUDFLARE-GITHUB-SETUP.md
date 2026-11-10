# Cloudflare Pages + GitHub deployment

This project is a static HTML website. It has no third-party runtime dependencies.

## Recommended: Git integration (keeps GitHub connected)

1. Extract the complete project ZIP on your computer.
2. Put the extracted project files (including the `src/`, `content/`, `scripts/`, `tests/` and `package.json` folders/files) into the GitHub repository `ISMAIL-HAJI-LAW` and commit them to `main`.
3. In Cloudflare Dashboard, open **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
4. Authorize Cloudflare's GitHub app for this repository only, then select `ISMAIL-HAJI-LAW`.
5. Use project name `ismailhajilaw` if available. Select **No framework**.
6. Set **Build command** to `node scripts/build.mjs`.
7. Set **Build output directory** to `dist`.
8. Deploy. Cloudflare will assign a free `*.pages.dev` address; the exact `ismailhajilaw.pages.dev` name is available only if it is not already taken.

The Git connection automatically builds future commits pushed to the production branch. Cloudflare's Git integration and Direct Upload are different project modes; Cloudflare documents that a Direct Upload project cannot later be switched to Git integration. Choose Git integration for the requested GitHub-connected workflow.

## Alternative: one-time Direct Upload

The separate `ismailhajilaw-cloudflare-pages.zip` contains only the already-built static website. Cloudflare's Direct Upload dashboard accepts a ZIP archive. This is not the recommended path when automatic GitHub deployments are required.

## Before public use

- The contact form is still a browser-side validation demo. It does not email, save or transmit enquiries.
- Legal summaries and case studies are editorial drafts; have a qualified lawyer review and approve them before presenting them as official legal advice or real court decisions.
- Never put API keys, passwords or private client information in the public repository.
