import type { Metadata } from 'next';
import { Around, DocPage, H2, P } from '@/components/site/page';
import { Grid } from '@/components/site/Grid';
import { components, groups } from '@/lib/nav';

export const metadata: Metadata = {
  title: 'All components',
  description:
    'Every component in @carabine/ui, grouped the way the roadmap groups them, with the one line that says what each one is.',
};

const marks = [
  { id: 'all', label: 'Everything' },
  { id: 'categories', label: 'The categories' },
];

export default function Components() {
  return (
    <DocPage
      eyebrow="Overview"
      title="All components"
      description={`${components.length} components, each one a flat folder that imports nothing from the others. Every one arrives styled, moving and labelled.`}
      marks={marks}
    >
      <H2 id="all">Everything</H2>

      <Grid />

      <H2 id="categories">The categories</H2>

      <P>
        {groups.map((group) => group.name).join(', ')} — six of them, and they are a claim about
        what a library actually needs rather than a filing system. The rail lists every component in
        one alphabetical run instead, because six headings is six places to look for a name you
        already know.
      </P>
      <Around current="components" />
    </DocPage>
  );
}
