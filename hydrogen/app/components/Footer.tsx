import {Suspense} from 'react';
import {Await, NavLink} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer wine-footer">
      <div className="wine-footer-grid">
        <div>
          <p className="wine-footer-brand">Wine Besties</p>
          <p className="wine-footer-tagline">
            A Halvico brand — elegant pairings without the snobbery.
          </p>
        </div>
        <div>
          <p className="wine-footer-heading">Explore</p>
          <ul className="wine-footer-links">
            <li>
              <NavLink prefetch="intent" to="/pairings">
                Pairings blog
              </NavLink>
            </li>
            <li>
              <NavLink prefetch="intent" to="/about">
                About
              </NavLink>
            </li>
            <li>
              <NavLink prefetch="intent" to="/collections">
                Shop
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <p className="wine-footer-heading">Policies</p>
          <Suspense>
            <Await resolve={footerPromise}>
              {(footer) => (
                <FooterMenu
                  menu={footer?.menu}
                  primaryDomainUrl={header.shop.primaryDomain?.url || ''}
                  publicStoreDomain={publicStoreDomain}
                />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="wine-footer-copy">
        © {year} Wine Besties / Halvico. Cheers. 🍷🧀
      </div>
    </footer>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: string;
  publicStoreDomain: string;
}) {
  return (
    <ul className="wine-footer-links">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          (primaryDomainUrl && item.url.includes(primaryDomainUrl))
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return (
          <li key={item.id}>
            {isExternal ? (
              <a href={url} rel="noopener noreferrer" target="_blank">
                {item.title}
              </a>
            ) : (
              <NavLink end prefetch="intent" to={url}>
                {item.title}
              </NavLink>
            )}
          </li>
        );
      })}
    </ul>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};
