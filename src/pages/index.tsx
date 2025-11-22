import React, { useRef } from 'react';
import OriginalLayout from '@theme/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faRocket } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import ProductCard from '../components/ProductCard';
import ScrollAnimationWrapper from '../components/ScrollAnimationWrapper';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

const FAIcon = FontAwesomeIcon as unknown as React.ComponentType<any>;
const DocusaurusLink = Link as unknown as React.ComponentType<any>;

const ThemedLayout = OriginalLayout as unknown as React.ComponentType<any>;


const products = [
  {
    title: "Phoenix",
    description: "The ultimate network management suite for security, ranks, and staff tools.",
    href: "/Phoenix/Introduction",
    
    colorClass: "bg-red-600",
    logoSrc: "/logo.png",
  },
  {
    title: "Bolt",
    description: "High-performance PvP practice plugin with advanced ELO and match tracking.",
    href: "/Bolt/Introduction",
    
    colorClass: "bg-yellow-600",
    logoSrc: "/logo.png",
  },
  {
    title: "CarbonSpigot",
    description: "Optimized Minecraft server fork for superior performance and stability.",
    href: "/CarbonSpigot/Introduction",
    
    colorClass: "bg-gray-600",
    logoSrc: "/logo.png",
  },
  {
    title: "Zephyr",
    description: "Lightweight and efficient hub management system.",
    href: "/Zephyr/Introduction",
    
    colorClass: "bg-blue-600",
    logoSrc: "/logo.png",
  },
  {
    title: "Bolt Web Addon",
    description: "A sleek web interface for displaying Bolt leaderboards and player statistics.",
    href: "/BoltWebAddon/Introduction",
    
    colorClass: "bg-primary",
    logoSrc: "/logo.png",
  },
];

const team = [
  {
    name: 'Amaan',
    role: 'Founder',
    bio: 'Visionary leader and core architect of Refine Development.',
    img: 'https://cdn.discordapp.com/avatars/730736805019648060/4e52bfeeafb903e8b49de8f1c04eab01.webp?size=1024'
  },
  {
    name: 'Creaxx',
    role: 'Owner',
    bio: 'Overseeing operations and strategic direction of the studio.',
    img: 'https://cdn.discordapp.com/avatars/828492247795236866/111485fd4810466bb586c556c97f8876.webp?size=1024'
  },
  {
    name: 'Bermine',
    role: 'Manager',
    bio: 'Specializing in high-performance Java and server optimization.',
    img: 'https://cdn.discordapp.com/avatars/211482864988979200/c77185277a42b823868aa595420b6ae6.webp?size=1024'
  },
  {
    name: 'J4cob3y',
    role: 'Manager',
    bio: 'Handling technical support and infrastructure management.',
    img: 'https://cdn.discordapp.com/avatars/504532149077016606/4b48d1df5e7a1592e18d010ed0f74fce.webp?size=1024'
  },
  {
    name: 'Meng',
    role: 'Manager',
    bio: 'Focusing on community engagement and quality assurance. (Chinese Spy)',
    img: 'https://cdn.discordapp.com/avatars/599162609563992065/58c1b4f7cf807b7a219ebb86c8e6c875.webp?size=1024'
  }
];



const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="hero-grid"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/5"></div>
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse"></div>
    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
  </div>
);

