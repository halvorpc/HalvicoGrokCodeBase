import type { Metadata } from "next";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import {
  formatTag,
  getAllPosts,
  getAllTags,
  getPostsByTag,
} from "@/lib/posts";

export const metadata: Metadata = {
  title: "Pairings Blog",
  description:
    "Wine and cheese pairing guides from Wine Besties — Cab + cheddar, Champagne + goat cheese, Port + blue, and more.",
  openGraph: {
    title: "Pairings Blog | Wine Besties",
    description:
      "Browse wine + cheese pairing guides with tags, serving tips, and bestie energy.",
  },
};

type BlogPageProps = {
  searchParams: Promise<{ tag?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { tag } = await searchParams;
  const allTags = getAllTags();
  const posts = tag ? getPostsByTag(tag) : getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          The Pairings blog
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-burgundy sm:text-5xl">
          {tag ? formatTag(tag) : "Wine + cheese pairings"}
        </h1>
        <p className="mt-4 text-muted leading-relaxed">
          {tag
            ? `Posts tagged “${formatTag(tag)}”.`
            : "Clear, warm guides for boards that actually taste amazing together."}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${
            !tag
              ? "bg-burgundy text-cream"
              : "bg-cream-dark text-burgundy-soft hover:bg-burgundy hover:text-cream"
          }`}
        >
          All
        </Link>
        {allTags.map(({ tag: t, count }) => (
          <Link
            key={t}
            href={`/blog?tag=${encodeURIComponent(t)}`}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              tag === t
                ? "bg-burgundy text-cream"
                : "bg-cream-dark text-burgundy-soft hover:bg-burgundy hover:text-cream"
            }`}
          >
            {formatTag(t)}{" "}
            <span className="opacity-70">({count})</span>
          </Link>
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="mt-12 text-muted">
          No posts for this tag.{" "}
          <Link href="/blog" className="text-burgundy underline">
            View all pairings
          </Link>
          .
        </p>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
