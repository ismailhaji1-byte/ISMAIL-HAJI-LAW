# ISMAIL HAJI LAW OFFICE — Static website

**Primary free website:** https://ismail-haji-law-office.pages.dev/en/

**Secondary Cloudflare address:** https://ismail-haji-law.avvismailhaji1.workers.dev/en/

- Primary hosting: Cloudflare Pages project `ismail-haji-law-office`.
- Pages domain: `ismail-haji-law-office.pages.dev`.
- Pages build: `npm run build`; output directory `dist`; Node.js `22`.
- Git source: https://github.com/ismailhaji1-byte/ISMAIL-HAJI-LAW
- Production branch: `main`.
- Secondary hosting: Cloudflare Worker `ismail-haji-law` with Workers Static Assets.
- Cloudflare account and office email: `avvismailhaji1@gmail.com`.
- Vercel also has a READY backup deployment, but the office PC's tested network timed out on TCP 443 to Vercel IPs. Use the Cloudflare Pages URL first.
- Office phone / WhatsApp: `+252 61 5811256`.

Cloudflare Pages is connected to GitHub; pushes to `main` are configured to trigger production deployments. The separate Workers Static Assets deployment is retained as a second Cloudflare address. No paid custom domain has been purchased.

## Build and deploy

Node.js 22.

```bash
npm install
npm test
npm run build
```

The static site is generated in `dist/`. Cloudflare Pages publishes that directory. The Worker can also be deployed separately with `npx wrangler deploy`.

## Visitor contact

The site offers WhatsApp, email and phone contact. The office confirms appointment times manually. There is no online booking calendar, enquiry form, database or secure client document upload. Do not ask visitors to send confidential information through ordinary WhatsApp or Gmail.

## Content

Five Somali editorial articles and ten fictional English learning case studies. The cases are not real judgments. A qualified lawyer must review all legal material and confirm publication permissions.

Read `docs/OWNER-HANDOVER-SO.md` for account status, backups, recovery steps and outstanding items.
