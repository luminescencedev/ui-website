'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react';
import { components, href, overview, started } from '@/lib/nav';
import type { Entry } from '@/lib/nav';

const SPRING = { type: 'spring' as const, stiffness: 520, damping: 42 };

/**
 * The rail's contents: two short groups, then every component in one sorted list.
 *
 * Twenty items under six category headings is six places to look before you find
 * `Slider`; twenty in one alphabetical list is one, and anybody hunting for a
 * component already knows its name. The categories still exist — the command
 * palette groups by them, where the list is short enough for headings to help.
 *
 * The bar's colour is the hover list's own — a **tint**, not a surface. It was
 * `--surface-sunken`, which is a *material*: something you read content
 * against, and far too heavy for a thing whose whole job is to follow a
 * pointer. A tint has no hairline and no shadow and lets the rail show through,
 * which is the difference between a highlight and a panel appearing under the
 * cursor.
 *
 * **One bar, and it is measured.** The rows are not all the same height (a group
 * heading sits between them, and a long title wraps), so the bar reads
 * `offsetTop` and `offsetHeight` off the row it is going to rather than
 * multiplying an index by a step. Counting is what breaks the first time somebody
 * adds a heading.
 *
 * Hover and keyboard focus are the same question — *this is the one you are on* —
 * so there is one bar answering it, falling back to the current page at rest.
 * Two surfaces claiming the same thing is how a sidebar ends up pointing at two
 * rows at once.
 */
export function Sidebar({ current, onNavigate }: { current: string; onNavigate?: () => void }) {
  const reduced = Boolean(useReducedMotion());

  const rows = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [hovered, setHovered] = useState<string | null>(null);

  const y = useMotionValue(0);
  const height = useMotionValue(0);
  const lit = useMotionValue(0);

  const at = hovered ?? current;

  useLayoutEffect(() => {
    const row = rows.current[at];

    // Nothing to point at — an unwritten page, or a route that is not in the
    // list at all. The bar leaves rather than parking on the wrong row.
    if (!row) {
      animate(lit, 0, reduced ? { duration: 0 } : { duration: 0.12, ease: [0.22, 1, 0.36, 1] });
      return;
    }

    const to = row.offsetTop;
    const tall = row.offsetHeight;

    // Placed when it is not out yet, slid when it already is. A bar that
    // animates from the top of the list on first paint is a bar arriving late.
    if (lit.get() === 0 || reduced) {
      y.set(to);
      height.set(tall);
      animate(lit, 1, reduced ? { duration: 0 } : { duration: 0.16, ease: [0.22, 1, 0.36, 1] });
      return;
    }

    animate(y, to, SPRING);
    animate(height, tall, SPRING);
    animate(lit, 1, { duration: 0.12 });
  }, [at, reduced, y, height, lit]);

  return (
    <nav
      aria-label="Documentation"
      className="relative"
      onPointerLeave={() => setHovered(null)}
      onBlur={(event) => {
        // Only when focus has actually left the rail, or tabbing between two
        // rows blanks the bar for a frame between them.
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setHovered(null);
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 left-0 rounded-lg"
        style={{ top: 0, y, height, opacity: lit, background: 'var(--bar)' }}
      />

      <Section
        name={overview.name}
        entries={overview.entries}
        current={current}
        rows={rows}
        onHover={setHovered}
        onNavigate={onNavigate}
      />
      <Section
        name={started.name}
        entries={started.entries}
        current={current}
        rows={rows}
        onHover={setHovered}
        onNavigate={onNavigate}
      />
      <Section
        name="Components"
        entries={components}
        current={current}
        rows={rows}
        onHover={setHovered}
        onNavigate={onNavigate}
      />
    </nav>
  );
}

function Section({
  name,
  entries,
  current,
  rows,
  onHover,
  onNavigate,
}: {
  name: string;
  entries: Entry[];
  current: string;
  rows: React.RefObject<Record<string, HTMLAnchorElement | null>>;
  onHover: (slug: string | null) => void;
  onNavigate?: () => void;
}) {
  return (
    <div className="mb-5">
      <p
        className="mb-1.5 px-2.5 text-[11px] font-semibold"
        style={{ color: 'var(--fg-subtle)', letterSpacing: '0.04em' }}
      >
        {name}
      </p>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {entries.map((entry) => (
          <li key={entry.slug}>
            {entry.ready ? (
              <Link
                ref={(node) => {
                  rows.current[entry.slug] = node;
                }}
                href={href(entry.slug)}
                onClick={onNavigate}
                onPointerEnter={() => onHover(entry.slug)}
                onFocus={() => onHover(entry.slug)}
                aria-current={entry.slug === current ? 'page' : undefined}
                className="relative z-10 block rounded-lg px-2.5 py-[6px] text-[13px] transition-[color] duration-150 ease-out"
                style={{
                  color: entry.slug === current ? 'var(--fg)' : 'var(--fg-muted)',
                  fontWeight: entry.slug === current ? 500 : 400,
                }}
              >
                {entry.title}
              </Link>
            ) : (
              /*
               * A page nobody has written is not a link. Said with the row
               * itself rather than with a badge that has to be read: it is
               * dimmer, it does not answer the pointer, and it carries one small
               * word explaining why.
               */
              <span
                className="relative z-10 flex items-center gap-2 rounded-lg px-2.5 py-[6px] text-[13px]"
                style={{ color: 'var(--fg-subtle)', opacity: 0.55 }}
              >
                {entry.title}
                <span
                  className="ml-auto text-[10px]"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-subtle)' }}
                >
                  soon
                </span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
