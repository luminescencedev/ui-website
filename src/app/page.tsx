'use client';

import React from 'react';
import { Primitive, cn, Tooltip, Toggle, CodePreview, CopyButton } from '@carabine/ui';
import { Toast } from '@/components/Toast';

// ─── Types ────────────────────────────────────────────────────────────────────

type PageId =
  | 'introduction'
  | 'installation'
  | 'primitive'
  | 'cn'
  | 'tooltip'
  | 'toggle'
  | 'code-preview'
  | 'copy-button';

// ─── Navigation config ────────────────────────────────────────────────────────

const NAV: Array<{ title: string; items: Array<{ id: PageId; label: string }> }> = [
  {
    title: 'Getting Started',
    items: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'installation', label: 'Installation' },
    ],
  },
  {
    title: 'Core',
    items: [
      { id: 'primitive', label: 'Primitive' },
      { id: 'cn', label: 'cn()' },
    ],
  },
  {
    title: 'Components',
    items: [
      { id: 'tooltip', label: 'Tooltip' },
      { id: 'toggle', label: 'Toggle' },
      { id: 'code-preview', label: 'CodePreview' },
      { id: 'copy-button', label: 'CopyButton' },
    ],
  },
];

// ─── Shared UI helpers ────────────────────────────────────────────────────────

