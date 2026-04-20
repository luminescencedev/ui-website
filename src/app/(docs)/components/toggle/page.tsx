'use client';

import React from 'react';
import { Toggle } from '@carabine/ui';
import { PageHeader, H2, Codeblock, PropsTable, LiveExample } from '@/components/docs/shared';

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

export default function TogglePage() {
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
