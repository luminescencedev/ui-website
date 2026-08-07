import type { Metadata } from 'next';
import { Code } from '@/components/site/Code';
import { Example } from '@/components/site/Example';
import { Around, DocPage, H2, H3, P, Related, Rule, Table, Hatch } from '@/components/site/page';
import { ButtonOwn, ButtonStates, ButtonVariants } from '@/components/site/demos/surfaces';

export const metadata: Metadata = {
  title: 'Button',
  description:
    'A button, and the four things a button turns into: loading, copying, holding to confirm, and a link.',
};

const marks = [
  { id: 'usage', label: 'Usage' },
  { id: 'anatomy', label: 'Anatomy' },
  { id: 'examples', label: 'Examples' },
  { id: 'states', label: 'The four states', sub: true },
  { id: 'own', label: 'Your own variant', sub: true },
  { id: 'customization', label: 'Customization' },
  { id: 'styling', label: 'Styling reference' },
  { id: 'api', label: 'API reference' },
  { id: 'related', label: 'Related components' },
];

export default function ButtonPage() {
  return (
    <DocPage
      eyebrow="Action"
      title="Button"
      description="A button, and the four things a button turns into. One number drives the height, the padding, the radius and the type — so a button is a size, not a size name you have to remember the meaning of."
      marks={marks}
    >
      <H2 id="usage">Usage</H2>

      <Code lang="tsx" code={`import { Button } from '@carabine/ui/button';`} />

      <Example
        code={`<Button variant="primary">Deploy</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">Skip</Button>
<Button variant="danger">Delete</Button>`}
      >
        <ButtonVariants />
      </Example>

      <Rule>
        The variants are semantic, not visual. <code>primary</code> is the one thing on the screen
        worth doing, and there should be one.
      </Rule>

      <H2 id="anatomy">Anatomy</H2>

      <Code
        lang="tsx"
        code={`<button>          // a real button — type="button", never submit by accident
  {icon}          //   before the label
  {children}      //   the label, and the accessible name
  {trailing}      //   after it
</button>`}
      />

      <P>
        Everything a <code>&lt;button&gt;</code> takes passes through — <code>type</code>,{' '}
        <code>form</code>, <code>name</code>, <code>value</code>, every <code>aria-*</code>. Give it
        an <code>href</code> and it renders an anchor instead, wearing the same skin.
      </P>

      <H2 id="examples">Examples</H2>

      <H3 id="states">The four states</H3>

      <P>
        <code>loading</code> spins and refuses presses. <code>copy</code> puts a string on the
        clipboard and morphs the icon to a check on its own — there is no state to hold, which is
        the whole point of the prop. <code>hold</code> fills the button as it is held and fires only
        at the end.
      </P>

      <Example
        code={`<Button variant="primary" loading={busy} icon={<Rocket />}>Deploy</Button>
<Button variant="secondary" copy="pnpm add @carabine/ui">pnpm add @carabine/ui</Button>
<Button variant="danger" hold={1200} icon={<Trash2 />}>Hold to delete</Button>`}
      >
        <ButtonStates />
      </Example>

      <H3 id="own">Your own variant</H3>

      <P>
        The key set is open. <code>variants</code> is merged over the four built-ins, so the same
        prop restyles one of them or invents a fifth — and the colours are plain CSS strings, never
        classes, because a class buried in a component is invisible from the outside.
      </P>

      <Example
        code={`<Button
  variant="brand"
  variants={{
    brand: {
      dark: { background: '#4a86ff', color: '#fff', hover: '#2465ff', sweep: '#91bdff' },
      light: { background: '#2465ff', color: '#fff', hover: '#1552ed', sweep: '#91bdff' },
    },
  }}
>
  A fifth variant
</Button>`}
      >
        <ButtonOwn />
      </Example>

      <H2 id="customization">Customization</H2>

      <Code
        lang="tsx"
        code={`<Button size={28}>Small</Button>
<Button size={44} radius={12}>Large, squarer</Button>
<Button full>Fills the width it is given</Button>
<Button icon={<Copy />} aria-label="Copy" />   // icon-only still has a name`}
      />

      <H2 id="styling">Styling reference</H2>

      <P>
        Tailwind utilities plus <code>button.css</code>, which carries the hold sweep&apos;s
        keyframe — a fill driven by a custom property is not something a utility can say. Press
        feedback is <code>active:scale-[0.97]</code> in CSS rather than in Motion, so it cannot wait
        behind whatever else has the main thread. It is the movement a dropped frame ruins.
      </P>

      <Table
        head={['Field', 'What it paints']}
        rows={[
          ['background', 'The resting surface'],
          ['color', 'The label and the icon'],
          ['ring', 'A hairline, as an inset shadow — a button is an object, so it has an edge'],
          ['hover', 'The surface under the pointer. Left off, nothing moves'],
          ['sweep', 'What fills a hold as it fills. Defaults to the background'],
        ]}
      />

      <H2 id="api">API reference</H2>

      <Hatch />

      <Table
        head={['Prop', 'Type', 'Default', '']}
        rows={[
          ['children', 'ReactNode', '—', 'Leave it off for an icon-only button'],
          ['variant', 'string', "'secondary'", 'primary, secondary, ghost, danger, or yours'],
          ['variants', 'Record<string, ButtonVariant>', 'built-ins', 'Merged over them'],
          ['size', 'number', '32', 'Height in pixels; everything follows it'],
          ['radius', 'number', 'size × 0.3', ''],
          ['full', 'boolean', 'false', 'Fills the width it is given'],
          ['icon', 'ReactNode', '—', 'Before the label'],
          ['trailing', 'ReactNode', '—', 'After it'],
          ['loading', 'boolean', 'false', 'Spins, and refuses presses'],
          ['loadingLabel', 'string', "'Loading'", 'Announced while it does'],
          ['copy', 'string', '—', 'Put on the clipboard when pressed'],
          ['copiedLabel', 'string', "'Copied'", 'Announced once it lands'],
          ['copiedFor', 'number', '1400', 'How long the check stays'],
          ['hold', 'number', '—', 'Milliseconds it must be held before it fires'],
          ['href', 'string', '—', 'Makes it a link'],
          ['external', 'boolean', 'false', ''],
          ['theme', "'dark' | 'light'", "'dark'", ''],
          ['disabled', 'boolean', 'false', ''],
        ]}
      />

      <H2 id="related">Related components</H2>

      <Related current="button" />

      <Around current="button" />
    </DocPage>
  );
}
