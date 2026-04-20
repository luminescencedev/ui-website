'use client';

import React from 'react';
import { CodePreview } from '@carabine/ui';
import { Toast } from '@/components/Toast';
import { PageHeader, H2, H3, PropsTable } from '@/components/docs/shared';

const CODE_PREVIEW_CODE = `import { CodePreview } from '@carabine/ui';

const code = \`export function Hello() {
  return <p>Hello world!</p>;
}\`;

<CodePreview code={code}>
  <CodePreview.Header>
    <CodePreview.Tabs>
      <CodePreview.Tab view="preview">Preview</CodePreview.Tab>
      <CodePreview.Tab view="code">Code</CodePreview.Tab>
    </CodePreview.Tabs>
    <CodePreview.Actions>
      <CodePreview.CopyButton />
    </CodePreview.Actions>
  </CodePreview.Header>
  <CodePreview.Content>
    <CodePreview.Preview>
      <Hello />
    </CodePreview.Preview>
    <CodePreview.Code />
  </CodePreview.Content>
</CodePreview>`;

export default function CodePreviewPage() {
  const [showToast, setShowToast] = React.useState(false);

  return (
    <div className="docs-page">
      <PageHeader
        badge="Component"
        title="CodePreview"
        description="A compound component for displaying a live UI preview alongside its source code. Includes tab switching and a one-click copy button."
      />

      <H2>Usage</H2>
      <CodePreview code={CODE_PREVIEW_CODE}>
        <CodePreview.Header>
          <CodePreview.Tabs>
            <CodePreview.Tab view="preview">Preview</CodePreview.Tab>
            <CodePreview.Tab view="code">Code</CodePreview.Tab>
          </CodePreview.Tabs>
          <CodePreview.Actions>
            <CodePreview.CopyButton />
          </CodePreview.Actions>
        </CodePreview.Header>
        <CodePreview.Content>
          <CodePreview.Preview>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                alignItems: 'center',
                width: '100%',
                maxWidth: 420,
              }}
            >
              <button
                onClick={() => setShowToast((v) => !v)}
                style={{
                  padding: '8px 20px',
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#09090b',
                  background: '#fff',
                  border: '1px solid #e4e4e7',
                  borderRadius: 7,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }}
              >
                Render toast
              </button>
              {showToast && (
                <Toast
                  id={1}
                  title="Successfully saved!"
                  description="Your changes have been saved to the server."
                  button={{ label: 'Undo', onClick: () => setShowToast(false) }}
                />
              )}
            </div>
          </CodePreview.Preview>
          <CodePreview.Code />
        </CodePreview.Content>
      </CodePreview>

      <H2>API Reference</H2>
      <H3>CodePreview.Root</H3>
      <PropsTable
        rows={[
          {
            name: 'code',
            type: 'string',
            required: true,
            description: 'The source code string to display in the Code tab and to copy.',
          },
          {
            name: 'defaultView',
            type: '"preview" | "code"',
            default: '"preview"',
            description: 'Which tab is active on initial render.',
          },
          {
            name: 'unstyled',
            type: 'boolean',
            default: 'false',
            description: 'Strip all default styles from all sub-components.',
          },
        ]}
      />
      <H3>CodePreview.Tab</H3>
      <PropsTable
        rows={[
          {
            name: 'view',
            type: '"preview" | "code"',
            required: true,
            description: 'Which panel this tab activates when clicked.',
          },
          {
            name: 'icon',
            type: 'ReactNode',
            description: 'Optional icon rendered before the tab label.',
          },
        ]}
      />
      <H3>CodePreview.CopyButton</H3>
      <PropsTable
        rows={[
          {
            name: 'copyLabel',
            type: 'string',
            default: '"Copy Code"',
            description: 'Label shown in idle state.',
          },
          {
            name: 'copiedLabel',
            type: 'string',
            default: '"✓ Copied"',
            description: 'Label shown for 2 seconds after copying.',
          },
        ]}
      />
    </div>
  );
}
