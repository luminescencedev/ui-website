import type { Metadata } from 'next';
import { Code } from '@/components/site/Code';
import { Around, DocPage, H2, H3, P, Rule, Table } from '@/components/site/page';

export const metadata: Metadata = {
  title: 'The motion standard',
  description:
    'One easing and it is an ease-out, durations by what the thing is, springs only for what a pointer drives, and nothing that appears from scale(0).',
};

const marks = [
  { id: 'why', label: 'Why there is a standard' },
  { id: 'easing', label: 'One easing' },
  { id: 'durations', label: 'Durations' },
  { id: 'out', label: 'Out is faster than in' },
  { id: 'springs', label: 'Springs' },
  { id: 'entrances', label: 'Entrances and origins' },
  { id: 'press', label: 'Press feedback' },
  { id: 'never', label: 'Never' },
  { id: 'reduced', label: 'Reduced motion' },
];

export default function MotionPage() {
  return (
    <DocPage
      eyebrow="Getting started"
      title="The motion standard"
      description="Every component moves the same way or the library has no feel. These are not suggestions — a component that breaks one owes an explanation in its README, and exactly one does."
      marks={marks}
    >
      <H2 id="why">Why there is a standard</H2>

      <P>
        A library is not twenty components, it is one. If a menu opens with one curve and a popover
        with another, the difference is not read as variety — it is read as one of them being wrong,
        and nobody can say which. Consistency is what turns a folder of parts into something that
        feels made.
      </P>

      <H2 id="easing">One easing, and it is an ease-out</H2>

      <Rule>
        <code>cubic-bezier(0.22, 1, 0.36, 1)</code>, everywhere.
      </Rule>

      <P>
        The first frames are the ones being watched, and anything that eases <em>in</em> spends them
        standing still — an <code>ease-in</code> at 200ms feels slower than an <code>ease-out</code>{' '}
        at 300ms. Nothing in this package uses one. Linear is for constant motion only: a spinner, a
        marquee, a strip that has to burn evenly.
      </P>

      <Code
        lang="tsx"
        code={`const EASE = [0.22, 1, 0.36, 1] as const;

transition={{ duration: 0.2, ease: EASE }}`}
      />

      <H2 id="durations">Durations, by what the thing is</H2>

      <P>All under 300ms. The scale is the object, not the distance it travels.</P>

      <Table
        head={['What it is', 'How long']}
        rows={[
          ['Press feedback', '100–160ms'],
          ['Tooltip, small tip', '125–200ms'],
          ['Menu, dropdown, popover', '150–250ms'],
          ['Dialog, drawer', '200–500ms'],
        ]}
      />

      <P>
        And one rule that overrides the table:{' '}
        <strong>the faster a thing is invoked, the less it should move</strong>. The command palette
        is opened by a chord forty times a day, so it does not animate at all.
      </P>

      <H2 id="out">Out is faster than in, and never the entrance reversed</H2>

      <P>
        A panel that leaves as slowly as it arrived holds the page hostage twice. Exits are tweens
        even when entrances are springs — nothing needs to settle on its way out, and a spring on an
        exit is a thing wobbling as it leaves.
      </P>

      <H2 id="springs">Springs are for what the pointer drives</H2>

      <P>
        A sliding bar, a dragged card, a knob following a finger — anything <em>interruptible</em>,
        because a spring keeps its velocity where a tween restarts from zero. Panels that merely
        open are tweens.
      </P>

      <P>
        Springs live in the 320–600 stiffness / 26–45 damping range, and what matters is the ratio:
        critical damping is <code>2 × √stiffness</code>. At 520 that is about 46, so a damping of 34
        is deliberately under — the overshoot is what makes a thumb <em>arrive</em> rather than
        slide in.
      </P>

      <H3 id="never-finger">One exception, and it is a finger</H3>

      <P>
        Nothing animates towards a pointer that is currently down. A thumb that eases towards where
        your finger is, is a thumb that is behind it, and the lag is the only thing you feel.
      </P>

      <Code
        lang="tsx"
        code={`if (dragging.current) return;   // a finger is not something to animate towards`}
      />

      <H2 id="entrances">Entrances and origins</H2>

      <P>
        <strong>
          Nothing appears from <code>scale(0)</code>.
        </strong>{' '}
        Nothing in the world does. Entrances start at 0.94–0.98 with opacity, which is the
        difference between something arriving and something being switched on.
      </P>

      <P>
        <strong>Anchored things grow from their anchor.</strong> <code>transform-origin</code> at
        the trigger&apos;s corner for popovers, menus and tips. Dialogs are the exception and stay
        centred: they are not anchored to anything.
      </P>

      <H2 id="press">Press feedback, and why it is CSS</H2>

      <P>
        <code>active:scale-[0.97]</code> — 0.98 for a full-width row — on a 100–150ms CSS
        transition. In CSS rather than in Motion on purpose: this one must not wait behind whatever
        else has the main thread, and it is the movement a dropped frame ruins.
      </P>

      <H2 id="never">Never</H2>

      <Table
        head={['Never', 'Because']}
        rows={[
          [
            'transition-all',
            'It animates properties you did not mean, including ones that force layout.',
          ],
          [
            'transition-[colors, …]',
            'Not valid CSS. `colors` is a Tailwind name, not a property — spell them out: transition-[background-color,box-shadow,color,transform].',
          ],
          [
            'setState per frame',
            'Per `pointermove` or per animation frame. Use a motion value, or write to the node.',
          ],
          [
            'Two surfaces for one claim',
            'One active row, one bar, one highlight. Hover and keyboard focus are the same question.',
          ],
        ]}
      />

      <H2 id="reduced">Reduced motion is gentler, not absent</H2>

      <P>
        Position and scale go; opacity and colour stay, because they carry meaning. A control that
        stops answering the pointer reads as broken, so hover keeps a short tween rather than
        nothing. The one place movement really is removed is smooth scrolling — a page that slides
        two thousand pixels is the thing that makes people ill.
      </P>

      <Code
        lang="tsx"
        code={`const reduced = Boolean(useReducedMotion());

transition={{ duration: reduced ? 0 : 0.2, ease: EASE }}`}
      />

      <Around current="motion" />
    </DocPage>
  );
}
