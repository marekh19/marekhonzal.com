# marekhonzal.com

Personal website and blog built with [Astro](https://astro.build/), featuring blog posts,
project showcases, and a clean, performant static site architecture.

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build/) with TypeScript
- **UI**: Preact components, TailwindCSS, DaisyUI
- **Content**: MDX with Astro Content Collections
- **Deployment**: Cloudflare Workers
- **Package Manager**: pnpm

## ✨ Features

- **Blog**: MDX-based blog posts with categories, tags, and reading time
- **Projects**: Showcase of personal projects with technology tags
- **RSS Feed**: Automatic RSS generation for blog posts
- **Sitemap**: SEO-friendly sitemap generation
- **OG Images**: Dynamic Open Graph image generation
- **Comments**: Giscus integration for blog posts and project details
- **Syntax Highlighting**: Shiki with Catppuccin themes
- **Table of Contents**: Auto-generated TOC for articles

## 🛠️ Getting Started

### Prerequisites

- Node.js >=26
- pnpm >=12

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Starts the development server at `http://localhost:4321`.

### Build

```bash
pnpm build
```

Generates static site in the `dist/` directory.

### Preview

```bash
pnpm exec wrangler dev
```

Preview the production build locally.

## 📜 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm format:check` - Check code formatting
- `pnpm format:write` - Format code
- `pnpm lint:check` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors
- `pnpm knip` - Find unused files and dependencies

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── content/        # Blog posts and projects (MDX)
├── layouts/        # Page layouts
├── lib/            # Utilities and helpers
├── pages/          # Astro pages and routes
├── styles/         # Global styles and themes
└── config/         # Site configuration
```

## 🚢 Deployment

Deployed to Cloudflare Workers via Wrangler. The site supports both staging and production
environments configured in `wrangler.jsonc`.

## 🪪 License

This repository uses **dual licensing**:

- **Code** — [MIT License](./LICENSE)  
  © 2025 Marek Honzal. You're free to use, modify, and distribute the source code.

- **Content (articles, images, MDX files)** — [CC BY-NC-ND 4.0](./CONTENT-LICENSE)  
  You may share the content with attribution, but you may **not** use it for commercial
  purposes or create derivative works.

---

For clarity:

- All code in `/src`, `/components`, configuration files, etc. → **MIT**
- All text and media in `/src/content` → \*\*CC BY-NC-ND 4.0`
