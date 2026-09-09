# Wine Besties — Shopify Admin Setup Checklist

Store: `szrfry-ar.myshopify.com`  
Domain: `winebesties.com` / `www.winebesties.com` (GoDaddy)

Do these in order. Tick as you go.

---

## 1. Store name & profile

1. Go to **Settings → Store details**.
2. Set **Store name** to `Wine Besties` (legal / business name can remain Halvico if you prefer).
3. Update contact email, address, and phone if needed.
4. **Settings → Brand** (or Theme settings): upload logo when ready; use cream/burgundy/gold palette below.

---

## 2. Branding colors

In **Online Store → Themes → Customize → Theme settings → Colors** (Dawn):

| Role | Color idea | Suggested hex (starting point) |
|------|------------|--------------------------------|
| Background / cream | Soft warm cream | `#F7F1E8` |
| Text / deep burgundy | Elegant burgundy | `#6B1E2A` |
| Accent / soft gold | Soft gold | `#C4A35A` |
| Buttons (primary) | Burgundy | `#6B1E2A` |
| Buttons (secondary) / borders | Soft gold | `#C4A35A` |
| Sale / highlight (optional) | Slightly deeper gold | `#A8893A` |

Adjust to taste after previewing on a product card and the homepage hero.

---

## 3. Enable Blog → create “Pairings”

1. **Online Store → Blog posts** (or **Online Store → Pages → Blog** depending on admin layout).
2. Ensure blogging is enabled for the Online Store sales channel.
3. Create a blog named **Pairings** (handle often `pairings`).
4. Later: create 5 articles from files in `BLOG-POSTS/` (paste title, tags, excerpt, HTML body).

---

## 4. Custom domain (Shopify + GoDaddy)

### A. In Shopify

1. **Settings → Domains**.
2. Click **Connect existing domain** (or equivalent).
3. Enter `winebesties.com` (and connect `www` as prompted).
4. Follow Shopify’s connection wizard. **Confirm the exact A / AAAA / CNAME values shown in the Shopify Domains UI** — Shopify’s documented defaults are below, but always match what your admin shows.

### B. Documented Shopify DNS defaults (confirm in Domains UI)

At GoDaddy → **DNS** for `winebesties.com`:

| Type | Name / Host | Value | Notes |
|------|-------------|-------|--------|
| **A** | `@` (root) | `23.227.38.65` | Shopify IPv4. Keep only one A for `@`. |
| **AAAA** | `@` (root) | `2620:0127:f00f:5::` | Shopify IPv6. Expanded form if needed: `2620:0127:f00f:0005:0000:0000:0000:0000` |
| **CNAME** | `www` | `shops.myshopify.com.` | Trailing period required in many DNS UIs; GoDaddy may add it automatically |

**Confirm in Shopify Domains UI** before saving — values can vary slightly if Shopify auto-assigned a related A endpoint.

### C. After DNS

1. Save at GoDaddy; wait for propagation (often minutes, up to 48 hours).
2. In Shopify Domains, verify connection and SSL (padlock).
3. Set **primary domain** to `www.winebesties.com` (or root — pick one) and enable redirects from the other.
4. If you use Cloudflare later: use DNS-only (grey cloud) during SSL issuance; turn off DNSSEC if it blocks Shopify.

---

## 5. Theme: Dawn (recommended)

1. **Online Store → Themes → Visit Theme Store**.
2. Install **Dawn** (free, Shopify’s default — clean, fast, easy sections). Alternatives: Sense, Craft, or another free OS 2.0 theme with similar section flexibility.
3. **Customize** the live theme:
   - **Header:** logo, menu (Home, Pairings, Shop, About).
   - **Homepage sections (suggested):**
     1. **Image banner / Hero** — use copy from `HOMEPAGE-COPY.md`
     2. **Featured collection** or **Multicolumn** — “Featured pairings” (link to blog or products)
     3. **Rich text** — short “How we pair” blurb
     4. **Blog posts** section — show latest from **Pairings**
     5. **Email signup** (optional) — “Join the Besties”
   - **Footer:** About link, contact, socials, Halvico / Wine Besties credit.

---

## 6. Pages & navigation

1. Create page **About** — paste from `ABOUT.md`.
2. Add About + Pairings (blog) to main menu.
3. Soft-launch: password page off when ready (**Online Store → Preferences**).

---

## 7. Quick QA

- [ ] Homepage hero + CTA look good on mobile  
- [ ] At least one Pairings post published  
- [ ] Domain resolves with HTTPS  
- [ ] Burgundy / cream / gold feel consistent  
- [ ] Store name shows as Wine Besties in browser tab / checkout header  

Done? You’re ready to add products and featured pairing collections.
