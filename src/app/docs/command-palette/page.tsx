import type { Metadata } from 'next';
import { Code } from '@/components/site/Code';
import { Example } from '@/components/site/Example';
import { Around, DocPage, H2, H3, P, Related, Rule, Table, Hatch } from '@/components/site/page';
import { PaletteBasic } from '@/components/site/demos/overlays';

export const metadata: Metadata = {
  title: 'Command palette',
  description:
    'Every command in the app, one keystroke away — and the one component in the library that refuses to animate.',
};

const marks = [
  { id: 'usage', label: 'Usage' },
  { id: 'still', label: 'Why it does not move' },
  { id: 'examples', label: 'Examples' },
  { id: 'filter', label: 'Filtering', sub: true },
  { id: 'customization', label: 'Customization' },
  { id: 'styling', label: 'Styling reference' },
  { id: 'api', label: 'API reference' },
  { id: 'keyboard', label: 'Keyboard', sub: true },
  { id: 'related', label: 'Related components' },
];

export default function PalettePage() {
  return (
    <DocPage
      eyebrow="Overlay"
      title="Command palette"
      description="Every command in the app, one keystroke away. It is the only component here with no entrance and no exit, and that is the motion standard's own rule rather than an exception to it."
      marks={marks}
    >
      <H2 id="usage">Usage</H2>

      <Code lang="tsx" code={`import { CommandPalette } from '@carabine/ui/command';`} />

      <Example
        tall
        code={`<CommandPalette
  items={commands}
  onSelect={(item) => go(item.id)}
  placeholder="Type a command…"
  footer={<span>↑↓ to move · ↵ to run · esc to close</span>}
/>`}
      >
        <PaletteBasic />
      </Example>

      <Rule>
        Most palettes have no trigger at all. <code>⌘K</code> is the interface; a button that opens
        it is a convenience for people who have not learned the chord yet.
      </Rule>

      <H2 id="still">Why it does not move</H2>

      <P>
        Every other overlay here animates, and this one does not — because the standard says
        entrances are for things that <em>arrive</em>, and a palette does not arrive. It is summoned
        by a chord, and the person who pressed it is already typing before the first frame would
        have finished. An entrance here is 150ms of the interface not being ready yet.
      </P>

      <P>
        The rule generalises:{' '}
        <strong>the faster a thing is invoked, the less it should move.</strong> A dialog opens once
        and can afford 200ms. A palette opens forty times a day.
      </P>

      <P>
        The active row is still a sliding bar, because that follows a keystroke rather than an
        opening. It is measured from the same box as the rows — <code>offsetTop</code> is border-box
        to border-box, so the bar sits at <code>top: 0</code> inside the padding rather than being
        offset by it, which is a bezel counted twice and reads as every row nudged upward inside its
        own highlight.
      </P>

      <H2 id="examples">Examples</H2>

      <H3 id="filter">Filtering</H3>

      <P>
        The default filter matches every word of the query anywhere in the label, the description or
        the <code>keywords</code> — so <em>&ldquo;dep prod&rdquo;</em> finds{' '}
        <em>Deploy to production</em>. There is no ranking and no fuzzy scoring: the order you
        passed is the order shown, because a palette that reorders itself as you type is a palette
        where the row under your finger is not the one you were about to press.
      </P>

      <Code
        lang="tsx"
        code={`<CommandPalette
  items={commands}
  filter={(item, query) => item.label.toLowerCase().startsWith(query.toLowerCase())}
/>`}
      />

      <H2 id="customization">Customization</H2>

      <Code
        lang="tsx"
        code={`<CommandPalette
  shortcut="p"        // with ⌘ or Ctrl. null registers nothing
  width={640}
  maxHeight={420}     // past this the list scrolls
  radius={14}
  offsetTop="18vh"    // how far down the window it sits
  empty="Nothing by that name"
  theme="light"
/>`}
      />

      <H2 id="styling">Styling reference</H2>

      <P>
        Two bezels, the toast&apos;s: a 6px shell around a core, and the inner radius is the outer
        minus the shell. The rows sit on the core and the active bar spans it edge to edge —{' '}
        <code>left: BEZEL, right: BEZEL</code> — because a highlight that stops short of the frame
        looks like a row that failed to fill.
      </P>

      <P>
        The scrollbar lives in <code>command.css</code>: thin, no track, transparent until the
        pointer is on the list.
      </P>

      <H2 id="api">API reference</H2>

      <Hatch panel />

      <Table
        head={['Prop', 'Type', 'Default', '']}
        rows={[
          ['items', 'CommandItem[]', '[]', ''],
          [
            'onSelect',
            '(item: CommandItem) => void',
            '—',
            'For any command without one of its own',
          ],
          ['children', 'ReactNode', '—', 'A trigger. Most palettes have none'],
          ['open', 'boolean', '—', 'Controlled'],
          ['defaultOpen', 'boolean', 'false', ''],
          ['onOpenChange', '(open: boolean) => void', '—', ''],
          ['shortcut', 'string | null', "'k'", 'With ⌘ or Ctrl. null registers nothing'],
          ['filter', '(item, query) => boolean', 'every word, anywhere', ''],
          ['placeholder', 'string', "'Type a command…'", 'Also the accessible name'],
          ['empty', 'ReactNode', "'No commands'", ''],
          ['footer', 'ReactNode', '—', 'A row along the bottom'],
          ['width', 'number', '560', ''],
          ['maxHeight', 'number', '340', 'Past this the list scrolls'],
          ['radius', 'number', '14', ''],
          ['offsetTop', 'number | string', "'12vh'", 'How far down the window it sits'],
          ['container', 'Element | null', 'document.body', ''],
          ['theme', "'dark' | 'light'", "'dark'", ''],
        ]}
      />

      <P>
        <code>CommandItem</code> carries <code>id</code>, <code>label</code>,{' '}
        <code>description</code>, <code>icon</code>, <code>shortcut</code>, <code>keywords</code>,{' '}
        <code>group</code>, <code>disabled</code> and its own <code>onSelect</code>, which wins over
        the shared handler.
      </P>

      <H3 id="keyboard">Keyboard</H3>

      <Table
        head={['Key', '']}
        rows={[
          ['⌘K / Ctrl K', 'Opens it, unless shortcut is null'],
          ['↑ ↓', 'Walks the results, skipping disabled ones'],
          ['Enter', 'Runs the active one'],
          ['Esc', 'Closes, and focus returns where it was'],
        ]}
      />

      <H2 id="related">Related components</H2>

      <Related current="command-palette" />

      <Around current="command-palette" />
    </DocPage>
  );
}
