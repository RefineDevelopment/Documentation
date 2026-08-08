import React from 'react';
import Layout from '@theme/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faBookOpen, faTerminal, faKey, faCode } from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import CustomSearch from '../components/CustomSearch';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { products } from '../data/products';

/* Outlined pill. Nothing on this page is a filled accent block — the accent is
   reserved for icons, active states and links. */
const CHIP = clsx(
  'flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm',
  'text-muted-foreground no-underline transition-colors',
  'hover:border-white/20 hover:text-foreground'
);

interface StarterTask {
  label: string;
  icon: IconDefinition;
  /* Which product each link belongs to has to be on the link itself. A card
     reading only "Commands" left you guessing whose commands you were about to
     open. */
  targets: { product: string; href: string }[];
}

const STARTERS: StarterTask[] = [
  {
    label: 'Installation',
    icon: faBookOpen,
    targets: [
      { product: 'Phoenix', href: '/Phoenix/Installation' },
      { product: 'Bolt', href: '/Bolt/Introduction#installation' },
      { product: 'Carbon', href: '/Carbon/Installation' },
      { product: 'Zephyr', href: '/Zephyr/Installation' },
    ],
  },
  {
    label: 'Commands',
    icon: faTerminal,
    targets: [
      { product: 'Phoenix', href: '/Phoenix/Commands' },
      { product: 'Bolt', href: '/Bolt/CommandsAndPermissions' },
      { product: 'Carbon', href: '/Carbon/Commands' },
    ],
  },
  {
    label: 'Permissions',
    icon: faKey,
    targets: [
      { product: 'Phoenix', href: '/Phoenix/Permissions' },
      { product: 'Bolt', href: '/Bolt/Permissions' },
      { product: 'Zephyr', href: '/Zephyr/Permissions' },
    ],
  },
  {
    label: 'Developer API',
    icon: faCode,
    targets: [
      { product: 'Phoenix', href: '/Phoenix/Features/API' },
      { product: 'Bolt', href: '/Bolt/Features/API' },
      { product: 'Carbon', href: '/Carbon/Features/API' },
    ],
  },
];

const Home: React.FC = () => {
  const title = 'Refine Documentation';
  const description =
    'Documentation for all of our products, kept up to date. If you have a question, open a ticket on our Discord.';

  return (
    <Layout title={title} description={description}>
      {/* main is full width so the hero backdrop can reach both edges; every
          section re-applies the reading container itself. */}
      <main className="w-full">
        <section className="animate-fade-in relative px-4 pt-28 pb-24 text-center md:pt-36 md:pb-28">
          <div aria-hidden className="absolute inset-0 overflow-hidden">
            <img
              src="/hero.png"
              alt=""
              className="h-full w-full object-cover object-center opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
          </div>

          <div className="relative mx-auto flex max-w-3xl flex-col items-center">
            <h1 className="title-gradient m-0 text-5xl font-bold tracking-tight md:text-7xl">
              Refine Documentation
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {description}
            </p>

            {/* Search is the primary action on a docs landing page, so it gets
                the space a hero button would otherwise take. */}
            <div className="mt-9 w-full max-w-xl">
              <CustomSearch variant="hero" />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <Link to="https://refinedev.org" target="_blank" rel="noopener noreferrer" className={CHIP}>
                Main Website
              </Link>
              <Link to="https://discord.refinedev.org" target="_blank" rel="noopener noreferrer" className={CHIP}>
                <FontAwesomeIcon icon={faDiscord} className="h-3.5 w-3.5" />
                Discord
              </Link>
              <Link
                to="https://github.com/RefineDevelopment/Documentation"
                target="_blank"
                rel="noopener noreferrer"
                className={CHIP}
              >
                <FontAwesomeIcon icon={faGithub} className="h-3.5 w-3.5" />
                GitHub
              </Link>
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-6xl px-4">
          <section className="py-16">
            <Reveal>
              <h2 className="m-0 mb-6 text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Start here
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {STARTERS.map((s, i) => (
                <Reveal key={s.label} delay={i * 50} className="h-full">
                  <div className="flex h-full flex-col rounded-lg border border-border bg-card p-4">
                    <div className="flex items-center gap-2.5">
                      <FontAwesomeIcon icon={s.icon} className="h-3.5 w-3.5 text-primary" />
                      <span className="text-sm font-medium text-foreground">{s.label}</span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {s.targets.map((t) => (
                        <Link
                          key={t.href}
                          to={t.href}
                          className={clsx(
                            'rounded-full border border-white/10 px-2.5 py-1 text-xs no-underline',
                            'text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground'
                          )}
                        >
                          {t.product}
                        </Link>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <hr className="rule m-0" />

          <section className="py-16">
            <Reveal>
              <h2 className="m-0 mb-1.5 text-2xl font-semibold tracking-tight text-foreground">
                Products
              </h2>
              <p className="m-0 mb-8 text-sm text-muted-foreground">
                Four products, each with its own documentation set.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {products.map((product, i) => (
                <Reveal key={product.title} delay={i * 60} className="h-full">
                  <ProductCard {...product} />
                </Reveal>
              ))}
            </div>
          </section>

          <hr className="rule m-0" />

          <Reveal className="flex flex-col items-start gap-4 py-16 sm:flex-row sm:items-center">
            <div>
              <h2 className="m-0 text-xl font-semibold tracking-tight text-foreground">
                Looking for the products themselves?
              </h2>
              <p className="m-0 mt-1.5 text-sm text-muted-foreground">
                Plugins and resources built for performance and reliability.
              </p>
            </div>

            <Link
              to="https://refinedev.org/resources"
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(CHIP, 'group sm:ml-auto')}
            >
              Browse all products
              <FontAwesomeIcon
                icon={faArrowRight}
                className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
