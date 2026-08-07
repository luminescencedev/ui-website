import type { Metadata } from 'next';
import { Code } from '@/components/site/Code';
import { Example } from '@/components/site/Example';
import { Around, DocPage, H2, H3, P, Related, Rule, Table, Hatch } from '@/components/site/page';
import { Basic, Bare, Controlled, Multiple, Rich } from '@/components/site/demos/accordion';

export const metadata: Metadata = {
  title: 'Accordion',
  description:
    'Sections that open, at a height that is measured rather than guessed at. Every header is its own tab stop, and a closed section is unmounted rather than hidden.',
};

const marks = [
  { id: 'usage', label: 'Usage' },
  { id: 'anatomy', label: 'Anatomy' },
  { id: 'examples', label: 'Examples' },
  { id: 'multiple', label: 'Several at once', sub: true },
  { id: 'rich', label: 'Icons and descriptions', sub: true },
  { id: 'bare', label: 'Without the plate', sub: true },
  { id: 'controlled', label: 'Controlled', sub: true },
  { id: 'customization', label: 'Customization' },
  { id: 'styling', label: 'Styling reference' },
  { id: 'api', label: 'API reference' },
  { id: 'keyboard', label: 'Keyboard', sub: true },
  { id: 'related', label: 'Related components' },
];

