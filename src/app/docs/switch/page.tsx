import type { Metadata } from 'next';
import { Code } from '@/components/site/Code';
import { Example } from '@/components/site/Example';
import { Around, DocPage, H2, H3, P, Related, Rule, Table, Hatch } from '@/components/site/page';
import { SwitchBasic, SwitchSizes, SwitchSkin } from '@/components/site/demos/inputs';

export const metadata: Metadata = {
  title: 'Switch',
  description:
    'One boolean, and a thumb you can throw. Three beats — widen, travel, relax — and a velocity floor so a flick counts even when it does not reach the other side.',
};

const marks = [
  { id: 'usage', label: 'Usage' },
  { id: 'mechanism', label: 'How it moves' },
  { id: 'examples', label: 'Examples' },
  { id: 'sizes', label: 'Sizes', sub: true },
  { id: 'skin', label: 'A skin of your own', sub: true },
  { id: 'customization', label: 'Customization' },
  { id: 'styling', label: 'Styling reference' },
  { id: 'api', label: 'API reference' },
  { id: 'related', label: 'Related components' },
];

export default function SwitchPage() {
  return (
    <DocPage
      eyebrow="Input"
      title="Switch"
      description="One boolean, and a thumb you can throw. It widens while it is held, travels on a spring, and relaxes once it lands."
      marks={marks}
    >
      <H2 id="usage">Usage</H2>

      <Code lang="tsx" code={`import { Switch } from '@carabine/ui/switch';`} />

      <Example code={`<Switch label="Notifications" checked={on} onCheckedChange={setOn} />`}>
        <SwitchBasic />
      </Example>

      <Rule>
        A switch takes effect immediately. If it needs a Save button beside it, it is a checkbox
        wearing the wrong clothes.
      </Rule>

      <H2 id="mechanism">How it moves</H2>

      <P>
        Three beats, and they do not overlap: the thumb <strong>widens</strong> over 120ms, then{' '}
        <strong>travels</strong> on a spring at 520 stiffness and 34 damping — deliberately under
        critical, which is about 46 — and then <strong>relaxes</strong> back to a circle over 200ms
        once the travel says it has finished. The stretch outlasts the press on purpose: a thumb
        that snaps back the instant you let go never looks like it was thrown.
      </P>

      <P>
        The position is a <em>ratio</em>, not a number of pixels. The thumb changes width while it
        moves, so a travel measured in pixels lands short by exactly the stretch.
      </P>

      <Code
        lang="tsx"
        code={`const x = useTransform([at, wide], ([ratio, size]: number[]) => ratio * (span - size));`}
      />

      <P>
        And a flick counts. Distance alone refuses a fast, short drag — the gesture people actually
        make — so the release reads speed first and only falls back to where the thumb happens to
        be.
      </P>

      <Code
        lang="tsx"
        code={`const speed = Math.abs(by) / Math.max(16, performance.now() - since.current);
const next = speed > FLICK ? by > 0 : at.get() > 0.5;`}
      />

      <H2 id="examples">Examples</H2>

      <H3 id="sizes">Sizes</H3>

      <P>
        <code>width</code>, <code>height</code> and <code>inset</code> are the whole geometry. The
        thumb is whatever is left after the inset, so a switch stays a switch at any size rather
        than becoming a pill with a dot in it.
      </P>

      <Example
        code={`<Switch width={36} height={18} inset={2} aria-label="Small" />
<Switch aria-label="Default" />
<Switch width={64} height={32} inset={4} aria-label="Large" />`}
      >
        <SwitchSizes />
      </Example>

      <H3 id="skin">A skin of your own</H3>

      <P>
        <code>skin</code> is merged over the theme&apos;s, so one field changes without restating
        the rest. Keep the values hex or <code>rgb()</code> — they are interpolated as the thumb
        travels, not swapped at the end.
      </P>

      <Example
        code={`<Switch label="Live" skin={{ on: '#22c55e', thumbOn: '#052e16' }} />
<Switch label="Alert" skin={{ on: '#f43f5e', thumbOn: '#4c0519' }} />`}
      >
        <SwitchSkin />
      </Example>

      <H2 id="customization">Customization</H2>

      <Code
        lang="tsx"
        code={`<Switch
  label="Notifications"
  labelSide="left"   // the label before the control
  gap={14}           // between the two
  stretch={8}        // how much wider the thumb goes while held
  theme="light"
/>`}
      />

      <H2 id="styling">Styling reference</H2>

      <P>
        The track is the segmented control&apos;s recess, and it is <strong>opaque</strong> —{' '}
        <code>#0e0e11</code> dark, <code>#f3f3f4</code> light. It was translucent white at first,
        which is the one thing this library does not allow without a blur behind it: a hole you read
        a thumb against is not a tint.
      </P>

      <Table
        head={['Field', 'What it paints']}
        rows={[
          ['on / off', 'The track, either way'],
          ['thumbOn / thumbOff', 'The thumb, either way'],
          ['ring', 'The recess, as inset shadows. A hole does not cast one outward'],
          ['thumbRing', 'The thumb’s hairline and its short drop shadow'],
        ]}
      />

      <H2 id="api">API reference</H2>

      <Hatch />

      <Table
        head={['Prop', 'Type', 'Default', '']}
        rows={[
          ['checked', 'boolean', '—', 'Controlled'],
          ['defaultChecked', 'boolean', 'false', ''],
          ['onCheckedChange', '(checked: boolean) => void', '—', ''],
          ['label', 'ReactNode', '—', 'Beside it, and the accessible name'],
          ['labelSide', "'left' | 'right'", "'right'", ''],
          ['aria-label', 'string', '—', 'The name when there is no visible label'],
          ['width', 'number', '48', ''],
          ['height', 'number', '24', ''],
          ['inset', 'number', '3', 'The thumb is the rest'],
          ['stretch', 'number', '5', 'How much wider the thumb goes while held'],
          ['gap', 'number', '10', 'Between the control and its label'],
          ['skin', 'Partial<SwitchSkin>', "the theme's", 'Merged over, so one field changes alone'],
          ['disabled', 'boolean', 'false', ''],
          ['theme', "'dark' | 'light'", "'dark'", ''],
          ['name / value', 'string', '—', ''],
        ]}
      />

      <P>
        <code>role=&quot;switch&quot;</code> with <code>aria-checked</code> on a real{' '}
        <code>&lt;button&gt;</code>, so Space and Enter come free and nothing in the pointer
        handling gets in their way. <code>prefers-reduced-motion</code> drops the travel and the
        stretch to nothing — it still lands on the other side, it just does not cross.
      </P>

      <H2 id="related">Related components</H2>

      <Related current="switch" />

      <Around current="switch" />
    </DocPage>
  );
}
