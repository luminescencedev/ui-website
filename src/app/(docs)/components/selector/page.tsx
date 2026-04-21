'use client';

import React from 'react';
import { Selector, CopyButton, useSelector } from '@carabine/ui';
import {
  PageHeader,
  H2,
  H3,
  Prose,
  IC,
  Codeblock,
  LiveExample,
  PropsTable,
} from '@/components/docs/shared';

// ─── Code strings ─────────────────────────────────────────────────────────────

const BASIC_CODE = `import { Selector, CopyButton } from '@carabine/ui';

const commands = {
  npm:  'npm install @carabine/ui',
  pnpm: 'pnpm add @carabine/ui',
  yarn: 'yarn add @carabine/ui',
  bun:  'bun add @carabine/ui',
};

<Selector defaultValue="npm">
  <Selector.Header>
    <Selector.Tabs>
      <Selector.Tab value="npm">npm</Selector.Tab>
      <Selector.Tab value="pnpm">pnpm</Selector.Tab>
      <Selector.Tab value="yarn">yarn</Selector.Tab>
      <Selector.Tab value="bun">bun</Selector.Tab>
    </Selector.Tabs>
    <Selector.Actions>
      <CopyButton value={commands[activeTab]} />
    </Selector.Actions>
  </Selector.Header>
  {Object.entries(commands).map(([pm, cmd]) => (
    <Selector.Content key={pm} value={pm}>
      <pre><code>{cmd}</code></pre>
    </Selector.Content>
  ))}
</Selector>`;

const HOOK_CODE = `import { Selector, CopyButton, useSelector } from '@carabine/ui';

// useSelector() reads the active value from Selector context.
// Use it inside any child to build Actions wired to the active tab.

function SmartActions() {
  const { value } = useSelector();
  const commands = {
    npm:  'npm install @carabine/ui',
    pnpm: 'pnpm add @carabine/ui',
    yarn: 'yarn add @carabine/ui',
    bun:  'bun add @carabine/ui',
  };
  return <CopyButton value={commands[value]} />;
}

<Selector defaultValue="npm">
  <Selector.Header>
    <Selector.Tabs>
      <Selector.Tab value="npm">npm</Selector.Tab>
      <Selector.Tab value="pnpm">pnpm</Selector.Tab>
      <Selector.Tab value="yarn">yarn</Selector.Tab>
      <Selector.Tab value="bun">bun</Selector.Tab>
    </Selector.Tabs>
    <Selector.Actions>
      <SmartActions />
    </Selector.Actions>
  </Selector.Header>
  <Selector.Content value="npm"><pre><code>npm install @carabine/ui</code></pre></Selector.Content>
  <Selector.Content value="pnpm"><pre><code>pnpm add @carabine/ui</code></pre></Selector.Content>
  <Selector.Content value="yarn"><pre><code>yarn add @carabine/ui</code></pre></Selector.Content>
  <Selector.Content value="bun"><pre><code>bun add @carabine/ui</code></pre></Selector.Content>
</Selector>`;

const CONTROLLED_CODE = `import { Selector } from '@carabine/ui';

const [tab, setTab] = React.useState('preview');

<Selector value={tab} onValueChange={setTab}>
  <Selector.Header>
    <Selector.Tabs>
      <Selector.Tab value="preview">Preview</Selector.Tab>
      <Selector.Tab value="code">Code</Selector.Tab>
    </Selector.Tabs>
  </Selector.Header>
  <Selector.Content value="preview">
    <p>Live preview goes here.</p>
  </Selector.Content>
  <Selector.Content value="code">
    <pre><code>{'<MyComponent />'}</code></pre>
  </Selector.Content>
</Selector>`;

const HEADLESS_CODE = `import { Selector } from '@carabine/ui';

<Selector unstyled defaultValue="a" className="my-selector">
  <Selector.Header>
    <Selector.Tabs>
      <Selector.Tab value="a">Option A</Selector.Tab>
      <Selector.Tab value="b">Option B</Selector.Tab>
    </Selector.Tabs>
  </Selector.Header>
  <Selector.Content value="a">Content A</Selector.Content>
  <Selector.Content value="b">Content B</Selector.Content>
</Selector>`;

// ─── Live preview helpers ─────────────────────────────────────────────────────

const PM_COMMANDS: Record<string, string> = {
  npm: 'npm install @carabine/ui',
  pnpm: 'pnpm add @carabine/ui',
  yarn: 'yarn add @carabine/ui',
  bun: 'bun add @carabine/ui',
};

const CODE_STYLE: React.CSSProperties = {
  fontFamily: "'SF Mono', 'Geist Mono', ui-monospace, Menlo, Monaco, monospace",
  fontSize: 12.5,
  color: '#1e293b',
  lineHeight: 1.75,
};

function PMPreview() {
  const { value } = useSelector();
  return (
    <pre
      style={{
        margin: 0,
        padding: '16px 24px',
        background: '#fafafa',
      }}
    >
      <code style={CODE_STYLE}>{PM_COMMANDS[value]}</code>
    </pre>
  );
}

