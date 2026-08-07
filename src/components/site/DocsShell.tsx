'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Drawer, Switch, Tooltip } from '@carabine/ui';
import { PanelLeft, Search } from 'lucide-react';
import type { ReactNode, RefObject } from 'react';
import { Sidebar } from './Sidebar';
import { useSearch } from './Chrome';
import { useTheme } from './theme';
import { all } from '@/lib/nav';

const RAIL = 264;
const KEPT = 'carabine:rail';
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The scrolling element, handed to whoever needs to listen to it.
 *
 * The window never scrolls here — the shell is `h-dvh overflow-hidden` and the
 * only scroller is one div deep inside it. Anything that thinks it can listen to
 * `window` for scroll is silently dead on this layout, so the element is passed
 * around explicitly rather than found by walking up the tree.
 */
const Scroller = createContext<RefObject<HTMLElement | null> | null>(null);

export const useScroller = () => useContext(Scroller);

/**
 * The docs shell, and it does not change between pages.
 *
 * **It is not a flex row.** The rail is `position: fixed` and the content column
 * simply carries a matching `padding-left`. A flex row would relayout the whole
 * reading column every time the rail changes width; a padding does not.
 *
 * Three pieces of furniture, and none of them is the page: the rail on the left,
 * a bar across the top of the column, and one rounded panel under it holding
 * everything that scrolls. The 20px of raw canvas around the panel is the frame,
 * and its left edge is not the panel's margin but the rail's own padding — so the
 * two line up without either knowing about the other.
 *
 * The bar carries no background and no rule, because it sits on the canvas rather
 * than over content. It was glass, sticky inside the panel, and that was the wrong
 * object: a bar that scrolls with a page is part of the page.
 *
 * The breakpoint is `shell` (56rem), not `lg`. A window at 1000px has room for a
 * 264px rail and a 700px column, and handing it the phone layout is answering a
 * question nobody asked.
 */
