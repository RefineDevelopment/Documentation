import React, { useEffect, useRef, useState } from 'react';

/**
 * Fades its child in the first time it is scrolled to, then leaves it alone.
 * Ported from the tarik site.
 *
 * The failsafe matters: the animation must never be able to hide content. If
 * IntersectionObserver is missing, throttled, or simply never fires — a
 * background tab, a renderer that is not compositing — this shows the panel
 * anyway. A missing fade is invisible; a permanently blank page is not.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const failsafe = setTimeout(() => setShown(true), 700);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        clearTimeout(failsafe);
        setShown(true);
        observer.disconnect();
      },
      { rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(node);

    return () => {
      clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? 'reveal-in' : ''} ${className}`}
      style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}
