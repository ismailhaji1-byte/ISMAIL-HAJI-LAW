# Manual WordPress.com Free migration

This guide is for a later authorized setup. Nothing has been uploaded, published or connected. No account, mailbox connection, purchase or verification request is part of this handover.

## 1. Review locally

The current site is English-only. Review all 32 pages, confirm the biography, qualifications, service scope and contact information, and use the supplied profile photograph. A qualified legal reviewer must approve all legal summaries and establish the current constitutional text. Source inspection does not establish legal approval.

`wordpress/migration-map.csv` inventories 32 Draft items. `wordpress/blocks/` contains native body-content drafts, not a theme, WXR import or tested one-click installation. `wordpress/assets/` includes optimized JPG imagery. The exact local design cannot be uploaded as a complete custom site on Free.

## 2. Site foundation, when authorized

Choose a free WordPress.com subdomain, subject to availability. The suggested `ismaillaw.wordpress.com` has not been checked or reserved. Select an available Free theme with readable serif headings and mobile navigation. Set site title to ismaillaw and site language to **English**. Keep the site private during preparation. Do not add a language switcher, translation plugin, Somali homepage or language categories.

## 3. Page and post structure

The local preview retains `/en/` to preserve existing preview links, but English is the sole interface language. The generated map uses an ordinary `en` parent page and child pages for About, Practice, Articles, Cases, News, Research, Resources, Contact, Search, Privacy, Disclaimer and Standards. Practice contains nine child pages. Library records become Posts with the map’s flat `en-…` slugs.

You may instead use the English Home page as the root front page and place section pages at top level. If doing so, update the map and every internal link to the actual WordPress permalink; assigning a static front page changes its URL behavior. Do not assume local `/en/cases/.../` paths transfer. Copy each real permalink from the editor and check it against every draft link.

## 4. Native content

Set the title using WordPress’s title field. Paste the matching block draft into its code editor, then return to the visual editor and check every block. If the editor strips markup or reports an invalid block, recreate it with Heading, Paragraph, List, Table or Buttons blocks. These files have not been tested in a logged-in WordPress editor. Do not paste `dist` HTML, CSS, JavaScript or server files into Free.

For cases preserve the original title, court name, case number, legal references, source links and original document language. Keep the English editorial summary separate from original judgment text. Do not translate official records automatically. Where allowed, preserve `lang` and `dir` attributes on original excerpts; verify what the editor retains. Keep original documents at their source URLs unless redistribution rights are established. Real judgments and hypothetical studies must retain distinct status labels.

## 5. Recreate the design

Use the supplied reference and local preview as a visual target. Theme and block controls vary; if a control requires an upgrade, use a supported default and record the difference.

| Section | Native recipe |
| --- | --- |
| Navigation | Site Title, Navigation, gold Buttons block on dark navy |
| Dark hero | Dark Cover with office background; three Columns for heading/actions, supplied portrait and non-numerical commitments |
| Four services | Four Columns with icons, headings, descriptions and links |
| Services and evaluation | Two Columns (roughly 2:1); four service cards and three case cards left, native Form block right after separately approved setup |
| Core values | Heading plus three icon/label groups with subtle vertical separators |
| Articles/library | Query Loop with featured images and excerpts, or manually curated Columns |
| Reading template | White background, centered title/date, large featured image, narrow content width and sources at end |
| Search | Native Search block; topic categories and tags replace local advanced filters |
| Contact | Native links and, only after handling is approved, native Form block |
| Footer | Columns with English navigation, contacts, disclaimer and privacy |

Target black `#080B10`, navy `#101722`, gold `#F5AD20`, white `#FFFFFF` and light gray `#D5D5D5`. Use available individual-block settings. Free does not guarantee local custom CSS, fonts, exact spacing, photographic overlays or responsive geometry. Use near-black text on gold buttons and white text on dark panels. Decorative SVGs can be omitted or replaced with allowed raster icons; do not install an SVG plugin.

Upload profile.jpg through Media as the supplied profile image. Consultation and courthouse images remain illustrative; preserve their descriptive alt text and do not present them as actual clients or a named court.

## 6. Categories, forms and privacy

Use English content categories Articles, Cases, News, Research and Resources, plus controlled topic/jurisdiction tags. No duplicated language editions or reciprocal language links are needed. Search identifiers must appear in visible post text for native keyword search.

Contact links: `tel:+252615811256`, `mailto:avvismailhaji1@gmail.com`, `https://wa.me/252615811256`. A mailbox connection is unnecessary. The local form sends nothing; replace it with a native Form block only after approving privacy, retention, storage and notification settings. A hosted form test may send email, so it is outside this local-only task.

Upload only permitted resources. Recreate the original checklist as a page if TXT upload is unsupported. Link third-party books at their original sources. Replace the local privacy notice with one accurately describing WordPress advertising, statistics and form storage.

## 7. Private acceptance checks

Verify all 32 items and nine practice pages, English navigation, original case-language preservation, actual permalinks, source links, mobile layout, featured images and alt text, native search, download rights, contact links and form settings. Use native titles, excerpts and slugs; do not upload localhost sitemap or canonical URLs. Confirm storage and advertising limits. Keep all legal drafts private until approved.

Publishing remains a separate future decision. This guide does not authorize it.

## 5 November reference update

The current homepage follows the new black-and-gold reference: horizontal navigation, office-background hero with centered portrait, four service cards, three educational case cards, evaluation panel, core values and four-column footer. Previous blue-theme instructions are superseded. Use native Groups and Columns; exact custom composition is a local preview. The local form does not send anything. New source assets: profile-cutout.png and office-background.jpg. The original profile.jpg remains available. Social icons are inactive until real URLs are provided. Contact city and new email came from the user-supplied design brief.


### Desktop layout on phones — 5 November update
The local build uses a custom 1280px viewport, CSS and a small scaling script. These cannot be assumed available in WordPress.com Free; its theme controls the mobile viewport and responsive layout. Native content drafts remain usable, but this exact phone presentation requires hosting that allows custom HTML/CSS/JavaScript.