const Home: React.FC = () => {
  const title = 'Refine Documentation';
  const description = 'Here, you can find Documentation for all of our products with up-to-date information, if you have any questions please create a ticket on our Discord.';
  const productSectionRef = useRef<HTMLElement>(null);

  const handleScrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (productSectionRef.current) {
      productSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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
    <ThemedLayout
      title={title}
      description={description}
    >
      <main className="relative overflow-hidden">
        
        <section 
          className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent group cta-spotlight"
          onMouseMove={(e) => {
            const target = e.currentTarget;
            const rect = target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            target.style.setProperty('--mouse-x', `${x}px`);
            target.style.setProperty('--mouse-y', `${y}px`);
          }}
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
                <DocusaurusLink 
                  to="https://refinedev.org" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={PrimaryButton}
                >
                  Main Website
                </DocusaurusLink>
                <DocusaurusLink 
                  to="#products" 
                  onClick={handleScrollToProducts}
                  className={SecondaryButton}
                >
                  Explore Products
                </DocusaurusLink>
                <DocusaurusLink 
                  to="https://discord.refinedev.org" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={SecondaryButton}
                >
                  Join Discord
                </DocusaurusLink>
                <DocusaurusLink 
                  to="https://github.com/RefineDevelopment/Documentation" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={SecondaryButton}
                >
                  GitHub
                </DocusaurusLink>
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
                  <ScrollAnimationWrapper key={index} delay={index * 0.1}>
                    <ProductCard {...product} />
                  </ScrollAnimationWrapper>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background" id="team">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-12 md:mb-16 text-center">
              <ScrollAnimationWrapper delay={0}>
                <div className="inline-flex items-center justify-center mb-4">
                  <FAIcon icon={faUsers} className="h-6 w-6 text-primary mr-2" />
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Team</span>
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">
                  Meet Our <span className="text-primary">Team</span>
                </h2>
                <p className="text-base md:text-xl text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
                  We are a dedicated team of developers with years of experience creating high-performance, scalable solutions.
                </p>
              </ScrollAnimationWrapper>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 max-w-7xl mx-auto">
              {team.map((member, index) => (
                <ScrollAnimationWrapper key={index} delay={index * 0.15}>
                  <div className="flex flex-col items-center text-center p-4 md:p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-all hover:scale-105 bg-card/50 backdrop-blur-sm">
                    <img src={member.img} alt={member.name} className="w-20 h-20 md:w-24 md:h-24 rounded-full mb-3 md:mb-4 border-2 border-primary/20 object-cover" />
                    <h3 className="text-lg md:text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-xs md:text-sm text-primary mb-2 md:mb-3 font-semibold">{member.role}</p>
                    <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 leading-relaxed min-h-[3rem]">{member.bio}</p>
                    <div className="flex gap-3">
                      <a href="javascript:void(0)" className="text-muted-foreground hover:text-primary transition-colors">
                        <FAIcon icon={faGithub} className="h-4 w-4 md:h-5 md:w-5" />
                      </a>
                      <a href="javascript:void(0)" className="text-muted-foreground hover:text-primary transition-colors">
                        <FAIcon icon={faTwitter} className="h-4 w-4 md:h-5 md:w-5" />
                      </a>
                    </div>
                  </div>
                </ScrollAnimationWrapper>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background" id="cta">
          <ScrollAnimationWrapper delay={0}>
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div 
                  className="relative p-8 md:p-16 rounded-2xl bg-card/50 border border-primary/20 overflow-hidden group cta-spotlight"
                  onMouseMove={(e) => {
                    const target = e.currentTarget;
                    const rect = target.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    target.style.setProperty('--mouse-x', `${x}px`);
                    target.style.setProperty('--mouse-y', `${y}px`);
                  }}
                >
                  <div className="relative z-10 text-center">
                    <div className="inline-flex items-center justify-center mb-4">
                      <FAIcon icon={faRocket} className="h-6 w-6 text-primary mr-2" />
                      <span className="text-sm font-semibold text-primary uppercase tracking-wider">Get Started</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-center mb-4 md:mb-6">
                      Ready to Explore Our <span className="text-primary">Products</span>?
                    </h2>
                    <p className="text-base md:text-xl text-muted-foreground mb-8 md:mb-10 text-center max-w-2xl mx-auto leading-relaxed">
                      Browse our premium collection of plugins and resources designed for performance and reliability.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <DocusaurusLink 
                        to="https://refinedev.org/resources" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className={PrimaryButton}
                      >
                        Browse All Products
                      </DocusaurusLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </section>

      </main>
    </ThemedLayout>
  );
};

export default Home;