# ZironPro Website

Official website and digital experience platform for **ZironPro**.

This project powers the company website, service pages, blog content, lead capture flows, SEO metadata, and brand presentation for ZironPro's digital offerings.

## About ZironPro

ZironPro is a Dubai-based digital marketing and growth agency focused on helping businesses generate visibility, leads, and revenue.

Core service areas include:
- SEO and performance marketing
- Website design and development
- Social media strategy and creative
- Digital and offset printing solutions
- Brand and growth-focused digital strategy

## About This Project

This repository contains the production-ready frontend for ZironPro's public web presence.

It is designed to:
- Showcase services and capabilities
- Publish and manage blog content via MDX
- Capture enquiries through contact workflows
- Support discoverability with strong metadata and sitemap generation
- Provide a scalable base for future product and content expansion

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Biome (linting and formatting)
- MDX content architecture

## Key Routes

- `/` - Home and primary conversion entry
- `/services` - Services hub
- `/services/[category]` and `/services/[category]/[slug]` - Service detail pages
- `/blogs` and `/blogs/[slug]` - Content marketing and insights
- `/contact` - Lead and enquiry capture
- `/about`, `/faqs`, `/our-works` - Brand and trust pages

## Environment Variables

Create `.env.local` in the project root:

```bash
BASE_URL=http://localhost:3000
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
```

- `BASE_URL` is used for canonical URLs, sitemap output, and metadata.
- `GOOGLE_GENERATIVE_AI_API_KEY` enables AI-powered chat functionality.

## Getting Started

1) Install dependencies

```bash
pnpm install
```

2) Run the development server

```bash
pnpm dev
```

3) Open the site:

[http://localhost:3000](http://localhost:3000)

## Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run Biome checks and apply safe fixes
pnpm format   # Format codebase with Biome
```

## Project Structure

```text
src/
  app/          # Next.js App Router pages, layouts, route handlers
  components/   # Shared UI and layout components
  content/      # MDX files for blogs and service content
  data/         # Site-level config, metadata defaults, constants
  features/     # Feature modules (contact, services, etc.)
  lib/          # Utilities and shared helpers
```

## Deployment

Deploy on any Node-compatible platform. Vercel is recommended for the smoothest Next.js deployment workflow.

Before production deploy:
- Set `BASE_URL` to the live domain
- Add all required API keys/secrets
- Run `pnpm build` locally or in CI to verify output
