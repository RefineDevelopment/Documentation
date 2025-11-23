import React from 'react';
import DocItemContent from '@theme-original/DocItem/Content';
import clsx from 'clsx';
import type { WrapperProps } from '@docusaurus/types';
import type { Props } from '@theme/DocItem/Content';

type DocItemContentWrapperProps = WrapperProps<typeof DocItemContent>;

export default function DocItemContentWrapper(props: DocItemContentWrapperProps): JSX.Element {
  return (
    <div className={clsx(
      "p-6 md:p-10 lg:p-12",
      "bg-card/90 border border-border/50 rounded-xl shadow-2xl",
      "min-h-[80vh]"
    )}>
      <DocItemContent {...props} />
    </div>
  );
}