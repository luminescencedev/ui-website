import type { Metadata } from 'next';
import { Code } from '@/components/site/Code';
import { Example } from '@/components/site/Example';
import { Around, DocPage, H2, H3, P, Related, Rule, Table, Hatch } from '@/components/site/page';
import { SegmentBasic, SegmentFull, SegmentIcons } from '@/components/site/demos/surfaces';

export const metadata: Metadata = {
  title: 'Segmented control',
  description:
    'One choice out of a few, in a recessed track with a thumb resting in it. The labels are clipped to the thumb, not timed against it.',
};

const marks = [
  { id: 'usage', label: 'Usage' },
  { id: 'clip', label: 'Clipped, not timed' },
  { id: 'examples', label: 'Examples' },
  { id: 'icons', label: 'Icons', sub: true },
  { id: 'full', label: 'Full width', sub: true },
  { id: 'customization', label: 'Customization' },
  { id: 'styling', label: 'Styling reference' },
  { id: 'api', label: 'API reference' },
  { id: 'keyboard', label: 'Keyboard', sub: true },
  { id: 'related', label: 'Related components' },
];

export default function SegmentedPage() {
  return (
    <DocPage
      eyebrow="Navigation"
      title="Segmented control"
      description="One choice out of a few, in a recessed track with a thumb resting in it. Two or five options, all visible at once — past that it is a select."
      marks={marks}
    >
      <H2 id="usage">Usage</H2>

      <Code
        lang="tsx"
        code={`import { SegmentedControl } from '@carabine/ui/segmented-control';`}
      />

      <Example
        code={`<SegmentedControl
  items={[
    { id: 'day', label: 'Day' },
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
  ]}
  value={range}
  onValueChange={setRange}
  label="Range"
/>`}
      >
        <SegmentBasic />
      </Example>

      <Rule>
        The track is a hole and the thumb is an object resting in it. That is the whole idea: opaque
        recess, inset shadows rather than a border, and a thumb that carries a hairline because it
        is on top of something.
      </Rule>

      <H2 id="clip">Clipped, not timed</H2>

      <P>
        Each label is drawn twice — once in the resting colour, once in the selected one — and the
        selected copy is <strong>clipped to the thumb</strong>. So a word the thumb is halfway
        across is half of each colour, exactly, at every frame.
      </P>

      <P>
        The obvious alternative is to fade the label at the moment the thumb passes it, and it is
        wrong in a way you feel before you can name: the crossfade has a duration of its own, so it
        lags the thumb going one way and leads it coming back. Clipping has no timing to get wrong,
        because there is nothing to time — there is only where the thumb is.
      </P>

      <H2 id="examples">Examples</H2>

      <H3 id="icons">Icons</H3>

      <Example
        code={`<SegmentedControl
  items={[
    { id: 'grid', label: 'Grid', icon: <LayoutGrid /> },
    { id: 'list', label: 'List', icon: <List /> },
    { id: 'calendar', label: 'Calendar', icon: <Calendar /> },
  ]}
  defaultValue="list"
  label="View"
/>`}
      >
        <SegmentIcons />
      </Example>

      <H3 id="full">Full width</H3>

      <Example
        code={`<SegmentedControl
  items={[
    { id: 'monthly', label: 'Monthly' },
    { id: 'yearly', label: 'Yearly' },
  ]}
  defaultValue="yearly"
  full
  size={40}
  label="Billing"
/>`}
      >
        <SegmentFull />
      </Example>

      <H2 id="customization">Customization</H2>

      <Code
        lang="tsx"
        code={`<SegmentedControl
  items={items}
  size={40}        // track height; everything follows it
  radius={12}      // the thumb takes this minus the padding
  padding={4}      // between the track's edge and the thumb
  full
  stiffness={460}  // the thumb's spring
  damping={40}
  theme="light"
/>`}
      />

      <H2 id="styling">Styling reference</H2>

      <P>
        The recess is opaque — <code>#0e0e11</code> dark, <code>#f3f3f4</code> light — and it is the
        same material as the switch&apos;s track and the text field&apos;s well. Three components
        that are holes, painted the same, so a form does not read as three different depths.
      </P>

      <H2 id="api">API reference</H2>

      <Hatch />

      <Table
        head={['Prop', 'Type', 'Default', '']}
        rows={[
          ['items', 'SegmentItem[]', '[]', ''],
          ['value', 'string', '—', 'Controlled'],
          ['defaultValue', 'string', 'first enabled', ''],
          ['onValueChange', '(value: string) => void', '—', ''],
          ['size', 'number', '34', 'Track height; everything follows it'],
          ['radius', 'number', 'size × 0.3', 'The thumb takes this minus the padding'],
          ['padding', 'number', '3', 'Between the track’s edge and the thumb'],
          ['full', 'boolean', 'false', 'Spreads the options across the width'],
          ['stiffness', 'number', '460', 'The thumb’s spring'],
          ['damping', 'number', '40', ''],
          ['disabled', 'boolean', 'false', ''],
          ['label', 'string', "'Options'", 'Accessible name of the group'],
          ['theme', "'dark' | 'light'", "'dark'", ''],
        ]}
      />

      <P>
        <code>SegmentItem</code> carries <code>id</code>, <code>label</code>, <code>icon</code> and{' '}
        <code>disabled</code>.
      </P>

      <H3 id="keyboard">Keyboard</H3>

      <Table
        head={['Key', '']}
        rows={[
          ['Tab', 'One stop for the whole control — it is one control'],
          ['← →', 'Walks the options, wrapping, skipping disabled ones'],
          ['Home / End', 'First and last'],
        ]}
      />

      <H2 id="related">Related components</H2>

      <Related current="segmented-control" />

      <Around current="segmented-control" />
    </DocPage>
  );
}
