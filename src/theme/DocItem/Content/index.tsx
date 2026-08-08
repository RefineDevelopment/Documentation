import React from 'react';
import DocItemContent from '@theme-original/DocItem/Content';
import clsx from 'clsx';
import { useLocation } from '@docusaurus/router';
import type { WrapperProps } from '@docusaurus/types';

type DocItemContentWrapperProps = WrapperProps<typeof DocItemContent>;

/**
 * The route transition lives here, not on the layout. Docusaurus renders the
 * sidebar inside the page tree, so keying the layout re-mounted the sidebar on
 * every click and the whole screen moved. Keying the article means the sidebar
 * and the header stay put and only the thing that actually changed redraws.
 */
export default function DocItemContentWrapper(props: DocItemContentWrapperProps): JSX.Element {
  const location = useLocation();

  return (
    <div
      key={location.pathname}
      className={clsx(
        'page-enter p-6 md:p-10 lg:p-12',
        'rounded-xl border border-border bg-card',
        'min-h-[80vh]'
      )}
    >
      <DocItemContent {...props} />
    </div>
  );
}
