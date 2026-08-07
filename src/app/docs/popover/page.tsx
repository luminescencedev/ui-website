import type { Metadata } from 'next';
import { Code } from '@/components/site/Code';
import { Example } from '@/components/site/Example';
import { Around, DocPage, H2, H3, P, Related, Rule, Table, Hatch } from '@/components/site/page';
import { PopoverBasic, PopoverSides } from '@/components/site/demos/overlays';

export const metadata: Metadata = {
  title: 'Popover',
  description:
    'A panel anchored to a trigger. It flips when the side it was asked for has no room, slides back into view along the other axis, and grows out of the edge it ends up on.',
};

const marks = [
  { id: 'usage', label: 'Usage' },
  { id: 'mechanism', label: 'Placement' },
  { id: 'examples', label: 'Examples' },
  { id: 'sides', label: 'Every side', sub: true },
  { id: 'customization', label: 'Customization' },
  { id: 'place', label: 'place() and shape()' },
  { id: 'styling', label: 'Styling reference' },
  { id: 'api', label: 'API reference' },
  { id: 'related', label: 'Related components' },
];

export default function PopoverPage() {
  return (
    <DocPage
      eyebrow="Overlay"
      title="Popover"
      description="A panel anchored to a trigger. This is the overlay mechanism the rest of the library copies — the menu, the tooltip and the select each carry their own copy of it, on purpose."
      marks={marks}
    >
      <H2 id="usage">Usage</H2>

      <Code lang="tsx" code={`import { Popover } from '@carabine/ui/popover';`} />

      <Example
        code={`<Popover width={240} content={<Settings />}>
  <Button variant="secondary">Options</Button>
</Popover>`}
      >
        <PopoverBasic />
      </Example>

      <Rule>
        It grows out of the edge it lands on. <code>transform-origin</code> at the trigger&apos;s
        corner is the difference between a panel that came from the button and one that was switched
        on nearby.
      </Rule>

      <H2 id="mechanism">Placement</H2>

      <P>
        Three steps, in order. It tries the side it was asked for; it <strong>flips</strong> to the
        opposite side only when that side genuinely has more room, rather than the moment the first
        one is tight; and then it <strong>slides</strong> along the other axis to stay inside the
        window, keeping at least <code>offset</code> from every edge.
      </P>

      <P>
        The spike is cut <em>into</em> the panel&apos;s outline rather than drawn as a rotated
        square behind it — one SVG path for the whole shape, notch included. A rotated square needs
        its own border, its own shadow and its own background to match the panel&apos;s, and on
        glass it never does.
      </P>

      <H2 id="examples">Examples</H2>

      <H3 id="sides">Every side</H3>

      <Example
        code={`{(['top', 'right', 'bottom', 'left'] as const).map((side) => (
  <Popover key={side} placement={side} content={<p>Grown from the {side} edge.</p>}>
    <Button variant="secondary">{side}</Button>
  </Popover>
))}`}
      >
        <PopoverSides />
      </Example>

      <H2 id="customization">Customization</H2>

      <Code
        lang="tsx"
        code={`<Popover
  placement="right"
  align="start"
  gap={8}          // between the trigger and the panel
  offset={12}      // smallest distance kept from the window's edges
  width={280}      // left off, the panel is as wide as its content
  padding={16}
  radius={16}
  arrow={false}    // no spike
  arrowSize={14}   // base width; it protrudes by half of this
  theme="light"
/>`}
      />

      <H2 id="place">place() and shape()</H2>

      <P>
        Both are exported, because the arithmetic is useful on its own — an anchored menu of your
        own, a custom overlay, anything that has a box and needs somewhere to put another one.
      </P>

      <Code
        lang="ts"
        code={`import { place, origin, shape } from '@carabine/ui/popover';

place({
  anchor: { left, top, width, height },
  panel: { width, height },
  viewport: { width, height },
  side: 'bottom',
  align: 'center',
  gap: 8,
  offset: 12,
}); // → { left, top, side }

origin('bottom', 'center'); // → the matching transform-origin
shape({ width: 200, height: 120, radius: 16, side: 'top', arrowSize: 14, arrowAt: 100 });`}
      />

      <P>
        There are four copies of this arithmetic in the library and that is deliberate. The fourth
        copy is cheaper than the edge that would let one component&apos;s placement bug become four
        components&apos; regression.
      </P>

      <H2 id="styling">Styling reference</H2>

      <P>
        A single-layer panel is a <strong>core</strong>, not a shell. It was built as a shell first,
        and the result was that you could see the page through a popover twice as much as through a
        toast — 60% against an effective 94%, on two surfaces meant to be the same material.
        Whichever layer the text lands on carries the core&apos;s weight.
      </P>

      <H2 id="api">API reference</H2>

      <Hatch panel />

      <Table
        head={['Prop', 'Type', 'Default', '']}
        rows={[
          ['children', 'ReactNode', '—', 'The trigger'],
          ['content', 'ReactNode', '—', 'What the panel holds'],
          ['open', 'boolean', '—', 'Controlled'],
          ['defaultOpen', 'boolean', 'false', ''],
          ['onOpenChange', '(open: boolean) => void', '—', ''],
          ['placement', 'Side', "'bottom'", 'Preferred side; flips only if the other is better'],
          ['align', 'Align', "'center'", 'Where it sits along that side'],
          ['gap', 'number', '8', 'Between the trigger and the panel'],
          ['offset', 'number', '12', 'Smallest distance kept from the viewport’s edges'],
          ['width', 'number', '—', 'Left off, the panel is as wide as its content'],
          ['padding', 'number', '12', 'Inside. The spike’s depth is added on its edge'],
          ['radius', 'number', '16', 'Corner radius, and how close the spike can get to one'],
          ['arrow', 'boolean', 'true', 'The spike pointing at the trigger'],
          ['arrowSize', 'number', '14', 'Base width. It protrudes by half of this'],
          ['zIndex', 'number', '50', ''],
          ['container', 'HTMLElement | null', 'document.body', 'Where it portals to'],
          ['stiffness', 'number', '420', ''],
          ['damping', 'number', '34', ''],
          ['openScale', 'number', '0.94', 'Scale the panel grows from'],
          ['label', 'string', "'Popover'", 'Accessible name of the panel'],
          ['theme', "'dark' | 'light'", "'dark'", ''],
        ]}
      />

      <H2 id="related">Related components</H2>

      <Related current="popover" />

      <Around current="popover" />
    </DocPage>
  );
}
