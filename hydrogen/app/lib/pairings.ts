export type PairingMeta = {
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

export type Pairing = PairingMeta & {
  content: string;
};

type FrontMatter = {
  title?: string;
  slug?: string;
  date?: string;
  excerpt?: string;
  tags?: string[];
  wine?: string;
  cheese?: string;
  whyItWorks?: string;
  servingTips?: string;
};

const rawModules = import.meta.glob('../../content/pairings/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parseFrontMatter(raw: string): {data: FrontMatter; content: string} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return {data: {}, content: raw.trim()};
  }

  const yaml = match[1];
  const content = match[2].trim();
  const data: FrontMatter = {};

  for (const line of yaml.split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      data[key as keyof FrontMatter] = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean) as never;
      continue;
    }

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    data[key as keyof FrontMatter] = value as never;
  }

  return {data, content};
}

function parsePairing(filepath: string, raw: string): Pairing {
  const filename = filepath.split('/').pop() || filepath;
  const {data, content} = parseFrontMatter(raw);

  return {
    title: data.title || filename.replace(/\.md$/, ''),
    slug: data.slug || filename.replace(/\.md$/, ''),
    date: data.date || '2026-01-01',
    excerpt: data.excerpt || '',
    tags: data.tags || [],
    wine: data.wine || '',
    cheese: data.cheese || '',
    whyItWorks: data.whyItWorks || '',
    servingTips: data.servingTips || '',
    content,
  };
}

let cached: Pairing[] | null = null;

export function getAllPairings(): Pairing[] {
  if (cached) return cached;
  cached = Object.entries(rawModules)
    .map(([path, raw]) => parsePairing(path, raw))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return cached;
}

export function getPairingBySlug(slug: string): Pairing | undefined {
  return getAllPairings().find((p) => p.slug === slug);
}

export function getAllTags(): {tag: string; count: number}[] {
  const counts = new Map<string, number>();
  for (const post of getAllPairings()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({tag, count}))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

export function getPairingsByTag(tag: string): Pairing[] {
  return getAllPairings().filter((p) => p.tags.includes(tag));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTag(tag: string): string {
  return tag
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
