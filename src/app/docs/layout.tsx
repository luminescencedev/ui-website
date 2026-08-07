import type { ReactNode } from 'react';
import { DocsShell } from '@/components/site/DocsShell';

/**
 * The documentation is one shell and nothing else — the bar it needs lives
 * *inside* the shell, against the top of the reading panel, because that is the
 * only place it has anything behind it to blur.
 *
 * The landing brings its own floating nav instead: a front page is looked at
 * rather than read, and a front page wearing documentation chrome is a front page
 * that has already given up.
 */
export default function DocsLayout({ children }: { children: ReactNode }) {
  return <DocsShell>{children}</DocsShell>;
}
