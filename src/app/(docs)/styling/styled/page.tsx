'use client';

import React from 'react';
import { Toggle } from '@carabine/ui';
import { PageHeader, H2, Prose, IC, Codeblock, LiveExample } from '@/components/docs/shared';

export default function StyledPage() {
  const [on, setOn] = React.useState(true);

  return (
    <div className="docs-page">
      <PageHeader
        badge="Styling"
        title="Styled Mode"
        description="The default experience. Import a component and it just looks great — no CSS file, no configuration, no setup."
      />

      <H2>How it works</H2>
      <Prose>
        When a component renders, it writes <IC>data-cui-*</IC> attributes onto its root DOM node.
        The package ships a tiny stylesheet that is lazily injected into <IC>&lt;head&gt;</IC> (via{' '}
        <IC>CSSStyleSheet.insertRule</IC> / a <IC>&lt;style&gt;</IC> tag) on first mount. No bundler
        plugin, no PostCSS, no CSS import is required on the consumer side.
      </Prose>

      <H2>Live example</H2>
      <LiveExample
        code={`import { Toggle } from '@carabine/ui';

function Demo() {
  const [on, setOn] = React.useState(true);
  return <Toggle checked={on} onCheckedChange={setOn} />;
}`}
      >
        <Toggle checked={on} onCheckedChange={setOn} />
      </LiveExample>

      <H2>Style cascade</H2>
      <Prose>
        Because styles target <IC>data-cui-*</IC> attributes (not class names), there is zero risk
        of conflicts with your existing CSS. You can still override individual properties using
        higher-specificity selectors or CSS custom properties.
      </Prose>
      <Codeblock>{`/* Override a specific component without fighting class specificity */
[data-cui-toggle] {
  --toggle-width: 52px;
  --toggle-height: 28px;
}

/* Target state variants */
[data-cui-toggle][data-state='checked'] {
  background-color: #0ea5e9;
}`}</Codeblock>

      <H2>Per-component unstyled escape hatch</H2>
      <Prose>
        You can opt out of the default style on a single instance without changing anything else.
        See the <IC>Headless / Unstyled</IC> page for details.
      </Prose>
      <Codeblock>{`// This Toggle keeps its default style
<Toggle checked={a} onCheckedChange={setA} />

// This one is completely bare
<Toggle unstyled checked={b} onCheckedChange={setB} className="custom" />`}</Codeblock>
    </div>
  );
}
