import React from 'react';
import OriginalLink from '@theme-original/DocSidebarItem/Link';
import { isSamePath } from '@docusaurus/theme-common/internal';
import SidebarToc from '../../../components/SidebarToc';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof OriginalLink>;

/**
 * The page you are on expands to show its own headings, so the sidebar answers
 * both "where am I in the docs" and "where am I on this page" in one column.
 */
export default function LinkWrapper(props: Props): JSX.Element {
  const { item, activePath } = props as Props & {
    item: { href?: string };
    activePath: string;
  };
  const isActive = !!item.href && isSamePath(item.href, activePath);

  return (
    <>
      <OriginalLink {...props} />
      {isActive && <SidebarToc />}
    </>
  );
}
