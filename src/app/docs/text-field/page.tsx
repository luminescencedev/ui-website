import type { Metadata } from 'next';
import { Code } from '@/components/site/Code';
import { Example } from '@/components/site/Example';
import {
  Around,
  DocPage,
  H2,
  H3,
  P,
  Refuses,
  Related,
  Rule,
  Table,
  Hatch,
} from '@/components/site/page';
import { FieldBasic, FieldError, FieldFloat } from '@/components/site/demos/inputs';

export const metadata: Metadata = {
  title: 'Text field',
  description:
    'A recessed field with a real label above it, and a message that arrives rather than appears.',
};

const marks = [
  { id: 'usage', label: 'Usage' },
  { id: 'anatomy', label: 'Anatomy' },
  { id: 'examples', label: 'Examples' },
  { id: 'error', label: 'Hints and errors', sub: true },
  { id: 'float', label: 'A floating label', sub: true },
  { id: 'customization', label: 'Customization' },
  { id: 'styling', label: 'Styling reference' },
  { id: 'api', label: 'API reference' },
  { id: 'refuses', label: 'What it refuses' },
  { id: 'related', label: 'Related components' },
];

export default function TextFieldPage() {
  return (
    <DocPage
      eyebrow="Input"
      title="Text field"
      description="A recessed field with a real label above it, and a message that arrives. The field is a hole, and a hole is opaque, because you are reading against it."
      marks={marks}
    >
      <H2 id="usage">Usage</H2>

      <Code lang="tsx" code={`import { TextField } from '@carabine/ui/text-field';`} />

      <Example
        code={`<TextField
  label="Project name"
  defaultValue="carabine"
  hint="Used in URLs, so keep it short."
  full
/>`}
      >
        <FieldBasic />
      </Example>

      <Rule>
        The message occupies its space before it has anything to say. A hint that pushes the next
        field down when it appears is a form that moves under the pointer.
      </Rule>

      <H2 id="anatomy">Anatomy</H2>

      <Code
        lang="tsx"
        code={`<label>              // a real label, for a real input — htmlFor, not aria-labelledby
<div>                //   the recess: opaque, inset shadows, no border
  {icon}             //     inside, on the left
  <input />          //     everything an input takes passes through
  {trailing}         //     inside, on the right
</div>
<p id="…-message">   //   the hint, or the error in its place</p>`}
      />

      <P>
        Give the field an <code>id</code> and the message becomes <code>{`${'id'}-message`}</code>,
        wired with <code>aria-describedby</code> — which is what a form library needs to point at.
      </P>

      <H2 id="examples">Examples</H2>

      <H3 id="error">Hints and errors</H3>

      <P>
        An <code>error</code> replaces the hint rather than joining it, and turns the field with it.
        Two messages under one field is two things to read before you know which one is the problem.
      </P>

      <Example
        code={`<TextField
  label="Email"
  type="email"
  icon={<Mail />}
  value={value}
  onValueChange={setValue}
  error={bad ? 'That does not look like an address.' : undefined}
  hint="We only use it for deploy failures."
  full
/>`}
      >
        <FieldError />
      </Example>

      <H3 id="float">A floating label</H3>

      <P>
        <code>float</code> puts the label inside the field and lifts it for anything underneath —
        text, focus, or a placeholder. It is a different shape, not a different component.
      </P>

      <Example
        code={`<TextField
  label="Domain"
  float
  icon={<Globe />}
  trailing={<span className="text-[11px]">.dev</span>}
  full
/>`}
      >
        <FieldFloat />
      </Example>

      <H2 id="customization">Customization</H2>

      <Code
        lang="tsx"
        code={`<TextField
  label="Project"
  size={48}         // height in pixels; the padding and the label follow it
  radius={14}
  full              // fills the width it is given
  theme="light"
  // and everything an <input> takes:
  name="project"
  required
  autoComplete="off"
  maxLength={40}
  inputMode="text"
/>`}
      />

      <H2 id="styling">Styling reference</H2>

      <P>
        Tailwind utilities; there is no stylesheet for this component. The field is a{' '}
        <strong>hole</strong>: opaque, with the recess drawn as inset shadows rather than a border,
        because a hole does not cast a shadow outwards. It is the one surface in the library that is
        neither a tint nor an object — you read against it, so you cannot see through it.
      </P>

      <P>
        <code>prefers-reduced-motion</code> drops the float and the message&apos;s growth to
        nothing. The label still moves; it just arrives.
      </P>

      <H2 id="api">API reference</H2>

      <Hatch />

      <Table
        head={['Prop', 'Type', 'Default', '']}
        rows={[
          ['label', 'string', '—', 'Above the field'],
          ['float', 'boolean', 'false', 'Puts it inside instead, rising when there is text'],
          ['value', 'string', '—', 'Controlled'],
          ['defaultValue', 'string', "''", ''],
          ['onValueChange', '(value: string) => void', '—', 'Alongside the native onChange'],
          ['hint', 'ReactNode', '—', 'Said under the field, always'],
          ['error', 'ReactNode', '—', 'Said instead, and the field turns with it'],
          ['icon', 'ReactNode', '—', 'Inside, on the left. The label makes room'],
          ['trailing', 'ReactNode', '—', 'Inside, on the right'],
          ['size', 'number', '40', 'Height in pixels; padding and the label follow it'],
          ['radius', 'number', 'size × 0.28', ''],
          ['full', 'boolean', 'false', 'Fills the width it is given'],
          ['theme', "'dark' | 'light'", "'dark'", ''],
          ['disabled', 'boolean', 'false', ''],
        ]}
      />

      <H2 id="refuses">What it refuses</H2>

      <Refuses
        items={[
          {
            title: 'No clear button, no counter, no reveal',
            why: (
              <>
                <code>trailing</code> takes any of them. A field that shipped all three would ship
                two of them switched off in every single use.
              </>
            ),
          },
          {
            title: 'No validation',
            why: (
              <>
                It shows an error; it does not decide there is one. Whatever you already use — a
                schema, a form library, a server round trip — owns that, and a field with its own
                opinion about email addresses is a field you fight.
              </>
            ),
          },
        ]}
      />

      <H2 id="related">Related components</H2>

      <Related current="text-field" />

      <Around current="text-field" />
    </DocPage>
  );
}
