import type { Metadata } from 'next';
import { Code } from '@/components/site/Code';
import { Example } from '@/components/site/Example';
import { Around, DocPage, H2, H3, P, Related, Rule, Table, Hatch } from '@/components/site/page';
import { ProgressBar, ProgressBasic, ProgressRange } from '@/components/site/demos/surfaces';

export const metadata: Metadata = {
  title: 'Progress',
  description:
    "How far along, or that it is still going. The toast's strip in another tense — the same cells, filling instead of burning down.",
};

const marks = [
  { id: 'usage', label: 'Usage' },
  { id: 'strip', label: 'The toast’s strip' },
  { id: 'examples', label: 'Examples' },
  { id: 'range', label: 'Its own range', sub: true },
  { id: 'bar', label: 'The bar variant', sub: true },
  { id: 'customization', label: 'Customization' },
  { id: 'styling', label: 'Styling reference' },
  { id: 'api', label: 'API reference' },
  { id: 'related', label: 'Related components' },
];

export default function ProgressPage() {
  return (
    <DocPage
      eyebrow="Feedback"
      title="Progress"
      description="How far along, or that it is still going. It is the toast's countdown strip in another tense, and that is not a coincidence — it is the same file, copied."
      marks={marks}
    >
      <H2 id="usage">Usage</H2>

      <Code lang="tsx" code={`import { Progress } from '@carabine/ui/progress';`} />

      <Example
        code={`<Progress value={62} showValue label="Uploading photos" />
<Progress label="Working" />   // no value at all — not zero — is indeterminate`}
      >
        <ProgressBasic />
      </Example>

      <Rule>
        Leaving <code>value</code> out is indeterminate. Passing <code>0</code> is nought per cent,
        and the two mean different things — a bar that cannot tell them apart says
        &ldquo;stuck&rdquo; when it means &ldquo;working&rdquo;.
      </Rule>

      <H2 id="strip">The toast’s strip</H2>

      <P>
        Two rows of small cells, three colours per side, and a scatter pattern held as two strings
        so the lit cells never form a stripe. The toast burns it down as a card&apos;s life runs
        out; this fills it left to right. One deliberate difference in direction, everything else
        the same.
      </P>

      <Code
        lang="tsx"
        code={`const SCATTER = ['1021120210112021012210120112', '0112021120210112201101221012'];`}
      />

      <P>
        The snake — the travelling highlight on an indeterminate strip — runs at 1.7s with{' '}
        <code>--row * 0.09s</code> of phase, so the two rows do not pulse in lockstep. Both are in{' '}
        <code>progress.css</code>: a keyframe driven by a per-element custom property is not
        something a utility can say.
      </P>

      <H2 id="examples">Examples</H2>

      <H3 id="range">Its own range</H3>

      <P>
        <code>min</code> and <code>max</code> are whatever the thing actually counts, and{' '}
        <code>format</code> writes both what is drawn and what is announced — from one place,
        because two formatters is how a bar ends up reading &ldquo;62%&rdquo; and saying
        &ldquo;0.62&rdquo;.
      </P>

      <Example
        code={`<Progress
  value={3}
  max={7}
  showValue
  format={(step) => \`\${step}/7\`}
  label="Step three of seven"
/>`}
      >
        <ProgressRange />
      </Example>

      <H3 id="bar">The bar variant</H3>

      <Example code={`<Progress variant="bar" value={78} height={8} showValue label="Disk" />`}>
        <ProgressBar />
      </Example>

      <H2 id="customization">Customization</H2>

      <P>
        <code>height</code> is the whole strip rather than one cell, so a row count can change
        without the component changing size: <code>11 = 2 × 4 + 3</code>.
      </P>

      <Code
        lang="tsx"
        code={`import { Progress, tones } from '@carabine/ui/progress';

<Progress
  value={value}
  cells={36}                 // across. Capped at 120
  rows={3}                   // lines. Capped at 4
  height={14}                // the whole strip, lines and gaps included
  gap={2}
  color={tones.success}      // one colour, or three brightest first
  track="rgba(255,255,255,0.06)"
  theme="light"
/>`}
      />

      <P>
        <code>tones</code> is exported — the toast&apos;s four states as triples — so a strip that
        turns green on completion uses the same green the toast does rather than one that nearly
        matches.
      </P>

      <H2 id="styling">Styling reference</H2>

      <P>
        Colours are plain CSS strings, one or three of them. Three is what makes the strip read as
        material rather than as a fill: the lit cells are not one colour but a scatter of three
        shades, and so is the spent side.
      </P>

      <H2 id="api">API reference</H2>

      <Hatch />

      <P>
        <code>Shades</code> is <code>string | [string, string, string]</code> — one colour, or three
        brightest first.
      </P>

      <Table
        head={['Prop', 'Type', 'Default', '']}
        rows={[
          ['value', 'number', '—', 'Leave out for indeterminate'],
          ['min', 'number', '0', ''],
          ['max', 'number', '100', ''],
          ['variant', "'cells' | 'bar'", "'cells'", ''],
          ['cells', 'number', '28', 'Across. Capped at 120'],
          ['rows', 'number', '2', 'Lines. Capped at 4'],
          ['height', 'number', '11', 'The whole strip, lines and gaps included'],
          ['radius', 'number', '1 / half the height', 'Cells, then bar'],
          ['gap', 'number', '3', 'Between the cells, both ways'],
          ['color', 'Shades', "the toast's neutral", 'What the filled part is'],
          ['track', 'Shades', "the toast's spent", 'What the empty part is'],
          ['showValue', 'boolean', 'false', 'The number, after the strip'],
          ['format', '(value, ratio) => string', "'62%'", 'The number and the announcement'],
          ['label', 'string', "'Progress'", ''],
          ['theme', "'dark' | 'light'", "'dark'", ''],
        ]}
      />

      <H2 id="related">Related components</H2>

      <Related current="progress" />

      <Around current="progress" />
    </DocPage>
  );
}
