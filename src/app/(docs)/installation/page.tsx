import React from 'react';
import { PageHeader, H2, Prose, Codeblock, PackageManagerBlock } from '@/components/docs/shared';

export const metadata = {
  title: 'Installation — carabine/ui',
};

export default function InstallationPage() {
  return (
    <div className="docs-page">
      <PageHeader
        badge="Getting Started"
        title="Installation"
        description="Get @carabine/ui running in your React project in under a minute."
      />

      <H2>Install the package</H2>
      <PackageManagerBlock />

      <H2>Peer dependencies</H2>
      <Prose>Requires React 18 or 19 and react-dom.</Prose>
      <Codeblock>{`npm install react react-dom`}</Codeblock>

      <H2>Usage</H2>
      <Prose>
        Import directly. No CSS file to configure — styles are bundled and injected automatically.
      </Prose>
      <Codeblock>{`import { Tooltip, Toggle, CodePreview } from '@carabine/ui';

// Sub-path imports for better tree-shaking
import { Tooltip }     from '@carabine/ui/tooltip';
import { Toggle }      from '@carabine/ui/toggle';
import { CodePreview } from '@carabine/ui/code-preview';`}</Codeblock>
    </div>
  );
}
