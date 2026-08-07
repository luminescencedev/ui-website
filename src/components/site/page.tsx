import type { ReactNode } from 'react';
import Link from 'next/link';
import { Toc } from './Toc';
import type { Mark } from './Toc';
import { all, categoryOf, groups, href } from '@/lib/nav';

/**
 * Every docs page is this shape. The `marks` are declared once, at the top, and
 * they are what the right rail follows — so a heading that is not in the list is a
 * heading the marker will skip, which is a mistake you can see rather than one
 * that hides.
 *
 * The reading column is centred inside the panel, and stays centred whether or
 * not the right-hand rail is showing — see the note on the return below.
 */
export function DocPage({
  eyebrow,
  title,
  description,
  marks,
  children,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  marks: Mark[];
  children: ReactNode;
}) {
  /*
   * ── The column, the rail, and the width neither of them has ───────────────
   *
   * This was a flex row first — column, gap, rail — and a row centres *itself*,
   * not its first child, so the words sat left of the panel's middle by half a
   * rail and shifted sideways whenever the rail was hidden. That was the bug.
   *
   * The obvious fix, centring the column and floating the rail out of the flow,
   * is worse in practice and the arithmetic says why: for the column to be
   * centred in the panel *and* have a rail beside it, the panel has to be the
   * column **plus twice** the rail — the space on the left has to match what the
   * rail takes on the right. At 44rem of column and 10 of rail that is 64rem of
   * panel, which a laptop with the left sidebar open never reaches. The rail
   * waited for room that never came, and the honest failure of a layout should
   * not be "the feature is simply absent".
   *
   * So the two are one unit, and the unit is centred. The column keeps its own
   * `mx-auto` inside the space left over, so on a wide panel it still reads as
   * centred; on a narrow one the pair is centred and the rail is *there*, which
   * is worth more than the last few pixels of symmetry.
   *
   * `inset-y-0` on the rail's wrapper rather than a height, because
   * `position: sticky` can only travel inside a box taller than itself — an
   * `h-fit` wrapper is exactly as tall as the list, and the list would never
   * move.
   */
  return (
    <div className="relative w-full py-10">
      <article className="toc-column mx-auto min-w-0">
        <header style={{ marginBottom: 34 }}>
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="display" style={{ fontSize: 38, marginBottom: 12 }}>
            {title}
          </h1>
          <p className="prose-site" style={{ fontSize: 16.5 }}>
            {description}
          </p>
        </header>

        {children}
      </article>

      {/*
       * Gone when the **panel** is under 44rem — not the window. That is the
       * point where the column itself is down to about 26rem, and a rail that
       * costs the prose its last readable inch is a rail nobody wanted.
       */}
      <aside className="toc-rail absolute inset-y-0 right-0 w-40">
        <div className="sticky top-6">
          <Toc marks={marks} />
        </div>
      </aside>
    </div>
  );
}

/**
 * `scroll-margin-top` on every heading. Nothing overlaps the top of the panel any
 * more — the bar moved out of it — so this is breathing room rather than
 * clearance: a heading flush against the panel's edge reads as clipped.
 */
const offset = { scrollMarginTop: 28 };

export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="display"
      style={{ ...offset, fontSize: 23, marginTop: 44, marginBottom: 14 }}
    >
      {children}
    </h2>
  );
}

export function H3({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3
      id={id}
      style={{
        ...offset,
        fontSize: 15,
        fontWeight: 600,
        letterSpacing: '-0.01em',
        marginTop: 30,
        marginBottom: 8,
        color: 'var(--fg)',
      }}
    >
      {children}
    </h3>
  );
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p className="prose-site" style={{ marginBlock: 12 }}>
      {children}
    </p>
  );
}

/**
 * The sentence a component's README leads with, pulled out. Not a callout box with
 * an icon — the rule it states is the reason the component is built the way it is,
 * and dressing it up as an aside says the opposite.
 */
export function Rule({ children }: { children: ReactNode }) {
  return (
    <p
      className="prose-site"
      style={{
        marginBlock: 20,
        paddingLeft: 16,
        borderLeft: '2px solid var(--fg)',
        color: 'var(--fg)',
        fontSize: 15.5,
      }}
    >
      {children}
    </p>
  );
}

/**
 * The two props every component takes, said once and dropped into every page.
 *
 * Written as one component rather than two rows copied into twenty API tables,
 * because the promise it documents is that it is *uniform* — and a table that
 * has to be edited twenty times is a table that will disagree with itself.
 *
 * `panel` swaps the sentence for the components that portal one, where the
 * class lands on the panel rather than on the trigger.
 */
