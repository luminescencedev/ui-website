import type { Metadata } from 'next';
import { Code } from '@/components/site/Code';
import { Example } from '@/components/site/Example';
import { Around, DocPage, H2, H3, P, Related, Rule, Table, Hatch } from '@/components/site/page';
import { SelectBasic, SelectError, SelectSearch } from '@/components/site/demos/inputs';

export const metadata: Metadata = {
  title: 'Select',
  description:
    'One answer out of a list, with the list under the field that asks. Focus never leaves the field, so the keyboard has one place to be.',
};

const marks = [
  { id: 'usage', label: 'Usage' },
  { id: 'mechanism', label: 'Where focus lives' },
  { id: 'examples', label: 'Examples' },
  { id: 'search', label: 'Searchable', sub: true },
  { id: 'groups', label: 'Groups, icons, errors', sub: true },
  { id: 'customization', label: 'Customization' },
  { id: 'styling', label: 'Styling reference' },
  { id: 'api', label: 'API reference' },
  { id: 'keyboard', label: 'Keyboard', sub: true },
  { id: 'related', label: 'Related components' },
];

export default function SelectPage() {
  return (
    <DocPage
      eyebrow="Input"
      title="Select"
      description="One answer out of a list, with the list under the field that asks. A field to read against, a panel to choose from, and focus that never moves between them."
      marks={marks}
    >
      <H2 id="usage">Usage</H2>

      <Code lang="tsx" code={`import { Select } from '@carabine/ui/select';`} />

      <Example
        code={`<Select
  label="Country"
  items={countries}
  value={value}
  onValueChange={setValue}
  hint="Where you are billed"
/>`}
      >
        <SelectBasic />
      </Example>

      <Rule>
        Two materials, on purpose. The field is a hole and it is opaque; the panel is glass over the
        page. A select that used one material for both would be a panel you could read a page
        through.
      </Rule>

      <H2 id="mechanism">Where focus lives</H2>

      <P>
        Focus never leaves the field. The panel is a portal — it has to be, or the first ancestor
        with <code>overflow: hidden</code> clips it — and moving focus into a portal is how a select
        ends up scrolling the page, closing on its own, or returning focus somewhere else when it
        shuts. The field keeps focus and drives the list with <code>aria-activedescendant</code>.
      </P>

      <P>
        Two consequences worth knowing, because both were bugs first. The scroll listener that
        closes the panel when the page moves has to exclude <em>its own panel</em> — a capture-phase{' '}
        <code>scroll</code> on <code>window</code> hears everything, including the list you are
        scrolling:
      </P>

      <Code
        lang="tsx"
        code={`const away = (event: Event) => {
  const target = event.target;
  if (target instanceof Node && panelRef.current?.contains(target)) return;
  shut();
};`}
      />

      <P>
        And <code>scrollIntoView</code> is gated to the keyboard. Called on every active change it
        yanks the list under a pointer that was only passing over a row.
      </P>

      <H2 id="examples">Examples</H2>

      <H3 id="search">Searchable</H3>

      <P>
        <code>searchable</code> puts a field in the panel and filters as you type — a substring on
        the label by default, or whatever <code>filter</code> says. <code>clearable</code> adds an X
        to the field, which sets the value to <code>null</code> rather than to an empty string.
      </P>

      <Example
        code={`<Select label="Country" items={countries} searchable clearable placeholder="Anywhere" />`}
      >
        <SelectSearch />
      </Example>

      <H3 id="groups">Groups, icons, errors</H3>

      <P>
        Consecutive items sharing a <code>group</code> are drawn under one heading. A{' '}
        <code>disabled</code> option is stepped over by the arrows rather than merely dimmed, and an{' '}
        <code>error</code> replaces the hint and reddens the edge.
      </P>

      <Example
        code={`<Select
  label="Plan"
  items={[
    { id: 'free', label: 'Free', icon: <Globe /> },
    { id: 'pro', label: 'Pro', icon: <Lock />, description: '€19 a month' },
    { id: 'ent', label: 'Enterprise', disabled: true, description: 'Talk to us' },
  ]}
  error="Pick a plan to continue."
/>`}
      >
        <SelectError />
      </Example>

      <H2 id="customization">Customization</H2>

      <Code
        lang="tsx"
        code={`<Select
  items={items}
  side="top"          // tried first; it flips only if the other side is better
  align="end"
  gap={6}             // between the field and the list
  offset={8}          // the least room kept against the window's edge
  matchWidth={false}  // let the list size to its content
  maxHeight={320}     // past this the list scrolls
  radius={10}
  theme="light"
/>`}
      />

      <H2 id="styling">Styling reference</H2>

      <P>
        Tailwind utilities plus <code>select.css</code>, which carries the panel&apos;s scrollbar —
        thin, no track, and transparent until the pointer is on the list. The panel is a{' '}
        <strong>core</strong>, not a shell: it is a single layer and the text lands on it, so it
        takes the heavier of the two glass weights.
      </P>

      <P>
        The active row is one sliding bar, not a background painted on each row in turn. Hover and
        keyboard focus are the same question, and answering it twice leaves a list pointing at two
        options at once.
      </P>

      <H2 id="api">API reference</H2>

      <Hatch panel />

      <Table
        head={['Prop', 'Type', 'Default', '']}
        rows={[
          ['items', 'SelectItem[]', '[]', ''],
          ['value', 'string | null', '—', 'Controlled'],
          ['defaultValue', 'string | null', 'null', ''],
          ['onValueChange', '(value: string | null) => void', '—', ''],
          ['searchable', 'boolean', 'false', 'A search field in the panel'],
          ['filter', '(item, query) => boolean', 'substring on the label', ''],
          ['searchPlaceholder', 'string', "'Search…'", ''],
          ['empty', 'ReactNode', "'No results'", ''],
          ['clearable', 'boolean', 'false', 'An X in the field'],
          ['label', 'ReactNode', '—', 'Above the field, and the accessible name'],
          ['placeholder', 'string', "'Select…'", ''],
          ['hint', 'ReactNode', '—', 'Under the field'],
          ['error', 'ReactNode', '—', 'Replaces the hint, and reddens the edge'],
          ['side', "'top' | 'right' | 'bottom' | 'left'", "'bottom'", 'Tried first'],
          ['align', "'start' | 'center' | 'end'", "'start'", ''],
          ['gap', 'number', '6', 'Between the field and the list'],
          ['offset', 'number', '8', 'The least room against the window’s edge'],
          ['matchWidth', 'boolean', 'true', 'The list is the field’s width'],
          ['maxHeight', 'number', '280', 'Past this the list scrolls'],
          ['radius', 'number', '10', ''],
          ['disabled', 'boolean', 'false', ''],
          ['theme', "'dark' | 'light'", "'dark'", ''],
          ['container', 'Element | null', 'document.body', 'Where the list is rendered'],
        ]}
      />

      <H3 id="keyboard">Keyboard</H3>

      <Table
        head={['Key', '']}
        rows={[
          ['Enter / Space / ↓', 'Opens, on the current value'],
          ['↑ ↓', 'Walks the options, skipping disabled ones'],
          ['Home / End', 'First and last'],
          ['A–Z', 'Typeahead, when there is no search field'],
          ['Enter', 'Chooses'],
          ['Esc', 'Closes, and the field keeps focus'],
        ]}
      />

      <H2 id="related">Related components</H2>

      <Related current="select" />

      <Around current="select" />
    </DocPage>
  );
}
