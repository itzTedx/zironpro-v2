# Marketing site improvement backlog

Prioritized ideas derived from a full-repo pass (`src/`, config, content). Adjust order to match business goals.

---

## Critical — content & conversion

- [x] **Ship real pages currently stubbed** — `/about`, `/blogs` (index), `/faqs`, `/privacy-policy`, and `/terms-of-service` now ship real copy, layout, and JSON-LD (verified in `src/app/(root)/...`).
- [x] **Wire the contact form to production** — `submitContactForm` uses `sendContactFormSubmissionEmail` (Nodemailer), OpenPanel tracking, and structured error responses when SMTP is missing (`src/features/contact/actions/index.ts`).
- [x] **Give users feedback after submit** — `contact-form.tsx` shows success/error toasts and resets after success; client-side validation via RHF + Zod.
- [ ] **Map server `fieldErrors` onto RHF fields** — surface per-field messages from `submitContactForm` on the matching inputs (not only a generic toast).
- [x] **Fix legal links on the contact form** — Terms and Privacy point to `/terms-of-service` and `/privacy-policy` (`contact-form.tsx`).
- [x] **Fix “Book a call” on the contact page** — the Frame footer still links “Book a call” to `/` (`src/app/(root)/(company)/contact/page.tsx`); use a real calendar URL or `/contact` anchor.
- [x] **Make service detail CTAs actionable** — hero “Get started” uses `Button` with `render={<Link href="/contact" />}` (`services/[category]/[slug]/page.tsx`).

---

## SEO & structured data

Foundation (metadata, sitemap, JSON-LD, Twitter) is largely in place; remaining work is **consistency, crawl hygiene, validation, and scaling** content without cannibalization.

- [x] **Add `generateMetadata` for each service subpage** — `generateMetadata` in `services/[category]/[slug]/page.tsx` uses MDX meta + `createPageMetadata` (OG/Twitter/canonical).
- [x] **Expand `sitemap.ts`** — includes home, about, services hub, category + detail URLs, blogs index + posts, faqs, our-works, contact, legal; uses `getBaseUrl()` aligned with env + `site-config`.
- [x] **Per-route metadata for listing pages** — `/services`, `/blogs`, `/about`, `/faqs`, `/our-works`, `/contact`, and legal pages export route-level metadata via `createPageMetadata`.
- [x] **Enrich blog `generateMetadata`** — `blogs/[slug]/page.tsx` passes `image` and `type: "article"` into `createPageMetadata` (canonical via `alternates`).
- [x] **Structured data (JSON-LD)** — root layout injects Organization, WebSite, LocalBusiness; blog posts use `buildArticleSchema`; FAQs emit per-category FAQPage scripts; service detail pages include Service, BreadcrumbList, etc.
- [x] **Fix Twitter metadata** — `createPageMetadata` in `src/lib/seo.ts` sets `twitter.creator: "@zironpro"` and card images per page.
- [ ] **Footer/social parity** — uncomment or wire `twitter` (and any other social URLs) in `site-config` so footer and metadata stay aligned.

### Sitewide technical crawl & indexation

- [ ] **Non-production / preview noindex** — there is no `middleware.ts` today; preview deployments and staging hosts can still be crawled. Add host/env-based `X-Robots-Tag: noindex` (or platform settings) plus correct `BASE_URL` / `NEXT_PUBLIC_SITE_URL` on production only (`src/lib/seo.ts` `getBaseUrl()`).
- [x] **Single preferred hostname** — pick apex vs `www` (or regional subdomain policy) and enforce with redirects + consistent `canonical`, `robots.host`, and `sitemap` URLs so Search Console does not split signals.
- [x] **`metadataBase` aligned with `getBaseUrl()`** — root `layout.tsx` uses `metadataBase: new URL(siteConfig.url)` while `createPageMetadata` / `sitemap.ts` / `robots.ts` use `getBaseUrl()` (env-aware). If `BASE_URL` overrides the default, relative OG images and some resolved URLs can disagree; derive both from the same helper.
- [x] **`robots.txt` hygiene** — keep `disallow` aligned with real internal paths (`src/app/robots.ts`); after IA changes, re-check that nothing important is blocked and `sitemap` points at the same origin as the live site.
- [ ] **404 and redirect policy** — branded `not-found` with strong internal links (see Quality section); 301 renamed service or blog slugs; fix or redirect broken internal links periodically (crawl export or GSC “Page with redirect” / “Not found” reports).
- [ ] **Honest `lastModified` in `sitemap.ts`** — every entry currently uses `now` at build time; use blog `metadata.date` (and optional file/frontmatter `updated` when you add it) for posts and stable dates for static routes so freshness signals are not uniformly “today.”
- [x] **Web app manifest vs layout branding** — `src/app/manifest.json` still uses `short_name: "MySite"` and `#ffffff` theme/background while `layout.tsx` sets `viewport.themeColor` to `#401CD8` and `apple-mobile-web-app-title` to “Ziron pro”; align names, casing, and colors with `site-config` for install prompts and OS surfaces.

