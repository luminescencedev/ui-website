'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@carabine/ui';

// ─── Nav config ───────────────────────────────────────────────────────────────

export const NAV = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', href: '/introduction' },
      { label: 'Installation', href: '/installation' },
    ],
  },
  {
    title: 'Core',
    items: [
      { label: 'Primitive', href: '/core/primitive' },
      { label: 'cn()', href: '/core/cn' },
    ],
  },
  {
    title: 'Components',
    items: [
      { label: 'Tooltip', href: '/components/tooltip' },
      { label: 'Toggle', href: '/components/toggle' },
      { label: 'CodePreview', href: '/components/code-preview' },
      { label: 'CopyButton', href: '/components/copy-button' },
      { label: 'Selector', href: '/components/selector' },
    ],
  },
  {
    title: 'Styling',
    items: [
      { label: 'Overview', href: '/styling' },
      { label: 'Styled (Default)', href: '/styling/styled' },
      { label: 'Headless / Unstyled', href: '/styling/headless' },
      { label: 'With Tailwind CSS', href: '/styling/tailwind' },
      { label: 'CSS Variables', href: '/styling/css-variables' },
    ],
  },
] as const;

// ─── Sidebar context ──────────────────────────────────────────────────────────

type SidebarCtx = { open: boolean; setOpen: (v: boolean) => void };
const SidebarContext = createContext<SidebarCtx>({ open: false, setOpen: () => {} });

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <SidebarContext.Provider value={{ open, setOpen }}>{children}</SidebarContext.Provider>;
}

function useSidebar() {
  return useContext(SidebarContext);
}

// ─── Mobile menu button ───────────────────────────────────────────────────────

export function MobileMenuButton() {
  const { open, setOpen } = useSidebar();
  return (
    <button
      className="mobile-menu-btn"
      onClick={() => setOpen(!open)}
      aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
      aria-expanded={open}
    >
      <span className={cn('menu-icon', open && 'menu-icon--open')}>
        <svg
          className="icon-hamburger"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <line
            x1="2"
            y1="4.5"
            x2="14"
            y2="4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="2"
            y1="8"
            x2="14"
            y2="8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="2"
            y1="11.5"
            x2="14"
            y2="11.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <svg
          className="icon-close"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <line
            x1="3.5"
            y1="3.5"
            x2="12.5"
            y2="12.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="12.5"
            y1="3.5"
            x2="3.5"
            y2="12.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </button>
  );
}

// ─── Sidebar overlay (mobile backdrop) ────────────────────────────────────────

export function SidebarOverlay() {
  const { open, setOpen } = useSidebar();
  if (!open) return null;
  return <div className="sidebar-overlay" onClick={() => setOpen(false)} aria-hidden="true" />;
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export function Sidebar() {
  const pathname = usePathname();
  const { open, setOpen } = useSidebar();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  return (
    <aside className={cn('sidebar', open && 'sidebar--open')}>
      <nav className="sidebar-nav" aria-label="Documentation">
        {NAV.map((section) => (
          <div key={section.title} className="sidebar-group">
            <p className="sidebar-group-label">{section.title}</p>
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn('sidebar-item', pathname === item.href && 'sidebar-item--active')}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
