'use client';

import React from 'react';
import { CopyButton } from '@carabine/ui';
import {
  PageHeader,
  H2,
  Prose,
  IC,
  Codeblock,
  PropsTable,
  LiveExample,
} from '@/components/docs/shared';

const COPY_BUTTON_CODE = `import { CopyButton } from '@carabine/ui';

// Basic
<CopyButton value="npm install @carabine/ui" />

// With callback
<CopyButton
  value={code}
  onCopy={(v) => console.log('copied:', v)}
  duration={3000}
/>

// Unstyled (headless)
<CopyButton value="hello" unstyled className="my-copy-btn" />`;

const sampleCode = `import { CopyButton } from '@carabine/ui';

export function Install() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <code>npm install @carabine/ui</code>
      <CopyButton value="npm install @carabine/ui" />
    </div>
  );
}`;

export default function CopyButtonPage() {
  return (
    <div className="docs-page">
      <PageHeader
        badge="Component"
        title="CopyButton"
        description="A standalone copy-to-clipboard button with smooth icon swap animation. Clipboard SVG draws in idle, checkmark path draws on copy. Works standalone or inside CodePreview."
      />

      <H2>Usage</H2>
      <LiveExample code={COPY_BUTTON_CODE}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <code
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: 13,
                color: '#374151',
                background: '#f4f4f5',
                padding: '4px 10px',
                borderRadius: 6,
              }}
            >
              npm install @carabine/ui
            </code>
            <CopyButton value="npm install @carabine/ui" />
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['pnpm add @carabine/ui', 'yarn add @carabine/ui', 'npm i @carabine/ui'].map((cmd) => (
              <div
                key={cmd}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: '#f8f9fb',
                  border: '1px solid #e4e4e7',
                  borderRadius: 7,
                  padding: '5px 10px',
                }}
              >
                <code
                  style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: '#374151' }}
                >
                  {cmd}
                </code>
                <CopyButton value={cmd} />
              </div>
            ))}
          </div>
        </div>
      </LiveExample>

      <H2>Inside CodePreview</H2>
      <Prose>
        <IC>CodePreview.CopyButton</IC> is now powered by <IC>CopyButton</IC> internally — the same
        animation, zero duplication.
      </Prose>
      <LiveExample code={sampleCode}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'ui-monospace, monospace',
            fontSize: 13,
          }}
        >
          <code
            style={{
              background: '#f4f4f5',
              padding: '4px 10px',
              borderRadius: 6,
              color: '#374151',
            }}
          >
            npm install @carabine/ui
          </code>
          <CopyButton value="npm install @carabine/ui" />
        </div>
      </LiveExample>

      <H2>API Reference</H2>
      <PropsTable
        rows={[
          {
            name: 'value',
            type: 'string',
            required: true,
            description: 'Text written to the clipboard on click.',
          },
          {
            name: 'duration',
            type: 'number',
            default: '2000',
            description: 'How long (ms) to show the "copied" checkmark before reverting.',
          },
          {
            name: 'onCopy',
            type: '(value: string) => void',
            description: 'Callback fired after a successful copy, receives the copied value.',
          },
          {
            name: 'unstyled',
            type: 'boolean',
            default: 'false',
            description: 'Strip all default styles — no data-cui-* attributes attached.',
          },
        ]}
      />

      <H2>CSS states</H2>
      <Codeblock>{`/* Idle — default ghost button */
[data-cui-copy-button][data-state='idle'] { }

/* Copied — green tint for 2 s */
[data-cui-copy-button][data-state='copied'] { }

/* Override the size */
[data-cui-copy-button] {
  --cb-size: 28px;
  --cb-radius: 5px;
}`}</Codeblock>
    </div>
  );
}
