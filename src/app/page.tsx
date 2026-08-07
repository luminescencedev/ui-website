import Link from 'next/link';
import { LandingNav } from '@/components/site/LandingNav';
import { Living } from '@/components/site/Living';
import { Showcase } from '@/components/site/Showcase';

/**
 * The landing page: a navigation that disappears, a headline, the card, a footer.
 *
 * Nothing under the card. The version before this had an install strip, a grid of
 * every component and a wall of paragraphs about what the library refuses to do —
 * all of which is documentation wearing a front page's clothes. Somebody who has
 * scrolled past the card has already decided; the two links they need are at the
 * top and at the bottom.
 *
 * No count in the headline either. The number of components will change, and a
 * page that has to be edited every time one ships is a page that will be wrong.
 *
 * Flat background. The only colour anywhere is one blurred ellipse under the card
 * and one word in the headline.
 */
export default function Home() {
  return (
    <>
      <LandingNav />

      <main className="relative overflow-x-clip">
        {/*
         * A wash behind the headline, so the top of the page is lit rather than
         * blank. `overflow-x-clip` on the parent rather than `hidden`, because
         * `hidden` on an ancestor turns every `position: sticky` inside it into
         * a decoration — and the documentation's rails are sticky.
         */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px]"
          style={{
            background:
              'radial-gradient(60% 70% at 50% 0%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 70%)',
          }}
        />

        <section className="mx-auto max-w-3xl px-5 pt-36 pb-14 text-center sm:px-8 sm:pt-44">
          {/*
           * The floor is 2rem rather than 2.6: at 375px this is the longest thing
           * on the page, and a headline that overflows on a phone is the first
           * thing anybody sees on a phone.
           */}
          <h1
            className="display mx-auto"
            /*
             * The sentence lives here, once and finished. Everything inside is
             * `aria-hidden`, because the word types itself in and a screen reader
             * should not be handed it one letter at a time.
             */
            aria-label="React components you can feel."
            style={{ fontSize: 'clamp(2rem, 7.5vw, 4.5rem)', lineHeight: 1.02 }}
          >
            <span aria-hidden>React components</span>
            <br />
            <span aria-hidden>you can </span>
            <Living>feel</Living>
            <span aria-hidden>.</span>
          </h1>

          <p className="prose-site mx-auto mt-7 max-w-[30rem]" style={{ fontSize: 17 }}>
            Styled by default. Built with Motion and Tailwind CSS.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/docs/get-started"
              className="press grid h-10 place-items-center rounded-lg px-6 text-[14px] font-medium"
              style={{ background: 'var(--fg)', color: 'var(--canvas)' }}
            >
              Get started
            </Link>
            <Link
              href="/docs/introduction"
              className="press grid h-10 place-items-center rounded-lg px-6 text-[14px]"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--fg)',
              }}
            >
              Browse components
            </Link>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-subtle)' }}
          >
            MIT · React 19 · Tailwind 4 · Motion
          </p>
        </section>

        {/* Everything the page has to say, and it can be pressed. */}
        <section className="mx-auto max-w-[1180px] px-5 pb-16 sm:px-8">
          <Showcase />
        </section>

        {/*
         * No rule across the page. A 1px line the full width of a viewport is a
         * hard stop, and there is nothing after this to stop for — the footer is
         * the last few words, not a new section.
         */}
        <footer className="mx-auto max-w-[1180px] px-5 pb-14 sm:px-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px]">
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-subtle)' }}>
              @carabine/ui 1.0.0 · MIT
            </span>
            <Link href="/docs/get-started" className="ml-auto" style={{ color: 'var(--fg-muted)' }}>
              Documentation
            </Link>
            <a
              href="https://github.com/luminescencedev/ui"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--fg-muted)' }}
            >
              Source
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
