import type { Metadata } from 'next';
import { Code } from '@/components/site/Code';
import { Around, DocPage, H2, H3, P, Rule, Table } from '@/components/site/page';

export const metadata: Metadata = {
  title: 'Design principles',
  description:
    'The ten rules @carabine/ui is built on — what identifies a variant, why the theme is a prop, why no component imports another, and what the library refuses to do.',
};

const marks = [
  { id: 'ten', label: 'The ten' },
  { id: 'feel', label: '1 · Feel is the product', sub: true },
  { id: 'motion', label: '2 · One easing', sub: true },
  { id: 'identity', label: '3 · Identity is data', sub: true },
  { id: 'theme', label: '4 · The theme is a prop', sub: true },
  { id: 'defaults', label: '5 · Every default shippable', sub: true },
  { id: 'duplication', label: '6 · Duplication over coupling', sub: true },
  { id: 'items', label: '7 · Items are data', sub: true },
  { id: 'measure', label: '8 · Measure, do not assume', sub: true },
  { id: 'claim', label: '9 · One claim, one surface', sub: true },
  { id: 'a11y', label: '10 · Accessibility is structural', sub: true },
  { id: 'material', label: 'The material' },
  { id: 'refusals', label: 'What follows' },
];

export default function DesignPrinciples() {
  return (
    <DocPage
      eyebrow="Getting started"
      title="Design principles"
      description="Ten rules the whole library is built on. Every one of them came from getting it wrong first, and each has a comment sitting exactly where somebody would reintroduce it."
      marks={marks}
    >
      <H2 id="ten">The ten</H2>

      <P>
        These are not aspirations. They are the constraints a component has to satisfy before it
        ships, and a component that breaks one owes an explanation in its README — which is a real
        thing that has happened exactly once, and the explanation is in{' '}
        <code>src/command/README.md</code>.
      </P>

      <H3 id="feel">1 · Feel is the product</H3>

      <P>
        Headless libraries won the argument about <em>logic</em>. They did not win the argument
        about <em>feel</em>, and feel is what people notice: a menu growing out of the corner
        nearest the thing that opened it, a sheet that gives when you pull it the wrong way, a thumb
        that stays exactly under a finger instead of springing towards it.
      </P>

      <P>
        So every component arrives with its look, its movement and its accessibility already
        decided. There is no headless mode and there will not be one — shipping both means every
        component has two surfaces to keep correct, and one of them is always behind.
      </P>

      <H3 id="motion">2 · One easing, and it is an ease-out</H3>

      <Rule>
        <code>cubic-bezier(0.22, 1, 0.36, 1)</code>, everywhere. The first frames are the ones being
        watched, and anything that eases <em>in</em> spends them standing still.
      </Rule>

      <P>
        Nothing in the package uses <code>ease-in</code>. Everything is under 300ms. Exits are
        faster than entrances and are never the entrance reversed — a panel that leaves as slowly as
        it arrived holds the page hostage twice. Springs are reserved for what a pointer drives,
        because a spring keeps its velocity where a tween restarts from zero. Nothing appears from{' '}
        <code>scale(0)</code>: entrances start at 0.94–0.98, which is the difference between
        something arriving and something being switched on.
      </P>

      <Table
        head={['What it is', 'How long']}
        rows={[
          ['Press feedback', '100–160ms'],
          ['Tooltip, small tip', '125–200ms'],
          ['Menu, dropdown, popover', '150–250ms'],
          ['Dialog, drawer', '200–500ms'],
        ]}
      />

      <H3 id="identity">3 · Identity is data, structure is utilities</H3>

      <P>
        A consumer cannot override <code>bg-green-500</code> buried in a component. So anything that{' '}
        <em>distinguishes one state from another</em> is an object of plain CSS colour strings,
        merged over the defaults, with the key set left open — which means the same mechanism that
        restyles a built-in state invents a new one.
      </P>

      <Code
        code={`import { Toaster, defaultTones, toast } from '@carabine/ui/toast';

// Restyle a state, and invent one, with the same prop. The merge is per state,
// so a state you are changing spreads the default it is changing.
<Toaster
  tones={{
    success: { ...defaultTones.success, cells: ['#34d399', '#10b981', '#059669'] },
    deploy: {
      icon: <Rocket className="size-4" />,
      color: { dark: '#a78bfa', light: '#7c3aed' },
      cells: ['#c4b5fd', '#a78bfa', '#8b5cf6'],
      sticky: true,
    },
  }}
/>

// The new key is a real state the moment the tone exists.
toast('deploy', 'Shipping to production…');`}
      />

      <P>
        The same shape appears as <code>variants</code> on the button and as <code>palette</code> on
        the other eighteen. Structure — padding, radius, layout — stays in Tailwind utilities, where
        it belongs and where nobody needs to override it.
      </P>

      <H3 id="theme">4 · The theme is a prop, never the operating system</H3>

      <Rule>
        There is not one <code>dark:</code> variant in the library.
      </Rule>

      <P>
        <code>dark:</code> resolves from the OS, so it fires on a light-themed page running on a
        dark-mode machine — a component that is correct in isolation and wrong on the page that
        embeds it. Both palettes are written out as data and the caller says which one applies.
      </P>

      <Code code={`<Slider theme="light" defaultValue={40} />`} />

      <H3 id="defaults">5 · Every prop optional, every default shippable</H3>

      <P>
        <code>&lt;Toaster /&gt;</code> with no props at all is the version we would ship. Nothing is
        required, nothing throws for being absent, and no component needs a configuration pass
        before it looks finished.
      </P>

      <P>
        The other half of that rule: <strong>dimensions are props, not literals</strong>. If a
        consumer might reasonably want another value — a width, an offset, a gap, a queue cap — it
        is a prop with a default, not a constant in the file.
      </P>

      <H3 id="duplication">6 · Duplication over coupling</H3>

      <P>
        No component imports another. There is no shared internal package. The popover, the menu,
        the tooltip and the select each carry their <em>own copy</em> of the same placement
        arithmetic — four copies, on purpose.
      </P>

      <Rule>
        The fourth copy is still cheaper than the edge that would let one component&apos;s placement
        bug become four components&apos; regression.
      </Rule>

      <P>
        It also keeps a component a thing you can copy out: one flat folder, no imports leaving it,
        which is what makes copy-paste and a registry-style install possible later without rewriting
        anything.
      </P>

      <H3 id="items">7 · Items are data, not children</H3>

      <P>
        No <code>Menu.Root</code> / <code>Menu.Item</code> / <code>Menu.Separator</code>. A list of
        commands in a real application is an array that gets built, filtered, reordered and
        permission-checked — so it is passed as an array.
      </P>

      <Code
        code={`const commands = [
  { id: 'rename', label: 'Rename', shortcut: 'F2' },
  { id: 'duplicate', label: 'Duplicate' },
  { id: 'delete', label: 'Delete', danger: true },
].filter((item) => can(item.id));

<Menu items={commands} onSelect={run}>
  <button>Actions</button>
</Menu>`}
      />

      <P>
        Compound children look flexible and then charge for it: every consumer writes the same six
        elements, and the component still has to validate that they are in the right order.
      </P>

      <H3 id="measure">8 · Measure, do not assume</H3>

      <P>
        Card heights, popover sizes, indicator positions, track widths — read the DOM.{' '}
        <code>offsetWidth</code>, never an index multiplied by a width, and never a bounding rect on
        anything animated, because a rect includes the transform that is currently mid-flight.
        Anything JavaScript measures and CSS paints comes from one place.
      </P>

      <P>
        And measure defensively: <code>ResizeObserver</code>, <code>matchMedia</code> and friends
        are absent in a test renderer and in old browsers. They are guarded inside the component
        rather than polyfilled in a test setup, because a consumer&apos;s environment may lack them
        too.
      </P>

      <H3 id="claim">9 · One claim, one surface</H3>

      <Rule>
        Hover and keyboard focus are the same question — <em>this is the one you are on</em> — and
        answering it twice leaves a component pointing at two rows.
      </Rule>

      <P>
        One active row, one bar, one highlight. A list with a hover fill <em>and</em> a focus ring{' '}
        <em>and</em> a selected background is three components arguing about where you are.
      </P>

      <H3 id="a11y">10 · Accessibility is structural</H3>

      <P>
        Not a pass at the end. Live regions mount before the content they announce — a viewport
        mounted at the moment a toast fires announces nothing. Icon-only controls have labels, and
        every label is a prop because it will be translated. <code>prefers-reduced-motion</code>{' '}
        removes movement everywhere, not only where it was convenient.
      </P>

      <P>
        Reduced motion is <em>gentler, not absent</em>: position and scale go, opacity and colour
        stay, because they carry meaning. A control that stops answering the pointer reads as
        broken.
      </P>

      <H2 id="material">The material</H2>

      <P>
        Glass is the house material for everything that floats over the page, and it comes with two
        rules that are not negotiable.
      </P>

      <P>
        <strong>Translucent only with a blur behind it.</strong> A translucent surface without a{' '}
        <code>backdrop-filter</code> shows whatever the page is made of, sharply — a gradient,
        another component, a dotted background. The line to hold is tint versus object:
      </P>

      <Table
        head={['', 'Rule', 'Where']}
        rows={[
          [
            'Tint',
            'May be translucent — it has no hairline and no shadow, and letting the surface through is the point',
            'The hover list’s bar, the menu’s highlight',
          ],
          [
            'Object',
            'May not — it carries a hairline or a shadow, so it claims to rest on top of something',
            'Popovers, cards, panels',
          ],
          [
            'Field',
            'Neither. A field is a hole, and a hole is opaque because you read against it',
            'Text field, OTP, select trigger',
          ],
        ]}
      />

      <P>
        <strong>One density for anything text is read against.</strong> Glass comes in two weights
        and they are not interchangeable: a <em>shell</em> is only ever seen as a ring around a
        core, so it can be light; a <em>core</em> is what content sits on, so it is heavier.
        Whichever layer the text lands on carries the core&apos;s weight — a single-layer panel is a
        core, not a shell.
      </P>

      <P>
        There is one exception in the library and it is the toast&apos;s. A card is the only glass
        here that floats over <em>another copy of itself</em>, so its core is opaque: what would
        show through is the card behind it, offset and scaled down, which reads as a rendering fault
        rather than as material. The blur cannot rescue it either — a transform on an ancestor
        establishes a backdrop root, and <code>backdrop-filter</code> inside one has nothing left to
        sample.
      </P>

      <H2 id="refusals">What follows</H2>

      <P>
        Principles are only worth writing down if something is refused because of them. These are
        the standing refusals, and they are the API as much as the props are.
      </P>

      <Table
        head={['Refused', 'Which principle']}
        rows={[
          ['A headless build', 'Feel is the product'],
          ['dark: variants', 'The theme is a prop'],
          ['A shared internal package', 'Duplication over coupling'],
          ['Compound component APIs', 'Items are data'],
          ['transition-all, and any property that is not one', 'One easing'],
          ['setState per frame or per pointermove', 'One easing'],
          ['A required prop on any component', 'Every default shippable'],
          ['Unbounded queues, retries or caller-grown lists', 'Measure, do not assume'],
        ]}
      />

      <Around current="design-principles" />
    </DocPage>
  );
}
