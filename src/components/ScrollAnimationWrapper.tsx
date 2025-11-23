import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({ 
  children, 
  delay = 0, 
  className 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.15,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const style: React.CSSProperties = {
    animationDelay: `${delay}s`,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: isVisible ? 'none' : 'opacity 0s, transform 0s',
  };

  return (
    <div
      ref={ref}
      className={clsx(
        className,
        'animated',
        isVisible && 'fade-in-up'
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default ScrollAnimationWrapper;