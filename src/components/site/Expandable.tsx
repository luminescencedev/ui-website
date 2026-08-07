'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { Copy } from './Copy';

/** Under this, the block is short enough that a control to expand it is noise. */
const CLAMP = 220;

/**
 * A highlighted block that starts clamped and can be opened.
 *
 * The button only appears when the code is actually taller than the clamp —
 * measured, not guessed from a line count, because wrapping and the font both
 * decide the real height and neither is knowable from the source string.
 *
 * The HTML arrives already highlighted from the server. Shiki loads a full
 * TextMate grammar, and shipping that to a browser to colour twelve lines is the
 * thing that makes a documentation site slower than the app it documents.
 */
export function Expandable({ html, code }: { html: string; code: string }) {
  const body = useRef<HTMLDivElement>(null);
  const [tall, setTall] = useState(false);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    const node = body.current;
    if (!node) return;

    const read = () => setTall(node.scrollHeight > CLAMP + 24);
    read();

    // Guarded rather than assumed: a test renderer has none, and neither does
    // every browser this ships to.
    if (typeof ResizeObserver === 'undefined') return;
    const watch = new ResizeObserver(read);
    watch.observe(node);
    return () => watch.disconnect();
  }, [html]);

  return (
    <div className="group relative">
      <div
        ref={body}
        className="overflow-x-auto"
        style={{
          maxHeight: open || !tall ? undefined : CLAMP,
          overflowY: 'hidden',
          padding: '14px 16px',
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Hidden until hover *and* until focus lands inside, or a keyboard can
          reach a control it cannot see. */}
      <div className="absolute top-2 right-2 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
        <Copy text={code} label="Copy code" />
      </div>

      {tall && !open && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center pb-3"
          style={{
            height: 88,
            /*
             * The fade is the affordance. A block that simply stops at a hard
             * edge reads as the end of the code; one that dissolves says there
             * is more, before anybody has read the button.
             */
            background:
              'linear-gradient(to bottom, transparent, color-mix(in oklab, var(--surface) 92%, transparent) 55%, var(--surface))',
          }}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="press pointer-events-auto rounded-lg px-3 py-1.5 text-[12.5px] font-medium"
            style={{
              background: 'var(--surface-sunken)',
              border: '1px solid var(--border)',
              color: 'var(--fg)',
            }}
          >
            Expand code
          </button>
        </div>
      )}

      {tall && open && (
        <div className="flex justify-center pb-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="press rounded-lg px-3 py-1.5 text-[12.5px] font-medium"
            style={{
              background: 'var(--surface-sunken)',
              border: '1px solid var(--border)',
              color: 'var(--fg)',
            }}
          >
            Collapse code
          </button>
        </div>
      )}
    </div>
  );
}
