import type { Metadata } from 'next';
import { Code } from '@/components/site/Code';
import { Example } from '@/components/site/Example';
import { Around, DocPage, H2, H3, P, Related, Rule, Table, Hatch } from '@/components/site/page';
import { TabsChip, TabsLine, TabsManual } from '@/components/site/demos/surfaces';

export const metadata: Metadata = {
  title: 'Tabs',
  description:
    'Tabs, with an indicator that lands on a measured tab rather than a counted one. Two variants, a sliding chip and an underline.',
};

const marks = [
  { id: 'usage', label: 'Usage' },
  { id: 'measured', label: 'Measured, not counted' },
  { id: 'examples', label: 'Examples' },
  { id: 'line', label: 'The line variant', sub: true },
  { id: 'manual', label: 'Manual activation', sub: true },
  { id: 'customization', label: 'Customization' },
  { id: 'styling', label: 'Styling reference' },
  { id: 'api', label: 'API reference' },
  { id: 'keyboard', label: 'Keyboard', sub: true },
  { id: 'related', label: 'Related components' },
];

export default function TabsPage() {
  return (
    <DocPage
      eyebrow="Navigation"
      title="Tabs"
      description="Tabs, with an indicator that lands on a measured tab rather than a counted one. Labels are different lengths, so an index multiplied by a width lands beside the tab rather than on it."
      marks={marks}
    >
      <H2 id="usage">Usage</H2>

      <Code lang="tsx" code={`import { Tabs } from '@carabine/ui/tabs';`} />

      <Example
        code={`<Tabs
  items={[
    { id: 'overview', label: 'Overview', panel: <Overview /> },
    { id: 'activity', label: 'Activity', badge: 12, panel: <Activity /> },
    { id: 'settings', label: 'Settings', panel: <Settings /> },
  ]}
  label="Project"
/>`}
      >
        <TabsChip />
      </Example>

      <Rule>
        The panel is part of the item. A tab with nowhere to point is a button that changes colour,
        and keeping the two together is what lets the component wire <code>aria-controls</code>{' '}
        without being told twice.
      </Rule>

      <H2 id="measured">Measured, not counted</H2>

      <P>
        The indicator reads <code>offsetLeft</code> and <code>offsetWidth</code> off the tab it is
        travelling to. Not <code>getBoundingClientRect</code>: a rect includes the transform that is
        currently mid-flight, so measuring during an animation gives you a moving answer and the bar
        chases itself.
      </P>

      <P>
        The first placement is a layout effect, so the bar is under the right tab in the frame the
        component first paints — an indicator that slides in from the left on mount is one that was
        measured too late.
      </P>

      <H2 id="examples">Examples</H2>

      <H3 id="line">The line variant</H3>

      <P>
        <code>chip</code> is a sliding surface behind the label; <code>line</code> is an underline
        over a rule. The same measurement drives both.
      </P>

      <Example code={`<Tabs items={items} variant="line" label="Project" />`}>
        <TabsLine />
      </Example>

      <H3 id="manual">Manual activation</H3>

      <P>
        <code>automatic</code> selects as the arrows arrive, which is right when a panel is cheap.{' '}
        <code>manual</code> moves focus without selecting until Enter or Space — right when a panel
        costs a request, because arrowing past four tabs should not fire four of them.
      </P>

      <Example code={`<Tabs items={items} activation="manual" full label="Project" />`}>
        <TabsManual />
      </Example>

      <H2 id="customization">Customization</H2>

      <Code
        lang="tsx"
        code={`<Tabs
  items={items}
  size={42}        // tab height; padding and type follow it
  gap={6}
  radius={12}      // the chip's corners, and the tabs'
  thickness={3}    // the underline and its rule, on line
  full             // spreads the tabs across the width
  stiffness={420}  // the indicator's spring
  damping={38}
  theme="light"
/>`}
      />

      <H2 id="styling">Styling reference</H2>

      <P>
        Tailwind utilities; there is no stylesheet for this component. The chip is a{' '}
        <strong>tint</strong> — no hairline, no shadow — so the surface under it stays visible,
        which is what keeps a row of tabs reading as one control rather than as a button that moved.
      </P>

      <P>
        There is no hover surface. The affordance is the cursor and the label brightening, in CSS: a
        second surface appearing under the pointer would be a second answer to the question the
        indicator already answers.
      </P>

      <H2 id="api">API reference</H2>

      <Hatch />

      <Table
        head={['Prop', 'Type', 'Default', '']}
        rows={[
          ['items', 'TabItem[]', '[]', ''],
          ['value', 'string', '—', 'Controlled'],
          ['defaultValue', 'string', 'first enabled', ''],
          ['onValueChange', '(value: string) => void', '—', ''],
          [
            'activation',
            "'automatic' | 'manual'",
            "'automatic'",
            'Whether the arrows choose as they arrive',
          ],
          ['variant', "'chip' | 'line'", "'chip'", 'A sliding surface, or an underline'],
          ['size', 'number', '36', 'Tab height; padding and type follow it'],
          ['gap', 'number', '4', ''],
          ['radius', 'number', 'size × 0.28', ''],
          ['thickness', 'number', '2', 'The underline and its rule, on line'],
          ['full', 'boolean', 'false', 'Spreads the tabs across the width'],
          ['stiffness', 'number', '420', 'The indicator’s spring'],
          ['damping', 'number', '38', ''],
          ['label', 'string', "'Tabs'", 'Accessible name of the tab list'],
          ['theme', "'dark' | 'light'", "'dark'", ''],
        ]}
      />

      <P>
        <code>TabItem</code> carries <code>id</code>, <code>label</code>, <code>icon</code>,{' '}
        <code>badge</code>, <code>panel</code>, <code>href</code>, <code>external</code> and{' '}
        <code>disabled</code>. Give it an <code>href</code> and the tab is a link — for tabs that
        are really navigation.
      </P>

      <H3 id="keyboard">Keyboard</H3>

      <Table
        head={['Key', '']}
        rows={[
          ['Tab', 'Into the tab list, then straight to the panel — one stop, not one per tab'],
          ['← →', 'Walks the tabs, wrapping, skipping disabled ones'],
          ['Home / End', 'First and last'],
          ['Enter / Space', 'Selects, on manual activation'],
        ]}
      />

      <P>
        A roving <code>tabindex</code>, unlike the accordion&apos;s: tabs are one control with
        several settings, so Tab should pass through them, not walk them.
      </P>

      <H2 id="related">Related components</H2>

      <Related current="tabs" />

      <Around current="tabs" />
    </DocPage>
  );
}
