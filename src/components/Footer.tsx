import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gold/30 bg-burgundy-deep text-cream">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-serif text-xl font-semibold text-gold-light">
            Wine Besties
          </p>
          <p className="mt-2 text-sm text-cream/75">
            A Halvico brand — elegant pairings without the snobbery.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gold">
            Explore
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/blog" className="hover:text-gold-light transition">
                Pairings blog
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gold-light transition">
                About
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gold">
            Store
          </p>
          <ul className="mt-3 space-y-2 text-sm text-cream/80">
            <li>
              <a
                href="https://www.winebesties.com"
                className="hover:text-gold-light transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.winebesties.com
              </a>
            </li>
            <li className="text-cream/60 text-xs">
              Shopify: szrfry-ar.myshopify.com
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Wine Besties / Halvico. Cheers. 🍷🧀
      </div>
    </footer>
  );
}
