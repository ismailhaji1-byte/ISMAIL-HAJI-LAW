# Test results — 5 November 2026

The current build produces 32 English pages, 19 search entries and 32 WordPress content drafts. Nine practice subjects and ten library records are included. Four case records are hypothetical; none has a claimed court, case number, citation, decision date or applicable law.

- Automated tests: 9 passing. Routes, English-only markup, internal links/assets, content fields, search, local contact behavior, WordPress block compatibility, original case language escaping and removed-country checks.
- HTTP: all 32 pages return 200. 404 behavior, rejected POST, traversal checks, secret-file checks, downloads and CSP pass.
- Browser: all 32 pages inspected at 390px; no horizontal overflow, missing headings or broken images. Homepage also checked at 360, 390, 768, 1024, 1169 and 1440px. See artifacts/dark-reference-layout-audit.json.
- Mobile menu: keyboard activation and Escape verified.
- Homepage form: empty required fields rejected; fictional name, example.invalid email, optional test phone, topic, message and acknowledgment passed. Status explicitly confirms nothing sent or saved; no browser errors observed.
- Case link: opened the property example; its hypothetical notice and white reading background were verified in the browser.

Visual evidence: artifacts/home-dark-desktop.jpg and artifacts/home-dark-mobile.jpg. The latest files supersede earlier screenshots. No live WordPress, email delivery, social connection, paid API, publication or formal assistive-technology audit was performed.


## Latest: desktop composition on phones (5 November 2026)
Supersedes earlier stacked-mobile layout checks. Production build passed; 10 Node tests passed. All 32 routes checked in a 390px browser viewport: no horizontal overflow, missing images or hidden desktop navigation. Homepage additionally checked at 360, 768 and 1280px during implementation. Public preview shows the new 1280px viewport and full navigation. Evidence: artifacts/desktop-mobile-audit.json and desktop-mobile-preview.png. These are browser viewport checks, not physical iOS/Android device tests. Pinch zoom remains enabled; print scaling resets.
