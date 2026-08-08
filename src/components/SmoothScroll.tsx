import { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';

/**
 * Wheel-driven inertial scrolling, ported from the tarik site. The wheel only
 * moves a target value; the page eases toward it every frame, so a fast flick
 * still lands smoothly. Touch, keyboard and scrollbar dragging are left to the
 * browser.
 */
export default function SmoothScroll({ ease = 0.14 }: { ease?: number }) {
  const location = useLocation();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduced || coarse) return;

    let target = window.scrollY;
    let running = false;
    let raf = 0;

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const tick = () => {
      const next = window.scrollY + (target - window.scrollY) * ease;
      if (Math.abs(target - next) < 0.4) {
        window.scrollTo(0, target);
        running = false;
        return;
      }
      window.scrollTo(0, next);
      raf = requestAnimationFrame(tick);
    };

    // Anything with its own scrollbar (the sidebar, code blocks, the search
    // modal) keeps native behaviour.
    const insideScrollable = (node: EventTarget | null) => {
      let el = node as HTMLElement | null;
      while (el && el !== document.body && el !== document.documentElement) {
        const s = getComputedStyle(el);
        if (/(auto|scroll)/.test(s.overflowY) && el.scrollHeight > el.clientHeight) return true;
        el = el.parentElement;
      }
      return false;
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.deltaMode !== 0 || insideScrollable(e.target)) return;
      e.preventDefault();
      target = Math.min(maxScroll(), Math.max(0, target + e.deltaY));
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    // Keyboard, anchor jumps and scrollbar drags move the page directly, so the
    // target has to follow or the next wheel tick would snap backwards.
    const onScroll = () => {
      if (!running) target = window.scrollY;
    };

    // A route change resets the page to the top. Without this the easing target
    // still held the old page's offset, and the first wheel tick on the new page
    // yanked it straight back down.
    const onReset = () => {
      cancelAnimationFrame(raf);
      running = false;
      target = 0;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('smoothscroll:reset', onReset);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('smoothscroll:reset', onReset);
    };
  }, [ease]);

  // Fires after the effect above has re-armed for the new route.
  useEffect(() => {
    window.dispatchEvent(new Event('smoothscroll:reset'));
  }, [location.pathname]);

  return null;
}