### On-page & content quality (global templates)

- [ ] **Title and meta description uniqueness** — audit templates so listing pages, MDX detail pages, and future facets do not emit duplicate or near-duplicate `<title>` / descriptions; keep primary keyword early without truncation surprises in SERP.
- [ ] **H1 and heading hierarchy** — one clear H1 per indexed view; H2/H3 reflect outline order (especially MDX service/blog bodies); avoid skipping levels for styling-only reasons.
- [ ] **Image SEO** — meaningful `alt` when the image conveys information; empty `alt` for decorative assets; tighten `sizes` / dimensions (cross-link Performance section) so visuals support relevance without hurting CWV.
- [ ] **Internal linking program** — from each service pillar, link to related services, 2–3 relevant blog posts, `/our-works`, and `/contact` with descriptive anchor text; avoid orphan MDX pages and “click here” anchors.
- [x] **Blog listing H1 vs title alignment** — `/blogs` uses `createPageMetadata` title “SEO & Growth Blogs…” but the visible H1 is “Insights”; consider matching primary keyword intent between `<title>`, H1, and intro copy for clearer relevance signals.

### Rich results, schema QA & multimedia

- [ ] **Validate JSON-LD on live URLs** — Google Rich Results Test + Schema.org validator on home, one service category + detail, one blog post, one FAQ category; resolve warnings (recommended properties, wrong `@type`, mismatched visible copy vs schema).
- [ ] **FAQPage JSON-LD must match on-page FAQs** — when MDX includes `<FaqContent>`, `blogs/[slug]/page.tsx` and `services/[category]/[slug]/page.tsx` still inject a single generic FAQ (`buildFaqSchema` from title/description only). Parse real questions/answers from content or frontmatter, or omit FAQ schema until it matches what users see (avoids structured-data quality issues).
- [x] **WebSite `SearchAction` vs real behavior** — `buildWebsiteSchema()` in `src/lib/seo.ts` advertises `/blogs?query={search_term_string}`, but `/blogs` does not implement that search. Remove `potentialAction` until there is a working search results URL, or ship minimal blog search and keep the target in sync.
- [ ] **AggregateRating grounded in real reviews** — service detail JSON-LD includes hardcoded `AggregateRating` (e.g. 4.9 / 24 in `services/[category]/[slug]/page.tsx`). Replace with verifiable first-party review data or drop rating markup to stay within Google’s guidelines for review snippets.
- [ ] **`VideoObject` where video is primary** — if `video-player` or embeds carry main message (hero, case study), add eligible structured data (thumbnail, duration, `uploadDate`); pair with captions/transcripts where feasible for accessibility and eligible SERP treatment.
- [x] **Default / fallback Open Graph image** — `createPageMetadata` already defaults `image` to `siteConfig.ogImage` (`/images/og.jpg`); verify the asset is 1200×630-safe and on-brand. Ensure any route that overrides `image` still resolves to an absolute URL via `metadataBase` (`src/app/(root)/layout.tsx`).

### Measurement & discovery (beyond GSC basics)

- [x] **Bing Webmaster Tools** — verify property and submit `sitemap.xml` for incremental coverage outside Google.
- [ ] **Link Search Console and GA4** — associate GSC with the GA4 property so organic landing pages can be read against engagement and conversion paths.

### Regional / location pages & keyword strategy

