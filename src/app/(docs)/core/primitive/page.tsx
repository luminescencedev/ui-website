'use client';

import React from 'react';
import { Primitive } from '@carabine/ui';
import { PageHeader, H2, PropsTable, LiveExample } from '@/components/docs/shared';

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

export default function PrimitivePage() {
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
