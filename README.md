# ZironPro Website (v2)

![pnpm](https://www.shieldcn.dev/badge/pnpm-F69220.svg?logo=pnpm&variant=branded&size=sm)
![TypeScript](https://www.shieldcn.dev/badge/TypeScript-3178C6.svg?logo=typescript&variant=branded&size=sm)
![React](https://www.shieldcn.dev/badge/React-61DAFB.svg?logo=react&variant=branded&size=sm)
![Lint · Biome](https://www.shieldcn.dev/badge/Lint-Biome-60A5FA.svg?logo=biome&variant=branded&size=sm)
![Next.js](https://www.shieldcn.dev/badge/Next.js-000000.svg?logo=nextdotjs&variant=branded&size=sm)
![AI SDK · OpenAI](https://www.shieldcn.dev/badge/AI_SDK_%C2%B7_OpenAI-412991.svg?logo=openai&variant=branded&size=sm)
![Zod](https://www.shieldcn.dev/badge/Zod-3E67B1.svg?logo=zod&variant=branded&size=sm)
![Tailwind CSS](https://www.shieldcn.dev/badge/Tailwind_CSS-06B6D4.svg?logo=tailwindcss&variant=branded&size=sm)
[![App Router](https://img.shields.io/badge/Next-App_Router-000000?logo=next.js)](https://nextjs.org/docs/app)
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
