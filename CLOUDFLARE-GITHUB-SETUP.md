# Current deployment — Cloudflare Workers + GitHub

The site is deployed as a **Cloudflare Worker with Static Assets**, connected to GitHub through Cloudflare Workers Builds. It is not a Cloudflare Pages project.

- GitHub repo: `ismailhaji1-byte/ISMAIL-HAJI-LAW`
- Branch: `main`
- Worker: `ismail-haji-law`
- Current free URL: https://ismail-haji-law.avvismailhaji1.workers.dev/en/
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Static assets: `./dist`
- Account-level workers.dev subdomain: `avvismailhaji1`
- No custom paid domain is attached.

## Free branded subdomain
Workers URLs use `<worker-name>.<account-subdomain>.workers.dev`. Cloudflare says the account-level subdomain can be changed in Workers & Pages by selecting **Change** next to **Your subdomain**. If `ismailhajilaw` is available and the owner selects it, the new site URL is expected to be `ismail-haji-law.ismailhajilaw.workers.dev`. This setting is account-wide. Keep the existing URL until the new one is working. Name availability is not guaranteed.

Official guide: https://developers.cloudflare.com/workers/configuration/routing/workers-dev/

A domain such as `ismailhajilaw.com` is not free; it must be registered and renewed. No custom domain is currently owned or connected.

## Contact
WhatsApp `https://wa.me/252615811256`; phone `+252 61 5811256`; email `avvismailhaji1@gmail.com`. Consultations are arranged manually. There is no online booking calendar or functional form submission. Do not enable Cloudflare Access on the public website.

## Ownership and security
Cloudflare account: `avvismailhaji1@gmail.com`, sole accepted member, Super Administrator. Enable 2FA.
GitHub repository owner: `ismailhaji1-byte`; verify the office Gmail is a verified email on that account. The repo is public; consider making it private. Never store client details, passwords or keys in source files.
