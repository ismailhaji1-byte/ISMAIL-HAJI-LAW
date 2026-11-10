# Content administration

The local preview intentionally has no second CMS or fake admin login. Source editing is the local workflow. Native WordPress becomes the editor in a later Free-plan setup.

## Edit locally

- Update brand, contact details and interface labels in `content/site.mjs`. Contact/About/Search/policy copy also resides in `src/partials/`; update those English partials when changing their text or contact links.
- Edit English legal records and original case fields in `content/library.mjs`. Keep IDs stable.
- Add a source to `sources` before referencing its ID. Record publication date separately from access date; use null when unknown.
- Add/edit/remove an entry in `records` to change a library item. English text objects and source-status fields are required. Preserve original case-language fields. Do not change `pending` to approved without a documented reviewer decision.
- To remove a record, check related links and source use, rebuild, and review the output inventory. The builder overwrites generated files but does not recursively delete old output. If a record is removed, remove only its known generated HTML/block files after confirming their exact paths inside `dist`/`wordpress`, then rebuild; stale output must not be distributed.
- Run `node scripts/build.mjs`, then `node --test tests/site.test.mjs`, and reload the browser. Never edit generated `dist` or WordPress drafts as the primary source.

## Native WordPress workflow

Use Pages for static sections and practice areas; use Posts for articles, cases, news, publications and resources. Categories distinguish content kind; tags identify controlled topics and jurisdictions. A case uses an agreed heading/table template in the post body, so custom fields/plugins are unnecessary on Free.

To add an article: create one English Draft post, assign a content category, paste reviewed content, set excerpts and topic tags, attach rights-cleared images with alt text, and record review decisions. For cases preserve original titles, court names, citations and documents without automatic translation. To edit: update the record and recheck affected citations. Use revisions when correcting mistakes. To delete: use the native Trash/recovery workflow, check incoming links and update curated collections. Do not permanently delete source evidence without an approved retention rule.

Upload images through Media only after confirming rights. Keep books at their original sources unless redistribution is lawful. Publications must identify whether they are a reading guide, report, academic work or legal opinion; never imply peer review or lawyer authorship that has not occurred.

Manage contacts through the reusable header/footer and Contact page. Verify the telephone/mailto/WhatsApp target after changes. Form recipients and storage settings belong to native Forms and require attention because changes can trigger real email delivery.

## Review record

For each item record: stable ID, local and hosted URLs, original document language, source version, legal reviewer, review date, exact approved revision, current-law assessment, rights basis and next review trigger. Keep review notes in an owner-controlled private editorial document; do not expose personal case data in public posts.

Review on a relevant legal change, source replacement, broken citation, original-document correction or scheduled editorial review. Keep historical content labelled as historical. WordPress previewing and editing must not silently become publication.