function PMCopyAction() {
  const { value } = useSelector();
  return <CopyButton value={PM_COMMANDS[value]} />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SelectorPage() {
  const [controlled, setControlled] = React.useState('preview');

  return (
    <div className="docs-page">
      <PageHeader
        badge="Component"
        title="Selector"
        description="A pill-tab compound component for switching between named content panels. Controlled or uncontrolled, headless-ready."
      />

      <H2>Usage</H2>
      <LiveExample code={BASIC_CODE}>
        <div
          style={{
            width: '100%',
            maxWidth: 480,
            border: '1px solid #ebebeb',
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >
          <Selector defaultValue="npm">
            <Selector.Header>
              <Selector.Tabs>
                {Object.keys(PM_COMMANDS).map((pm) => (
                  <Selector.Tab key={pm} value={pm}>
                    {pm}
                  </Selector.Tab>
                ))}
              </Selector.Tabs>
              <Selector.Actions>
                <PMCopyAction />
              </Selector.Actions>
            </Selector.Header>
            <PMPreview />
          </Selector>
        </div>
      </LiveExample>

      <H2>useSelector hook</H2>
      <Prose>
        <IC>useSelector()</IC> reads <IC>value</IC> and <IC>onValueChange</IC> from the nearest{' '}
        <IC>Selector.Root</IC> context. Use it inside any child component to build actions or
        content wired to the active tab — without prop-drilling.
      </Prose>
      <LiveExample code={HOOK_CODE}>
        <div
          style={{
            width: '100%',
            maxWidth: 480,
            border: '1px solid #ebebeb',
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >
          <Selector defaultValue="npm">
            <Selector.Header>
              <Selector.Tabs>
                {Object.keys(PM_COMMANDS).map((pm) => (
                  <Selector.Tab key={pm} value={pm}>
                    {pm}
                  </Selector.Tab>
                ))}
              </Selector.Tabs>
              <Selector.Actions>
                <PMCopyAction />
              </Selector.Actions>
            </Selector.Header>
            <PMPreview />
          </Selector>
        </div>
      </LiveExample>

      <H2>Controlled</H2>
      <Prose>
        Pass <IC>value</IC> + <IC>onValueChange</IC> to drive the selector from outside.
      </Prose>
      <LiveExample code={CONTROLLED_CODE}>
        <div
          style={{
            width: '100%',
            maxWidth: 340,
            border: '1px solid #ebebeb',
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >
          <Selector value={controlled} onValueChange={setControlled}>
            <Selector.Header>
              <Selector.Tabs>
                <Selector.Tab value="preview">Preview</Selector.Tab>
                <Selector.Tab value="code">Code</Selector.Tab>
              </Selector.Tabs>
            </Selector.Header>
            <Selector.Content value="preview">
              <div style={{ padding: '24px', textAlign: 'center', color: '#555', fontSize: 13 }}>
                Live preview goes here.
              </div>
            </Selector.Content>
            <Selector.Content value="code">
              <pre style={{ margin: 0, padding: '16px 24px', background: '#fafafa' }}>
                <code style={CODE_STYLE}>{'<MyComponent />'}</code>
              </pre>
            </Selector.Content>
          </Selector>
        </div>
      </LiveExample>

      <H2>Headless / Unstyled</H2>
      <Prose>
        Pass <IC>unstyled</IC> on the root to strip all <IC>data-cui-*</IC> attributes and default
        styles. All sub-components become bare semantic elements you can style freely.
      </Prose>
      <Codeblock>{HEADLESS_CODE}</Codeblock>

      <H2>API Reference</H2>

      <H3>Selector.Root</H3>
      <PropsTable
        rows={[
          {
            name: 'defaultValue',
            type: 'string',
            default: '""',
            description: 'The initially active tab value (uncontrolled).',
          },
          {
            name: 'value',
            type: 'string',
            description: 'Active tab value (controlled). Use with onValueChange.',
          },
          {
            name: 'onValueChange',
            type: '(value: string) => void',
            description: 'Callback fired when the active tab changes.',
          },
          {
            name: 'unstyled',
            type: 'boolean',
            default: 'false',
            description: 'Strip all default styles — no data-cui-* attributes attached.',
          },
        ]}
      />

      <H3>Selector.Tab</H3>
      <PropsTable
        rows={[
          {
            name: 'value',
            type: 'string',
            required: true,
            description: 'The value this tab represents. Must match a Selector.Content value.',
          },
        ]}
      />

      <H3>Selector.Content</H3>
      <PropsTable
        rows={[
          {
            name: 'value',
            type: 'string',
            required: true,
            description: 'Renders this panel only when it matches the active Selector value.',
          },
        ]}
      />

      <H2>CSS variables</H2>
      <Codeblock>{`[data-cui-selector] {
  --cui-selector-header-bg: #fafafa;
  --cui-selector-header-border: #ebebeb;
  --cui-selector-tab-color: #aaaaaa;
  --cui-selector-tab-hover-color: #555555;
  --cui-selector-tab-active-color: #111111;
  --cui-selector-tab-active-bg: #ffffff;
  --cui-selector-tab-active-shadow: 0 1px 3px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.06);
}`}</Codeblock>

      <H2>Data attributes</H2>
      <Codeblock>{`/* Target the root */
[data-cui-selector] { }

/* Active tab state */
[data-cui-selector-tab][data-state='active'] { }
[data-cui-selector-tab][data-state='inactive'] { }

/* Slots */
[data-cui-selector-header] { }
[data-cui-selector-tabs] { }
[data-cui-selector-actions] { }
[data-cui-selector-content] { }`}</Codeblock>
    </div>
  );
}
