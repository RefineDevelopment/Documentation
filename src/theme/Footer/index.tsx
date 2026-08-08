import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { products } from '../../data/products';

interface FooterItem {
  label: string;
  href: string;
  icon?: IconDefinition;
}

/* One row on a hairline, the same as the tarik footer: product links and social
   links sit at the same weight, and the signature is the only image. */
const Footer: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();

  const links: FooterItem[] = [
    ...products.map((p) => ({ label: p.title, href: p.href })),
    { label: 'Main Website', href: 'https://refinedev.org' },
    { label: 'Resources', href: 'https://refinedev.org/resources' },
    { label: 'Discord', href: 'https://discord.refinedev.org', icon: faDiscord },
    { label: 'GitHub', href: 'https://github.com/RefineDevelopment', icon: faGithub },
    { label: 'Twitter', href: 'https://twitter.com/RefineDev', icon: faTwitter },
  ];

  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="" className="size-8 rounded-md" />
          <div>
            <p className="m-0 text-sm font-medium tracking-tight text-foreground">
              {siteConfig.title}
            </p>
            <p className="m-0 text-xs text-muted-foreground">{siteConfig.tagline}</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:ml-8">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="flex items-center gap-1.5 text-xs text-muted-foreground no-underline transition-colors hover:text-foreground"
            >
              {l.icon && <FontAwesomeIcon icon={l.icon} className="h-3 w-3" />}
              {l.label}
            </Link>
          ))}
        </nav>

        <a
          href="https://github.com/sheduxdev"
          target="_blank"
          rel="noreferrer"
          aria-label="sheduxdev"
          className="shrink-0 opacity-50 transition-opacity hover:opacity-100 sm:ml-auto"
        >
          <img src="/signature.png" alt="shedux" className="h-8 w-auto" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
