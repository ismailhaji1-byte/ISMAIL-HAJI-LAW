# ISMAIL HAJI LAW OFFICE — Static website

Live website: https://ismail-haji-law.avvismailhaji1.workers.dev/en/

- Hosting: Cloudflare Workers with Static Assets (not Cloudflare Pages).
- Worker: `ismail-haji-law`
- Source: https://github.com/ismailhaji1-byte/ISMAIL-HAJI-LAW
- Production branch: `main`
- GitHub owner login: `ismailhaji1-byte`
- Cloudflare account email and office email: `avvismailhaji1@gmail.com`
- Office phone / WhatsApp: `+252 61 5811256`

## Build and deploy
Node.js 22 or later.

```bash
npm install
npm test
npm run build
npx wrangler deploy
```

The static site is generated in `dist/`. Cloudflare Workers Builds is connected to GitHub. Verify the build and live site after deployment.

## Visitor contact
The site offers WhatsApp, email and phone contact. The office confirms appointment times manually. There is no online booking calendar, enquiry form, database or secure client document upload. Do not ask visitors to send confidential information through ordinary WhatsApp or Gmail.

## Content
Five Somali editorial articles and ten fictional English learning case studies. The cases are not real judgments. A qualified lawyer must review all legal material and confirm publication permissions.

Read `docs/OWNER-HANDOVER-SO.md` for account status, backups, recovery steps and outstanding items.