- [ ] **Refine markets & URL strategy (already routed)** — location landers exist at `/[location]` and `/service/[service]/[location]` with `LOCATION_SLUGS` / `SERVICE_SLUGS` in `src/lib/location-seo.ts` and URLs already in `sitemap.ts`. Tighten which locations you truly want indexed, avoid thin/duplicate combos vs `/services/...`, and document the pattern for the team.
- [ ] **Keyword universe & intent map** — build a sheet: primary head terms, mid-tail service + location combos, informational queries (how/what/why), and brand; tag each with intent (commercial, transactional, informational) and map 1 primary + 2–4 supporting keywords per URL (no two pages competing for the same primary term).
- [ ] **Content differentiation per region** — each regional page needs unique copy (local context, industries served, regulations, time zones, contact paths); avoid thin template swaps (“CityName” only) that trigger duplicate-content risk.
- [ ] **On-page checklist per regional URL** — unique `<title>` and meta description (primary keyword early, CTR-focused); one clear H1; logical H2/H3 hierarchy; body copy that answers local intent; internal links to relevant services, case studies, and contact; descriptive image `alt` where images carry meaning.
- [x] **Canonical & duplication policy** — if the same service exists at global + regional URLs, set explicit canonicals and/or consolidate; use `noindex` only for true alternates or parameterized junk, not for valid regional landers you want indexed.
- [ ] **LocalBusiness / Organization schema per location** — extend JSON-LD: `areaServed` (City/Region/Country), `address` where you have a real location, consistent `name`/`url`/`telephone`; align with what appears on the page and on Google Business Profile (if applicable).
- [x] **Regional entries in `sitemap.ts`** — new location/service combos should extend `LOCATION_SLUGS` / `SERVICE_SLUGS` and stay in sync with `sitemap.ts` (already wired); tune `changeFrequency`/`priority` and real `lastModified` when content updates.
- [ ] **Internal linking hub** — add a crawlable “Locations” or “Where we work” hub; link regional pages to service pillars and blog posts that mention those markets; avoid orphan regional URLs.
- [x] **Google Search Console** — verify property, submit sitemaps, monitor “Page indexing,” “Enhancements,” and queries per landing page; add regional URLs to a URL inspection checklist after deploy.
- [ ] **GBP & NAP consistency** — if you use Google Business Profile or local listings, match business name, address, phone, and categories with on-site footer/contact and schema; same spelling everywhere.
- [ ] **E-E-A-T for YMYL-adjacent claims** — if regional pages mention results, clients, or guarantees, tie claims to verifiable work (case studies, logos, reviews) and keep legal/compliance copy accurate per jurisdiction.
- [ ] **SERP feature opportunities** — FAQ blocks (with valid FAQPage schema where appropriate), comparison tables, and clear CTAs tuned to local buying stage; align FAQ copy with real “People also ask” style queries from research tools.
- [ ] **Performance & CWV on regional templates** — regional pages often repeat heavy components; ensure LCP/CLS are not worse than global templates (images, fonts, above-the-fold content).
- [x] **Track rankings & conversions by region** — define KPIs (ranked keywords per page, impressions/clicks in GSC, form/call conversions); revisit keyword map quarterly as search volume and competition shift.

---

## Navigation, IA & copy

- [x] **Replace placeholder submenu descriptions** — Company submenu items (About, FAQs, Blogs) in `src/components/layout/data/constants.ts` all use “Tap. Scan. Connect.”; write unique descriptions per item.
- [x] **Products section** — home “Products” block and `PRODUCTS` nav entries point to `/` with “Coming soon” mixed in; either build product landing pages or clarify CTAs so users are not sent to a generic home with no product detail.
- [x] **Re-enable or remove commented home sections** — `Feedback` carousel is commented out in `src/app/(root)/page.tsx`; `ServicesStickyCards` is commented in `services/page.tsx`. Decide: ship polished sections or delete dead code paths.

---

## Environment Variables

- [x] **Document env vars** — add `.env.example` with `BASE_URL`, `GOOGLE_GENERATIVE_AI_API_KEY` (AI chat), database URL, and any future mail/analytics keys. `site-config` defaults `BASE_URL` to localhost; production must set this for canonical URLs and OG.


---

## Privacy, compliance & trust

- [ ] **Cookie / consent** — `GoogleTagManager` is in the root layout; add a CMP or consent banner if you target EU/UK or add non-essential tags beyond strictly necessary.
- [x] **Privacy copy vs actual stack** — keep `/privacy-policy` accurate for GTM, OpenPanel, WhatsApp widget, AI chat, and any future trackers; update when tags change.

---

## Forms & abuse

- [ ] **Rate-limit server actions** — contact submit and AI chat endpoints; reduce brute-force and spam volume.
- [ ] **Optional anti-spam** — honeypot fields and/or Cloudflare Turnstile (or similar) if contact or chat attracts bots.

---

## Database & dynamic blog features

- [ ] **Set up database** — pick stack (e.g. Postgres + ORM, or existing backend if the project already uses one), migrations, Next.js server/runtime access, and local vs production config (including `.env.example`).
- [ ] **Blog comment threads** — threaded comments on `/blogs/[slug]`; moderation, spam handling, and whether auth is required vs anonymous (rate limits, CAPTCHA, etc.).
- [ ] **Blog upvotes** — upvotes on posts (and/or comments); one vote per user/session; optional public counts.
- [ ] **Blog views & analytics** — track total (and/or unique) views per post; dashboards or internal reporting; align with privacy policy and cookie/consent if using third-party analytics alongside first-party view counts.