export default function AccordionPage() {
  return (
    <DocPage
      eyebrow="Navigation"
      title="Accordion"
      description="Sections that open, at a height that is measured rather than guessed at. Every header is its own tab stop, and a closed section is not hidden — it is gone."
      marks={marks}
    >
      <H2 id="usage">Usage</H2>

      <Code lang="tsx" code={`import { Accordion } from '@carabine/ui/accordion';`} />

      <Example
        code={`<Accordion
  items={[
    { id: 'orders', title: 'How do I place an order?', content: <p>…</p> },
    { id: 'shipping', title: 'When will it ship?', content: <p>…</p> },
    { id: 'refunds', title: 'How do I request a refund?', content: <p>…</p> },
  ]}
  defaultValue={['orders']}
/>`}
      >
        <Basic />
      </Example>

      <Rule>
        <code>value</code> is always an array, even when only one section may be open. A component
        whose value changes shape with a boolean prop is one you have to read twice.
      </Rule>

      <H2 id="anatomy">Anatomy</H2>

      <P>
        There are no sub-components to compose. The sections are data, because a list of sections in
        a real application is something you build, filter and reorder — so what you pass is the
        list.
      </P>

      <Code
        lang="tsx"
        code={`<Accordion>              // the plate: two bezels, glass outside, a lit core inside
  <h3>                   //   the heading — how a screen reader's outline finds it
    <button>             //   the header — aria-expanded, aria-controls, its own tab stop
      {icon}
      {title}
      {description}      //   an optional second line
      <Chevron />        //   turns 180° on open
    </button>
  </h3>
  <section>              //   the panel — role="region", aria-labelledby, height: auto
    {content}            //   padding lives here, on the inner box, not on the animating one
  </section>
</Accordion>`}
      />

      <P>
        The radii are concentric — the inner corner is the outer minus the bezel — because two
        rounded things nested need that relationship or the corners run at each other. Inside the
        card the rules only ever go <em>between</em> rows: the core&apos;s own edge is already the
        boundary, and a rule against it is two lines saying the same thing.
      </P>

      <H2 id="examples">Examples</H2>

      <H3 id="multiple">Several at once</H3>

      <P>
        <code>multiple</code> lets any number be open. On <code>{`multiple={false}`}</code>,{' '}
        <code>{`collapsible={false}`}</code> is what stops the last one closing —{' '}
        <em>one at a time</em> and <em>always one</em> are different promises, and conflating them
        is how an accordion ends up with nothing open and no way to say that was not allowed.
      </P>

      <Example code={`<Accordion items={faq} multiple defaultValue={['orders', 'shipping']} />`}>
        <Multiple />
      </Example>

      <H3 id="rich">Icons and descriptions</H3>

      <P>
        A header takes an <code>icon</code> before the title and a <code>description</code> under
        it. A <code>disabled</code> row is stepped over by the arrow keys rather than merely dimmed.
      </P>

      <Example
        code={`<Accordion
  items={[
    {
      id: 'delivery',
      icon: <Package className="size-4" />,
      title: 'Delivery',
      description: 'Where it is, and when it lands',
      content: <p>…</p>,
    },
    {
      id: 'returns',
      icon: <RotateCcw className="size-4" />,
      title: 'Returns',
      description: 'Not available on this plan',
      disabled: true,
      content: <p>…</p>,
    },
  ]}
/>`}
      >
        <Rich />
      </Example>

      <H3 id="bare">Without the plate</H3>

      <P>
        <code>{`plate={false}`}</code> drops the two bezels and leaves the bare list of rows — for a
        section that is already inside something.
      </P>

      <Example code={`<Accordion items={faq} plate={false} />`}>
        <Bare />
      </Example>

      <H3 id="controlled">Controlled</H3>

      <P>
        Pass <code>value</code> and <code>onValueChange</code> together. Leave <code>value</code>{' '}
        off and the component keeps its own, seeded by <code>defaultValue</code>.
      </P>

      <Example
        code={`const [value, setValue] = useState<string[]>(['shipping']);

<Accordion items={faq} value={value} onValueChange={setValue} multiple />`}
      >
        <Controlled />
      </Example>

      <H2 id="customization">Customization</H2>

      <P>
        Four numbers and two booleans, and they are props rather than literals because a consumer
        might reasonably want another value for any of them.
      </P>

      <Code
        lang="tsx"
        code={`<Accordion
  items={faq}
  padding={18}      // vertical padding on a header; the type follows it
  radius={24}       // the outer corner — the inner one is this minus the bezel
  rules={false}     // no hairlines between rows
  plate={false}     // no card around the whole thing
  theme="light"     // both palettes are written out; there is no dark: variant
  disabled          // the whole thing, at half opacity, answering nothing
/>`}
      />

      <H2 id="styling">Styling reference</H2>

      <P>
        Tailwind utilities; there is no stylesheet for this component. The card is the toast&apos;s
        material — glass outside, a top-lit core inside, the rows on the core. No surface appears
        anywhere on hover, because a row is not a thing you rest on, it is a thing you open.
      </P>

      <Table
        head={['Layer', 'What it is']}
        rows={[
          ['shell', 'The outer glass, seen only ever as a ring around the core'],
          ['core', 'A top-lit gradient. What the rows are read against'],
          ['bezel', '6px between the two, and the reason the radii are concentric'],
          ['rule', 'One hairline between rows, never against the core’s edge'],
          ['title', 'Brightens on group-hover, in CSS. The affordance is the cursor and the label'],
        ]}
      />

      <P>
        Three timings, and none of them match: the height takes 300ms, the opacity 180ms so the text
        is gone before the box has finished closing on it, and the content lifts six pixels over the
        full 300ms. Matching the fade to the height makes the last few frames a line of text being
        guillotined.
      </P>

      <H2 id="api">API reference</H2>

      <Hatch />

      <Table
        head={['Prop', 'Type', 'Default', '']}
        rows={[
          ['items', 'AccordionItem[]', '[]', ''],
          ['value', 'string[]', '—', 'Controlled. Always an array'],
          ['defaultValue', 'string[]', '[]', ''],
          ['onValueChange', '(value: string[]) => void', '—', ''],
          ['multiple', 'boolean', 'false', 'Whether more than one may be open'],
          [
            'collapsible',
            'boolean',
            'true',
            'Whether the open one may be closed, on multiple={false}',
          ],
          ['padding', 'number', '14', 'Vertical padding on a header'],
          ['rules', 'boolean', 'true', 'Hairlines between the rows'],
          ['plate', 'boolean', 'true', 'The toast’s two bezels around the whole thing'],
          ['radius', 'number', '20', 'The outer corner; the inner is this minus the bezel'],
          ['theme', "'dark' | 'light'", "'dark'", ''],
          ['disabled', 'boolean', 'false', ''],
        ]}
      />

      <H3 id="keyboard">Keyboard</H3>

      <P>
        Every header is its own tab stop — not a roving <code>tabindex</code>. Tabs and segmented
        controls use one because they are a single control with several settings; an accordion is
        several controls with several panels, and <code>Tab</code> is how you get from one to the
        next. The arrows walk the headers on top of that.
      </P>

      <Table
        head={['Key', '']}
        rows={[
          ['Tab', 'Header to header, and into an open panel'],
          ['↓ ↑', 'Walks the headers, wrapping, skipping disabled ones'],
          ['Home / End', 'First and last'],
          ['Enter / Space', 'Opens and closes'],
        ]}
      />

      <P>
        A closed section is <strong>unmounted</strong>, not held at zero height — anything focusable
        inside it would otherwise still be in the tab order. For the 260ms of the collapse the panel
        is still in the document, so it takes <code>inert</code> and <code>aria-hidden</code> the
        instant it starts leaving: only its pixels take the time.
      </P>

      <H2 id="related">Related components</H2>

      <Related current="accordion" />

      <Around current="accordion" />
    </DocPage>
  );
}
