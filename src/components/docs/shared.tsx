'use client';

import React from 'react';
import { CodePreview, CopyButton } from '@carabine/ui';

// ─── PageHeader ───────────────────────────────────────────────────────────────

export function PageHeader({
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

// ─── Typography ───────────────────────────────────────────────────────────────

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="section-h2">{children}</h2>;
}

export function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="section-h3">{children}</h3>;
}

export function Prose({ children }: { children: React.ReactNode }) {
  return <p className="prose">{children}</p>;
}

export function IC({ children }: { children: React.ReactNode }) {
  return <code className="ic">{children}</code>;
}

export function Codeblock({ children }: { children: string }) {
  return (
    <div className="codeblock">
      <div className="codeblock-copy">
        <CopyButton value={children} />
      </div>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}

// ─── PackageManagerBlock ──────────────────────────────────────────────────────

type PM = 'npm' | 'pnpm' | 'yarn' | 'bun';

const PM_COMMANDS: Record<PM, string> = {
  npm: 'npm install @carabine/ui',
  pnpm: 'pnpm add @carabine/ui',
  yarn: 'yarn add @carabine/ui',
  bun: 'bun add @carabine/ui',
};

export function PackageManagerBlock() {
  const [active, setActive] = React.useState<PM>('npm');

  return (
    <div className="codeblock">
      <div className="pm-header">
        <div className="pm-tabs">
          {(['npm', 'pnpm', 'yarn', 'bun'] as PM[]).map((pm) => (
            <button
              key={pm}
              className={`pm-tab${active === pm ? ' pm-tab--active' : ''}`}
              onClick={() => setActive(pm)}
            >
              {pm}
            </button>
          ))}
        </div>
        <CopyButton value={PM_COMMANDS[active]} />
      </div>
      <pre style={{ background: '#fafafa', padding: '16px 24px', margin: 0, overflowX: 'auto' }}>
        <code>{PM_COMMANDS[active]}</code>
      </pre>
    </div>
  );
}

// ─── PropsTable ───────────────────────────────────────────────────────────────

export type PropRow = {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
};

export function PropsTable({ rows }: { rows: PropRow[] }) {
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

// ─── LiveExample ──────────────────────────────────────────────────────────────

export function LiveExample({ code, children }: { code: string; children: React.ReactNode }) {
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
