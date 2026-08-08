import React from 'react';
import OriginalLayout from '@theme-original/Layout';

/**
 * The layout never re-mounts. Route transitions live in DocItem/Content (docs)
 * and on the page itself (landing), so the header, sidebar and footer hold
 * still while only the changed content redraws.
 */
export default function Layout({ children, ...props }) {
  return (
    <>
      {/* The one thing behind the content: a brand-tinted glow off the top edge. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[32rem] opacity-60"
        style={{
          background:
            'radial-gradient(40rem 22rem at 50% -6rem, color-mix(in oklch, hsl(var(--primary)) 24%, transparent), transparent 70%)',
        }}
      />

      <OriginalLayout {...props}>{children}</OriginalLayout>
    </>
  );
}
