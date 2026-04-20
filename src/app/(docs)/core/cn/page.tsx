import React from 'react';
import { PageHeader, H2, Codeblock } from '@/components/docs/shared';

export const metadata = {
  title: 'cn() — carabine/ui',
};

export default function CnPage() {
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