export function DocsShell({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const search = useSearch();

  const reduced = Boolean(useReducedMotion());

  const [open, setOpen] = useState(false);
  const [rail, setRail] = useState(true);
  const scroller = useRef<HTMLElement>(null);

  const current = pathname.replace('/docs/', '').replace('/docs', '');
  const page = all.find((entry) => entry.slug === current);

  /*
   * Read after mount rather than in the initializer. The server has no
   * `localStorage`, so a rail that starts closed on the client and open in the
   * HTML is a hydration mismatch — and React resolves those by throwing away the
   * markup, which costs more than the one frame this avoids.
   */
  useEffect(() => {
    try {
      if (localStorage.getItem(KEPT) === 'shut') setRail(false);
    } catch {
      // Private mode, or a browser that refuses storage. The default stands.
    }
  }, []);

  const swing = () =>
    setRail((was) => {
      const next = !was;
      try {
        localStorage.setItem(KEPT, next ? 'open' : 'shut');
      } catch {
        // Same again: the preference is a nicety, not a requirement.
      }
      return next;
    });

  /*
   * Back to the top on a new page. `window.scrollTo` would do nothing here — the
   * window is not what moved — which is exactly the bug this layout invites.
   */
  useEffect(() => {
    /*
     * `instant`, explicitly. The panel carries `scroll-behavior: smooth` so that
     * anchors travel — and without this the same declaration turns every page
     * change into a two-thousand-pixel slide back to the top of a page nobody
     * has read yet.
     */
    scroller.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <Scroller.Provider value={scroller}>
      <div
        className="flex h-dvh flex-col overflow-hidden"
        style={{
          background: 'var(--canvas)',
          /*
           * One number, read by the rail and by the reading column. Two separate
           * widths animating on the same duration is two things that agree until
           * the day one of them is edited.
           */
          ['--rail' as string]: rail ? `${RAIL}px` : '0px',
        }}
      >
        {/* The rail. No panel, no border, no shadow — it sits on the raw canvas,
            and the edge you read as its boundary is the panel's rounded corner. */}
        <aside
          className="rail fixed inset-y-0 left-0 z-30 flex-col pb-5"
          inert={!rail || undefined}
        >
          {/*
           * The contents hold their own width while the rail closes on them.
           * Left to fill the aside, every label rewraps on the way out — a column
           * of text folding in on itself, which reads as a bug rather than as a
           * panel leaving.
           */}
          <div className="flex min-h-0 flex-1 flex-col px-5" style={{ width: RAIL }}>
            <Brand />

            <button
              type="button"
              onClick={search}
              className="press mt-5 flex h-9 w-full items-center gap-2 rounded-lg px-2.5 text-[13px]"
              style={{
                color: 'var(--fg-subtle)',
                background: 'var(--surface-muted)',
                border: '1px solid var(--border)',
              }}
            >
              <Search className="size-3.5 shrink-0" />
              <span>Search</span>
              <kbd
                className="ml-auto rounded px-1.5 py-0.5 text-[10px]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: 'var(--canvas)',
                  border: '1px solid var(--border)',
                  color: 'var(--fg-subtle)',
                }}
              >
                ⌘K
              </kbd>
            </button>

            {/* The rail scrolls on its own, and its overscroll stops here rather
                than handing the wheel to the panel behind it. */}
            <div
              className="mt-5 min-h-0 flex-1 overflow-y-auto pr-1"
              style={{ overscrollBehavior: 'contain' }}
            >
              <Sidebar current={current} />
            </div>
          </div>
        </aside>

        <div className="with-rail flex min-h-0 flex-1 flex-col">
          {/* Shell furniture, on the canvas. Asymmetric padding on purpose: no
              left gutter, because the rail's own right padding already drew it. */}
          <header className="flex h-14 shrink-0 items-center gap-2.5 px-4 shell:pr-5 shell:pl-0">
            <Drawer
              theme={theme}
              side="left"
              size={286}
              title="Documentation"
              open={open}
              onOpenChange={setOpen}
              content={<Sidebar current={current} onNavigate={() => setOpen(false)} />}
            >
              <button
                type="button"
                aria-label="Open the navigation"
                className="press when-narrow size-8 shrink-0 place-items-center rounded-md"
                style={{ color: 'var(--fg-muted)' }}
              >
                {/* The same glyph as the desktop toggle, because it opens the
                    same thing. A burger says *a menu lives here*; this is a
                    sidebar, and it is the sidebar you get. */}
                <PanelLeft className="size-4" />
              </button>
            </Drawer>

            {/*
             * The rail's own control, and it lives here rather than on the rail:
             * a button that travels with the thing it closes is a button that
             * leaves with it, and then there is nothing left to press to bring it
             * back.
             *
             * One glyph, and it does not change. The rail is either beside you
             * or it is not — the layout already answers *which state is this*,
             * and a second answer on the button is the same claim made twice.
             */}
            <Tooltip
              theme={theme}
              content={rail ? 'Hide the sidebar' : 'Show the sidebar'}
              placement="bottom"
            >
              <button
                type="button"
                onClick={swing}
                aria-label={rail ? 'Hide the sidebar' : 'Show the sidebar'}
                aria-expanded={rail}
                className="press when-wide size-8 shrink-0 place-items-center rounded-md"
                style={{ color: 'var(--fg-muted)' }}
              >
                <PanelLeft className="size-4" />
              </button>
            </Tooltip>

            {/*
             * A breadcrumb, not a title. The page prints its own `h1` forty pixels
             * below this, and a bar repeating it is the same words twice — this
             * says where you are, which the heading does not.
             */}
            <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-[13px]">
              <Link href="/docs/introduction" style={{ color: 'var(--fg-subtle)' }}>
                Docs
              </Link>
              {page && (
                <>
                  <span aria-hidden style={{ color: 'var(--fg-subtle)' }}>
                    /
                  </span>
                  <span
                    className="truncate font-medium"
                    style={{ color: 'var(--fg)' }}
                    aria-current="page"
                  >
                    {page.title}
                  </span>
                </>
              )}
            </nav>

            <div className="ml-auto flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={search}
                aria-label="Search the documentation"
                className="press when-narrow size-8 place-items-center rounded-md"
                style={{ color: 'var(--fg-muted)' }}
              >
                <Search className="size-4" />
              </button>

              <Tooltip theme={theme} content="Source on GitHub" placement="bottom">
                <a
                  href="https://github.com/luminescencedev/ui"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Source on GitHub"
                  className="press grid size-8 place-items-center rounded-md"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  <GithubMark />
                </a>
              </Tooltip>

              <Switch
                theme={theme}
                checked={theme === 'dark'}
                onCheckedChange={(on) => setTheme(on ? 'dark' : 'light')}
                aria-label="Dark theme"
                width={42}
                height={22}
                inset={3}
              />
            </div>
          </header>

          <main className="flex min-h-0 w-full flex-1 flex-col pb-0 shell:pr-5 shell:pb-5 shell:pl-0">
            {/*
             * A container, so what is inside answers to the **panel's** width
             * rather than the window's. That is the whole difference here: the
             * panel grows by 264px when the rail closes, and a media query cannot
             * see that happen — it would keep the right-hand rail hidden on
             * exactly the screens where closing the left one just made room for
             * it.
             */}
            {/*
             * The frame and the scroller are two elements on purpose.
             *
             * A scrolling box that carries its own `border-radius` draws its
             * scrollbar in the border box, *outside* the curve — so the bar
             * squares off the corner it is sitting in and hangs past the panel's
             * edge. The radius and the clipping belong to a wrapper; the
             * scrolling happens inside it, where the rounded corner cuts the bar
             * off like it cuts off everything else.
             */}
            <div
              className="relative flex min-h-0 flex-1 flex-col overflow-hidden shell:rounded-[24px]"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <section
                ref={scroller}
                className="docs-scroll @container relative flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto"
              >
                {/*
                 * The page arrives rather than appearing. 180ms, and the exit is
                 * a shorter fall in the other direction — an entrance played
                 * backwards reads as an undo, not as leaving.
                 */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={pathname}
                    className="px-5 pb-20 shell:px-10"
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? {} : { opacity: 0, y: -6 }}
                    transition={{ duration: reduced ? 0 : 0.18, ease: EASE }}
                  >
                    {children}
                  </motion.div>
                </AnimatePresence>
              </section>
            </div>
          </main>
        </div>
      </div>
    </Scroller.Provider>
  );
}

