# ZironPro Website (v2)

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-20232A?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Biome](https://img.shields.io/badge/Biome-2.4-60A5FA?logo=biome&logoColor=white)](https://biomejs.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![App Router](https://img.shields.io/badge/Next-App_Router-000000?logo=next.js)](https://nextjs.org/docs/app)
[![Typed Routes](https://img.shields.io/badge/Typed_Routes-Enabled-4F46E5)](https://nextjs.org/docs/app/api-reference/config/typescript#typedroutes)
[![MDX Content](https://img.shields.io/badge/Content-MDX-1f2937)](#feature-highlights)
[![SEO Ready](https://img.shields.io/badge/SEO-Ready-16a34a)](#feature-highlights)
[![Analytics](https://img.shields.io/badge/Analytics-OpenPanel-0ea5e9)](https://openpanel.dev/)

Modern marketing website and content platform for ZironPro, built with Next.js App Router.

It powers conversion-focused landing pages, MDX content publishing, lead capture workflows, and SEO-ready metadata for regional and industry-based growth.

## Why This Project

This repo is designed to help ZironPro ship pages and campaigns quickly without sacrificing maintainability.

It provides:

- A scalable route architecture for services, locations, and industries
- MDX-first content workflows for blogs and marketing pages
- Built-in forms and transactional email handling
- Strong SEO primitives for discoverability and structured indexing
- Analytics hooks for product and campaign insights
- A typed, component-driven frontend foundation for future expansion

## Feature Highlights

- **App Router + Typed Routes** for safer navigation and predictable page composition
- **MDX Content System** for blogs, service pages, location pages, and industry pages
- **Lead Capture Pipeline** with validated forms and SMTP delivery via Nodemailer
- **SEO Tooling** including metadata helpers, canonical URL handling, `robots`, and `llms.txt`
- **Observability Layer** through OpenPanel integration
- **Security Headers** configured centrally in `next.config.ts`
- **Optional AI Actions** powered by Google Generative AI

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript 6
- Tailwind CSS v4
- Biome
- React Hook Form + Zod
- Motion + Embla Carousel
- next-mdx-remote

## Quick Start

### 1) Install dependencies

```bash
pnpm install
```

### 2) Configure environment

Create `.env.local` in the project root:

```bash
# Core site URL (recommended to set both)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BASE_URL=http://localhost:3000

# Email delivery (required for contact form submissions)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
CONTACT_FORM_FROM_EMAIL=hello@zironpro.com
CONTACT_FORM_TO_EMAIL=hello@zironpro.com

# Analytics (optional)
NEXT_PUBLIC_OPENPANEL_API_URL=https://api.openpanel.dev
NEXT_PUBLIC_OPENPANEL_CLIENT_ID=your_public_client_id
NEXT_PUBLIC_OPENPANEL_CLIENT_SECRET=your_client_secret

# AI actions (optional)
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here

# CSP behavior (optional)
CSP_MODE=enforce
```

### 3) Start development server

```bash
pnpm dev
```

Visit `http://localhost:3000`.

## Routes Overview

- `/` - homepage
- `/about` - company about page
- `/contact` - contact and lead capture page
- `/faqs` - frequently asked questions
- `/our-works` - portfolio/showcase page
- `/blogs` - blog listing
- `/blogs/[slug]` - blog article detail
- `/services` - services index
- `/services/[category]` - service category page
- `/services/[category]/[slug]` - service detail page
- `/service/[service]/[location]` - service-by-location marketing landing page
- `/[location]` - location marketing landing page
- `/industry` - industries index
- `/industry/[industry]` - industry-specific page
- `/technologies` - technologies page
- `/thaju` - dedicated marketing page
- `/privacy-policy` - privacy policy
- `/terms-of-service` - terms of service
- `/robots.txt` - robots directives
- `/rss.xml` - blog/feed RSS endpoint
- `/llms.txt` - LLM crawler guidance endpoint
- `/manifest.json` - web app manifest

## Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Biome check with write
pnpm format   # Biome format with write
```

## Project Structure (High Level)

```text
src/
  app/          # App routes, layouts, metadata and route handlers
  components/   # Shared and reusable UI/layout components
  content/      # MDX content for blogs, services, marketing, and industries
  data/         # Site config and static datasets
  features/     # Domain-focused modules (contact, services, industries, views)
  lib/          # Utilities (SEO, tracking, helper functions)
  styles/       # Global and partial styles
```

## Production Notes

- Deploy on any Node-compatible platform (Vercel recommended for Next.js workflows).
- Always set production URLs and secrets before release.
- Validate email delivery and key conversion flows in preview/staging.
- Run `pnpm build` in CI to catch deployment-time issues early.

## License

Private project. All rights reserved by ZironPro.
