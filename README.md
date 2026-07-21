# SANNI Bottles

The official landing page for SANNI magnetic bottles. The site showcases the
Black, Pink, and Cream White finishes, the included MagSafe adapter ring, and
the product photography supplied by SANNI.

## Prerequisites

- Node.js 22.13 or newer
- pnpm

## Quick Start

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:3000`.

## Production build

```sh
pnpm build
```

The static production site is written to `out/`.

## Cloudflare Pages

Connect this GitHub repository to Cloudflare Pages with these settings:

- Production branch: `main`
- Build command: `pnpm build`
- Build output directory: `out`
- Node.js version: `22.13.0` or newer

No environment variables are required for this static site.
