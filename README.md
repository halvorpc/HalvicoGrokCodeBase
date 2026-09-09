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

## Hydrogen storefront (Shopify)

Shopify Hydrogen app lives in [`hydrogen/`](./hydrogen/) — React Router + Tailwind, mocked with mock.shop until linked.

```bash
cd hydrogen
npm run dev
```

Next steps to connect Wine Besties store (`szrfry-ar.myshopify.com`):

1. In Shopify admin (your browser): install the **Hydrogen** sales channel.
2. Locally: `cd hydrogen && npx shopify hydrogen link` then `npx shopify hydrogen env pull`
3. Deploy preview: `npx shopify hydrogen deploy`
4. Point `www.winebesties.com` at the Hydrogen/Oxygen storefront when ready.

The Next.js app at the repo root remains the pairing-blog prototype; Hydrogen is the Shopify commerce storefront path.
