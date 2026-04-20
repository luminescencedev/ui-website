'use client';

import React from 'react';
import { Tooltip } from '@carabine/ui';
import { PageHeader, H2, H3, Codeblock, PropsTable, LiveExample } from '@/components/docs/shared';

export default function TooltipPage() {
  return (
    <div className="docs-page">
      <PageHeader
        badge="Component"
        title="Tooltip"
        description="A contextual popup that appears on hover or focus. Apple/Linear style — frosted glass, smooth enter and exit animations. Compound component API."
      />

      <H2>Usage</H2>
      <LiveExample
        code={`import { Tooltip } from '@carabine/ui';

<Tooltip.Root>
  <Tooltip.Trigger asChild>
    <button>Hover me</button>
  </Tooltip.Trigger>
  <Tooltip.Content>
    Keyboard shortcut  ⌘K
  </Tooltip.Content>
</Tooltip.Root>`}
      >
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { label: 'Inbox', tip: 'Go to inbox   G I' },
            { label: 'My Work', tip: 'Issues assigned to you   G M' },
            { label: 'Projects', tip: 'All projects   G P' },
          ].map(({ label, tip }) => (
            <Tooltip.Root key={label}>
              <Tooltip.Trigger asChild>
                <button
                  style={{
                    padding: '6px 14px',
                    borderRadius: 6,
                    border: 'none',
                    background: 'transparent',
                    color: '#52525b',
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'background 120ms, color 120ms',
                  }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = '#f4f4f5';
                    (e.currentTarget as HTMLButtonElement).style.color = '#09090b';
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                    (e.currentTarget as HTMLButtonElement).style.color = '#52525b';
                  }}
                >
                  {label}
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content>{tip}</Tooltip.Content>
            </Tooltip.Root>
          ))}
        </div>
      </LiveExample>

      <H2>Light variant</H2>
      <Codeblock>{`<Tooltip.Content variant="light">
  Light tooltip
</Tooltip.Content>`}</Codeblock>

      <H2>API Reference</H2>
      <H3>Tooltip.Root</H3>
      <PropsTable
        rows={[
          { name: 'open', type: 'boolean', description: 'Controlled open state.' },
          {
            name: 'defaultOpen',
            type: 'boolean',
            default: 'false',
            description: 'Initial open state (uncontrolled).',
          },
          {
            name: 'onOpenChange',
            type: '(open: boolean) => void',
            description: 'Callback when open state changes.',
          },
          {
            name: 'unstyled',
            type: 'boolean',
            default: 'false',
            description: 'Strip all default styles from all sub-components.',
          },
        ]}
      />
      <H3>Tooltip.Content</H3>
      <PropsTable
        rows={[
          {
            name: 'variant',
            type: '"dark" | "light"',
            default: '"dark"',
            description: 'Visual style of the tooltip popup.',
          },
        ]}
      />
    </div>
  );
}
