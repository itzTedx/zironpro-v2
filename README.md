# ZironPro Website

Official marketing website for **ZironPro**, built with Next.js App Router, TypeScript, Tailwind CSS, and MDX content.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Biome (formatting + linting)

## Getting Started

### 1) Install dependencies

```bash
pnpm install
```

### 2) Run development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file in the project root:

```bash
BASE_URL=http://localhost:3000
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
```

Notes:
- `BASE_URL` is used for metadata and sitemap URLs.
- `GOOGLE_GENERATIVE_AI_API_KEY` is required for the AI chat features.

## Scripts

```bash
pnpm dev      # Start local dev server
pnpm build    # Create production build
pnpm start    # Start production server
pnpm lint     # Run Biome checks (with write)
pnpm format   # Format code with Biome
```

## Project Structure

```text
src/
  app/          # Next.js routes and layouts
  components/   # Shared UI/layout components
  data/         # Site configuration and constants
  features/     # Feature modules (contact, services, etc.)
  content/      # MDX content (blogs/services)
```

## Deployment

Deploy with any Node-compatible host (Vercel recommended for easiest Next.js setup).
