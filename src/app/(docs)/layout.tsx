import React from 'react';
import { Topbar } from '@/components/docs/topbar';
import { SidebarProvider, Sidebar, SidebarOverlay } from '@/components/docs/nav';
import { PageNav } from '@/components/docs/page-nav';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="docs-root">
        <Topbar />
        <SidebarOverlay />
        <div className="docs-body">
          <Sidebar />
          <main className="docs-main">
            <div className="docs-content">
              {children}
              <PageNav />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
