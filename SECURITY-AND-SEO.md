# Security, privacy, SEO and performance

## Local protections implemented

The preview server listens on `127.0.0.1` only and serves files exclusively from `dist`. Path containment and real-path checks restrict traversal. Only GET/HEAD are accepted; there is no message-delivery endpoint or storage API. The server does not log request URLs or form content. Browser search reads a local JSON file without credentials.

Response headers include Content Security Policy, `nosniff`, `no-referrer`, restricted camera/microphone/geolocation permissions and no-index instructions. CSP disallows external script/network origins, objects, framing and all HTML form submissions. Homepage search uses a script-controlled same-origin navigation; the contact form only validates and resets. Inline JSON-LD has a generated CSP hash. Styles permit inline values used by the static templates; scripts do not permit inline execution.

All text inserted by templates is escaped where data is interpolated. Search results use DOM text nodes, not HTML from queries. Search result URLs are limited to expected local `/en/` routes. Inputs have type/length constraints and native validity checks. There are no credentials, API keys, passwords, user accounts, cookies, browser persistence, telemetry or third-party runtime dependencies.

The server is a local preview tool, not a public production-hosting security product. There has been no penetration test. HSTS/TLS termination are intentionally absent on loopback HTTP; WordPress.com manages HTTPS for the later hosted site. Do not expose this server to the internet.

## Privacy behavior

Search terms are included in the address bar and therefore may be retained in browser history. Do not enter confidential case details. Contact test data is not saved or transmitted. Clicking telephone/email/WhatsApp links is an explicit visitor action that opens an external handler/service. QA verified link targets without calling, sending email or messaging.

The current privacy page applies only to the local preview. A WordPress.com Free launch introduces host advertising/statistics and, if enabled, form response storage/notifications. Replace the notice with an accurate owner-approved version before launch; no claim of legal privacy compliance is made here.

## Later content-management security

Use unique account passwords and multifactor authentication, least-privilege editor roles, recovery methods and controlled device access. Never send credentials to the assistant or place them in repository files. WordPress.com handles platform updates; review site members and content export/backup procedures. Avoid confidential client document uploads, unnecessary form fields and client portals in the public library.

## SEO implemented locally

Every page has a unique descriptive title, meta description, semantic headings, internal links and canonical URL. Documents use `lang="en"`; original case excerpts have their own language attribute where supplied. No language alternatives or switcher are generated. The project includes Open Graph title/description, favicon, sitemap and descriptive artwork alt text. The local schema is `WebPage` only; no invented organization address, rating, registration, credential or publication author is used.

All preview pages use `noindex, nofollow` and robots disallow. This is deliberate for unpublished legal drafts. URLs are loopback URLs; do not upload this sitemap or canonical metadata to WordPress. The future hosted platform generates its own URLs and metadata. Native WordPress titles, excerpts, slugs and alt text are the Free-plan approach; custom `hreflang`, JSON-LD and head-tag control are not promised.

After owner/legal approval, an eligible platform could use `Person` for the confirmed lawyer and `Article` for genuinely published reviewed work. Add only confirmed identity/address/author/date fields. No ranking or rich-result appearance is guaranteed.

## Performance and accessibility

Static pre-rendered HTML requires no browser framework. Small local scripts, optimized local JPGs and SVG artwork avoid CDN round trips and font downloads. Text remains readable before JavaScript loads. Images have dimensions; CSS responds across breakpoints. Native search needs JavaScript locally; all sections remain reachable through ordinary links. The mobile header menu needs JavaScript, with footer navigation retained as a fallback.

Keyboard-visible focus, skip links, labelled inputs, live result/status regions, semantic main/navigation landmarks, menu state, reduced motion and print styles are implemented. The body font uses local fallbacks. See test results for measured payloads and visual checks. Screen-reader certification, Lighthouse scoring, load testing and a complete WCAG audit are not claimed.

## Future analytics proposal — inactive

If later approved, measure aggregate page views, content IDs, broad controlled search topics, result counts and downloads. Avoid raw search strings, message bodies, names, emails, fingerprints or account identifiers. Define an owner-approved retention period and purpose before enabling tracking. No custom analytics events are emitted now. A Free launch can begin with the host’s existing stats after privacy review; third-party analytics is a separate decision.
