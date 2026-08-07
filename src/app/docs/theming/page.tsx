import type { Metadata } from 'next';
import { Code } from '@/components/site/Code';
import { Around, DocPage, H2, H3, P, Rule, Table } from '@/components/site/page';

export const metadata: Metadata = {
  title: 'Theming',
  description:
    'Both palettes written out, the theme as a prop, colours that identify a variant as data — and the two ways to get the stylesheet in.',
};

const marks = [
  { id: 'prop', label: 'The theme is a prop' },
  { id: 'identity', label: 'Colours that identify' },
  { id: 'hatch', label: 'className, style and data-*' },
  { id: 'material', label: 'The material' },
  { id: 'stylesheet', label: 'Getting the styles in' },
  { id: 'layers', label: 'Two Tailwind builds', sub: true },
  { id: 'tokens', label: 'What not to override', sub: true },
];

export default function ThemingPage() {
  return (
    <DocPage
      eyebrow="Getting started"
      title="Theming"
      description="Both palettes are written out, the theme is a prop, and anything that identifies one state from another is data rather than a class."
      marks={marks}
    >
      <H2 id="prop">The theme is a prop</H2>

      <Rule>
        There is not one <code>dark:</code> variant in this library.
      </Rule>

      <P>
        <code>dark:</code> resolves from the operating system, so it fires on a light-themed page
        running on a dark-mode machine — a component that is correct in isolation and wrong on the
        page that embeds it. Every component takes <code>theme</code>, and both palettes are written
        out as plain values.
      </P>

      <Code
        lang="tsx"
        code={`<Slider theme="light" defaultValue={40} />
<Toaster theme={theme} />        // one value, threaded from wherever you keep it`}
      />

      <P>
        There is no provider and no context, which is deliberate: a context would make the theme
        ambient, and an ambient theme is one more thing that can be wrong somewhere you are not
        looking. If threading a prop through your tree is tedious, wrap the components you use once
        — that wrapper is three lines and it is yours.
      </P>

      <Code
        lang="tsx"
        code={`// your app, not the library
const ThemeContext = createContext<'dark' | 'light'>('dark');

export function Button(props: ButtonProps) {
  return <CarabineButton theme={useContext(ThemeContext)} {...props} />;
}`}
      />

      <H2 id="identity">Colours that identify are data</H2>

      <P>
        A consumer cannot override <code>bg-green-500</code> buried in a component. So anything that
        distinguishes one state from another is an object of plain CSS colour strings, merged over
        the defaults, with the key set left open. Structure — padding, radius, layout — stays in
        utilities, where nobody needs to reach it.
      </P>

      <Table
        head={['Component', 'The prop', 'What it holds']}
        rows={[
          [
            'Toast',
            'tones',
            'Per state: an icon, a colour per theme, three strip shades, an action',
          ],
          ['Button', 'variants', 'Per variant: background, colour, ring, hover, sweep — per theme'],
          [
            'Switch',
            'skin',
            'Track, thumb and rings — merged over the theme’s, one field at a time',
          ],
          ['Hover list', 'bar', 'One plain CSS string: the colour of the sliding bar'],
          ['Progress', 'color / track', 'One colour, or three brightest first'],
          ['Color picker', 'rings', 'The whole palette — it replaces rather than merges'],
        ]}
      />

      <P>
        Two shapes, and the difference matters. <code>tones</code>, <code>variants</code> and{' '}
        <code>skin</code> are <strong>merged</strong>, so one field changes without restating the
        rest. <code>rings</code> <strong>replaces</strong>, because a colour set is a whole rather
        than a table of variants to patch.
      </P>

      <H2 id="hatch">className, style and data-*</H2>

      <P>
        Colours are data and dimensions are props, and neither covers a margin, a font, a shadow, or
        a class from your own system. So{' '}
        <strong>every component takes `className` and `style`</strong>, merged <em>after</em> its
        own — yours wins, without <code>!important</code> and without having to know what was
        already there.
      </P>

      <Code
        lang="tsx"
        code={`<Accordion items={faq} className="my-8 font-serif" />
<Slider label="Volume" style={{ maxWidth: 320 }} />`}
      />

      <P>
        On the eight components that portal a panel — popover, menu, tooltip, dialog, drawer,
        select, command palette, colour picker — they land on the <strong>panel</strong>. The
        trigger is already your element: you style it where you write it, and the panel is the part
        that portals away from your markup and is otherwise out of reach.
      </P>

      <H3 id="hatch-state">State, in the markup</H3>

      <P>
        So a rule can answer <em>which state is this</em> without knowing a single class name of
        ours.
      </P>

      <Code
        lang="css"
        code={`[data-state='open'] { … }      /* dialog, drawer, menu, popover, select, accordion header */
[data-state='on'] { … }        /* switch */
[data-state='loading'] { … }   /* skeleton */
[data-state='indeterminate'] { … }  /* progress */
[data-disabled] { … }
[data-side='left'] { … }       /* drawer, and anything anchored */`}
      />

      <Rule>
        States only, and deliberately no <code>data-part</code> on every internal node. Naming the
        parts would make the internal structure a public contract, and this library keeps one public
        surface, not two.
      </Rule>

      <H2 id="material">The material</H2>

      <P>
        Two rules decide what a surface may be, and they are not negotiable. A <strong>tint</strong>{' '}
        may be translucent — it has no hairline and no shadow, and letting the surface show through
        is the point. An <strong>object</strong> may not: it carries a hairline or a shadow, so it
        claims to rest on top of something, and you cannot see through a thing that is on top of
        another thing. A <strong>field</strong> is neither — it is a hole, and a hole is opaque
        because you read against it.
      </P>

      <Table
        head={['', 'Dark', 'Light', 'Where']}
        rows={[
          ['Shell', 'zinc-950/60', 'zinc-100/60', 'Only ever seen as a ring around a core'],
          ['Core', 'zinc-900/85', 'white/90', 'What content sits on'],
          ['Tooltip', 'zinc-900/95', 'white/95', 'Denser: it is small and lands on anything'],
        ]}
      />

      <P>
        A single-layer panel is a <em>core</em>, not a shell. And the toast&apos;s core is opaque —
        the one exception in the library, because a card floats over another copy of itself.
      </P>

      <H2 id="stylesheet">Getting the styles in</H2>

      <P>Two paths, and they are both supported.</P>

      <Code
        lang="css"
        code={`/* 1. Import the compiled stylesheet. Nothing else to configure. */
@import '@carabine/ui/styles.css';

/* 2. Or point your own Tailwind at the package, and let it generate them. */
@import 'tailwindcss';
@source '../node_modules/@carabine/ui/dist';`}
      />

      <H3 id="layers">Two Tailwind builds on one page</H3>

      <P>
        If you take the first path <em>and</em> run Tailwind yourself, you have two builds writing
        into <code>@layer utilities</code>. For anything they both define, the cascade falls back to
        document order — so whichever is imported second wins, and that is usually the library.
      </P>

      <P>
        It matters in exactly one place: <code>display</code>. If a class of yours toggles it —{' '}
        <code>hidden lg:flex</code> on your own markup — the library&apos;s <code>.hidden</code> can
        land after your <code>.lg\:flex</code> and quietly win. Write those toggles in plain CSS,
        outside every layer, where nothing named <code>.hidden</code> can reach them.
      </P>

      <P>
        What does <strong>not</strong> work is putting the library in a lower cascade layer: below{' '}
        <code>base</code> sits Tailwind&apos;s preflight, whose{' '}
        <code>*, ::before, ::after {'{ margin: 0; padding: 0 }'}</code> then beats every{' '}
        <code>px-3.5</code> in every component. The library ships without preflight on purpose — a
        package that resets a consumer&apos;s page is a package nobody keeps.
      </P>

      <H3 id="tokens">What not to override</H3>

      <P>
        Do not retune Tailwind&apos;s shared theme keys — <code>--radius-*</code>,{' '}
        <code>--spacing</code> — in a project that uses these components. Their radii are{' '}
        <em>concentric by construction</em>: an inner corner is the outer minus the bezel, and a
        theme that moves one of the two moves them out of agreement. It looks like a broken
        component, and it is a broken theme.
      </P>

      <Rule>
        A consumer&apos;s theme is not a safe place to keep a component&apos;s arithmetic. Give the
        site its own token names instead.
      </Rule>

      <Around current="theming" />
    </DocPage>
  );
}