export function Hatch({ panel = false }: { panel?: boolean }) {
  return (
    <>
      <Table
        head={['Prop', 'Type', '']}
        rows={[
          [
            'className',
            'string',
            panel
              ? 'Added to the panel’s own classes, so yours wins'
              : 'Added to the component’s own classes, so yours wins',
          ],
          [
            'style',
            'CSSProperties',
            'Merged after the component’s own inline styles, so yours wins',
          ],
        ]}
      />

      <p className="prose-site" style={{ marginBlock: 12 }}>
        {panel ? (
          <>
            Both land on the <strong>panel</strong>. The trigger is already your element — you style
            it where you write it — and the panel is the part that portals away from your markup and
            is otherwise out of reach.
          </>
        ) : (
          <>
            Colours are data and dimensions are props, and neither covers a margin, a font, or a
            class from your own system. That is what these are for.
          </>
        )}{' '}
        State is legible from CSS as well — <code>data-state</code>, <code>data-disabled</code>,{' '}
        <code>data-side</code> — so a rule can answer it without knowing a single class name of
        ours. See <a href="/docs/theming#hatch">Theming</a>.
      </p>
    </>
  );
}

export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto" style={{ marginBlock: 18 }}>
      <table className="w-full border-collapse text-left" style={{ fontSize: 13 }}>
        <thead>
          <tr>
            {head.map((cell) => (
              <th
                key={cell}
                className="eyebrow border-b pb-2"
                style={{ borderColor: 'var(--border)', fontSize: 10 }}
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, at) => (
            <tr key={at}>
              {row.map((cell, cellAt) => (
                <td
                  key={cellAt}
                  className="border-b py-2.5 align-top"
                  style={{
                    borderColor: 'var(--border)',
                    color: cellAt === 0 ? 'var(--fg)' : 'var(--fg-muted)',
                    fontFamily: cellAt === 0 ? 'var(--font-mono)' : undefined,
                    fontSize: cellAt === 0 ? 12 : 13,
                    whiteSpace: cellAt === 0 ? 'nowrap' : undefined,
                    paddingRight: 16,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * What the component refuses to do, and why. Every component here has one, and
 * they are the API as much as the props are — a library is defined by what it
 * says no to.
 */
export function Refuses({ items }: { items: { title: string; why: ReactNode }[] }) {
  return (
    <ul style={{ marginBlock: 18, listStyle: 'none', padding: 0 }}>
      {items.map((item) => (
        <li key={item.title} className="border-t py-3.5" style={{ borderColor: 'var(--border)' }}>
          <p style={{ color: 'var(--fg)', fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
            {item.title}
          </p>
          <p className="prose-site" style={{ fontSize: 14 }}>
            {item.why}
          </p>
        </li>
      ))}
    </ul>
  );
}

/**
 * The rest of the category this component is in.
 *
 * Derived from the same grouping the command palette uses, so a component added
 * to a category appears here without anybody remembering to come back — a
 * hand-written list of siblings is a list that is wrong the day after it is
 * written, and wrong silently.
 */
export function Related({ current }: { current: string }) {
  const name = categoryOf(current);
  const siblings = groups
    .find((group) => group.name === name)
    ?.entries.filter((entry) => entry.slug !== current);

  if (!siblings || siblings.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {siblings.map((entry) =>
        entry.ready ? (
          <Link
            key={entry.slug}
            href={href(entry.slug)}
            className="press rounded-lg px-3 py-1.5 text-[13px]"
            style={{
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--fg)',
            }}
          >
            {entry.title}
          </Link>
        ) : (
          <span
            key={entry.slug}
            className="rounded-lg px-3 py-1.5 text-[13px]"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--fg-subtle)',
              opacity: 0.55,
            }}
          >
            {entry.title}
          </span>
        ),
      )}
    </div>
  );
}

/**
 * The two pages either side of this one, in the order the rail lists them.
 *
 * Derived rather than declared: a hand-written pair goes stale the first time a
 * page is inserted between two others, and the failure is silent — the links
 * still work, they just lie about what comes next.
 */
export function Around({ current }: { current: string }) {
  const written = all.filter((entry) => entry.ready);
  const at = written.findIndex((entry) => entry.slug === current);
  if (at < 0) return null;

  const back = written[at - 1];
  const on = written[at + 1];
  if (!back && !on) return null;

  return (
    <nav
      aria-label="Nearby pages"
      className="mt-14 grid gap-3 sm:grid-cols-2"
      style={{ borderTop: '1px solid var(--border)', paddingTop: 24 }}
    >
      {back ? <Step entry={back} where="Previous" /> : <span />}
      {on && <Step entry={on} where="Next" />}
    </nav>
  );
}

function Step({
  entry,
  where,
}: {
  entry: { slug: string; title: string; blurb: string };
  where: 'Previous' | 'Next';
}) {
  const forward = where === 'Next';

  return (
    <Link
      href={href(entry.slug)}
      className="press rounded-xl px-4 py-3"
      /*
       * The placeholder span above does the ordering. A `grid-column: 2` here
       * would *invent* a second column on a phone rather than clamp to the one
       * that exists — which is how a card ends up twice the width of the page.
       */
      style={{
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        textAlign: forward ? 'right' : 'left',
      }}
    >
      <span className="eyebrow block" style={{ fontSize: 10 }}>
        {where}
      </span>
      <span className="mt-1 block text-[14px] font-medium" style={{ color: 'var(--fg)' }}>
        {entry.title}
      </span>
      <span className="mt-0.5 block text-[12.5px]" style={{ color: 'var(--fg-muted)' }}>
        {entry.blurb}
      </span>
    </Link>
  );
}
