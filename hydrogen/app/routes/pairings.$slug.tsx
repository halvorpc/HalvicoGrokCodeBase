import {Link, useLoaderData} from 'react-router';
import type {Route} from './+types/pairings.$slug';
import {Markdown} from '~/components/Markdown';
import {PairingCallout} from '~/components/PairingCallout';
import {
  formatDate,
  formatTag,
  getPairingBySlug,
} from '~/lib/pairings';

export const meta: Route.MetaFunction = ({data}) => {
  if (!data?.post) return [{title: 'Pairing not found | Wine Besties'}];
  return [
    {title: `${data.post.title} | Wine Besties`},
    {name: 'description', content: data.post.excerpt},
  ];
};

export async function loader({params}: Route.LoaderArgs) {
  const post = getPairingBySlug(params.slug || '');
  if (!post) {
    throw new Response('Not found', {status: 404});
  }
  return {post};
}

export default function PairingArticle() {
  const {post} = useLoaderData<typeof loader>();

  const parts = post.content.split(/\n## /);
  const intro = parts[0] ?? '';
  const rest =
    parts.length > 1
      ? parts.slice(1).map((p) => `## ${p}`).join('\n')
      : '';

  let beforeCallout = intro;
  let afterCallout = rest;
  if (rest) {
    const restParts = rest.split(/\n(?=## )/);
    beforeCallout = [intro, restParts[0]].filter(Boolean).join('\n\n');
    afterCallout = restParts.slice(1).join('\n\n');
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        to="/pairings"
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
              to={`/pairings?tag=${encodeURIComponent(tag)}`}
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
