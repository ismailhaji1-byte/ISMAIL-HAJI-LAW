# Current design — 5 November 2026

The latest supplied image supersedes the earlier white-and-blue direction. The local homepage recreates its composition with black (#080B10), dark navy (#101722), gold (#F5AD20), white and light gray. Georgia headings and Arial body text remain local system fonts.

Header: scales logo, LAW OFFICE subline, six primary navigation items and consultation button. Hero: left editorial headline, centered portrait, non-numerical commitments at right, office background with legal objects. Below: a 2:1 workspace with four service cards and three hypothetical case cards left, evaluation form right. Core values and a four-column footer complete the page. All prior library routes remain accessible. Reading pages keep their white reading column.

No years, case counts, success rates, awards, results or real judgments are invented. The headline uses Focused / Dedicated / To you; numerical claims are replaced by commitments. Social icons have no links until account URLs are supplied. The local form validates and clears fictional test data, without sending or saving.

The original profile.jpg is unchanged. profile-cutout.png is an ImageGen background-removal derivative from that photograph; it is not an independent identity photograph. About retains the original image. office-background.jpg is generated illustrative scenery, not a claimed actual office.

## Image prompts and files

Built-in ImageGen was used; no paid API credentials or external account was connected.

- src/assets/profile-cutout.png: Remove ONLY the gray studio background and make it truly transparent. Preserve the real face, expression, skin tone, hair, white shirt, dark waistcoat, tie, watch, crossed arms and body proportions. No beautification, change of pose or new person. Clean natural edges.
- src/assets/office-background.jpg: Photorealistic premium law office background, wide 3:1. Black/navy bookshelves and restrained amber light. Left 40% quiet dark negative space. Center dark space for a separate portrait. Far right brass Lady Justice, scales, wooden gavel and black legal books. No people, text, logos or interface. Generated PNG retained as source; JPG is an encoding optimized for the website.

Desktop composition on every screen (updated 5 November): a 1280px mobile viewport automatically fits the complete desktop layout. Narrow desktop preview windows use desktop-fit.js and CSS zoom. No small-screen rearrangement or hamburger menu; four services, three cases, sidebar and horizontal navigation remain. Pinch zoom is not disabled. Text is necessarily smaller at the initial phone scale. Reduced-motion and print styles remain; print resets scaling.