function PageHeader({
  badge,
  title,
  description,
}: {
  badge?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-header">
      {badge && <span className="page-badge">{badge}</span>}
      <h1 className="page-title">{title}</h1>
      <p className="page-desc">{description}</p>
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="section-h2">{children}</h2>;
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="section-h3">{children}</h3>;
}

function Prose({ children }: { children: React.ReactNode }) {
  return <p className="prose">{children}</p>;
}

function IC({ children }: { children: React.ReactNode }) {
  return <code className="ic">{children}</code>;
}

function Codeblock({ children }: { children: string }) {
  return (
    <div className="codeblock">
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}

type PropRow = {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
};

function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="props-wrap">
      <table className="props-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <td>
                <code className="prop-name">
                  {r.name}
                  {r.required && <span className="prop-req">*</span>}
                </code>
              </td>
              <td>
                <code className="prop-type">{r.type}</code>
              </td>
              <td>
                {r.default ? (
                  <code className="prop-default">{r.default}</code>
                ) : (
                  <span className="prop-empty">—</span>
                )}
              </td>
              <td className="prop-desc">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LiveExample({ code, children }: { code: string; children: React.ReactNode }) {
  return (
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
        <CodePreview.Preview>{children}</CodePreview.Preview>
        <CodePreview.Code />
      </CodePreview.Content>
    </CodePreview>
  );
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function IntroductionPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <div className="docs-page">
      <PageHeader
        title="@carabine/ui"
        description="A React component library — styled by default, headless when you want. Styles inject at runtime via data-cui-* attributes. No CSS import needed by consumers."
      />

      <div className="intro-cards">
        {[
          {
            id: 'installation' as PageId,
            icon: '⚡',
            title: 'Quick Start',
            desc: 'Install and configure in minutes.',
          },
          {
            id: 'primitive' as PageId,
            icon: '⬡',
            title: 'Primitive',
            desc: 'The base element powering every component.',
          },
          {
            id: 'tooltip' as PageId,
            icon: '◎',
            title: 'Components',
            desc: 'Tooltip, Toggle, CodePreview and more.',
          },
        ].map((card) => (
          <button key={card.id} className="intro-card" onClick={() => onNavigate(card.id)}>
            <span className="intro-card-icon">{card.icon}</span>
            <span className="intro-card-title">{card.title}</span>
            <span className="intro-card-desc">{card.desc}</span>
          </button>
        ))}
      </div>

      <H2>Features</H2>
      <ul className="feature-list">
        <li>
          <strong>Zero CSS imports</strong> — styles inject automatically at runtime.
        </li>
        <li>
          <strong>Headless mode</strong> — pass <IC>unstyled</IC> to strip all defaults.
        </li>
        <li>
          <strong>asChild</strong> — compose onto your own elements (Radix pattern).
        </li>
        <li>
          <strong>React 19</strong> — no <IC>forwardRef</IC>, refs are plain props.
        </li>
        <li>
          <strong>Tree-shakeable</strong> — per-component sub-path imports.
        </li>
      </ul>
    </div>
  );
}

function InstallationPage() {
  return (
    <div className="docs-page">
      <PageHeader
        badge="Getting Started"
        title="Installation"
        description="Get @carabine/ui running in your React project in under a minute."
      />

      <H2>Install the package</H2>
      <Codeblock>{`npm install @carabine/ui
# or
pnpm add @carabine/ui
# or
yarn add @carabine/ui`}</Codeblock>

      <H2>Peer dependencies</H2>
      <Prose>Requires React 18 or 19 and react-dom.</Prose>
      <Codeblock>{`npm install react react-dom`}</Codeblock>

      <H2>Usage</H2>
      <Prose>
        Import directly. No CSS file to configure — styles are bundled and injected automatically.
      </Prose>
      <Codeblock>{`import { Tooltip, Toggle, CodePreview } from '@carabine/ui';

// Sub-path imports for better tree-shaking
import { Tooltip }     from '@carabine/ui/tooltip';
import { Toggle }      from '@carabine/ui/toggle';
import { CodePreview } from '@carabine/ui/code-preview';`}</Codeblock>
    </div>
  );
}

const PRIMITIVE_CODE = `import { Primitive } from '@carabine/ui';

// Renders a <p>
<Primitive element="p">Hello</Primitive>

// Renders a <button>
<Primitive element="button" onClick={() => alert('!')}>
  Click me
</Primitive>

// asChild — merges props onto the child element
<Primitive asChild className="link">
  <a href="/about">About</a>
</Primitive>`;

function PrimitivePage() {
  return (
    <div className="docs-page">
      <PageHeader
        badge="Core"
        title="Primitive"
        description="The foundation of every component. Handles element type, asChild composition, unstyled mode, ref merging, class merging, and event chaining."
      />

      <H2>Usage</H2>
      <LiveExample code={PRIMITIVE_CODE}>
        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}
        >
          <Primitive element="p" style={{ fontSize: 14, color: '#374151', fontFamily: 'inherit' }}>
            I&apos;m a &lt;p&gt; via Primitive
          </Primitive>
          <Primitive
            element="button"
            style={{
              padding: '6px 14px',
              border: '1px solid #e4e4e7',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 13,
              fontFamily: 'inherit',
              background: '#fff',
              color: '#09090b',
            }}
          >
            I&apos;m a &lt;button&gt; via Primitive
          </Primitive>
          <Primitive
            asChild
            style={{
              color: '#6366f1',
              fontSize: 13,
              fontFamily: 'inherit',
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}
          >
            <a
              href="https://github.com/luminescencedev/ui"
              target="_blank"
              rel="noopener noreferrer"
            >
              I&apos;m an &lt;a&gt; via asChild →
            </a>
          </Primitive>
        </div>
      </LiveExample>

      <H2>API Reference</H2>
      <PropsTable
        rows={[
          {
            name: 'element',
            type: 'keyof HTMLElementTagNameMap',
            default: '"div"',
            description: 'The HTML tag to render.',
          },
          {
            name: 'asChild',
            type: 'boolean',
            default: 'false',
            description:
              'Merge all props onto the single child element instead of rendering a wrapper.',
          },
          {
            name: 'unstyled',
            type: 'boolean',
            default: 'false',
            description: 'Skip attaching data-cui-* attributes so default CSS does not apply.',
          },
          {
            name: 'ref',
            type: 'Ref<Element>',
            description: 'React 19 ref — passed as a plain prop, no forwardRef needed.',
          },
        ]}
      />
    </div>
  );
}

function CnPage() {
  return (
    <div className="docs-page">
      <PageHeader
        badge="Utility"
        title="cn()"
        description="A tiny classname merger with zero dependencies. Combines strings, conditionals, arrays, and objects into a single class string."
      />

      <H2>Usage</H2>
      <Codeblock>{`import { cn } from '@carabine/ui';

cn('base', true && 'active', false && 'hidden')
// → "base active"

cn('px-4', { 'bg-blue': isBlue, 'bg-red': isRed })
// → "px-4 bg-blue"  (when isBlue = true)

cn(['a', 'b'], 'c')
// → "a b c"`}</Codeblock>

      <H2>Signature</H2>
      <Codeblock>{`function cn(...inputs: ClassValue[]): string`}</Codeblock>
    </div>
  );
}

const TOOLTIP_CODE = `import { Tooltip } from '@carabine/ui';

<Tooltip.Root>
  <Tooltip.Trigger asChild>
    <button>Hover me</button>
  </Tooltip.Trigger>
  <Tooltip.Content>
    Keyboard shortcut  ⌘K
  </Tooltip.Content>
</Tooltip.Root>`;

function TooltipPage() {
  return (
    <div className="docs-page">
      <PageHeader
        badge="Component"
        title="Tooltip"
        description="A contextual popup that appears on hover or focus. Apple/Linear style — frosted glass, smooth enter and exit animations. Compound component API."
      />

      <H2>Usage</H2>
      <LiveExample code={TOOLTIP_CODE}>
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

const TOGGLE_CODE = `import { Toggle } from '@carabine/ui';

function NotificationsToggle() {
  const [enabled, setEnabled] = React.useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Toggle
        checked={enabled}
        onCheckedChange={setEnabled}
      />
      <span>{enabled ? 'Enabled' : 'Disabled'}</span>
    </div>
  );
}`;

function TogglePage() {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="docs-page">
      <PageHeader
        badge="Component"
        title="Toggle"
        description="A simple ON/OFF switch. Rectangular with rounded corners, monochrome palette, sliding square knob. Controlled and uncontrolled modes."
      />

      <H2>Usage</H2>
      <LiveExample code={TOGGLE_CODE}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Toggle checked={checked} onCheckedChange={setChecked} />
          <span style={{ fontSize: 14, color: '#374151', fontFamily: 'inherit', fontWeight: 500 }}>
            {checked ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </LiveExample>

      <H2>Uncontrolled</H2>
      <Codeblock>{`// Manages its own state — no checked prop needed
<Toggle defaultChecked onCheckedChange={(val) => console.log(val)} />`}</Codeblock>

      <H2>Disabled</H2>
      <Codeblock>{`<Toggle disabled />
<Toggle disabled checked />`}</Codeblock>

      <H2>API Reference</H2>
      <PropsTable
        rows={[
          { name: 'checked', type: 'boolean', description: 'Controlled checked state.' },
          {
            name: 'defaultChecked',
            type: 'boolean',
            default: 'false',
            description: 'Initial checked state (uncontrolled).',
          },
          {
            name: 'onCheckedChange',
            type: '(checked: boolean) => void',
            description: 'Callback fired when the switch is toggled.',
          },
          {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Disables the switch.',
          },
          {
            name: 'unstyled',
            type: 'boolean',
            default: 'false',
            description: 'Strip all default styles.',
          },
        ]}
      />
    </div>
  );
}

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

function CodePreviewPage() {
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

function CopyButtonPage() {
  const sampleCode = `import { CopyButton } from '@carabine/ui';

export function Install() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <code>npm install @carabine/ui</code>
      <CopyButton value="npm install @carabine/ui" />
    </div>
  );
}`;

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

          <div style={{ display: 'flex', gap: 8 }}>
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

// ─── App ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [page, setPage] = React.useState<PageId>('introduction');

  const pages: Record<PageId, React.ReactNode> = {
    introduction: <IntroductionPage onNavigate={setPage} />,
    installation: <InstallationPage />,
    primitive: <PrimitivePage />,
    cn: <CnPage />,
    tooltip: <TooltipPage />,
    toggle: <TogglePage />,
    'code-preview': <CodePreviewPage />,
    'copy-button': <CopyButtonPage />,
  };

  return (
    <div className="docs-root">
      {/* ── Topbar ── */}
      <header className="topbar">
        <div className="topbar-inner">
          <button className="topbar-logo" onClick={() => setPage('introduction')}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect width="16" height="16" rx="4" fill="#09090b" />
              <path
                d="M5 8L7.5 10.5L11 5.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="topbar-brand">carabine/ui</span>
            <span className="topbar-version">v0.0.1</span>
          </button>
          <div className="topbar-right">
            <span className="topbar-badge">Early Access</span>
            <a
              href="https://github.com/luminescencedev/ui"
              target="_blank"
              rel="noopener noreferrer"
              className="topbar-gh"
              aria-label="GitHub"
            >
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <div className="docs-body">
        {/* ── Sidebar ── */}
        <aside className="sidebar">
          <nav className="sidebar-nav" aria-label="Documentation">
            {NAV.map((section) => (
              <div key={section.title} className="sidebar-group">
                <p className="sidebar-group-label">{section.title}</p>
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    className={cn('sidebar-item', page === item.id && 'sidebar-item--active')}
                    onClick={() => setPage(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        {/* ── Main ── */}
        <main className="docs-main">
          <div className="docs-content">{pages[page]}</div>
        </main>
      </div>
    </div>
  );
}
