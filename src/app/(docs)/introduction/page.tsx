import React from 'react';
import Link from 'next/link';
import { PageHeader, H2, IC } from '@/components/docs/shared';

export const metadata = {
  title: 'Introduction — carabine/ui',
};

export default function IntroductionPage() {
  return (
    <div className="docs-page">
      <PageHeader
        title="@carabine/ui"
        description="A React component library — styled by default, headless when you want. Styles inject at runtime via data-cui-* attributes. No CSS import needed by consumers."
      />

      <div className="intro-cards">
        {[
          {
            href: '/installation',
            icon: '⚡',
            title: 'Quick Start',
            desc: 'Install and configure in minutes.',
          },
          {
            href: '/core/primitive',
            icon: '⬡',
            title: 'Primitive',
            desc: 'The base element powering every component.',
          },
          {
            href: '/components/tooltip',
            icon: '◎',
            title: 'Components',
            desc: 'Tooltip, Toggle, CodePreview and more.',
          },
        ].map((card) => (
          <Link key={card.href} href={card.href} className="intro-card">
            <span className="intro-card-icon">{card.icon}</span>
            <span className="intro-card-title">{card.title}</span>
            <span className="intro-card-desc">{card.desc}</span>
          </Link>
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
