'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV } from './nav';

// Flat ordered list of all pages
const ALL_PAGES = NAV.flatMap((section) => section.items);

export function PageNav() {
  const pathname = usePathname();
  const idx = ALL_PAGES.findIndex((p) => p.href === pathname);

  const prev = idx > 0 ? ALL_PAGES[idx - 1] : null;
  const next = idx < ALL_PAGES.length - 1 ? ALL_PAGES[idx + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav className="page-nav" aria-label="Page navigation">
      {prev ? (
        <Link href={prev.href} className="page-nav-link page-nav-link--prev">
          <span className="page-nav-dir">← Previous</span>
          <span className="page-nav-label">{prev.label}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link href={next.href} className="page-nav-link page-nav-link--next">
          <span className="page-nav-dir">Next →</span>
          <span className="page-nav-label">{next.label}</span>
        </Link>
      )}
    </nav>
  );
}
