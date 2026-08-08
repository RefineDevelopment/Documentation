import React from 'react';
import Link from '@docusaurus/Link';

/**
 * A grid of destinations for the top of a product's introduction page. The
 * intros are long — requirements, install steps, troubleshooting — and someone
 * who already knows what they need should not have to read past all of it.
 */
export function DocCards({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}

const CARD =
  'group flex flex-col rounded-lg border border-border bg-card p-4 !no-underline transition-colors hover:border-white/20';

export function DocCard({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children?: React.ReactNode;
}) {
  const body = (
    <>
      <span className="text-sm font-medium text-foreground">{title}</span>
      {children && (
        <span className="mt-1 text-xs leading-relaxed text-muted-foreground">{children}</span>
      )}
    </>
  );

  // Static assets (the generated javadocs) and absolute URLs are not routes, so
  // they must not go through the router — it would append a trailing slash and
  // the link-checker would flag them.
  const isExternal = /^https?:\/\//.test(href) || href.endsWith('.html');

  return isExternal ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={CARD}>
      {body}
    </a>
  ) : (
    <Link to={href} className={CARD}>
      {body}
    </Link>
  );
}

/**
 * Numbered steps with a rail down the left. Ordinary `<ol>` markers get lost in
 * a long install section; these hold their place while scrolling past.
 */
export function Steps({ children }: { children: React.ReactNode }) {
  return <div className="doc-steps my-6">{children}</div>;
}
