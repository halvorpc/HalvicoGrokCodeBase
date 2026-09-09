import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Wine Besties by Halvico — cozy wine and cheese pairings that feel special without the snobbery.",
  openGraph: {
    title: "About Wine Besties",
    description:
      "We’re Halvico’s cozy corner of the internet for wine + cheese pairings that feel special without the snobbery.",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
        Halvico
      </p>
      <h1 className="mt-3 font-serif text-4xl font-semibold text-burgundy sm:text-5xl">
        About Wine Besties
      </h1>

      <div className="prose-besties mt-10">
        <p>
          Hey bestie — welcome to <strong>Wine Besties</strong>.
        </p>
        <p>
          We’re Halvico’s cozy corner of the internet for wine + cheese pairings
          that feel special without the snobbery. Think candlelight energy, not
          lecture-hall vibes. We believe a great pour and a perfect bite should
          be fun to discover, easy to remember, and even better to share.
        </p>

        <h2>What we’re about</h2>
        <p>
          Wine Besties is built for people who love a good glass and a better
          board — whether you’re hosting Friday night, packing a picnic, or just
          treating yourself on a Tuesday. We translate “sommelier talk” into
          bestie talk: clear, warm, and actually useful.
        </p>
        <ul>
          <li>
            <strong>Pairings first</strong> — every tip is built around what
            tastes amazing together.
          </li>
          <li>
            <strong>Approachable elegance</strong> — cream, burgundy, and soft
            gold vibes; never stuffy.
          </li>
          <li>
            <strong>Real-life ready</strong> — serving tips you can use tonight,
            not someday.
          </li>
        </ul>

        <h2>Why “besties”?</h2>
        <p>
          Because the best wine nights aren’t solo homework — they’re shared.
          We’re the friend who texts you{" "}
          <em>“trust me on the cheddar with that Cab”</em> and then shows up
          with the crackers. Knowledgeable? Yes. Intimidating? Never.
        </p>

        <h2>From Halvico, with love</h2>
        <p>
          Wine Besties is a Halvico brand — crafted for hosts, curious sippers,
          and anyone building their own little ritual around what’s in the glass
          and what’s on the plate.
        </p>
        <p>
          Grab a glass. Grab a wedge. Let’s find your next favorite pairing.
        </p>
        <p>
          <strong>Cheers,</strong>
          <br />
          The Wine Besties crew 🍷🧀
        </p>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          href="/blog"
          className="rounded-full bg-burgundy px-6 py-3 text-sm font-semibold text-cream transition hover:bg-burgundy-soft"
        >
          Explore pairings
        </Link>
        <a
          href="https://www.winebesties.com"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-burgundy/30 px-6 py-3 text-sm font-semibold text-burgundy transition hover:bg-cream-dark"
        >
          Visit the shop
        </a>
      </div>
    </div>
  );
}
