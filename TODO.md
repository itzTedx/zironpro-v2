# Marketing site improvement backlog

Prioritized ideas derived from a full-repo pass (`src/`, config, content). Adjust order to match business goals.

---

## Critical — content & conversion

- [ ] **Ship real pages currently stubbed** — `/about`, `/blogs` (index), `/faqs`, `/privacy-policy`, and `/terms-of-service` render placeholder text only. Navigation and footer already link here; replace with on-brand copy, layout, and imagery.
- [ ] **Wire the contact form to production** — `submitContactForm` in `src/features/contact/actions/index.ts` only logs to the console and simulates delay (`TODO` in file). Integrate email (Resend, Postmark, etc.), CRM, or a form backend; handle failures and rate limiting.
- [ ] **Give users feedback after submit** — the form never surfaces server `success` / `error` / field errors from `submitContactForm` in the UI (no toast, no inline message). Surface validation and network errors; confirm success before resetting.
- [ ] **Fix legal links on the contact form** — Terms and Privacy links in `contact-form.tsx` point to `/` instead of `/terms-of-service` and `/privacy-policy`.
- [ ] **Fix “Book a call” on the contact page** — the Frame footer links “Book a call” to `/`; use a real calendar URL (Cal.com, Calendly, etc.) or `/contact` anchor.
- [ ] **Make service detail CTAs actionable** — on `/services/[category]/[slug]`, the primary “Get started” `Button` has no `Link`/`href`; connect to `/contact` or booking with UTM-appropriate tracking.

---

## SEO & structured data

- [ ] **Add `generateMetadata` for each service subpage** — `/services/[category]/[slug]` has static params but no page-level metadata; category pages already use `generateMetadata`. Mirror title/description/OG/Twitter from each service’s MDX frontmatter88-557.
- [ ] **Expand `sitemap.ts`** — commented block shows individual service URLs were planned. Today the sitemap omits: blog posts (`/blogs/[slug]`), `/blogs`, `/faqs`, `/about`, legal pages, and every `/services/{category}/{slug}` URL. Align `BASE_URL` usage with `site-config` / `process.env` consistently (`sitemap.ts` vs `site-config.ts`).
- [ ] **Per-route metadata for listing pages** — `/services` (hub), `/blogs`, `/about`, `/faqs`, `/our-works`, and legal routes rely on root `metadata` only; add route-specific titles and descriptions (and canonicals where useful).
- [ ] **Enrich blog `generateMetadata`** — add Open Graph/Twitter images and canonical URLs using each post’s `metadata.image` and slug (parity with root layout).
- [ ] **Structured data (JSON-LD)** — add `Organization` / `LocalBusiness` (address + phone from `site-config` / constants), `WebSite`, and `BlogPosting` or `Article` on posts; optional `FAQPage` on FAQs when content exists.
- [ ] **Fix Twitter metadata** — root layout sets `twitter.creator: "@"`; replace with the real handle or remove. Uncomment or add `twitter` in `site-config` links if X is part of the brand.

---

## Navigation, IA & copy

- [ ] **Replace placeholder submenu descriptions** — Company submenu items (About, FAQs, Blogs) in `src/components/layout/data/constants.ts` all use “Tap. Scan. Connect.”; write unique descriptions per item.
- [ ] **Products section** — home “Products” block and `PRODUCTS` nav entries point to `/` with “Coming soon” mixed in; either build product landing pages or clarify CTAs so users are not sent to a generic home with no product detail.
- [ ] **Re-enable or remove commented home sections** — `Feedback` carousel is commented out in `src/app/(root)/page.tsx`; `ServicesStickyCards` is commented in `services/page.tsx`. Decide: ship polished sections or delete dead code paths.

---

## Analytics & environment

- [ ] **Document env vars** — add `.env.example` with `BASE_URL`, `GOOGLE_GENERATIVE_AI_API_KEY` (AI chat), and any future mail/analytics keys. `site-config` defaults `BASE_URL` to localhost; production must set this for canonical URLs and OG.

---

## AI chat widget

- [ ] **Graceful degradation when API key is missing** — server actions return an error if `GOOGLE_GENERATIVE_AI_API_KEY` is unset; ensure the widget hides or shows a static “Contact us” state instead of a broken chat in production misconfigurations.
- [ ] **Review prompt branding** — system prompt references “Ziron Pro”; align naming with “Ziron pro” sitewide if that is the customer-facing brand.

---

## Quality, DX & safety

- [ ] **Remove `typescript.ignoreBuildErrors: true`** from `next.config.ts` — fix underlying TS errors and turn strict builds back on for safer deploys.
- [ ] **Pin `motion` version** — `package.json` uses `"latest"` for `motion`; pin to a semver range for reproducible builds.
- [ ] **Add automated tests** — no `error.tsx` / `loading.tsx` found under `src/app`; add route-level error boundaries and optional loading skeletons for heavy routes. Add minimal e2e or integration tests for critical paths (home, contact, one service page, one blog).
- [ ] **Blog ordering** — `getBlogs()` uses filesystem order; sort by `metadata.date` descending for consistent RSS-like listings when `/blogs` is built.

---

## Accessibility & UX polish

- [ ] **Preview link cards** — contact page uses generic `alt="Preview link card content"` on preview images; use each service/list title for `alt` text.
- [ ] **Reduce motion / prefers-reduced-motion** — Lenis + GSAP + carousels: audit `prefers-reduced-motion` for scroll smoothing and autoplay.
- [ ] **Keyboard and focus** — mega-menu, drawers, and AI chat: verify focus traps and ESC behavior (spot-check against Biome a11y rules already partially enabled).

---

## Performance & assets

- [ ] **Image audit** — service MDX `Image` wrapper uses fixed `1000×1000`; ensure `sizes` and dimensions match real assets to avoid layout shift and overserving bytes.
- [ ] **Third-party weight** — MapLibre, Recharts, media-chrome: confirm each is only loaded on routes that need it (dynamic imports where applicable).

---

## Optional growth experiments

- [ ] **RSS feed for blogs** — `app/rss.xml` route for subscribers and syndication.
- [ ] **Case study deep links** — `our-works` references case studies; ensure internal links and metadata align with blog or service pages for cross-linking SEO.
;ll
---

*Last reviewed from repository state (Next.js app router, MDX content, Biome). Update this file as items ship.*
