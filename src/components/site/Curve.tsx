'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react';

/** The library's only easing, as its four numbers. */
const EASE = [0.22, 1, 0.36, 1] as const;

/** One loop. Longer than any real transition, because this one is being read. */
const LOOP = 1.6;

const W = 320;
const H = 150;

/** The thing that rides the curve, beside the graph. */
const SQUARE = 32;

/**
 * The easing curve, drawn, with something riding it.
 *
 * This is the library's whole argument in one figure. `cubic-bezier(0.22, 1, 0.36,
 * 1)` is the *only* easing in twenty components, and the shape says why it was
 * chosen: it leaves the floor immediately and spends the rest of the duration
 * arriving. The first frames are the ones being watched, and anything that eases
 * *in* spends them standing still.
 *
 * The two axes are honest. `x` is elapsed time and moves **linearly**; `y` is
 * progress and moves on the curve. Which means no bezier has to be evaluated
 * here at all — two motion values over the same duration, one linear and one
 * eased, and the dot's position is the graph by construction. Computing the
 * polynomial would have been a second implementation of the thing being drawn,
 * and a chance for the figure to disagree with the components.
 */
export function Curve() {
  const reduced = Boolean(useReducedMotion());

  /** Elapsed time, 0 → 1. */
  const time = useMotionValue(0);
  /** Progress, 0 → 1, on the curve. */
  const eased = useMotionValue(0);

  useEffect(() => {
    if (reduced) {
      // Held at the end rather than looping: the shape is the message, and the
      // message survives without the travel.
      time.set(1);
      eased.set(1);
      return;
    }

    const runs = [
      animate(time, 1, { duration: LOOP, ease: 'linear', repeat: Infinity, repeatDelay: 0.5 }),
      animate(eased, 1, { duration: LOOP, ease: EASE, repeat: Infinity, repeatDelay: 0.5 }),
    ];

    return () => runs.forEach((run) => run.stop());
  }, [reduced, time, eased]);

  const cx = useTransform(time, (at) => at * W);
  const cy = useTransform(eased, (at) => H - at * H);

  /*
   * The track is measured, because a percentage inside `translateX` is a
   * percentage of the *element's own* width — so `translateX(100%)` on a 32px
   * square moves it 32px, not across the track. Measure, do not assume: the same
   * rule the slider and the tabs are built on, for the same reason.
   *
   * `ResizeObserver` is guarded rather than assumed, and `offsetWidth` rather
   * than a rect, because a rect includes transforms and there is one in here.
   */
  const track = useRef<HTMLDivElement>(null);
  const [room, setRoom] = useState(0);

  useLayoutEffect(() => {
    const node = track.current;
    if (!node) return;

    const read = () => setRoom(Math.max(0, node.offsetWidth - SQUARE - 8));
    read();

    if (typeof ResizeObserver === 'undefined') return;
    const watch = new ResizeObserver(read);
    watch.observe(node);
    return () => watch.disconnect();
  }, []);

  /** The same progress, driving a real translation beside the graph. */
  const slide = useTransform(eased, (at) => `translate3d(${at * room}px, 0, 0)`);

  return (
    <figure style={{ margin: 0 }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label="The easing curve cubic-bezier(0.22, 1, 0.36, 1): it leaves immediately and spends the rest of the duration arriving."
        style={{ overflow: 'visible', display: 'block' }}
      >
        {/* Where a linear easing would have gone. Drawn faintly, because the
            whole point is the distance between the two. */}
        <line
          x1={0}
          y1={H}
          x2={W}
          y2={0}
          stroke="var(--border-strong)"
          strokeWidth={1}
          strokeDasharray="3 4"
        />

        <path
          d={`M 0 ${H} C ${0.22 * W} 0, ${0.36 * W} 0, ${W} 0`}
          fill="none"
          stroke="var(--fg)"
          strokeWidth={2}
          strokeLinecap="round"
        />

        <motion.circle cx={cx} cy={cy} r={4.5} fill="var(--fg)" />
      </svg>

      <figcaption className="mt-5">
        <div
          ref={track}
          className="relative overflow-hidden rounded-lg"
          style={{ height: SQUARE + 8, background: 'var(--border)' }}
        >
          {/* The same value, as movement. The graph and the thing it describes
              cannot drift, because there is one number behind both. */}
          <motion.div
            className="absolute top-1 left-1 rounded-md"
            style={{
              width: SQUARE,
              height: SQUARE,
              background: 'var(--fg)',
              transform: slide,
            }}
          />
        </div>

        <p
          className="mt-3 text-[11px]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-subtle)' }}
        >
          cubic-bezier(0.22, 1, 0.36, 1)
        </p>
      </figcaption>
    </figure>
  );
}
