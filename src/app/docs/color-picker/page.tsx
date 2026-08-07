import type { Metadata } from 'next';
import { Code } from '@/components/site/Code';
import { Example } from '@/components/site/Example';
import { Around, DocPage, H2, H3, P, Related, Rule, Table, Hatch } from '@/components/site/page';
import { PickerBasic, PickerOwn } from '@/components/site/demos/inputs';

export const metadata: Metadata = {
  title: 'Color picker',
  description:
    'A flower of overlapping discs that blooms out of the swatch you clicked. Three rings for hue and saturation, an arc for lightness, six uppercase hex digits out.',
};

const marks = [
  { id: 'usage', label: 'Usage' },
  { id: 'mechanism', label: 'How it blooms' },
  { id: 'examples', label: 'Examples' },
  { id: 'own', label: 'Your own flower', sub: true },
  { id: 'customization', label: 'Customization' },
  { id: 'styling', label: 'Styling reference' },
  { id: 'api', label: 'API reference' },
  { id: 'related', label: 'Related components' },
];

export default function ColorPickerPage() {
  return (
    <DocPage
      eyebrow="Input"
      title="Color picker"
      description="A flower of overlapping discs that blooms out of the swatch you clicked. Three rings choose hue and saturation, a band takes the current colour, and an arc hangs off the right edge for lightness."
      marks={marks}
    >
      <H2 id="usage">Usage</H2>

      <Code lang="tsx" code={`import { ColorPicker } from '@carabine/ui/color-picker';`} />

      <Example
        code={`const [color, setColor] = useState('#FC8835');

<ColorPicker value={color} onValueChange={setColor} />`}
      >
        <PickerBasic />
      </Example>

      <Rule>
        Any hex in, six uppercase digits out. One shape of value means nobody downstream has to
        normalise it before comparing two colours.
      </Rule>

      <H2 id="mechanism">How it blooms</H2>

      <P>
        The petals overlap on purpose — a ring of tangent circles reads as a dial, a ring of
        overlapping ones reads as a flower — and each arrives on its own spring with{' '}
        <code>stagger</code> milliseconds added per petal, so the bloom has a direction rather than
        appearing all at once.
      </P>

      <P>
        The spring is 520 stiffness at 31 damping with a mass of 0.62. Critical damping is{' '}
        <code>2 × √stiffness</code>, so about 46 — this is light and well past critical, and the
        overshoot is what makes a petal <em>arrive</em> rather than slide in.
      </P>

      <P>
        One thing here is CSS rather than React: the hovered petal&apos;s <code>z-index</code>. A
        petal that grows under its neighbours looks broken, and re-ordering the DOM on hover would
        move focus. <code>color-picker.css</code> owns it, because that is the one property React
        must not.
      </P>

      <H2 id="examples">Examples</H2>

      <H3 id="own">Your own flower</H3>

      <P>
        <code>rings</code> <strong>replaces</strong> rather than merges: a colour set is a whole,
        not a table of variants to patch. A ring with a single colour sits in the middle whatever
        its radius says, and a swatch with no <code>label</code> is named by its colour string — the
        one label that never needs translating.
      </P>

      <Example
        code={`<ColorPicker
  size={132}
  rings={[
    { radius: 0, colors: ['#FFFFFF'], label: () => 'White' },
    { radius: 0.18, colors: ['#F4F4F5', '#D4D4D8', '#A1A1AA', '#71717A'] },
    { radius: 0.34, colors: brand, rotate: 15 },
  ]}
/>`}
      >
        <PickerOwn />
      </Example>

      <H2 id="customization">Customization</H2>

      <P>
        One number drives the geometry. <code>size</code> is the disc&apos;s diameter and the petal,
        the band, the arc and the knob are all fractions of it — so the whole flower scales by
        changing one prop rather than six.
      </P>

      <Code
        lang="tsx"
        code={`<ColorPicker
  size={140}
  petal={32}            // they overlap on purpose
  band={13}             // the ring that takes the current colour
  plate={false}         // no blurred plate under the petals
  arcSpread={70}        // degrees of lightness arc, centred on the right edge
  minLightness={10}     // the slice of HSL lightness the arc maps to
  maxLightness={90}
  triggerSize={22}
  theme="light"
/>`}
      />

      <H2 id="styling">Styling reference</H2>

      <P>
        The picker is the toast&apos;s material at another size — a glass shell with a lit core —
        and <code>plate</code> is what puts it under the petals. Turn it off and the flower floats
        on the page, which is right when it is already inside a panel of your own.
      </P>

      <Table
        head={['Prop', 'What it moves']}
        rows={[
          ['stiffness / damping / mass', 'The bloom, and a petal answering a hover'],
          ['stagger', 'Milliseconds added per petal on the way in'],
          ['openStiffness / openDamping', 'The panel opening and closing'],
          ['openScale', 'The scale the panel grows from — 0.42, and it grows from the trigger'],
        ]}
      />

      <H2 id="api">API reference</H2>

      <Hatch panel />

      <Table
        head={['Prop', 'Type', 'Default', '']}
        rows={[
          ['value', 'string', '—', 'Controlled. Any hex in, six uppercase digits out'],
          ['defaultValue', 'string', "'#FC8835'", ''],
          ['onValueChange', '(value: string) => void', '—', ''],
          ['onOpenChange', '(open: boolean) => void', '—', ''],
          ['rings', 'ColorRing[]', 'defaultRings', 'Replaces the palette outright'],
          ['size', 'number', '107', 'Diameter of the disc. Everything else follows it'],
          ['petal', 'number', 'size × 0.224', ''],
          ['band', 'number', 'size × 0.0896', 'The ring that takes the current colour'],
          ['plate', 'boolean', 'true', 'A blurred plate under the petals'],
          ['arcRadius', 'number', 'size × 0.7531', 'From the disc’s centre'],
          ['arcSpread', 'number', '50', 'Degrees, centred on the right edge'],
          ['arcWidth', 'number', 'size × 0.0933', ''],
          ['knob', 'number', 'size × 0.1306', ''],
          ['minLightness', 'number', '0', 'The slice of HSL lightness the arc maps to'],
          ['maxLightness', 'number', '100', ''],
          ['triggerSize', 'number', '18', ''],
          ['offset', 'number', '12', 'Smallest gap kept from the viewport’s edges'],
          ['zIndex', 'number', '50', ''],
          ['container', 'HTMLElement | null', 'document.body', 'Where it portals to'],
          ['disabled', 'boolean', 'false', ''],
          ['label', 'string', "'Color'", 'Names the trigger and the panel'],
          ['theme', "'dark' | 'light'", "'dark'", ''],
        ]}
      />

      <H2 id="related">Related components</H2>

      <Related current="color-picker" />

      <Around current="color-picker" />
    </DocPage>
  );
}
