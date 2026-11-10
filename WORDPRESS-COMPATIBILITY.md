# WordPress.com Free compatibility

Checked against official WordPress.com documentation on **3 November 2026**. Plan rules can change; recheck before a future launch. No account or hosted editor was opened. This is a documented compatibility assessment, not a successful deployment claim.

## Core finding

The site's content and information structure can be recreated on Free. The custom local visual implementation cannot be uploaded as a complete WordPress theme. Free requires native content and a theme available on that plan. An exact visual match and custom search are not promised. The current interface is English-only.

| Feature | Local result | WordPress.com Free alternative |
| --- | --- | --- |
| Pages, articles, cases, news | Fully rendered HTML | Native Pages and Posts, all initially Draft |
| Nine Somali practice subjects | Dedicated detail pages | Child Pages under Practice Areas |
| Legal record fields | Structured data + document details in a white single-column reading view | Visible heading/paragraph or Table blocks in a post; no custom post type required |
| Language configuration | English only; no language switcher or duplicated editions | Set site language to English; English pages/posts and navigation |
| Original case language | Original titles, court names, citations and optional original text retained without translation | Preserve original text/documents in posts; use English labels and retain source links |
| Exact fonts, global palette, spacing | Custom CSS and system fonts | Choose free theme defaults; use available per-block colors, typography and dimensions. Global Styles/custom CSS may prompt an upgrade |
| Hero and cards | Portrait-led hero, overlapping photographic cards and two-column sections | Group, Columns, Heading, Paragraph, Image, Buttons and Separator blocks |
| Original SVG assets | Served locally | Free media may reject SVG; use provided JPG artwork, or native text branding. Do not install an SVG plugin |
| Keyword search | English interface and original-source keyword index | Native Search block and category/archive navigation |
| Court, topic, case number/date filters | Local deterministic filters | Put searchable identifiers in post body/title and use categories/tags. No equivalent facet engine is claimed |
| Contact form | Validates locally; no submission/storage | Native Form block is included. Configure storage, notice and notifications only in a later authorized setup |
| Email/phone/WhatsApp | Working link targets | Native links/buttons; no Gmail connection needed |
| Documents | Original checklist download; third-party source links | File block for permitted formats, or checklist page; source links for other publishers’ texts |
| SEO | Per-page titles/descriptions, headings, English metadata, draft JSON-LD | Native titles/slugs, excerpts, alt text, internal links; arbitrary header code/meta controls are not equivalent |
| Analytics | None | Built-in WordPress.com statistics exist; Free documents a seven-day view. Review host privacy behavior before launch |
| Security | Loopback server, strict headers, no backend | WordPress.com manages hosting security and updates; owner manages access and editorial permissions |
| AI research, RAG, embeddings | Architecture only | No embedded custom backend on Free; link to a separately approved external research app in a future phase |
| Private client portal | Not built | Separate scope and hosting decision; do not use public WordPress posts for confidential case files |

## Current limits that affect the brand

The Free plan documents a WordPress.com address, 1 GB media storage, native editing and unlimited pages/posts. Free sites display platform advertising; the owner cannot promise an ad-free premium experience. Third-party theme uploads and plugins require a paid plan. The current support pages say plugin installation is available on **all paid plans**, not only Business. [Plan features](https://wordpress.com/support/plan-features/), [ads](https://wordpress.com/support/no-ads/), [plugin installation](https://wordpress.com/support/plugins/install-a-plugin/), [official free-address description](https://creatorshelp.automattic.com/documentation/wordpress-com-hosting-plans/).

Free sites allow a limited HTML set. Arbitrary `script`, `style`, `form`, `input` and iframe code is not the path for Free; built-in blocks can provide supported functionality without those custom code snippets. Custom CSS requires a paid plan. [Code restrictions](https://wordpress.com/support/code/).

Site-wide Styles are a paid-plan feature. Build the Free version with the selected theme’s defaults and available individual-block controls, checking the actual editor for prompts. Do not design the migration around custom font uploads or site-wide premium style changes. [Styles support](https://wordpress.com/support/using-styles/).

No multilingual tooling is required for the current site. Original case-language preservation is a content workflow, not automatic translation.

Native forms are documented on WordPress.com. The custom preview form is intentionally not a working delivery service; it must be replaced, not pasted as a custom HTML form. [Form block](https://wordpress.com/support/wordpress-editor/blocks/form-block/).

Search engines can use excerpts or page content for descriptions. The local custom descriptions are editorial inputs; per-page head control is not promised on Free. [SEO support](https://wordpress.com/support/seo/).

## Paid or external capabilities, if later wanted

- Custom CSS, uploaded themes, plugins and automated multilingual tooling: an eligible paid WordPress.com plan and possible plugin charges.
- Exact local application behavior: external static hosting or another host that allows application assets; free tiers may exist but are not provisioned or guaranteed here.
- RAG ingestion, scheduled source checks, OCR, vector search and AI generation: an approved backend, document storage, operational controls and potentially paid model/embedding services. A local offline experiment is possible without paid APIs, but no such runtime is installed here.
- Advanced analytics, custom domain, additional storage and ad removal: plan-dependent choices, all deferred.

No purchases are recommended as a condition for Phase 1. Use the native alternatives above first.


### Desktop layout on phones — 5 November update
The local build uses a custom 1280px viewport, CSS and a small scaling script. These cannot be assumed available in WordPress.com Free; its theme controls the mobile viewport and responsive layout. Native content drafts remain usable, but this exact phone presentation requires hosting that allows custom HTML/CSS/JavaScript.
