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
        y: -12,
        duration: 0.4,
        ease: 'power2.out',
        borderColor: 'hsl(340 82% 56% / 0.5)',
        boxShadow: '0 20px 25px -5px rgba(233, 30, 99, 0.1), 0 8px 10px -6px rgba(233, 30, 99, 0.1)'
      })
        .to(arrow, { x: 8, duration: 0.3, ease: 'back.out(2)' }, 0)
        .to(titleEl, { color: '#e91e63', duration: 0.3 }, 0)
        .to(viewDocs, { scale: 1.05, color: '#e91e63', duration: 0.3 }, 0);

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
        "group relative block p-6 border border-border/50 rounded-xl shadow-lg transition-colors duration-300",
        "bg-card/80 backdrop-blur-sm text-foreground no-underline"
      )}
    >
      <div className="flex items-center space-x-4 mb-4">
        {icon && <FontAwesomeIcon icon={icon} className="h-10 w-10 text-primary" />}
        <h3 className="text-xl font-bold text-foreground transition-colors">
          {title}
        </h3>
      </div>

      <p className="text-muted-foreground text-sm mb-4 min-h-[3rem]">
        {description}
      </p>
      <div className="view-docs flex items-center text-primary font-medium text-sm mt-4 transition-all">
        View Documentation
        <FontAwesomeIcon icon={faArrowRight} className="fa-arrow-right w-4 h-4 ml-2 transition-transform" />
      </div>
    </Link>
  );
};

export default ProductCard;