import type { Metadata } from 'next';
import { Code } from '@/components/site/Code';
import { Around, DocPage, H2, P, Refuses, Rule, Table } from '@/components/site/page';
import { components, groups } from '@/lib/nav';

export const metadata: Metadata = {
  title: 'Introduction',
  description:
    'Twenty React components, styled by default and moving by default. What the library is, what it is built on, and what it refuses to do.',
};

const marks = [
  { id: 'what', label: 'What this is' },
  { id: 'bet', label: 'The bet' },
  { id: 'rules', label: 'The rules' },
  { id: 'refuses', label: 'What it refuses' },
  { id: 'shape', label: 'The shape of a component' },
];

export default function Introduction() {
  return (
    <DocPage
      eyebrow="Getting started"
      title="Introduction"
      description="Twenty React components, styled by default and moving by default. One easing curve, both themes written out, every prop optional."
      marks={marks}
    >
      <H2 id="what">What this is</H2>

      <P>
        A component library you install and use, not one you assemble. Every component arrives with
        its look, its movement and its accessibility already decided —{' '}
        <code>&lt;Toaster /&gt;</code> with no props at all is the version we would ship.
      </P>

      <P>
        React 19, Tailwind 4 for style, Motion for movement, TypeScript throughout. Peers are{' '}
        <code>react</code>, <code>react-dom</code> and <code>motion</code>; dependencies are{' '}
        <code>lucide-react</code> and <code>zustand</code>. Nothing else, and nothing new without a
        reason that survives being questioned.
      </P>

      <Table
        head={['Category', 'Components']}
        rows={groups.map((group) => [
          group.name,
          group.entries.map((entry) => entry.title).join(' · '),
        ])}
      />

      <Rule>
        Every component moves the same way or the library has no feel. That is not a style guide —
        it is the reason this exists rather than being a folder of copied snippets.
      </Rule>

      <H2 id="bet">The bet</H2>

      <P>
        Headless libraries won the argument about <em>logic</em>. They did not win the argument
        about <em>feel</em>, and feel is what people actually notice: the way a menu grows out of
        the corner nearest the thing that opened it, the way a sheet gives when you pull it the
        wrong way, the way a thumb stays exactly under a finger instead of springing towards it.
      </P>

      <P>
        So this library ships opinions, and makes them replaceable where it matters. Structure stays
        in utilities. Anything that <em>identifies</em> one state from another — a toast&apos;s
        tones, a button&apos;s variants, a switch&apos;s skin — is an object of plain CSS colour
        strings merged over the defaults, with the key set left open so a consumer can invent a
        state. A consumer cannot override <code>bg-green-500</code> buried in a component.
      </P>

      <H2 id="rules">The rules</H2>

      <P>
        These are load-bearing. Every one of them came from getting it wrong first, and each has a
        comment sitting exactly where somebody would reintroduce it.
      </P>

      <Table
        head={['Rule', 'Because']}
        rows={[
          [
            'Movement is Motion, style is Tailwind',
            'Neither leaks. The one exception is press feedback, which is a CSS transition so it cannot wait behind whatever else has the main thread.',
          ],
          [
            'Measure, do not count',
            'offsetWidth, never index × width — and never a bounding rect on anything animated, because a rect includes the transform.',
          ],
          [
            'No dark: variants',
            'They resolve from the operating system, so they fire on a light-themed page running on a dark-mode machine. The theme is a prop.',
          ],
          [
            'Translucent only with a blur behind it',
            'Glass with no backdrop-filter shows whatever the page is made of, sharply. A hole is opaque because you are reading against it.',
          ],
          [
            'Two surfaces never claim the same thing',
            'Hover and keyboard focus are the same question — this is the one you are on — and answering it twice leaves a component pointing at two rows.',
          ],
          [
            'Accessibility is structural',
            'Live regions mount before the content they announce. Icon-only controls have labels, and every label is a prop because it will be translated.',
          ],
        ]}
      />

      <H2 id="refuses">What it refuses</H2>

      <P>
        Every component&apos;s page ends with this heading. The refusals are the API as much as the
        props are, and they are written down so nobody has to guess whether something is missing or
        declined.
      </P>

      <Refuses
        items={[
          {
            title: 'No component imports another',
            why: (
              <>
                Duplicating a helper is cheaper than coupling. There are four copies of the same
                placement arithmetic in this library, and that is still cheaper than the edge that
                lets one component&apos;s bug become four components&apos; regression. It also keeps
                copy-paste and a shadcn-style registry possible later.
              </>
            ),
          },
          {
            title: 'No compound APIs',
            why: (
              <>
                No <code>Menu.Root</code> / <code>Menu.Item</code>. Items are data — an array a
                caller can build, filter and reorder — because that is what a list of commands
                actually is in an application.
              </>
            ),
          },
          {
            title: 'No headless mode',
            why: (
              <>
                A styled library with data-driven colours already covers the case headless exists
                for. Shipping both means every component has two surfaces to keep correct, and one
                of them is always behind.
              </>
            ),
          },
        ]}
      />

      <H2 id="shape">The shape of a component</H2>

      <P>
        All twenty are the same flat folder, and knowing the shape means knowing where to look in
        any of them.
      </P>

      <Code
        lang="bash"
        code={`src/toast/
  index.ts          the component's public surface
  Toaster.tsx       viewport: placement, stacking, gestures
  ToastCard.tsx     one card
  store.ts          state, and the imperative API
  tones.tsx         per-state look, and the defaults
  toast.css         what utilities cannot express
  toast.test.tsx    colocated
  README.md         how it works, then the API`}
      />

      <P>
        Each one is importable on its own — <code>@carabine/ui/toast</code> — so a project that
        wants one component pays for one component. There are {components.length} of those entry
        points, plus <code>@carabine/ui/cn</code> and the stylesheet.
      </P>
      <Around current="introduction" />
    </DocPage>
  );
}
