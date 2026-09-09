import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
        404
      </p>
      <h1 className="mt-3 font-serif text-4xl font-semibold text-burgundy">
        Pairing not found
      </h1>
      <p className="mt-4 text-muted">
        That page wandered off the board. Let’s get you back to the good stuff.
      </p>
      <Link
        href="/blog"
        className="mt-8 inline-flex rounded-full bg-burgundy px-6 py-3 text-sm font-semibold text-cream hover:bg-burgundy-soft"
      >
        Browse pairings
      </Link>
    </div>
  );
}
