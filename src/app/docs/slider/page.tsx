import type { Metadata } from 'next';
import { Code } from '@/components/site/Code';
import { Example } from '@/components/site/Example';
import { Around, DocPage, H2, H3, P, Related, Rule, Table, Hatch } from '@/components/site/page';
import { SliderBasic, SliderShape, SliderSteps } from '@/components/site/demos/inputs';

export const metadata: Metadata = {
  title: 'Slider',
  description:
    'One number, chosen by dragging. A spring for a jump and nothing at all for a finger — a thumb that eases towards a pointer is a thumb that is behind it.',
};

const marks = [
  { id: 'usage', label: 'Usage' },
  { id: 'mechanism', label: 'How it moves' },
  { id: 'examples', label: 'Examples' },
  { id: 'steps', label: 'Steps and marks', sub: true },
  { id: 'shape', label: 'Shape', sub: true },
  { id: 'customization', label: 'Customization' },
  { id: 'styling', label: 'Styling reference' },
  { id: 'api', label: 'API reference' },
  { id: 'keyboard', label: 'Keyboard', sub: true },
  { id: 'related', label: 'Related components' },
];

export default function SliderPage() {
  return (
    <DocPage
      eyebrow="Input"
      title="Slider"
      description="One number, chosen by dragging. The track is measured rather than assumed, and the thumb springs to a jump but never to a finger."
      marks={marks}
    >
      <H2 id="usage">Usage</H2>

      <Code lang="tsx" code={`import { Slider } from '@carabine/ui/slider';`} />

      <Example
        code={`<Slider
  label="Volume"
  value={at}
  onValueChange={setAt}
  showValue
  format={(value) => \`\${value}%\`}
/>`}
      >
        <SliderBasic />
      </Example>

      <Rule>
        A spring for a jump, and nothing for a finger. A thumb that eases towards the pointer is a
        thumb that is behind it, and the lag is the only thing you feel.
      </Rule>

      <H2 id="mechanism">How it moves</H2>

      <P>
        Clicking the track is a jump, so it springs. Dragging is not, so the thumb is written
        straight to the pointer — one line, guarded, at the top of the move handler:
      </P>

      <Code
        lang="tsx"
        code={`if (dragging.current) return;   // a finger is not something to animate towards`}
      />

      <P>
        The track is <strong>measured</strong> — <code>offsetWidth</code>, watched by a guarded{' '}
        <code>ResizeObserver</code> — not assumed from a prop. And <code>max</code> is always
        reachable even when it does not sit on the step grid, because a slider whose maximum cannot
        be selected is a slider with a lie in its label:
      </P>

      <Code lang="tsx" code={`return Math.abs(held - max) < Math.abs(held - grid) ? max : grid;`} />

      <H2 id="examples">Examples</H2>

      <H3 id="steps">Steps and marks</H3>

      <P>
        <code>step</code> quantises, <code>0</code> is continuous, and <code>marks</code> draws the
        grid — <code>true</code> for every step, or an array for the ones that matter. The tick list
        is capped at 60, because a mark every pixel is a texture, not a scale.
      </P>

      <Example
        code={`<Slider
  label="Temperature"
  min={16}
  max={30}
  step={0.5}
  defaultValue={21}
  marks
  showValue
  format={(value) => \`\${value.toFixed(1)}°C\`}
/>`}
      >
        <SliderSteps />
      </Example>

      <Rule>
        <code>format</code> writes both what is drawn and what is announced. Two formatters is how a
        slider ends up reading &ldquo;40%&rdquo; and saying &ldquo;0.4&rdquo;.
      </Rule>

      <H3 id="shape">Shape</H3>

      <Example
        code={`<Slider label="Thicker" defaultValue={62} height={12} thumb={22} showValue />`}
      >
        <SliderShape />
      </Example>

      <H2 id="customization">Customization</H2>

      <Code
        lang="tsx"
        code={`<Slider
  label="Volume"
  onValueChange={preview}   // every move — cheap work only
  onValueCommit={save}      // once, on release — the expensive one
  height={6}                // the track's thickness
  thumb={16}
  radius={3}
  theme="light"
/>`}
      />

      <P>
        Two callbacks because they answer different questions. <code>onValueChange</code> fires on
        every frame of a drag and belongs to whatever is cheap; <code>onValueCommit</code> fires
        once when the pointer is released, and that is where a request goes.
      </P>

      <H2 id="styling">Styling reference</H2>

      <P>
        Tailwind utilities; there is no stylesheet for this component. The track is a recess — an
        opaque hole with inset shadows rather than a border, because a hole does not cast a shadow
        outwards. The thumb is an object on top of it and carries a hairline and a short drop
        shadow.
      </P>

      <P>
        The pointer handling is defensive in three places, and all three came from the same bug: a
        native drag stealing the gesture, so <code>pointerup</code> never arrived and every later
        press was refused by a capture that was still held. <code>preventDefault()</code> on the
        press, <code>user-select: none</code> while dragging, and <code>onLostPointerCapture</code>{' '}
        — the one event that fires for every way capture can be taken away.
      </P>

      <H2 id="api">API reference</H2>

      <Hatch />

      <Table
        head={['Prop', 'Type', 'Default', '']}
        rows={[
          ['value', 'number', '—', 'Controlled'],
          ['defaultValue', 'number', '0', ''],
          ['onValueChange', '(value: number) => void', '—', 'Every move'],
          ['onValueCommit', '(value: number) => void', '—', 'Once, on release'],
          ['min', 'number', '0', ''],
          ['max', 'number', '100', 'Always reachable, even off the step grid'],
          ['step', 'number', '1', '0 for continuous'],
          ['marks', 'boolean | number[]', 'false', 'true for every step; capped at 60'],
          ['label', 'ReactNode', '—', 'Above the track, and the accessible name'],
          ['aria-label', 'string', '—', 'The name when there is no visible label'],
          ['showValue', 'boolean', 'false', 'The number, at the other end of the label row'],
          ['format', '(value: number) => string', 'String', 'The number and the announcement'],
          ['height', 'number', '6', 'The track’s thickness'],
          ['thumb', 'number', '16', ''],
          ['radius', 'number', 'half the height', ''],
          ['disabled', 'boolean', 'false', ''],
          ['theme', "'dark' | 'light'", "'dark'", ''],
        ]}
      />

      <H3 id="keyboard">Keyboard</H3>

      <Table
        head={['Key', '']}
        rows={[
          ['← ↓', 'One step down'],
          ['→ ↑', 'One step up'],
          ['Page Up / Page Down', 'Ten steps'],
          ['Home / End', 'Minimum and maximum'],
        ]}
      />

      <P>
        The label is wired with <code>aria-labelledby</code> rather than{' '}
        <code>&lt;label htmlFor&gt;</code>: a label only names a <em>labelable</em> element, and a{' '}
        <code>div[role=slider]</code> is not one. Clicking it did nothing, silently, until it was.
      </P>

      <H2 id="related">Related components</H2>

      <Related current="slider" />

      <Around current="slider" />
    </DocPage>
  );
}
