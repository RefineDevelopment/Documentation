import React, { useRef, useLayoutEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import { gsap } from 'gsap';

interface ProductCardProps {
  title: string;
  description: string;
  href: string;
  colorClass: string;
  icon?: IconDefinition;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  href,
  icon
}) => {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const card = cardRef.current;
      if (!card) return;

      const arrow = card.querySelector('.fa-arrow-right');
      const titleEl = card.querySelector('h3');
      const viewDocs = card.querySelector('.view-docs');

      const hoverTl = gsap.timeline({ paused: true });
      hoverTl.to(card, {
        y: -8,
        duration: 0.5,
        ease: 'power3.out',
        borderColor: 'rgba(233, 30, 99, 0.3)',
        boxShadow: '0 30px 60px -15px rgba(233, 30, 99, 0.15)'
      })
        .to(arrow, { x: 6, duration: 0.4, ease: 'power2.out' }, 0)
        .to(titleEl, { color: '#e91e63', duration: 0.3 }, 0)
        .to(viewDocs, { x: 4, color: '#e91e63', duration: 0.3 }, 0);

      card.addEventListener('mouseenter', () => hoverTl.play());
      card.addEventListener('mouseleave', () => hoverTl.reverse());
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <Link
      to={href}
      ref={cardRef}
      className={clsx(
        "group relative block p-8 rounded-2xl transition-all duration-500",
        "bg-card/40 backdrop-blur-md border border-white/5 hover:border-primary/30",
        "text-foreground no-underline overflow-hidden"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center translate-y-[8px]">
          {icon && (
            <FontAwesomeIcon
              icon={icon}
              className="h-6 w-6 text-primary block"
            />
          )}
        </div>
        <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-primary leading-none m-0">
          {title}
        </h3>
      </div>

      <p className="text-gray-300 text-base mb-8 min-h-[4rem] relative z-10 leading-relaxed transition-colors group-hover:text-white">
        {description}
      </p>
      <div className="view-docs flex items-center text-primary font-bold text-sm mt-auto relative z-10 group-hover:gap-3 transition-all duration-300">
        <span className="tracking-wide">View Documentation</span>
        <FontAwesomeIcon icon={faArrowRight} className="fa-arrow-right w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default ProductCard;