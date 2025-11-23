import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

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
  colorClass, 
  icon 
}) => {
  return (
    <Link
      to={href}
      className={clsx(
        "group relative block p-6 border border-border/50 rounded-xl shadow-lg transition-all duration-300",
        "hover:shadow-xl hover:border-primary/50 bg-card/80 backdrop-blur-sm text-foreground no-underline",
        "transform hover:-translate-y-1"
      )}
    >
      <div className="flex items-center space-x-4 mb-4">
        {icon && <FontAwesomeIcon icon={icon} className="h-10 w-10 text-primary" />}
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
      </div>
      
      <p className="text-muted-foreground text-sm mb-4 min-h-[3rem]">
        {description}
      </p>
      <div className="flex items-center text-primary font-medium text-sm mt-4">
        View Documentation
        <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default ProductCard;