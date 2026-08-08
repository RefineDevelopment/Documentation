import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import type { ProductLink } from '../data/products';

interface ProductCardProps {
  title: string;
  description: string;
  href: string;
  colorClass?: string;
  icon?: IconDefinition;
  links?: ProductLink[];
}

/**
 * Black on a hairline with a sheen down the top, the same card the tarik grid
 * uses. The link list is the point: landing on this page should put you two
 * clicks from any page you actually came for, not one click from a second index.
 */
const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  href,
  icon,
  links = []
}) => (
  <div className="sheen group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-white/20">
    <Link
      to={href}
      className="flex items-center gap-3 no-underline transition-colors hover:text-foreground"
    >
      {icon && <FontAwesomeIcon icon={icon} className="h-4 w-4 shrink-0 text-primary" />}
      <h3 className="m-0 text-lg font-semibold leading-none tracking-tight text-foreground">
        {title}
      </h3>
      <FontAwesomeIcon
        icon={faArrowRight}
        className="ml-auto h-3 w-3 text-muted-foreground transition-transform group-hover:translate-x-0.5"
      />
    </Link>

    <p className="m-0 mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>

    {links.length > 0 && (
      <ul className="m-0 mt-5 list-none space-y-0.5 border-t border-border p-0 pt-4">
        {links.map((l) => (
          <li key={l.href} className="m-0">
            <Link
              to={l.href}
              className={clsx(
                '-mx-2 flex items-center rounded px-2 py-1.5 text-sm no-underline',
                'text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground'
              )}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default ProductCard;
