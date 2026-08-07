'use client';

import { useState } from 'react';
import { SegmentedControl } from '@carabine/ui';
import { Copy } from './Copy';
import { useTheme } from './theme';

const managers = [
  { id: 'pnpm', label: 'pnpm', add: 'pnpm add' },
  { id: 'npm', label: 'npm', add: 'npm install' },
  { id: 'yarn', label: 'yarn', add: 'yarn add' },
  { id: 'bun', label: 'bun', add: 'bun add' },
];

/**
 * The two lines it takes, and the package-manager switcher is the library's
 * segmented control — the real one. Four options is exactly what that component is
 * for, and reaching for a row of buttons here instead would be a quiet admission.
 *
 * The stylesheet line is not a footnote. Leaving it out is the one way to install
 * this library and see nothing at all, so it is on the screen at the same size as
 * the install command.
 */
export function Install() {
  const { theme } = useTheme();
  const [manager, setManager] = useState('pnpm');

  const add = `${managers.find((m) => m.id === manager)?.add} @carabine/ui motion`;

  return (
    <div className="core overflow-hidden rounded-xl" style={{ maxWidth: 520 }}>
      <div
        className="flex items-center justify-between gap-3 border-b px-3 py-2"
        style={{ borderColor: 'var(--border)' }}
      >
        <SegmentedControl
          theme={theme}
          label="Package manager"
          items={managers.map(({ id, label }) => ({ id, label }))}
          value={manager}
          onValueChange={setManager}
          size={26}
        />
        <Copy text={`${add}\nimport '@carabine/ui/styles.css';`} label="Copy both lines" />
      </div>

      <div
        className="px-4 py-3.5 text-[12.5px] leading-6"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        <p style={{ color: 'var(--fg)' }}>
          <span style={{ color: 'var(--fg-subtle)' }}>$ </span>
          {add}
        </p>
        <p style={{ color: 'var(--fg)' }}>
          <span style={{ color: 'var(--fg-subtle)' }}>{'> '}</span>
          import &apos;@carabine/ui/styles.css&apos;;
        </p>
      </div>
    </div>
  );
}
