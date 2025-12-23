import React, { useRef, useLayoutEffect } from 'react';
import Layout from '@theme/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import ProductCard from '../components/ProductCard';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '../data/products';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="hero-grid"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/5"></div>
  </div>
);

const Home: React.FC = () => {
  const title = 'Refine Documentation';
  const description = 'Here, you can find Documentation for all of our products with up-to-date information, if you have any questions please create a ticket on our Discord.';
  const productSectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-title', { y: 50, opacity: 0, duration: 1, delay: 0.2 })
        .from('.hero-description', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero-github-note', { y: 10, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero-buttons > *', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.4');

      // Product Cards Scroll Animation
      gsap.from('.product-card-wrapper', {
        scrollTrigger: {
          trigger: '.products-grid',
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });

      // CTA Animation
      gsap.from('.cta-card', {
        scrollTrigger: {
          trigger: '#cta',
          start: 'top 85%',
        },
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.8)',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

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
    "bg-gradient-to-br from-white to-gray-200 !text-black hover:to-white hover:!text-black hover:shadow-purple-500/20"
  );

  const SecondaryButton = clsx(
    ButtonStyle,
    "bg-black !text-white hover:bg-gray-900 border border-gray-800"
  );

  return (
    <Layout
      title={title}
      description={description}
    >
      <main className="relative overflow-hidden" ref={heroRef}>
        <section
          className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent group cta-spotlight"
          onMouseMove={handleMouseMove}
        >
          <HeroBackground />

          <div className="container mx-auto relative z-10 py-24 md:py-32 px-4">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="hero-title text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-4 md:mb-6 text-center text-white drop-shadow-sm">
                Refine Development <span className="text-primary">Documentation</span>
              </h1>

              <p className="hero-description text-lg md:text-2xl text-gray-200 mb-4 md:mb-6 text-center max-w-3xl mx-auto leading-relaxed font-medium">
                {description}
              </p>

              <p className="hero-github-note text-base md:text-lg text-gray-400 mb-8 md:mb-10 text-center max-w-3xl mx-auto leading-relaxed">
                If you would like to change anything in this Documentation, please make a Pull Request in our GitHub.
              </p>

              <div className="hero-buttons flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4">
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
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-12 text-foreground">
                  Our <span className="text-primary">Products</span>
                </h2>
              </div>
              <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {products.map((product) => (
                  <div key={product.title} className="product-card-wrapper">
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background" id="cta">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div
                className="cta-card relative p-8 md:p-16 rounded-2xl bg-card/50 border border-primary/20 overflow-hidden group cta-spotlight"
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
        </section>
      </main>
    </Layout>
  );
};

export default Home;