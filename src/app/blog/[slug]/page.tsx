import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "@/components/Markdown";
import PairingCallout from "@/components/PairingCallout";
import {
  formatDate,
  formatTag,
  getAllPosts,
  getPostBySlug,
} from "@/lib/posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Split content so callout can sit after the intro / first section
  const parts = post.content.split(/\n## /);
  const intro = parts[0] ?? "";
  const rest =
    parts.length > 1
      ? parts
          .slice(1)
          .map((p, i) => (i === 0 ? `## ${p}` : `## ${p}`))
          .join("\n")
      : "";

  // Prefer callout after first h2 section if present
  let beforeCallout = intro;
  let afterCallout = rest;
  if (rest) {
    const restParts = rest.split(/\n(?=## )/);
    beforeCallout = [intro, restParts[0]].filter(Boolean).join("\n\n");
    afterCallout = restParts.slice(1).join("\n\n");
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/blog"
        className="text-sm font-medium text-burgundy-soft hover:text-burgundy"
      >
        ← All pairings
      </Link>
      <header className="mt-6">
        <time
          dateTime={post.date}
          className="text-xs font-semibold uppercase tracking-wider text-gold"
        >
          {formatDate(post.date)}
        </time>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-burgundy sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-muted leading-relaxed">{post.excerpt}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className="rounded-full bg-cream-dark px-2.5 py-0.5 text-xs text-burgundy-soft transition hover:bg-burgundy hover:text-cream"
            >
              {formatTag(tag)}
            </Link>
          ))}
        </div>
      </header>

      <div className="mt-10">
        <Markdown content={beforeCallout} />
        <PairingCallout
          wine={post.wine}
          cheese={post.cheese}
          whyItWorks={post.whyItWorks}
          servingTips={post.servingTips}
        />
        {afterCallout ? <Markdown content={afterCallout} /> : null}
      </div>
    </article>
  );
}
