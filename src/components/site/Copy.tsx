'use client';

import { Button } from '@carabine/ui';
import { useTheme } from './theme';

/**
 * The library's own button, in its `copy` state. It morphs the icon to a check
 * and back on its own — there is no state to hold here, which is the point of the
 * prop existing.
 */
export function Copy({ text, label = 'Copy' }: { text: string; label?: string }) {
  const { theme } = useTheme();

  return (
    <Button
      theme={theme}
      variant="ghost"
      size={28}
      copy={text}
      aria-label={label}
      icon={
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15V5a2 2 0 0 1 2-2h10" />
        </svg>
      }
    />
  );
}
