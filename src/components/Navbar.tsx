import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Pairings" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  return (
    <header className="border-b border-gold/30 bg-cream/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="group flex flex-col leading-tight">
          <span className="font-serif text-2xl font-semibold tracking-wide text-burgundy transition group-hover:text-burgundy-soft">
            Wine Besties
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-gold">
            Halvico
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-ink/80 transition hover:bg-cream-dark hover:text-burgundy sm:px-4"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
