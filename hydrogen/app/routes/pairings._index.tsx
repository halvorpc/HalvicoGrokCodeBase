import {Link, useLoaderData} from 'react-router';
import type {Route} from './+types/pairings._index';
import {PostCard} from '~/components/PostCard';
import {
  formatTag,
  getAllPairings,
  getAllTags,
  getPairingsByTag,
} from '~/lib/pairings';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Pairings Blog | Wine Besties'},
    {
      name: 'description',
      content:
        'Wine and cheese pairing guides from Wine Besties — Cab + cheddar, Champagne + goat cheese, Port + blue, and more.',
    },
  ];
};

export async function loader({request}: Route.LoaderArgs) {
  const url = new URL(request.url);
  const tag = url.searchParams.get('tag') || undefined;
  const allTags = getAllTags();
  const posts = tag ? getPairingsByTag(tag) : getAllPairings();
  return {tag, allTags, posts};
}

export default function PairingsIndex() {
  const {tag, allTags, posts} = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          The Pairings blog
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-burgundy sm:text-5xl">
          {tag ? formatTag(tag) : 'Wine + cheese pairings'}
        </h1>
        <p className="mt-4 text-muted leading-relaxed">
          {tag
            ? `Posts tagged “${formatTag(tag)}”.`
            : 'Clear, warm guides for boards that actually taste amazing together.'}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          to="/pairings"
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${
            !tag
              ? 'bg-burgundy text-cream'
              : 'bg-cream-dark text-burgundy-soft hover:bg-burgundy hover:text-cream'
          }`}
        >
          All
        </Link>
        {allTags.map(({tag: t, count}) => (
          <Link
            key={t}
            to={`/pairings?tag=${encodeURIComponent(t)}`}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              tag === t
                ? 'bg-burgundy text-cream'
                : 'bg-cream-dark text-burgundy-soft hover:bg-burgundy hover:text-cream'
            }`}
          >
            {formatTag(t)} <span className="opacity-70">({count})</span>
          </Link>
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="mt-12 text-muted">
          No posts for this tag.{' '}
          <Link to="/pairings" className="text-burgundy underline">
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
