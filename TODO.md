# Marketing site improvement backlog

Prioritized ideas derived from a full-repo pass (`src/`, config, content). Adjust order to match business goals.

---

## Critical — content & conversion

- [x] **Ship real pages currently stubbed** — `/about`, `/blogs` (index), `/faqs`, `/privacy-policy`, and `/terms-of-service` now ship real copy, layout, and JSON-LD (verified in `src/app/(root)/...`).
- [x] **Wire the contact form to production** — `submitContactForm` uses `sendContactFormSubmissionEmail` (Nodemailer), OpenPanel tracking, and structured error responses when SMTP is missing (`src/features/contact/actions/index.ts`).
- [x] **Give users feedback after submit** — `contact-form.tsx` shows success/error toasts and resets after success; client-side validation via RHF + Zod.
- [ ] **Map server `fieldErrors` onto RHF fields** — surface per-field messages from `submitContactForm` on the matching inputs (not only a generic toast).
- [x] **Fix legal links on the contact form** — Terms and Privacy point to `/terms-of-service` and `/privacy-policy` (`contact-form.tsx`).
- [ ] **Fix “Book a call” on the contact page** — the Frame footer still links “Book a call” to `/` (`src/app/(root)/(company)/contact/page.tsx`); use a real calendar URL or `/contact` anchor.
- [x] **Make service detail CTAs actionable** — hero “Get started” uses `Button` with `render={<Link href="/contact" />}` (`services/[category]/[slug]/page.tsx`).

---

## SEO & structured data

- [x] **Add `generateMetadata` for each service subpage** — `generateMetadata` in `services/[category]/[slug]/page.tsx` uses MDX meta + `createPageMetadata` (OG/Twitter/canonical).
- [x] **Expand `sitemap.ts`** — includes home, about, services hub, category + detail URLs, blogs index + posts, faqs, our-works, contact, legal; uses `getBaseUrl()` aligned with env + `site-config`.
- [x] **Per-route metadata for listing pages** — `/services`, `/blogs`, `/about`, `/faqs`, `/our-works`, `/contact`, and legal pages export route-level metadata via `createPageMetadata`.
- [x] **Enrich blog `generateMetadata`** — `blogs/[slug]/page.tsx` passes `image` and `type: "article"` into `createPageMetadata` (canonical via `alternates`).
- [x] **Structured data (JSON-LD)** — root layout injects Organization, WebSite, LocalBusiness; blog posts use `buildArticleSchema`; FAQs emit per-category FAQPage scripts; service detail pages include Service, BreadcrumbList, etc.
- [x] **Fix Twitter metadata** — `createPageMetadata` in `src/lib/seo.ts` sets `twitter.creator: "@zironpro"` and card images per page.
- [ ] **Footer/social parity** — uncomment or wire `twitter` (and any other social URLs) in `site-config` so footer and metadata stay aligned.

---

## Navigation, IA & copy

- [ ] **Replace placeholder submenu descriptions** — Company submenu items (About, FAQs, Blogs) in `src/components/layout/data/constants.ts` all use “Tap. Scan. Connect.”; write unique descriptions per item.
- [ ] **Products section** — home “Products” block and `PRODUCTS` nav entries point to `/` with “Coming soon” mixed in; either build product landing pages or clarify CTAs so users are not sent to a generic home with no product detail.
- [ ] **Re-enable or remove commented home sections** — `Feedback` carousel is commented out in `src/app/(root)/page.tsx`; `ServicesStickyCards` is commented in `services/page.tsx`. Decide: ship polished sections or delete dead code paths.

---

## Analytics & environment

- [ ] **Document env vars** — add `.env.example` with `BASE_URL`, `GOOGLE_GENERATIVE_AI_API_KEY` (AI chat), database URL, and any future mail/analytics keys. `site-config` defaults `BASE_URL` to localhost; production must set this for canonical URLs and OG.
- [ ] **Real-user Web Vitals & uptime** — e.g. Vercel Analytics or `web-vitals` reporting; basic uptime checks on `/` and `/contact`.

---

## Privacy, compliance & trust

- [ ] **Cookie / consent** — `GoogleTagManager` is in the root layout; add a CMP or consent banner if you target EU/UK or add non-essential tags beyond strictly necessary.
- [ ] **Privacy copy vs actual stack** — keep `/privacy-policy` accurate for GTM, OpenPanel, WhatsApp widget, AI chat, and any future trackers; update when tags change.

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
- [ ] **Security headers** — HSTS, CSP, `Referrer-Policy`, and related headers in `next.config`; tune so GTM and any embeds still work.
- [x] **Blog ordering** — `getBlogs()` sorts by `metadata.date` descending (`src/features/articles/actions/query.ts`).

---

## Accessibility & UX polish

- [x] **Preview link cards** — `how-we-help.tsx` sets preview image `alt` from each service list title; `preview-link-card.tsx` default alt is no longer a generic placeholder.
- [ ] **Reduce motion / prefers-reduced-motion** — Lenis + GSAP + carousels: audit `prefers-reduced-motion` for scroll smoothing and autoplay.
- [ ] **Keyboard and focus** — mega-menu, drawers, and AI chat: verify focus traps and ESC behavior (spot-check against Biome a11y rules already partially enabled).

---

## Performance & assets

- [ ] **Image audit** — service MDX `Image` wrapper uses fixed `1000×1000`; ensure `sizes` and dimensions match real assets to avoid layout shift and overserving bytes.
- [ ] **Third-party weight** — MapLibre, Recharts, media-chrome: confirm each is only loaded on routes that need it (dynamic imports where applicable).

---

## Optional growth experiments

- [x] **RSS feed for blogs** — `app/rss.xml` route for subscribers and syndication.
- [ ] **Case study deep links** — `our-works` references case studies; ensure internal links and metadata align with blog or service pages for cross-linking SEO.
- [ ] **Blog discovery** — on-site search and/or tag filters on `/blogs` when the archive grows.
- [ ] **`llms.txt` (optional)** — short machine-readable site summary for AI crawlers; only if you want to invest in how third-party models cite you.

---

*Last reviewed: 2026-04-12 — expanded with forms, compliance, security, observability, and discovery items. Update this file as items ship.*
