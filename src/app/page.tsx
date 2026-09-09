import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-gold/25 bg-gradient-to-b from-cream via-cream to-cream-dark">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-burgundy/10 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Wine Besties · Halvico
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-burgundy sm:text-5xl md:text-6xl">
            Wine + cheese, bestie-approved.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Elegant pairings without the snobbery. Discover pours and plates
            that actually love each other — then serve them like you’ve done
            this forever.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/blog"
              className="rounded-full bg-burgundy px-6 py-3 text-sm font-semibold text-cream shadow-sm transition hover:bg-burgundy-soft"
            >
              Explore pairings
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-burgundy/30 bg-cream px-6 py-3 text-sm font-semibold text-burgundy transition hover:border-burgundy hover:bg-cream-dark"
            >
              Meet Wine Besties
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-burgundy">
              Tonight’s bestie picks
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              Five classic matches we come back to again and again — from Cab +
              cheddar to Champagne + goat cheese.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-burgundy underline-offset-4 hover:underline"
          >
            Read the Pairings blog →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="border-y border-gold/25 bg-burgundy text-cream">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
          <h2 className="font-serif text-3xl font-semibold text-gold-light">
            How we pair
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-cream/85 leading-relaxed">
            We keep it simple: the wine, the cheese, why they click, and how to
            serve them. No jargon wall. Just warm, useful tips for your next
            board.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex rounded-full border border-gold/50 px-6 py-3 text-sm font-semibold text-gold-light transition hover:bg-gold/15"
          >
            About Wine Besties
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
        <h2 className="font-serif text-3xl font-semibold text-burgundy">
          Join the Besties
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-muted">
          Pairing ideas, hosting tips, and soft-gold vibes — visit{" "}
          <a
            href="https://www.winebesties.com"
            className="font-medium text-burgundy underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.winebesties.com
          </a>{" "}
          for the shop and more.
        </p>
      </section>
    </>
  );
}