---

## Next phase — CMS

- [ ] **CMS for content management** — manage blog posts, marketing pages, and media without editing MDX in git; drafts, previews, roles, and publishing workflow (build vs integrate headless CMS as a deliberate choice).

---

## AI chat widget

- [x] **Graceful degradation when API key is missing** — `generateChatReplyAction` returns `ok: false` when the key is missing; the widget shows a fallback assistant message and still nudges users toward the lead form / contact (`ai-chat-widget.tsx`).
- [ ] **Review prompt branding** — system prompt still says “Ziron Pro's sales assistant” (`src/features/ai/actions.ts`); align with “ZironPro” / “Ziron pro” usage elsewhere if you want one canonical brand string.

---

## Quality, DX & safety

- [ ] **Pin `motion` version** — `package.json` uses `"latest"` for `motion`; pin to a semver range for reproducible builds.
- [ ] **Branded error surfaces** — add `not-found.tsx` and route-level or global `error.tsx` with clear recovery links (e.g. home, contact).
- [ ] **Add automated tests & loading UX** — add `loading.tsx` skeletons for heavy routes where it helps; minimal e2e or integration tests for critical paths (home, contact, one service page, one blog).
- [x] **Security headers (baseline)** — add `headers()` in `next.config.ts`: HSTS (production only, long `max-age` + `includeSubDomains` if appropriate), `Referrer-Policy` (e.g. `strict-origin-when-cross-origin`), `X-Content-Type-Options: nosniff`, `Permissions-Policy` for APIs you do not need.
- [x] **CSP — report-only first** — ship `Content-Security-Policy-Report-Only` and collect violations (endpoint or third-party reporter) before enforcing; fix allowlists using real traffic, not guesses.
- [x] **CSP — enforce with Next-friendly patterns** — prefer nonces for first-party scripts where Next supports them; avoid `'unsafe-inline'` except where unavoidable; document any exceptions.
- [x] **CSP — third-party allowlist** — explicitly cover what the app loads today: Google Tag Manager (`layout.tsx`), OpenPanel (`analytics.zironpro.ae` + `NEXT_PUBLIC_OPENPANEL_API_URL`), WhatsApp widget, AI chat / API origins, video and font CDNs, MapLibre or other map hosts on routes that use them; retest after any new tag or embed.
- [x] **CSP + GTM reality check** — GTM can pull many domains over time; either keep a maintained allowlist per tag or accept a broader `connect-src` / `script-src` for Google-owned hosts and re-audit when the container changes.
- [x] **Blog ordering** — `getBlogs()` sorts by `metadata.date` descending (`src/features/articles/actions/query.ts`).

---

## Accessibility & UX polish

- [x] **Preview link cards** — `how-we-help.tsx` sets preview image `alt` from each service list title; `preview-link-card.tsx` default alt is no longer a generic placeholder.
- [ ] **Reduce motion / prefers-reduced-motion** — Lenis + GSAP + carousels: audit `prefers-reduced-motion` for scroll smoothing and autoplay.
- [ ] **Keyboard and focus** — mega-menu, drawers, and AI chat: verify focus traps and ESC behavior (spot-check against Biome a11y rules already partially enabled).

---

## Performance & assets

- [ ] **Image audit** — service MDX `Image` wrapper uses fixed `1000×1000`; ensure `sizes` and dimensions match real assets to avoid layout shift and overserving bytes.
- [x] **Third-party weight** — MapLibre, Recharts, media-chrome: confirm each is only loaded on routes that need it (dynamic imports where applicable).

---

## Optional growth experiments

- [x] **RSS feed for blogs** — `app/rss.xml` route for subscribers and syndication.
- [ ] **Case study deep links** — `our-works` references case studies; ensure internal links and metadata align with blog or service pages for cross-linking SEO.
- [ ] **Blog discovery** — on-site search and/or tag filters on `/blogs` when the archive grows.
- [ ] **`llms.txt` (optional)** — short machine-readable site summary for AI crawlers; only if you want to invest in how third-party models cite you.

---

*Last reviewed: 2026-04-12 — Includes SEO/codebase backlog items; Quality/safety now splits baseline security headers from a staged CSP plan (report-only → enforce, nonces, GTM/OpenPanel/embeds). Update this file as items ship.*
