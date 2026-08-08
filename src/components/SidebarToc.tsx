import React, { useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';

interface Heading {
  id: string;
  text: string;
  level: number;
}

/**
 * The page's headings, rendered under the active entry in the left sidebar.
 *
 * The headings are read from the rendered article rather than from `useDoc()`,
 * because the sidebar sits outside DocProvider and has no access to the doc's
 * toc. Reading the DOM also means anchors and nesting always match what is
 * actually on screen.
 */
export default function SidebarToc() {
  const location = useLocation();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // The article mounts after the sidebar, so read on the next frame.
    const raf = requestAnimationFrame(() => {
      const nodes = document.querySelectorAll<HTMLElement>('.markdown h2[id], .markdown h3[id]');
      setHeadings(
        Array.from(nodes).map((n) => ({
          id: n.id,
          // The anchor link is part of the heading's text content; drop it.
          text: (n.textContent || '').replace(/​/g, '').replace(/#$/, '').trim(),
          level: Number(n.tagName[1]),
        }))
      );
    });
    return () => cancelAnimationFrame(raf);
  }, [location.pathname]);

  useEffect(() => {
    if (headings.length === 0) return;

    const navbar = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--ifm-navbar-height')
    );
    const offset = (Number.isFinite(navbar) ? navbar : 5) * 16 + 24;

    const onScroll = () => {
      let current = headings[0].id;
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top <= offset) current = h.id;
      }
      setActiveId(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <ul className="sidebar-toc">
      {headings.map((h, i) => (
        <li
          key={h.id}
          className={h.level === 3 ? 'sidebar-toc__item--sub' : undefined}
          style={{ animationDelay: `${Math.min(i, 10) * 18}ms` }}
        >
          <a
            href={`#${h.id}`}
            className={activeId === h.id ? 'sidebar-toc__link--active' : undefined}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );
}
