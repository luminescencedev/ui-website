'use client';

import { useRouter } from 'next/navigation';
import { CommandPalette } from '@carabine/ui';
import type { CommandItem } from '@carabine/ui';
import { groups, href, started } from '@/lib/nav';
import { useTheme } from './theme';

/**
 * The site's search is the library's command palette. Not a demo of it — the
 * actual one, wired to the actual nav, opened by the actual `⌘K` it registers.
 *
 * That is the argument the whole site makes: if a component is not good enough to
 * carry this page's own navigation, it is not good enough to publish. It also
 * means the palette is used the way its own docs describe it — no ranking, no
 * pages, the caller's order — and any awkwardness in that is felt here first.
 */
export function Palette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const items: CommandItem[] = [
    ...started.entries.map((entry) => ({
      id: entry.slug,
      label: entry.title,
      description: entry.blurb,
      group: 'Getting started',
      onSelect: () => router.push(href(entry.slug)),
    })),

    ...groups.flatMap((group) =>
      group.entries.map((entry) => ({
        id: entry.slug,
        label: entry.title,
        description: entry.blurb,
        group: group.name,
        // A page that is not written yet is not a place to send anybody.
        disabled: !entry.ready,
        keywords: [group.name],
        onSelect: () => router.push(href(entry.slug)),
      })),
    ),

    {
      id: 'theme',
      label: theme === 'dark' ? 'Switch to light' : 'Switch to dark',
      description: 'Both palettes are written out; the theme is a prop',
      group: 'Site',
      keywords: ['dark', 'light', 'appearance', 'theme'],
      onSelect: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    },
    {
      id: 'github',
      label: 'Open the repository',
      group: 'Site',
      keywords: ['source', 'git', 'code'],
      onSelect: () => window.open('https://github.com/luminescencedev/ui', '_blank'),
    },
  ];

  return (
    <CommandPalette
      theme={theme}
      items={items}
      open={open}
      onOpenChange={onOpenChange}
      placeholder="Find a component…"
      empty="Nothing by that name"
      footer={
        <span>
          <span className="tick">↑↓</span> to move · <span className="tick">↵</span> to open ·{' '}
          <span className="tick">esc</span> to close
        </span>
      }
    />
  );
}
