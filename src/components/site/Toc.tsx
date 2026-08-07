'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { useScroller } from './DocsShell';

/** The ring follows a finger on a wheel, so it is soft and slow rather than sharp. */
const READ = { stiffness: 180, damping: 30, restDelta: 0.001 } as const;

export type Mark = { id: string; label: string; sub?: boolean };

/**
 * Where you are on the page, twice over.
 *
 * A **ring** that fills with how much of the page has gone under you, and the
 * **section you are in**, lit. They answer two different questions — *how far
 * through* and *which part* — and a docs page needs both: the ring says whether
 * to keep going, the list says where to jump.
 *
 * ── Why nothing travels ─────────────────────────────────────────────────────
 *
 * This had a hairline rail with a marker riding it, and before that a segment
 * as tall as the row. Both were wrong for the same reason, which only shows up
 * once you scroll: reading is continuous, and a marker that springs from one
 * row to the next turns a smooth act into a series of little arrivals in the
 * corner of your eye. The rail was movement for its own sake — the one thing
 * this library's motion standard refuses.
 *
 * So the current section is said in the type and nowhere else: it goes to the
 * page's full foreground where the others sit at `fg-subtle`, and a little
 * heavier. No surface, no marker, no line.
 *
 * That is enough because there is only ever one lit row, and contrast alone
 * carries an answer the eye is already scanning for. A background behind it
 * would be a second thing saying it — and a box drawn around a line of text in
 * a list of plain lines is a heavier claim than the question deserves.
 *
 * The only thing that moves is the ring, which is measuring something genuinely
 * continuous.
 */
export function Toc({ marks }: { marks: Mark[] }) {
  const reduced = Boolean(useReducedMotion());
  const scroller = useScroller();

  const [active, setActive] = useState(marks[0]?.id ?? '');

  /**
   * How far down the page you are, 0 to 1.
   *
   * Spring-smoothed rather than written raw: a trackpad delivers scroll in
   * bursts, and a ring wired straight to it jitters. It should feel pulled, not
   * stepped.
   */
  const raw = useMotionValue(0);
  const read = useSpring(raw, reduced ? { duration: 0 } : READ);

  useEffect(() => {
    const box = scroller?.current;
    if (!box || marks.length === 0) return;

    const line = () => {
      /*
       * The reading line sits a quarter down the panel rather than at its very
       * top: a heading level with the top edge is a heading you have not started
       * reading yet.
       */
      const frame = box.getBoundingClientRect();
      const at = frame.top + frame.height * 0.25;

      let landed = marks[0].id;
      for (const mark of marks) {
        const node = document.getElementById(mark.id);
        if (node && node.getBoundingClientRect().top - at <= 0) landed = mark.id;
      }

      // A last section too short to ever reach the line would never light, so
      // the bottom of the panel counts as being in it.
      const travel = box.scrollHeight - box.clientHeight;
      const done = travel > 0 ? box.scrollTop / travel : 0;
      if (done >= 0.995) landed = marks[marks.length - 1].id;

      raw.set(Math.min(1, Math.max(0, done)));
      setActive((current) => (current === landed ? current : landed));
    };

    line();
    box.addEventListener('scroll', line, { passive: true });
    window.addEventListener('resize', line);

    return () => {
      box.removeEventListener('scroll', line);
      window.removeEventListener('resize', line);
    };
  }, [marks, scroller, raw]);

  if (marks.length === 0) return null;

  return (
    <nav aria-label="On this page">
      <div className="mb-2 flex items-center gap-2">
        <p
          className="text-[12px] font-semibold"
          style={{ color: 'var(--fg)', letterSpacing: '-0.005em' }}
        >
          On this page
        </p>

        <Ring read={read} />
      </div>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {marks.map((mark) => {
          const here = mark.id === active;

          return (
            <li key={mark.id}>
              <a
                href={`#${mark.id}`}
                aria-current={here ? 'location' : undefined}
                className="toc-row block py-[5px] text-[12.5px] leading-[1.5]"
                style={{
                  // The indent is the only thing that says a heading is under
                  // another one.
                  paddingLeft: mark.sub ? 12 : 0,
                  color: here ? 'var(--fg)' : 'var(--fg-subtle)',
                  fontWeight: here ? 500 : 400,
                }}
              >
                {mark.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/**
 * How much of the page has gone under you.
 *
 * A ring rather than a bar: a bar down the side of a list is a second vertical
 * line saying nearly what the list already says, and this one has to sit beside
 * a heading in the width of a word.
 *
 * `pathLength` rather than a `strokeDashoffset` computed by hand — Motion
 * animates it natively and the browser works out the circumference, so the
 * geometry stays right at any radius.
 */
function Ring({ read }: { read: ReturnType<typeof useSpring> }) {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" className="shrink-0" aria-hidden>
      <circle cx="10" cy="10" r="8" fill="none" stroke="var(--border)" strokeWidth="2.5" />
      <motion.circle
        cx="10"
        cy="10"
        r="8"
        fill="none"
        stroke="var(--fg)"
        strokeWidth="2.5"
        strokeLinecap="round"
        // From twelve o'clock, clockwise, like every other dial anyone has read.
        transform="rotate(-90 10 10)"
        style={{ pathLength: read }}
      />
    </svg>
  );
}
