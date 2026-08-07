'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type Theme = 'dark' | 'light';

const KEY = 'carabine-theme';

const Ctx = createContext<{ theme: Theme; setTheme: (theme: Theme) => void }>({
  theme: 'dark',
  setTheme: () => {},
});

/**
 * Every component in this library takes `theme` as a prop — there are no `dark:`
 * variants anywhere in it, because those resolve from the operating system and
 * would fire on a light page running on a dark-mode machine.
 *
 * So the site needs one place to answer the question, and this is it. The value
 * goes two ways at once: down through context to every component, and up onto
 * `<html data-theme>` for the site's own CSS, which uses a `@custom-variant`
 * bound to that attribute rather than to `prefers-color-scheme`.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  /*
   * Dark on the server and on the first client render, matching what `script`
   * below writes when nothing is stored. Reading `localStorage` here instead
   * would make this component render differently on the two sides and React
   * would replace the whole tree.
   */
  const [theme, set] = useState<Theme>('dark');

  /*
   * Adopted from the attribute, not from storage. The script below has already
   * resolved the question — a stored choice, or the machine's preference when
   * there is none — and reading storage again here would disagree with it in
   * exactly the case that matters: nothing stored, OS set to light. The site's
   * CSS would go light and every component would stay dark.
   */
  useEffect(() => {
    const written = document.documentElement.dataset.theme;
    if (written === 'light' || written === 'dark') set(written);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    set(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem(KEY, next);
  }, []);

  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);

/**
 * Runs before the first paint, so the page is never light for a frame on its way
 * to dark. It has to be a string in the document rather than an effect: an effect
 * is too late by definition — it runs after the browser has already painted.
 *
 * A stored choice wins over the machine's, because someone who has picked a theme
 * on this site has said something more specific than their OS did.
 */
export const script = `(function(){try{var s=localStorage.getItem('${KEY}');var d=s==='light'?'light':s==='dark'?'dark':(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=d;}catch(e){document.documentElement.dataset.theme='dark';}})();`;
