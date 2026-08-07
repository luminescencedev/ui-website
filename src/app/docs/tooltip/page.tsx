import type { Metadata } from 'next';
import { Code } from '@/components/site/Code';
import { Example } from '@/components/site/Example';
import { Around, DocPage, H2, H3, P, Related, Rule, Table, Hatch } from '@/components/site/page';
import { TooltipBasic, TooltipDelay } from '@/components/site/demos/overlays';

export const metadata: Metadata = {
  title: 'Tooltip',
  description:
    'A label that appears next to what it names. The first one waits; the rest do not, for as long as the group stays warm.',
};

const marks = [
  { id: 'usage', label: 'Usage' },
  { id: 'mechanism', label: 'The group' },
  { id: 'examples', label: 'Examples' },
  { id: 'delay', label: 'Delay', sub: true },
  { id: 'customization', label: 'Customization' },
  { id: 'styling', label: 'Styling reference' },
  { id: 'api', label: 'API reference' },
  { id: 'related', label: 'Related components' },
];

export default function TooltipPage() {
  return (
    <DocPage
      eyebrow="Overlay"
      title="Tooltip"
      description="A label that appears next to what it names. It is the densest glass in the library, because it is small, it lands on whatever happens to be under it, and there is no room for a wash to settle."
      marks={marks}
    >
      <H2 id="usage">Usage</H2>

      <Code lang="tsx" code={`import { Tooltip } from '@carabine/ui/tooltip';`} />

      <Example
        code={`<Tooltip content="Copy link">
  <Button variant="ghost" aria-label="Copy link" icon={<Copy />} />
</Tooltip>`}
      >
        <TooltipBasic />
      </Example>

      <Rule>
        The tip is not the name. An icon-only control keeps its own <code>aria-label</code> — a
        screen reader never sees the tooltip, and a button whose only name is a hover state is a
        button with no name.
      </Rule>

      <H2 id="mechanism">The group</H2>

      <P>
        The first tooltip waits <code>delay</code> milliseconds of the pointer resting. Once one has
        opened, the group stays <strong>warm</strong> for <code>skip</code> milliseconds, and every
        tip in it opens immediately — which is what makes a row of icon buttons feel like a toolbar
        rather than like four separate waits.
      </P>

      <P>
        Focus never waits. A keyboard user has already committed by arriving, and a delay there is
        just latency.
      </P>

      <H2 id="examples">Examples</H2>

      <H3 id="delay">Delay</H3>

      <Example
        code={`<Tooltip content="Waits 600ms" delay={600}>…</Tooltip>
<Tooltip content="Answers at once" delay={0}>…</Tooltip>`}
      >
        <TooltipDelay />
      </Example>

      <H2 id="customization">Customization</H2>

      <Code
        lang="tsx"
        code={`<Tooltip
  content="Copy link"
  placement="right"
  align="start"
  gap={6}         // between the trigger and the tip
  offset={8}      // smallest distance kept from the window's edges
  maxWidth={240}  // past this the label wraps
  delay={0}
  skip={300}      // how long the group stays warm after the last one closes
  zIndex={70}     // above the dialog's 60: a tip inside a dialog still shows
  theme="light"
/>`}
      />

      <H2 id="styling">Styling reference</H2>

      <P>
        Denser than everything else — <code>/95</code> with a <code>blur-sm</code>. A popover is a
        panel you read against and it can afford a wash; a tooltip is twenty pixels tall and lands
        on whatever happens to be underneath, so there is nowhere for a wash to settle.
      </P>

      <P>
        125–200ms in, faster out, and it grows from the edge nearest its trigger like everything
        else anchored. <code>prefers-reduced-motion</code> keeps a short opacity tween rather than
        nothing — a tip that blinks into existence reads as a rendering fault.
      </P>

      <H2 id="api">API reference</H2>

      <Hatch panel />

      <Table
        head={['Prop', 'Type', 'Default', '']}
        rows={[
          ['children', 'ReactNode', '—', 'The thing being described'],
          ['content', 'ReactNode', '—', 'The label. Nothing opens with nothing to say'],
          ['open', 'boolean', '—', 'Controlled'],
          ['defaultOpen', 'boolean', 'false', ''],
          ['onOpenChange', '(open: boolean) => void', '—', ''],
          ['placement', 'Side', "'top'", 'Flips only if the opposite side is better'],
          ['align', 'Align', "'center'", ''],
          ['gap', 'number', '6', 'Between the trigger and the tip'],
          ['offset', 'number', '8', 'Smallest distance kept from the viewport’s edges'],
          ['maxWidth', 'number', '240', 'Past this the label wraps'],
          ['delay', 'number', '600', 'Milliseconds a pointer has to rest. Focus never waits'],
          ['skip', 'number', '300', 'How long the group stays warm after the last one closes'],
          ['zIndex', 'number', '70', 'Above the dialog’s 60'],
          ['container', 'HTMLElement | null', 'document.body', 'Where it portals to'],
          ['disabled', 'boolean', 'false', ''],
          ['theme', "'dark' | 'light'", "'dark'", ''],
        ]}
      />

      <H2 id="related">Related components</H2>

      <Related current="tooltip" />

      <Around current="tooltip" />
    </DocPage>
  );
}
