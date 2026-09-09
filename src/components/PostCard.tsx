import Link from "next/link";
import { formatDate, formatTag, type PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-gold/25 bg-white/60 p-6 shadow-sm transition hover:border-gold/50 hover:shadow-md">
      <time
        dateTime={post.date}
        className="text-xs font-medium uppercase tracking-wider text-gold"
      >
        {formatDate(post.date)}
      </time>
      <h2 className="mt-2 font-serif text-2xl font-semibold text-burgundy transition group-hover:text-burgundy-soft">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {post.excerpt}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.slice(0, 4).map((tag) => (
          <Link
            key={tag}
            href={`/blog?tag=${encodeURIComponent(tag)}`}
            className="rounded-full bg-cream-dark px-2.5 py-0.5 text-xs text-burgundy-soft transition hover:bg-burgundy hover:text-cream"
          >
            {formatTag(tag)}
          </Link>
        ))}
      </div>
      <Link
        href={`/blog/${post.slug}`}
        className="mt-5 inline-flex text-sm font-semibold text-burgundy underline-offset-4 hover:underline"
      >
        Read pairing →
      </Link>
    </article>
  );
}
