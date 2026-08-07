'use client';

import Link from 'next/link';
import { Search, Sun, MoonStar } from 'lucide-react';
import { useSearch } from './Chrome';
import { useTheme } from './theme';

const LINKS = [
  { label: 'Docs', href: '/docs/get-started' },
  { label: 'Components', href: '/docs/introduction' },
  { label: 'Motion', href: '/docs/introduction' },
];

function GithubMark({ size = 15 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-2.91-.88-2.91-2.9 0-.65.23-1.18.61-1.6-.06-.15-.27-.77.06-1.6 0 0 .5-.16 1.64.61a5.6 5.6 0 0 1 1.49-.2c.51 0 1.02.07 1.49.2 1.14-.78 1.64-.61 1.64-.61.33.83.12 1.45.06 1.6.38.42.61.95.61 1.6 0 2.03-1.13 2.7-2.92 2.9.29.25.55.74.55 1.5 0 1.08-.01 1.96-.01 2.23 0 .21.15.46.55.38A7.99 7.99 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

/**
 * The landing's navigation, and it is meant to disappear.
 *
 * No background, no border, no blur — it sits *on* the page rather than framing
 * it. A bar with a hairline under it is documentation chrome, there to hold a
 * page still while it is read; a front page is looked at, and the first thing the
 * eye should land on is the headline, not a rule across the top of it.
 *
 * Which is only safe because there is nothing to scroll under it: the page is a
 * headline and a card. The moment something scrolls behind a transparent bar,
 * the bar needs a background, and then it is a bar.
 */
export function LandingNav() {
  const { theme, setTheme } = useTheme();
  const search = useSearch();

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center gap-6 px-5 sm:px-8">
        <Link href="/" className="press flex shrink-0 items-center gap-1.5">
          <span className="text-[15px] font-semibold tracking-tight" style={{ color: 'var(--fg)' }}>
            carabine
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-subtle)' }}>/</span>
          <span className="text-[15px] font-semibold tracking-tight" style={{ color: 'var(--fg)' }}>
            ui
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="press rounded-md px-2.5 py-1.5 text-[13.5px]"
              style={{ color: 'var(--fg-muted)' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Reads as a field because it opens one — the palette's own input is
              the next thing that has focus after this is pressed. */}
          <button
            type="button"
            onClick={search}
            className="press hidden h-8 items-center gap-2 rounded-lg pr-1.5 pl-2.5 sm:flex"
            style={{
              background: 'var(--surface-muted)',
              border: '1px solid var(--border)',
              color: 'var(--fg-subtle)',
            }}
          >
            <Search className="size-3.5" />
            <span className="text-[13px]">Search</span>
            <kbd
              className="ml-6 rounded px-1.5 py-0.5 text-[10px]"
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'var(--canvas)',
                border: '1px solid var(--border)',
              }}
            >
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
            className="press grid size-8 place-items-center rounded-lg"
            style={{ color: 'var(--fg-muted)' }}
          >
            {theme === 'dark' ? <MoonStar className="size-4" /> : <Sun className="size-4" />}
          </button>

          <a
            href="https://github.com/luminescencedev/ui"
            target="_blank"
            rel="noreferrer"
            className="press flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[13px]"
            style={{
              background: 'var(--surface-muted)',
              border: '1px solid var(--border)',
              color: 'var(--fg)',
            }}
          >
            <GithubMark size={14} />
            <span style={{ fontFamily: 'var(--font-mono)' }}>1.0.0</span>
          </a>
        </div>
      </div>
    </header>
  );
}
