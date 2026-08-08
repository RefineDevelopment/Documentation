import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import { DocCards, DocCard, Steps } from '../components/DocCards';

/* Available in every .mdx file without an import. */
export default {
  ...MDXComponents,
  DocCards,
  DocCard,
  Steps,
};
