import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons';
import clsx from 'clsx';
import { products } from '../../data/products';

interface FooterLinkProps {
  href: string;
  label: string;
  Icon?: IconDefinition;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, label, Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-muted-foreground hover:text-[#e91e63] transition-colors flex items-center gap-2 text-sm"
  >
    {Icon && <FontAwesomeIcon icon={Icon} className="w-4 h-4" />}
    {label}
  </a>
);

interface FooterItem {
  label: string;
  href: string;
  Icon: IconDefinition;
}

interface FooterSection {
  title: string;
  items: FooterItem[];
}

const Footer: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const { title } = siteConfig;

  const currentYear: number = new Date().getFullYear();

  const logoSrc: string = "/logo.png";
  const logoAlt: string = "Refine Development Logo";

  const footerSections: FooterSection[] = [
    {
      title: "Products",
      items: products.map(p => ({
        label: p.title,
        href: p.href,
        Icon: p.icon
      })),
    },
    {
      title: "Quick Links",
      items: [
        { label: "Home", href: "/", Icon: faLink },
        { label: "Main Website", href: "https://refinedev.org", Icon: faLink },
        { label: "Resources", href: "https://refinedev.org/resources", Icon: faLink },
      ],
    },
    {
      title: "Connect",
      items: [
        { label: "Discord", href: "https://discord.refinedev.org", Icon: faDiscord },
        { label: "GitHub", href: "https://github.com/RefineDevelopment", Icon: faGithub },
        { label: "Twitter", href: "https://twitter.com/RefineDev", Icon: faTwitter },
      ],
    },
  ];

  return (
    <footer className={clsx(
      "bg-background backdrop-blur-sm border-t border-border/40 py-12 md:py-16 mt-auto",
      "text-foreground"
    )}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left border-b border-border/40 pb-8 mb-8">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
              <img src={logoSrc} alt={logoAlt} className="h-8 w-auto" />
              <span className="text-lg font-semibold">{title}</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto md:mx-0">
              A dedicated software studio focused on delivering optimized, scalable plugins and custom-tailored server solutions.
            </p>
          </div>

          {footerSections.map((section, index) => (
            <div key={index} className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">{section.title}</h4>
              <ul className="space-y-2 text-sm list-none p-0 m-0">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <FooterLink {...item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center text-xs text-muted-foreground">
          <p className="text-center md:text-left mb-2 md:mb-0">
            &copy; {currentYear} Refine Development. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-2 md:mt-0">
            <a
              href="https://shedux.dev"
              target="_blank"
              className="inline-block transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] opacity-60 hover:opacity-100"
            >
              <img src="/signature.png" alt="shedux" className="h-10 w-auto" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;