import React from 'react';
import { PageHeader, H2, Prose, IC, Codeblock, PropsTable } from '@/components/docs/shared';

export const metadata = {
  title: 'CSS Variables — carabine/ui',
};

export default function CSSVariablesPage() {
  return (
    <div className="docs-page">
      <PageHeader
        badge="Styling"
        title="CSS Variables"
        description="Override design tokens at any scope — globally, per page, or per component instance — without touching component source code."
      />

      <H2>Global theme override</H2>
      <Prose>
        Place CSS variable overrides in your global stylesheet. All components in the document will
        pick them up.
      </Prose>
      <Codeblock>{`:root {
  /* Toggle */
  --cui-toggle-width: 48px;
  --cui-toggle-height: 26px;
  --cui-toggle-on-bg: #10b981;   /* emerald-500 */
  --cui-toggle-off-bg: #e4e4e7;

  /* Tooltip */
  --cui-tooltip-bg: #1e293b;
  --cui-tooltip-radius: 8px;
  --cui-tooltip-font-size: 12px;

  /* CopyButton */
  --cb-size: 32px;
  --cb-radius: 6px;
}`}</Codeblock>

      <H2>Scoped override</H2>
      <Prose>
        Wrap a section in a container with a custom class to scope tokens without affecting the rest
        of the page.
      </Prose>
      <Codeblock>{`.dark-panel {
  --cui-toggle-on-bg: #818cf8;
  --cui-tooltip-bg: #f4f4f5;
  --cui-tooltip-text: #09090b;
}

<div className="dark-panel">
  <Toggle checked={on} onCheckedChange={setOn} />
  <Tooltip.Root>...</Tooltip.Root>
</div>`}</Codeblock>

      <H2>Per-component inline override</H2>
      <Prose>
        Pass <IC>style</IC> directly on the component to override variables on that single instance.
      </Prose>
      <Codeblock>{`<Toggle
  checked={on}
  onCheckedChange={setOn}
  style={{ '--cui-toggle-on-bg': '#f43f5e' } as React.CSSProperties}
/>`}</Codeblock>

      <H2>Available tokens</H2>
      <PropsTable
        rows={[
          {
            name: '--cui-toggle-width',
            type: 'length',
            default: '40px',
            description: 'Track width.',
          },
          {
            name: '--cui-toggle-height',
            type: 'length',
            default: '22px',
            description: 'Track height.',
          },
          {
            name: '--cui-toggle-on-bg',
            type: 'color',
            default: '#09090b',
            description: 'Track color when checked.',
          },
          {
            name: '--cui-toggle-off-bg',
            type: 'color',
            default: '#e4e4e7',
            description: 'Track color when unchecked.',
          },
          {
            name: '--cui-tooltip-bg',
            type: 'color',
            default: 'rgba(23,23,23,0.92)',
            description: 'Tooltip background.',
          },
          {
            name: '--cui-tooltip-radius',
            type: 'length',
            default: '7px',
            description: 'Tooltip border-radius.',
          },
          {
            name: '--cui-tooltip-font-size',
            type: 'length',
            default: '12px',
            description: 'Tooltip text size.',
          },
          {
            name: '--cb-size',
            type: 'length',
            default: '28px',
            description: 'CopyButton icon button size.',
          },
          {
            name: '--cb-radius',
            type: 'length',
            default: '5px',
            description: 'CopyButton border-radius.',
          },
        ]}
      />

      <H2>Dark mode</H2>
      <Prose>
        Swap tokens inside a <IC>.dark</IC> class or <IC>prefers-color-scheme</IC> media query for
        instant dark mode support.
      </Prose>
      <Codeblock>{`@media (prefers-color-scheme: dark) {
  :root {
    --cui-toggle-off-bg: #3f3f46;
    --cui-tooltip-bg: #fafafa;
    --cui-tooltip-text: #09090b;
  }
}

/* or class-based (e.g. next-themes) */
.dark {
  --cui-toggle-off-bg: #3f3f46;
  --cui-tooltip-bg: #fafafa;
  --cui-tooltip-text: #09090b;
}`}</Codeblock>
    </div>
  );
}
