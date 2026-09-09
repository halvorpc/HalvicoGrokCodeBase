import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostMeta = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags: string[];
  wine: string;
  cheese: string;
  whyItWorks: string;
  servingTips: string;
};

export type Post = PostMeta & {
  content: string;
};

function parsePost(filename: string): Post {
  const fullPath = path.join(postsDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    title: data.title as string,
    slug: (data.slug as string) || filename.replace(/\.md$/, ""),
    date: data.date as string,
    excerpt: data.excerpt as string,
    tags: (data.tags as string[]) || [],
    wine: data.wine as string,
    cheese: data.cheese as string,
    whyItWorks: data.whyItWorks as string,
    servingTips: data.servingTips as string,
    content: content.trim(),
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const files = fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"));
  return files
    .map(parsePost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTag(tag: string): string {
  return tag
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
