import React, { useRef, useLayoutEffect } from 'react';
import OriginalLayout from '@theme-original/Layout';
import clsx from 'clsx';
import { useLocation } from '@docusaurus/router';


const PageBackground = () => {
  const location = useLocation();
  const isDocsPage = location.pathname.includes('/Phoenix') ||
    location.pathname.includes('/Bolt') ||
    location.pathname.includes('/CarbonSpigot') ||
    location.pathname.includes('/Zephyr') ||
    location.pathname.includes('/BoltWebAddon');


  if (isDocsPage) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-background"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
      </div>
    );
  }


  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/5"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[700px] md:h-[700px] bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s', animationDuration: '12s' }}></div>
    </div>
  );
};

import { gsap } from 'gsap';

export default function Layout(props) {
  const layoutRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useLayoutEffect(() => {
    if (layoutRef.current) {
      gsap.fromTo(layoutRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [location.pathname]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (layoutRef.current) {
      const target = layoutRef.current;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      target.style.setProperty('--mouse-x', `${x}px`);
      target.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <div
      ref={layoutRef}
      className={clsx(
        "relative min-h-screen cta-spotlight",
        "bg-background"
      )}
      onMouseMove={handleMouseMove}
    >
      <div
        className="fixed inset-0 opacity-100 transition-opacity duration-300 pointer-events-none spotlight z-0"
        style={{ background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--primary))/10, transparent 40%)' }}
      ></div>
      <PageBackground />

      <div className="relative z-10">
        <OriginalLayout {...props} />
      </div>
    </div>
  );
}