/**
 * The mark, and the version beside it.
 *
 * `h-14`, with no padding above it, because the bar in the column to the right
 * is `h-14` measured from the same top edge — so the two rows centre on the same
 * line and the wordmark reads level with the breadcrumb rather than nine pixels
 * under it. It was `h-9` inside a `py-5` rail, which is the same total height by
 * accident and a different centre on purpose by nobody.
 */
function Brand() {
  return (
    <Link href="/" className="press flex h-14 items-center gap-2">
      <span className="text-[14px] font-semibold tracking-tight" style={{ color: 'var(--fg)' }}>
        carabine
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-subtle)' }}>/</span>
      <span className="text-[14px] font-semibold tracking-tight" style={{ color: 'var(--fg)' }}>
        ui
      </span>
      <span
        className="ml-auto rounded px-1.5 py-0.5 text-[10px]"
        style={{
          fontFamily: 'var(--font-mono)',
          background: 'var(--surface-muted)',
          border: '1px solid var(--border)',
          color: 'var(--fg-subtle)',
        }}
      >
        1.0.0
      </span>
    </Link>
  );
}

/**
 * Drawn here rather than imported: `lucide-react@1` dropped its brand marks, and
 * a trademarked logo is not something an icon set should be handing out anyway.
 */
function GithubMark() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-2.91-.88-2.91-2.9 0-.65.23-1.18.61-1.6-.06-.15-.27-.77.06-1.6 0 0 .5-.16 1.64.61a5.6 5.6 0 0 1 1.49-.2c.51 0 1.02.07 1.49.2 1.14-.78 1.64-.61 1.64-.61.33.83.12 1.45.06 1.6.38.42.61.95.61 1.6 0 2.03-1.13 2.7-2.92 2.9.29.25.55.74.55 1.5 0 1.08-.01 1.96-.01 2.23 0 .21.15.46.55.38A7.99 7.99 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}
