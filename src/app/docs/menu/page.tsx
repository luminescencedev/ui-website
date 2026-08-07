import type { Metadata } from 'next';
import { Code } from '@/components/site/Code';
import { Example } from '@/components/site/Example';
import { Around, DocPage, H2, H3, P, Related, Rule, Table, Hatch } from '@/components/site/page';
import { MenuBasic, MenuContext } from '@/components/site/demos/overlays';

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'A menu of commands. Arrow keys walk it, letters jump through it, and it opens either from a click on its trigger or from a right-click anywhere on it.',
};

const marks = [
  { id: 'usage', label: 'Usage' },
  { id: 'items', label: 'Items are data' },
  { id: 'examples', label: 'Examples' },
  { id: 'context', label: 'From a right-click', sub: true },
  { id: 'customization', label: 'Customization' },
  { id: 'styling', label: 'Styling reference' },
  { id: 'api', label: 'API reference' },
  { id: 'keyboard', label: 'Keyboard', sub: true },
  { id: 'related', label: 'Related components' },
];

export default function MenuPage() {
  return (
    <DocPage
      eyebrow="Overlay"
      title="Menu"
      description="A menu of commands, from a click or a right-click. One bar slides behind the active row rather than a background being painted on each row in turn."
      marks={marks}
    >
      <H2 id="usage">Usage</H2>

      <Code lang="tsx" code={`import { Menu } from '@carabine/ui/menu';`} />

      <Example
        code={`<Menu items={commands} onSelect={run} label="Actions">
  Actions
</Menu>`}
      >
        <MenuBasic />
      </Example>

      <Rule>
        One bar, and it slides. Hover and keyboard focus are the same question —{' '}
        <em>this is the one you are on</em> — and answering it twice leaves a menu pointing at two
        rows.
      </Rule>

      <H2 id="items">Items are data</H2>

      <P>
        There is no <code>Menu.Item</code>. A list of commands in a real application is an array
        that gets built, filtered, reordered and permission-checked, so that is what is passed.
        Separators and headings are entries in the same array, which means a filter that removes the
        last item of a group removes its heading too, for free.
      </P>

      <Code
        lang="tsx"
        code={`const commands = [
  { id: 'rename', label: 'Rename', icon: <Pencil />, shortcut: 'F2' },
  { id: 'copy', label: 'Copy link', icon: <Copy />, shortcut: '⌘C' },
  { id: 'sep', separator: true },
  { id: 'delete', label: 'Delete', icon: <Trash2 />, danger: true },
].filter((item) => can(item.id));`}
      />

      <H2 id="examples">Examples</H2>

      <H3 id="context">From a right-click</H3>

      <P>
        <code>trigger=&quot;context&quot;</code> anchors the panel to the <em>pointer</em> rather
        than to the box — which is the only difference between the two modes, and the reason they
        are one component.
      </P>

      <Example
        code={`<Menu trigger="context" items={commands} label="Canvas actions">
  <Canvas />
</Menu>`}
      >
        <MenuContext />
      </Example>

      <H2 id="customization">Customization</H2>

      <Code
        lang="tsx"
        code={`<Menu
  items={commands}
  placement="right"
  align="start"
  width={260}
  padding={6}     // around the rows
  radius={14}     // rows take this minus the padding
  gap={6}
  offset={12}
  zIndex={65}     // above a dialog's 60, below a tooltip's 70
  theme="light"
/>`}
      />

      <P>
        The rows&apos; radius is the panel&apos;s minus the padding, not a second number. Two
        rounded things nested need that relationship or the corners run at each other.
      </P>

      <H2 id="styling">Styling reference</H2>

      <P>
        The panel is a core — a single layer with the text on it — so it takes the heavier glass
        weight. The highlight behind the active row is a <strong>tint</strong>: no hairline, no
        shadow, and letting the surface show through is the entire point of it.
      </P>

      <P>
        The panel itself is a tween; only the bar is a spring. A panel that merely opens is not
        interruptible, and a spring there would be movement for its own sake.
      </P>

      <H2 id="api">API reference</H2>

      <Hatch panel />

      <Table
        head={['Prop', 'Type', 'Default', '']}
        rows={[
          ['children', 'ReactNode', '—', 'The trigger'],
          ['items', 'MenuItem[]', '[]', ''],
          ['onSelect', '(item, index) => void', '—', ''],
          ['trigger', "'click' | 'context'", "'click'", 'Off the box, or off the pointer'],
          ['open', 'boolean', '—', 'Controlled'],
          ['defaultOpen', 'boolean', 'false', ''],
          ['onOpenChange', '(open: boolean) => void', '—', ''],
          ['placement', 'Side', "'bottom'", ''],
          ['align', 'Align', "'start'", ''],
          ['gap', 'number', '6', 'Between the anchor and the panel'],
          ['offset', 'number', '12', 'Smallest distance kept from the viewport’s edges'],
          ['width', 'number', '220', ''],
          ['padding', 'number', '6', 'Around the rows'],
          ['radius', 'number', '14', 'Rows take this minus the padding'],
          ['zIndex', 'number', '65', ''],
          ['container', 'HTMLElement | null', 'document.body', ''],
          ['stiffness', 'number', '420', 'The bar behind the active row'],
          ['damping', 'number', '38', 'The panel itself is a tween, not a spring'],
          ['openScale', 'number', '0.94', ''],
          ['label', 'string', "'Menu'", 'Accessible name of the menu'],
          ['theme', "'dark' | 'light'", "'dark'", ''],
        ]}
      />

      <P>
        <code>MenuItem</code> carries <code>id</code>, <code>label</code>, <code>description</code>,{' '}
        <code>icon</code>, <code>shortcut</code>, <code>href</code>, <code>external</code>,{' '}
        <code>disabled</code>, <code>danger</code>, <code>separator</code> and <code>heading</code>.
        A row with an <code>href</code> renders as a link, so middle-click and open-in-new-tab work
        the way they do everywhere else.
      </P>

      <H3 id="keyboard">Keyboard</H3>

      <Table
        head={['Key', '']}
        rows={[
          ['↑ ↓', 'Walks the rows, wrapping, skipping disabled ones and separators'],
          ['Home / End', 'First and last'],
          ['A–Z', 'Typeahead on the labels'],
          ['Enter', 'Runs the row'],
          ['Esc', 'Closes, and focus returns to the trigger'],
        ]}
      />

      <H2 id="related">Related components</H2>

      <Related current="menu" />

      <Around current="menu" />
    </DocPage>
  );
}
