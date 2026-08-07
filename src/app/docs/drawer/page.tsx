import type { Metadata } from 'next';
import { Code } from '@/components/site/Code';
import { Example } from '@/components/site/Example';
import { Around, DocPage, H2, H3, P, Related, Rule, Table, Hatch } from '@/components/site/page';
import { DrawerBasic, DrawerSides } from '@/components/site/demos/overlays';

export const metadata: Metadata = {
  title: 'Drawer',
  description:
    'A sheet hung from an edge, and a gesture that throws it back. One motion value for all four sides, and a capture that waits for real movement.',
};

const marks = [
  { id: 'usage', label: 'Usage' },
  { id: 'mechanism', label: 'One value, four sides' },
  { id: 'examples', label: 'Examples' },
  { id: 'sides', label: 'Every edge', sub: true },
  { id: 'customization', label: 'Customization' },
  { id: 'styling', label: 'Styling reference' },
  { id: 'api', label: 'API reference' },
  { id: 'related', label: 'Related components' },
];

export default function DrawerPage() {
  return (
    <DocPage
      eyebrow="Overlay"
      title="Drawer"
      description="A sheet hung from an edge, and a gesture that throws it back. It hangs from any of the four, and the edge it hangs from has no border — an edge that is off the screen does not need drawing."
      marks={marks}
    >
      <H2 id="usage">Usage</H2>

      <Code lang="tsx" code={`import { Drawer } from '@carabine/ui/drawer';`} />

      <Example
        tall
        code={`<Drawer
  title="Filters"
  description="Narrow the list"
  content={<Filters />}
  footer={<Button variant="primary" full>Show 42 results</Button>}
>
  <Button variant="secondary">Filters</Button>
</Drawer>`}
      >
        <DrawerBasic />
      </Example>

      <Rule>
        Only the pill starts a drag. <code>gripOnly</code> is on by default, because a sheet whose
        whole body is draggable is a sheet you cannot scroll.
      </Rule>

      <H2 id="mechanism">One value, four sides</H2>

      <P>
        There is one motion value and it is <em>always positive</em>: how far the sheet is from
        home. A <code>sign</code> per side maps it onto the axis, so the gesture, the rubber-banding
        past home and the throw are written once rather than four times with the inequalities
        flipped.
      </P>

      <P>
        The capture waits for <strong>4px of travel</strong> before it takes the pointer. That is
        why the close button works: a captured pointer sends its <code>click</code> to the{' '}
        <em>capturing element</em>, not to whatever was under the finger — so capturing on{' '}
        <code>pointerdown</code> meant every button inside the sheet was pressing the sheet.
      </P>

      <P>And the sheet is mounted during the render that opens it, not in an effect afterwards:</P>

      <Code
        lang="tsx"
        code={`if (shown && !mounted) setMounted(true);   // during render, on purpose`}
      />

      <P>
        In an effect, the first commit has no panel in it — so there is nothing to measure and
        nothing for the entrance to animate <em>from</em>, and the sheet appears fully open. The
        blur arrives from that entrance&apos;s own <code>onComplete</code>, for the same reason a
        transformed ancestor kills a <code>backdrop-filter</code>: while it is moving, there is
        nothing to sample.
      </P>

      <H2 id="examples">Examples</H2>

      <H3 id="sides">Every edge</H3>

      <P>
        <code>side</code> decides where it hangs from. <code>size</code> is a height on top and
        bottom and a width on the sides; leave it off and the sheet is as tall as its content.
      </P>

      <Example
        tall
        code={`<Drawer side="right" size={320} title="From the right" content={<p>…</p>}>
  <Button variant="secondary">right</Button>
</Drawer>`}
      >
        <DrawerSides />
      </Example>

      <H2 id="customization">Customization</H2>

      <Code
        lang="tsx"
        code={`<Drawer
  side="bottom"
  size="70vh"        // a number is pixels; a string is any CSS length
  radius={24}        // the inner corners. The outer ones are square
  grip={false}       // no pill
  gripOnly={false}   // the body drags too, for a sheet with nothing to scroll
  showClose
  dismissible={false}
  theme="light"
/>`}
      />

      <H2 id="styling">Styling reference</H2>

      <P>
        Tailwind utilities plus <code>drawer.css</code> for the body&apos;s scrollbar. The material
        is the toast&apos;s, and the geometry is per-side: the corners on the screen edge are
        square, the ones facing the page are rounded, and the hairline runs on the three edges you
        can actually see. A border along an edge that is off the screen is a border drawn for
        nobody.
      </P>

      <H2 id="api">API reference</H2>

      <Hatch panel />

      <Table
        head={['Prop', 'Type', 'Default', '']}
        rows={[
          ['children', 'ReactNode', '—', 'The trigger'],
          ['open', 'boolean', '—', 'Controlled'],
          ['defaultOpen', 'boolean', 'false', ''],
          ['onOpenChange', '(open: boolean) => void', '—', ''],
          ['side', "'bottom' | 'top' | 'left' | 'right'", "'bottom'", ''],
          ['title', 'ReactNode', '—', 'Names the sheet'],
          ['description', 'ReactNode', '—', 'Describes it'],
          ['content', 'ReactNode', '—', 'Scrolls, if there is more than fits'],
          ['footer', 'ReactNode', '—', 'A row at the far end'],
          ['size', 'number | string', 'content', 'Height, or width on the sides'],
          ['radius', 'number', '20', 'The inner corners. The outer ones are square'],
          ['dismissible', 'boolean', 'true', 'Escape, the scrim, and the gesture'],
          ['grip', 'boolean', 'true', 'The pill you pull'],
          ['gripOnly', 'boolean', 'true', 'Only the pill starts a drag'],
          ['showClose', 'boolean', 'false', ''],
          ['closeLabel', 'string', "'Close'", ''],
          ['disabled', 'boolean', 'false', ''],
          ['theme', "'dark' | 'light'", "'dark'", ''],
          ['container', 'Element | null', 'document.body', ''],
        ]}
      />

      <H2 id="related">Related components</H2>

      <Related current="drawer" />

      <Around current="drawer" />
    </DocPage>
  );
}
