'use client';

import React from 'react';
import { Toggle } from '@carabine/ui';
import { PageHeader, H2, Prose, IC, Codeblock, LiveExample } from '@/components/docs/shared';

export default function HeadlessPage() {
  const [on, setOn] = React.useState(false);

  return (
    <div className="docs-page">
      <PageHeader
        badge="Styling"
        title="Headless / Unstyled"
        description="Pass the unstyled prop to strip every default style. The component still manages all state and accessibility — you own the visual layer entirely."
      />

      <H2>The unstyled prop</H2>
      <Prose>
        Every component in <IC>@carabine/ui</IC> accepts an <IC>unstyled</IC> boolean. When truthy,
        no <IC>data-cui-*</IC> attributes are written to the DOM, so the bundled stylesheet has
        nothing to target. The component becomes a pure behaviour shell.
      </Prose>
      <Codeblock>{`import { Toggle } from '@carabine/ui';

// No style whatsoever — you get a plain <button>
<Toggle unstyled checked={on} onCheckedChange={setOn} />`}</Codeblock>

      <H2>Live comparison</H2>
      <LiveExample
        code={`// Left: styled (default)   Right: unstyled
<Toggle checked={on} onCheckedChange={setOn} />
<Toggle unstyled checked={on} onCheckedChange={setOn}
  style={{ outline: '2px solid #6366f1', borderRadius: 4, padding: '2px 6px', cursor: 'pointer' }}
/>`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <Toggle checked={on} onCheckedChange={setOn} />
            <span style={{ fontSize: 11, color: '#a1a1aa', fontFamily: 'inherit' }}>Styled</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <Toggle
              unstyled
              checked={on}
              onCheckedChange={setOn}
              style={{
                outline: '2px solid #6366f1',
                borderRadius: 4,
                padding: '2px 6px',
                cursor: 'pointer',
                background: on ? '#6366f1' : 'transparent',
                color: on ? '#fff' : '#6366f1',
                fontSize: 11,
                fontFamily: 'inherit',
                fontWeight: 600,
                border: 'none',
              }}
            />
            <span style={{ fontSize: 11, color: '#a1a1aa', fontFamily: 'inherit' }}>Unstyled</span>
          </div>
        </div>
      </LiveExample>

      <H2>What you keep</H2>
      <Prose>
        Even with <IC>unstyled</IC>, the component still provides:
      </Prose>
      <ul className="feature-list">
        <li>State management (controlled &amp; uncontrolled)</li>
        <li>
          <IC>data-state</IC> attribute for CSS targeting
        </li>
        <li>Keyboard accessibility &amp; ARIA attributes</li>
        <li>
          <IC>asChild</IC> composition
        </li>
        <li>All event callbacks</li>
      </ul>

      <H2>Styling unstyled components</H2>
      <Prose>
        Target the <IC>data-state</IC> attribute that every component still emits:
      </Prose>
      <Codeblock>{`/* globals.css or any CSS module */
.my-toggle {
  padding: 4px 12px;
  border-radius: 9999px;
  border: 1.5px solid #d1d5db;
  cursor: pointer;
  font-size: 13px;
  transition: background 150ms, border-color 150ms;
  background: transparent;
}

.my-toggle[data-state='checked'] {
  background: #6366f1;
  border-color: #6366f1;
  color: #fff;
}`}</Codeblock>
      <Codeblock>{`import { Toggle } from '@carabine/ui';

<Toggle unstyled className="my-toggle" checked={on} onCheckedChange={setOn} />`}</Codeblock>
    </div>
  );
}
