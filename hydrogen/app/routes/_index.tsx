import {Await, useLoaderData, Link} from 'react-router';
import type {Route} from './+types/_index';
import {Suspense} from 'react';
import {Image} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {ProductItem} from '~/components/ProductItem';
import {MockShopNotice} from '~/components/MockShopNotice';
import {PostCard} from '~/components/PostCard';
import {getAllPairings} from '~/lib/pairings';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Wine Besties | Halvico — Wine & Cheese Pairings'},
    {
      name: 'description',
      content:
        'Elegant wine and cheese pairings without the snobbery. Discover pours and plates that actually love each other — from Wine Besties by Halvico.',
    },
  ];
};

export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  const featuredPairings = getAllPairings().slice(0, 3);

  return {...deferredData, ...criticalData, featuredPairings};
}

async function loadCriticalData({context}: Route.LoaderArgs) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
  ]);

  return {
    isShopLinked: Boolean(context.env.PUBLIC_STORE_DOMAIN),
    featuredCollection: collections.nodes[0],
  };
}

function loadDeferredData({context}: Route.LoaderArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error: Error) => {
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      {data.isShopLinked ? null : <MockShopNotice />}

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
              to="/pairings"
              className="rounded-full bg-burgundy px-6 py-3 text-sm font-semibold text-cream shadow-sm transition hover:bg-burgundy-soft"
            >
              Explore pairings
            </Link>
            <Link
              to="/about"
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
            to="/pairings"
            className="text-sm font-semibold text-burgundy underline-offset-4 hover:underline"
          >
            Read the Pairings blog →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.featuredPairings.map((post) => (
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
            to="/about"
            className="mt-8 inline-flex rounded-full border border-gold/50 px-6 py-3 text-sm font-semibold text-gold-light transition hover:bg-gold/15"
          >
            About Wine Besties
          </Link>
        </div>
      </section>

      {data.featuredCollection ? (
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold text-burgundy mb-6">
            From the shop
          </h2>
          <FeaturedCollection collection={data.featuredCollection} />
        </section>
      ) : null}

      <RecommendedProducts products={data.recommendedProducts} />

      <section className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
        <h2 className="font-serif text-3xl font-semibold text-burgundy">
          Join the Besties
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-muted">
          Pairing ideas, hosting tips, and soft-gold vibes — explore{' '}
          <Link
            to="/pairings"
            className="font-medium text-burgundy underline-offset-2 hover:underline"
          >
            the Pairings blog
          </Link>{' '}
          or{' '}
          <Link
            to="/collections"
            className="font-medium text-burgundy underline-offset-2 hover:underline"
          >
            shop collections
          </Link>
          .
        </p>
      </section>
    </div>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection wine-featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image
            data={image}
            sizes="100vw"
            alt={image.altText || collection.title}
          />
        </div>
      )}
      <h3 className="font-serif text-2xl font-semibold text-burgundy mt-4">
        {collection.title}
      </h3>
    </Link>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <section
      className="recommended-products mx-auto max-w-5xl px-4 py-8 sm:px-6"
      aria-labelledby="recommended-products"
    >
      <h2
        id="recommended-products"
        className="font-serif text-3xl font-semibold text-burgundy"
      >
        Recommended Products
      </h2>
      <Suspense fallback={<div className="mt-6 text-muted">Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid mt-8">
              {response
                ? response.products.nodes.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
    </section>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
