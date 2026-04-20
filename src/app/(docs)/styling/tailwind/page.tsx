'use client';

import React from 'react';
import { PageHeader, H2, Prose, IC, Codeblock, LiveExample } from '@/components/docs/shared';

export default function TailwindPage() {
  const [on, setOn] = React.useState(true);

  return (
    <div className="docs-page">
      <PageHeader
        badge="Styling"
        title="With Tailwind CSS"
        description="Combine headless mode with Tailwind utility classes for a frictionless styling workflow. No configuration needed beyond a standard Tailwind setup."
      />

      <H2>Setup</H2>
      <Prose>
        No plugin or Tailwind preset required. Configure Tailwind normally, then pass{' '}
        <IC>unstyled</IC> to opt out of built-in styles and apply your own classes.
      </Prose>
      <Codeblock>{`# 1. Install Tailwind CSS (v4 shown)
npm install tailwindcss @tailwindcss/vite
# or for Next.js
npm install tailwindcss @tailwindcss/postcss`}</Codeblock>
      <Codeblock>{`/* globals.css */
@import 'tailwindcss';`}</Codeblock>

      <H2>Toggle with Tailwind</H2>
      <LiveExample
        code={`import { Toggle } from '@carabine/ui';
import { cn } from '@carabine/ui';

<Toggle
  unstyled
  checked={on}
  onCheckedChange={setOn}
  className={cn(
    'relative inline-flex h-6 w-11 items-center rounded-full border-2 border-transparent',
    'transition-colors focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
    on ? 'bg-indigo-500' : 'bg-zinc-200',
  )}
>
  <span
    className={cn(
      'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow',
      'ring-0 transition-transform',
      on ? 'translate-x-6' : 'translate-x-1',
    )}
  />
</Toggle>`}
      >
        <button
          onClick={() => setOn((v) => !v)}
          style={{
            position: 'relative',
            display: 'inline-flex',
            height: 24,
            width: 44,
            alignItems: 'center',
            borderRadius: 9999,
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            transition: 'background 150ms',
            background: on ? '#6366f1' : '#d4d4d8',
          }}
          role="switch"
          aria-checked={on}
        >
          <span
            style={{
              display: 'inline-block',
              height: 16,
              width: 16,
              borderRadius: '50%',
              background: '#fff',
              boxShadow: '0 1px 3px rgba(0,0,0,.2)',
              transform: on ? 'translateX(24px)' : 'translateX(4px)',
              transition: 'transform 150ms',
            }}
          />
        </button>
      </LiveExample>

      <H2>Tooltip with Tailwind</H2>
      <Codeblock>{`import { Tooltip } from '@carabine/ui';

<Tooltip.Root>
  <Tooltip.Trigger asChild>
    <button className="rounded-md bg-zinc-900 px-3 py-1.5 text-sm text-white hover:bg-zinc-700">
      Hover me
    </button>
  </Tooltip.Trigger>
  <Tooltip.Content
    unstyled
    className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs text-white shadow-lg"
  >
    Custom tooltip
  </Tooltip.Content>
</Tooltip.Root>`}</Codeblock>

      <H2>CopyButton with Tailwind</H2>
      <Codeblock>{`import { CopyButton } from '@carabine/ui';

<CopyButton
  value="npm install @carabine/ui"
  unstyled
  className={cn(
    'flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200',
    'text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-900',
    'data-[state=copied]:border-green-300 data-[state=copied]:text-green-600',
  )}
/>`}</Codeblock>

      <H2>Tips</H2>
      <ul className="feature-list">
        <li>
          Use <IC>data-state</IC> variants (<IC>data-[state=checked]:bg-indigo-500</IC>) to style
          interactive states directly in Tailwind classes — no extra JS needed.
        </li>
        <li>
          The <IC>cn()</IC> utility exported from <IC>@carabine/ui</IC> is fully compatible with{' '}
          <IC>clsx</IC> and <IC>tailwind-merge</IC>.
        </li>
        <li>
          For typed Tailwind variants, pair with <IC>tailwind-variants</IC> or <IC>cva</IC> — they
          compose seamlessly with <IC>unstyled</IC> components.
        </li>
      </ul>
    </div>
  );
}
