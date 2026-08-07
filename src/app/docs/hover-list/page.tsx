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
import { HoverBasic, HoverPlate } from '@/components/site/demos/surfaces';

export const metadata: Metadata = {
  title: 'Hover list',
  description:
    'A list with one bar sliding between its rows, instead of a background painted on each row in turn.',
};

const marks = [
  { id: 'usage', label: 'Usage' },
  { id: 'bar', label: 'One bar' },
  { id: 'examples', label: 'Examples' },
  { id: 'plate', label: 'On a plate', sub: true },
  { id: 'customization', label: 'Customization' },
  { id: 'styling', label: 'Styling reference' },
  { id: 'api', label: 'API reference' },
  { id: 'refuses', label: 'What it refuses' },
  { id: 'related', label: 'Related components' },
];

export default function HoverListPage() {
  return (
    <DocPage
      eyebrow="List"
      title="Hover list"
      description="A list with one bar sliding between its rows. It is a whole component rather than a hover style, because the bar has to know about rows it is not on."
      marks={marks}
    >
      <H2 id="usage">Usage</H2>

      <Code lang="tsx" code={`import { HoverList } from '@carabine/ui/hover-list';`} />

      <Example
        code={`<HoverList
  items={[
    { id: 'prod', label: 'Production', description: '3 services · eu-west', icon: <Server /> },
    { id: 'staging', label: 'Staging', description: '1 service', icon: <Server /> },
    { id: 'preview', label: 'Preview', description: 'Built on every push' },
  ]}
  onSelect={(item) => deploy(item.id)}
  label="Environments"
/>`}
      >
        <HoverBasic />
      </Example>

      <Rule>
        This list says where the pointer is, and that is all it says. There is no selected row — a
        second claim on the same surface leaves the list pointing at two things.
      </Rule>

      <H2 id="bar">One bar</H2>

      <P>
        The bar is one element behind the rows, moved and resized to the row under the pointer. Rows
        are different heights when some carry a description and some do not, so both the position
        and the height are <strong>measured</strong> and filed under the row&apos;s <code>id</code>{' '}
        — which is why the id has to be stable across reorders.
      </P>

      <P>
        On the first hover the bar is <em>placed</em> rather than animated. Sliding in from the top
        of the list on the first row you touch is the bar arriving; every hover after that is the
        bar travelling, which is the thing worth watching.
      </P>

      <Code
        lang="tsx"
        code={`if (hovered === null) y.set(next);   // first hover: place it
else animate(y, next, SPRING);      // after that: travel`}
      />

      <H2 id="examples">Examples</H2>

      <H3 id="plate">On a plate</H3>

      <P>
        <code>plate</code> puts the toast&apos;s glass shell around the rows, for a list standing on
        its own rather than filling a panel. It is off by default: this is content more often than
        it is a container, and two panes of glass inside each other is the worse of the two
        mistakes.
      </P>

      <Example code={`<HoverList items={items} plate onSelect={deploy} label="Environments" />`}>
        <HoverPlate />
      </Example>

      <H2 id="customization">Customization</H2>

      <Code
        lang="tsx"
        code={`<HoverList
  items={items}
  radius={12}      // row corners, and the bar's
  padding={12}     // inside a row, both axes
  gap={3}          // between two rows
  bar="rgba(255,255,255,0.07)"   // a plain CSS string, not a class
  plate
  stiffness={420}
  damping={38}
  renderItem={(item) => <YourRow item={item} />}   // the row stays ours
/>`}
      />

      <H2 id="styling">Styling reference</H2>

      <P>
        The bar is a <strong>tint</strong>: no hairline, no shadow, and letting the surface show
        through is the whole point. Its colour is the one plain CSS string in the component&apos;s
        API, because it is the thing a consumer is most likely to want in their own brand.
      </P>

      <P>
        The type scale and the greys are the toast&apos;s, to the value — 13px medium over 12px
        regular. A list sitting inside a toast-shaped panel that used its own greys would read as a
        widget somebody dropped in.
      </P>

      <H2 id="api">API reference</H2>

      <Hatch />

      <Table
        head={['Prop', 'Type', 'Default', '']}
        rows={[
          ['items', 'HoverItem[]', '[]', ''],
          [
            'renderItem',
            '(item, index) => ReactNode',
            '—',
            'Replaces a row’s contents; the row stays ours',
          ],
          ['onSelect', '(item, index) => void', '—', 'Also what turns the rows into buttons'],
          ['radius', 'number', '10', 'Row corners, and the bar’s'],
          ['padding', 'number', '10', 'Inside a row, both axes'],
          ['gap', 'number', '2', 'Between two rows'],
          ['bar', 'string', "theme's", 'The bar’s colour — a plain CSS string'],
          ['plate', 'boolean', 'false', 'The toast’s glass shell around the rows'],
          ['stiffness', 'number', '420', ''],
          ['damping', 'number', '38', ''],
          ['disabled', 'boolean', 'false', ''],
          ['label', 'string', '—', 'Accessible name of the list'],
          ['theme', "'dark' | 'light'", "'dark'", ''],
        ]}
      />

      <P>
        A row&apos;s accessible name is everything in it — label <em>and</em> description. A
        description that is not part of the name is a description nobody hears.
      </P>

      <H2 id="refuses">What it refuses</H2>

      <Refuses
        items={[
          {
            title: 'No selected row',
            why: 'The bar answers one question, and it is where the pointer is. A list that also had to show a current value would need a second surface, and two surfaces claiming the same thing is the rule this component exists to demonstrate.',
          },
          {
            title: 'No virtualisation',
            why: 'Every row is measured, and a measured row that is not mounted has no height. A list long enough to need windowing is a table, and a table is a different component.',
          },
        ]}
      />

      <H2 id="related">Related components</H2>

      <Related current="hover-list" />

      <Around current="hover-list" />
    </DocPage>
  );
}
