import React, { useRef } from 'react';
import Layout from '@theme/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faRocket, faShield, faBolt, faMicrochip, faWind, faGlobe } from '@fortawesome/free-solid-svg-icons';
import ProductCard from '../components/ProductCard';
import ScrollAnimationWrapper from '../components/ScrollAnimationWrapper';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

interface Product {
  title: string;
  description: string;
  href: string;
  colorClass: string;
  icon: IconDefinition;
}

const products: Product[] = [
  {
    title: "Phoenix",
    description: "The ultimate network management suite for security, ranks, and staff tools.",
    href: "/Phoenix/Introduction",
    colorClass: "bg-red-600",
    icon: faShield,
  },
  {
    title: "Bolt",
    description: "High-performance PvP practice plugin with advanced ELO and match tracking.",
    href: "/Bolt/Introduction",
    colorClass: "bg-yellow-600",
    icon: faBolt,
  },
  {
    title: "CarbonSpigot",
    description: "Optimized Minecraft server fork for superior performance and stability.",
    href: "/CarbonSpigot/Introduction",
    colorClass: "bg-gray-600",
    icon: faMicrochip,
  },
  {
    title: "Zephyr",
    description: "Simple and modern FFA plugin.",
    href: "/Zephyr/Introduction",
    colorClass: "bg-blue-600",
    icon: faWind,
  },
  {
    title: "Bolt Web Addon",
    description: "A sleek web interface for displaying Bolt leaderboards and player statistics.",
    href: "/BoltWebAddon/Introduction",
    colorClass: "bg-primary",
    icon: faGlobe,
  },
];

const HeroBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="hero-grid"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/5"></div>
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse"></div>
    <div 
      className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" 
      style={{ animationDelay: '1s' }}
    ></div>
  </div>
);

const Home: React.FC = () => {
  const title = 'Refine Documentation';
  const description = 'Here, you can find Documentation for all of our products with up-to-date information, if you have any questions please create a ticket on our Discord.';
  const productSectionRef = useRef<HTMLElement>(null);

  const handleScrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    if (productSectionRef.current) {
      productSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>): void => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  };

  const ButtonStyle = clsx(
    "px-6 py-2 md:px-8 md:py-3 text-base md:text-lg font-semibold rounded-md transition-colors duration-200",
    "shadow-lg hover:shadow-xl font-semibold w-full sm:w-auto"
  );

  const PrimaryButton = clsx(
    ButtonStyle,
    "bg-white text-black hover:bg-gray-100"
  );

  const SecondaryButton = clsx(
    ButtonStyle,
    "bg-black text-white hover:bg-gray-900 border border-gray-800"
  );

  return (
    <Layout
      title={title}
      description={description}
    >
      <main className="relative overflow-hidden">
        <section 
          className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent group cta-spotlight"
          onMouseMove={handleMouseMove}
        >
          <HeroBackground />
          
          <div className="container mx-auto relative z-10 py-24 md:py-32 px-4">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-4 md:mb-6 text-center">
                Refine Development <span className="text-primary">Documentation</span>
              </h1>
              
              <p className="text-lg md:text-2xl text-muted-foreground mb-4 md:mb-6 text-center max-w-3xl mx-auto leading-relaxed">
                {description}
              </p>
              
              <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-10 text-center max-w-3xl mx-auto leading-relaxed">
                If you would like to change anything in this Documentation, please make a Pull Request in our GitHub.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4">
                <Link 
                  to="#products" 
                  onClick={handleScrollToProducts}
                  className={PrimaryButton}
                >
                  View Documentation
                </Link>
                <Link 
                  to="https://refinedev.org" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={SecondaryButton}
                >
                  Main Website
                </Link>
                <Link 
                  to="https://discord.refinedev.org" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={SecondaryButton}
                >
                  Join Discord
                </Link>
                <Link 
                  to="https://github.com/RefineDevelopment/Documentation" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={SecondaryButton}
                >
                  GitHub
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="products" ref={productSectionRef} className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <ScrollAnimationWrapper delay={0}>
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-12 text-foreground">
                  Our <span className="text-primary">Products</span>
                </h2>
              </ScrollAnimationWrapper>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {products.map((product, index) => (
                  <ScrollAnimationWrapper key={product.title} delay={index * 0.1}>
                    <ProductCard {...product} />
                  </ScrollAnimationWrapper>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background" id="cta">
          <ScrollAnimationWrapper delay={0}>
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div 
                  className="relative p-8 md:p-16 rounded-2xl bg-card/50 border border-primary/20 overflow-hidden group cta-spotlight"
                  onMouseMove={handleMouseMove}
                >
                  <div className="relative z-10 text-center">
                    <div className="inline-flex items-center justify-center mb-4">
                      <FontAwesomeIcon icon={faRocket} className="h-6 w-6 text-primary mr-2" />
                      <span className="text-sm font-semibold text-primary uppercase tracking-wider">Get Started</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-center mb-4 md:mb-6">
                      Ready to Explore Our <span className="text-primary">Products</span>?
                    </h2>
                    <p className="text-base md:text-xl text-muted-foreground mb-8 md:mb-10 text-center max-w-2xl mx-auto leading-relaxed">
                      Browse our premium collection of plugins and resources designed for performance and reliability.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Link 
                        to="https://refinedev.org/resources" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className={PrimaryButton}
                      >
                        Browse All Products
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </section>
      </main>
    </Layout>
  );
};

export default Home;