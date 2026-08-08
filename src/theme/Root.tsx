import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import SmoothScroll from '../components/SmoothScroll';

/**
 * Puts every new route at the top, then hands scrolling to SmoothScroll.
 *
 * `instant` rather than `smooth`: a page that scrolls itself into place after
 * you have already started reading is worse than one that is simply there.
 *
 * There is deliberately no route progress bar. The tarik site has none, and a
 * full-width accent line firing on every click is the loudest thing on the
 * page for the shortest reason.
 */
const Root: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  return (
    <>
      {children}
      <SmoothScroll />
    </>
  );
};

export default Root;
