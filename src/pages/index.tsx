import React, { useRef, useLayoutEffect } from 'react';
import Layout from '@theme/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faEye, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
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
    "px-6 py-2.5 md:px-8 md:py-3 text-base font-bold rounded-xl transition-all duration-300",
    "shadow-lg hover:shadow-xl w-full sm:w-auto flex items-center justify-center gap-2.5 group/btn active:scale-95"
  );

  const PrimaryButton = clsx(
    ButtonStyle,
    "bg-white !text-black hover:bg-primary hover:!text-white hover:-translate-y-1 primary-glow"
  );

  const MainWebsiteButton = clsx(
    ButtonStyle,
    "bg-primary !text-white hover:opacity-90 hover:-translate-y-1 shadow-primary/30"
  );

  const GlassButton = clsx(
    ButtonStyle,
    "bg-white/10 backdrop-blur-md border border-white/20 !text-white hover:bg-white/20 hover:-translate-y-1"
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

          <div className="container mx-auto relative z-10 py-32 px-4 flex flex-col items-center">
            <div className="max-w-7xl w-full text-center flex flex-col items-center">
              <h1 className="hero-title text-white mb-10">
                Refine Development <br />
                <span className="text-primary drop-shadow-[0_0_25px_rgba(233,30,99,0.5)]">Documentation</span>
              </h1>

              <p className="hero-description text-gray-300 mb-12 font-medium">
                {description}
              </p>

              <div className="hero-buttons flex flex-wrap justify-center items-center gap-4 sm:gap-6">
                <Link
                  to="/#products"
                  onClick={handleScrollToProducts}
                  className={PrimaryButton}
                >
                  <FontAwesomeIcon icon={faEye} className="w-5 h-5" />
                  View Documentation
                </Link>
                <Link
                  to="https://refinedev.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={MainWebsiteButton}
                >
                  <FontAwesomeIcon icon={faGlobe} className="w-5 h-5 transition-transform group-hover/btn:rotate-12" />
                  Main Website
                </Link>
                <Link
                  to="https://discord.refinedev.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={GlassButton}
                >
                  <FontAwesomeIcon icon={faDiscord} className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                  Join Discord
                </Link>
                <Link
                  to="https://github.com/RefineDevelopment/Documentation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={GlassButton}
                >
                  <FontAwesomeIcon icon={faGithub} className="w-5 h-5 transition-transform group-hover/btn:translate-y-[-1px]" />
                  GitHub
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section ref={productSectionRef} className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div>
                <h2 id="products" className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-12 text-foreground">
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

        <section className="py-24 md:py-32 bg-background flex flex-col items-center" id="cta">
          <div className="container mx-auto px-4 flex flex-col items-center">
            <div className="max-w-5xl w-full flex flex-col items-center">
              <div
                className="cta-card relative w-full p-10 md:p-20 rounded-3xl bg-card/60 border border-white/10 overflow-hidden group/cta cta-spotlight flex flex-col items-center"
                onMouseMove={handleMouseMove}
              >
                <div className="relative z-10 flex flex-col items-center text-center w-full">
                  <div className="inline-flex items-center justify-center gap-3 mb-8 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                    <FontAwesomeIcon icon={faRocket} className="h-4 w-4 text-primary" />
                    <span className="text-xs font-bold text-primary uppercase tracking-[0.25em]">Get Started</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                    Ready to Explore Our <br /><span className="text-primary">Products</span>?
                  </h2>
                  <p className="text-lg md:text-2xl text-gray-400 mb-12 max-w-2xl leading-relaxed">
                    Browse our premium collection of plugins and resources designed for performance and reliability.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                    <Link
                      to="https://refinedev.org/resources"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={PrimaryButton}
                    >
                      <FontAwesomeIcon icon={faRocket} className="w-5 h-5" />
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