import React from 'react';
import Link from 'next/link';
import { PageHeader, H2, Prose, IC, Codeblock } from '@/components/docs/shared';

export const metadata = {
  title: 'Styling Overview — carabine/ui',
};

export default function StylingPage() {
  return (
    <div className="docs-page">
      <PageHeader
        badge="Styling"
        title="Styling Overview"
        description="@carabine/ui offers two styling modes: a polished default style injected at runtime via data-cui-* attributes, and a fully headless mode for total control."
      />

      <div className="intro-cards">
        {[
          {
            href: '/styling/styled',
            icon: '🎨',
            title: 'Styled (Default)',
            desc: 'Zero-config. Styles inject automatically via data-cui-* attributes.',
          },
          {
            href: '/styling/headless',
            icon: '⬡',
            title: 'Headless / Unstyled',
            desc: 'Pass unstyled to strip every default style. Bring your own CSS.',
          },
          {
            href: '/styling/tailwind',
            icon: '🌊',
            title: 'With Tailwind CSS',
            desc: 'Pair headless mode with Tailwind utility classes.',
          },
          {
            href: '/styling/css-variables',
            icon: '✦',
            title: 'CSS Variables',
            desc: 'Override design tokens without touching component source.',
          },
        ].map((card) => (
          <Link key={card.href} href={card.href} className="intro-card">
            <span className="intro-card-icon">{card.icon}</span>
            <span className="intro-card-title">{card.title}</span>
            <span className="intro-card-desc">{card.desc}</span>
          </Link>
        ))}
      </div>

      <H2>How styles work</H2>
      <Prose>
        Every component rendered by <IC>@carabine/ui</IC> attaches one or more <IC>data-cui-*</IC>{' '}
        attributes to its DOM node. A tiny CSS sheet (bundled inside the package) targets those
        attributes. The sheet is injected once into <IC>&lt;head&gt;</IC> the first time any
        component mounts — no <IC>import &apos;*.css&apos;</IC> needed anywhere in your app.
      </Prose>
      <Codeblock>{`<!-- What the DOM looks like for a Toggle -->
<button data-cui-toggle data-state="checked" ...>
  <span data-cui-toggle-thumb ...></span>
</button>`}</Codeblock>

      <H2>Choosing a mode</H2>
      <Prose>
        Pass <IC>unstyled</IC> on any root component to disable automatic attribute injection for
        that instance and all its descendants. You can mix modes freely — one <IC>Tooltip</IC>{' '}
        styled, another headless, within the same page.
      </Prose>
      <Codeblock>{`import { Toggle } from '@carabine/ui';

// ✅ Styled (default) — no extra config
<Toggle checked={on} onCheckedChange={setOn} />

// ✅ Headless — data-cui-* NOT attached
<Toggle unstyled checked={on} onCheckedChange={setOn} className="my-toggle" />`}</Codeblock>
    </div>
  );
}
