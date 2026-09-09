import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

const BRAND_NAV = [
  {id: 'home', title: 'Home', url: '/'},
  {id: 'pairings', title: 'Pairings', url: '/pairings'},
  {id: 'collections', title: 'Shop', url: '/collections'},
  {id: 'about', title: 'About', url: '/about'},
];

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  return (
    <header className="header wine-header">
      <NavLink prefetch="intent" to="/" className="wine-brand" end>
        <span className="wine-brand-name">Wine Besties</span>
        <span className="wine-brand-sub">Halvico</span>
      </NavLink>
      <HeaderMenu
        menu={header.menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
      />
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
    </header>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const className = `header-menu-${viewport}`;
  const {close} = useAside();

  // Wine Besties brand nav; fall back to Shopify menu if brand list is empty
  const shopifyItems =
    (menu || FALLBACK_HEADER_MENU).items
      .map((item) => {
        if (!item.url) return null;
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return {id: item.id, title: item.title, url};
      })
      .filter(Boolean) as {id: string; title: string; url: string}[];

  const items = BRAND_NAV.length ? BRAND_NAV : shopifyItems;

  return (
    <nav className={className} role="navigation" aria-label="Main">
      {items.map((item) => (
        <NavLink
          className="header-menu-item"
          end={item.url === '/'}
          key={item.id}
          onClick={close}
          prefetch="intent"
          to={item.url}
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <NavLink prefetch="intent" to="/account" className="header-cta-link">
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(loggedIn) => (loggedIn ? 'Account' : 'Sign in')}
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset"
      onClick={() => open('mobile')}
      aria-label="Open menu"
    >
      <h3>☰</h3>
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button className="reset header-cta-link" onClick={() => open('search')}>
      Search
    </button>
  );
}

function CartBadge({count}: {count: number}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      className="header-cta-link"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
    >
      Cart <span aria-label={`(items: ${count})`}>{count}</span>
    </a>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/home',
      resourceId: null,
      tags: [],
      title: 'Home',
      type: 'HTTP',
      url: '/',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/pairings',
      resourceId: null,
      tags: [],
      title: 'Pairings',
      type: 'HTTP',
      url: '/pairings',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/collections',
      resourceId: null,
      tags: [],
      title: 'Shop',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/about',
      resourceId: null,
      tags: [],
      title: 'About',
      type: 'HTTP',
      url: '/about',
      items: [],
    },
  ],
};
