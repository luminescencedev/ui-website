import type { Metadata } from 'next';
import { Code } from '@/components/site/Code';
import { Example } from '@/components/site/Example';
import { Around, DocPage, H2, H3, P, Related, Rule, Table, Hatch } from '@/components/site/page';
import { SkeletonInline, SkeletonShapes, SkeletonSwap } from '@/components/site/demos/surfaces';

export const metadata: Metadata = {
  title: 'Skeleton',
  description:
    'The wait, and the moment it ends. The swap is the component; the shimmer is the part everyone copies and the least important thing about it.',
};

const marks = [
  { id: 'usage', label: 'Usage' },
  { id: 'swap', label: 'The swap is the component' },
  { id: 'examples', label: 'Examples' },
  { id: 'shapes', label: 'Shapes', sub: true },
  { id: 'inline', label: 'In a line of text', sub: true },
  { id: 'customization', label: 'Customization' },
  { id: 'styling', label: 'Styling reference' },
  { id: 'api', label: 'API reference' },
  { id: 'related', label: 'Related components' },
];

export default function SkeletonPage() {
  return (
    <DocPage
      eyebrow="Feedback"
      title="Skeleton"
      description="The wait, and the moment it ends. Most skeletons are a grey box with a shimmer; the interesting part is what happens when the content arrives."
      marks={marks}
    >
      <H2 id="usage">Usage</H2>

      <Code lang="tsx" code={`import { Skeleton } from '@carabine/ui/skeleton';`} />

      <Example
        code={`<Skeleton loading={!user} width={['70%', '100%', '86%']} height={11} gap={9}>
  <Profile user={user} />
</Skeleton>`}
      >
        <SkeletonSwap />
      </Example>

      <Rule>
        An array of widths <strong>is</strong> the bars — one entry each. A line count and a width
        are two ways of saying the same thing, and they disagree the first time somebody sets both.
      </Rule>

      <H2 id="swap">The swap is the component</H2>

      <P>
        Both states live in <em>one grid cell</em>, stacked, so nothing reflows when they trade
        places. The placeholder leaves over 140ms with a blur; the content arrives over 220ms
        without one and with no entrance of its own. Out faster than in, and the two overlap — which
        is what makes it a crossfade rather than a flicker of empty space between them.
      </P>

      <P>
        The bars are the placeholder, not the point. If you take one thing from this component, take
        the grid cell.
      </P>

      <H2 id="examples">Examples</H2>

      <H3 id="shapes">Shapes</H3>

      <P>
        <code>circle</code> for an avatar, <code>ratio</code> for anything with a known aspect,{' '}
        <code>fill</code> for a box that is already sized by its parent. Under a <code>ratio</code>{' '}
        the height follows the width, so the reserved space is the real space and nothing jumps when
        the image lands.
      </P>

      <Example
        code={`<Skeleton circle height={44} />
<Skeleton width={['80%', '55%']} height={10} gap={8} />
<Skeleton ratio={16 / 9} radius={10} />`}
      >
        <SkeletonShapes />
      </Example>

      <H3 id="inline">In a line of text</H3>

      <P>
        <code>inline</code> sits in a sentence instead of owning a block. It aligns on the{' '}
        <strong>baseline</strong>, which needed a nudge: a grid with no baseline-aligned items
        synthesises one from the border box, so the box&apos;s height was driving the alignment and
        the word climbed as the placeholder left.
      </P>

      <Code
        lang="tsx"
        code={`alignItems: inline ? 'baseline' : undefined,          // on the wrapper
transform: inline ? 'translateY(0.14em)' : undefined, // on the bar`}
      />

      <Example
        code={`<p>
  Deployed to{' '}
  <Skeleton loading={loading} inline width={72} height={11}>
    <strong>eu-west-1</strong>
  </Skeleton>{' '}
  in 42 seconds.
</p>`}
      >
        <SkeletonInline />
      </Example>

      <H2 id="customization">Customization</H2>

      <Code
        lang="tsx"
        code={`<Skeleton
  lines={3}          // how many bars, when width is not an array
  height={12}        // one bar's height; the diameter when circle
  last="62%"         // the last bar's width, when there is a stack
  gap={8}
  radius={6}
  shimmer={false}    // no travelling light
  placeholder={<YourShape />}   // a shape of your own, instead of the bars
  label="Loading the profile"
/>`}
      />

      <H2 id="styling">Styling reference</H2>

      <P>
        Tailwind utilities plus <code>skeleton.css</code>, which carries the shimmer&apos;s keyframe
        and its per-bar phase — <code>--i</code> on each bar, so the light crosses the stack at an
        angle rather than every bar flashing at once.
      </P>

      <P>
        <code>prefers-reduced-motion</code> drops the shimmer entirely and keeps the crossfade: the
        travelling light is decoration, but the swap carries the meaning.
      </P>

      <H2 id="api">API reference</H2>

      <Hatch />

      <P>
        <code>Length</code> is <code>number | string</code> — pixels, or any CSS length.
      </P>

      <Table
        head={['Prop', 'Type', 'Default', '']}
        rows={[
          ['loading', 'boolean', 'true', 'false swaps to children'],
          ['children', 'ReactNode', '—', 'What is coming. Without it, this is a shape'],
          ['placeholder', 'ReactNode', '—', 'A shape of your own, instead of the bars'],
          ['lines', 'number', '1', 'How many bars'],
          ['width', 'Length | Length[]', "'100%'", 'An array is the bars, one entry each'],
          ['height', 'Length', '12', 'One bar’s height; the diameter when circle'],
          ['last', 'Length', "'62%'", 'The last bar’s width, when there is a stack'],
          ['gap', 'number', '8', 'Between the bars'],
          ['radius', 'Length', '6', ''],
          ['circle', 'boolean', 'false', 'One round bar, height across'],
          ['ratio', 'number', '—', '16 / 9. The height follows the width'],
          ['fill', 'boolean', 'false', 'Take the parent, for a box that is already sized'],
          ['inline', 'boolean', 'false', 'Sit in a line of text instead of owning a block'],
          ['shimmer', 'boolean', 'true', 'The light travelling across'],
          ['label', 'string', "'Loading'", 'Read out while the placeholder is up'],
          ['theme', "'dark' | 'light'", "'dark'", ''],
        ]}
      />

      <H2 id="related">Related components</H2>

      <Related current="skeleton" />

      <Around current="skeleton" />
    </DocPage>
  );
}
