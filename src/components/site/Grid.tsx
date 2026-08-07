'use client';

import Link from 'next/link';
import { components, href } from '@/lib/nav';
import { Preview, previewed } from './previews';

/**
 * Every component as a card you can see, not a line you have to read.
 *
 * The tile above each name is the **real component**, mounted, at real props.
 * That is the argument the whole site makes: if a component is not good enough
 * to be shown at 128 pixels on a catalogue page, it is not good enough to
 * publish.
 *
 * The whole card is the link, and the component inside it is `inert` — a card
 * that navigates cannot also contain a slider you are meant to drag, and a
 * keyboard walking twenty cards should meet twenty stops, not two hundred.
 */
export function Grid() {
  return (
    <ul
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      style={{ listStyle: 'none', margin: '24px 0 0', padding: 0 }}
    >
      {components.map((entry) => {
        const card = (
          <>
            {/*
             * A fixed stage, so twenty tiles of wildly different heights still
             * line up. `overflow: hidden` because a colour wheel and a menu
             * trigger do not agree about how much room they want, and the frame
             * is the one that decides.
             */}
            <div
              className="flex items-center justify-center overflow-hidden px-4"
              style={{
                height: 128,
                background: 'var(--surface-sunken)',
                borderBottom: '1px solid var(--border)',
              }}
              inert
            >
              {previewed(entry.slug) ? (
                <Preview slug={entry.slug} />
              ) : (
                /*
                 * One component cannot be shown here and it is the toast: its
                 * viewport is fixed to the window, so a tile of it would escape
                 * the card — twenty times over. Said plainly rather than faked.
                 */
                <span
                  className="text-[11px]"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-subtle)' }}
                >
                  over the page
                </span>
              )}
            </div>

            <div className="px-4 py-3">
              <span className="block text-[13.5px] font-medium" style={{ color: 'var(--fg)' }}>
                {entry.title}
              </span>
              <span className="mt-0.5 block text-[12.5px]" style={{ color: 'var(--fg-muted)' }}>
                {entry.blurb}
              </span>
            </div>
          </>
        );

        return (
          <li key={entry.slug} className="min-w-0">
            {entry.ready ? (
              <Link
                href={href(entry.slug)}
                className="press block overflow-hidden rounded-xl"
                style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
              >
                {card}
              </Link>
            ) : (
              /* Not a link, because there is nowhere to go. The tile still shows
                 the component — the page is what is missing, not the thing. */
              <div
                className="overflow-hidden rounded-xl"
                style={{
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  opacity: 0.62,
                }}
              >
                {card}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
