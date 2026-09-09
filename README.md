# Wine Besties — Pairing Blog

Polished **Next.js (App Router) + TypeScript + Tailwind** blog for **Wine Besties / Halvico** — elegant but approachable wine & cheese pairings (cream, burgundy, soft gold).

## Store & repo

| | |
|---|---|
| Shopify store | [szrfry-ar.myshopify.com](https://szrfry-ar.myshopify.com) |
| Custom domain | [www.winebesties.com](https://www.winebesties.com) |
| GitHub | [github.com/halvorpc/halvicogrokcodebase](https://github.com/halvorpc/halvicogrokcodebase.git) |

## How to run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # serve production build
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Home — hero, featured pairings, brand story |
| `/blog` | Pairings index with tag filters (`?tag=…`) |
| `/blog/[slug]` | Individual pairing post + callout |
| `/about` | About Wine Besties / Halvico |

## Content

- Markdown posts live in `content/posts/` (frontmatter + body).
- Shopify setup pack (copy, checklist, original blog HTML) is mirrored in `shopify-pack/`.

## Stack

- Next.js App Router, React, TypeScript
- Tailwind CSS v4
- `gray-matter` + `react-markdown` for posts
- SEO metadata (title template, Open Graph, canonical)

## Brand

Cream canvas, burgundy accents, soft gold highlights — approachable elegance, never stuffy.
