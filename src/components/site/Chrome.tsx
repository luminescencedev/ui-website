'use client';

import { createContext, useContext, useState } from 'react';
import { Toaster } from '@carabine/ui';
import type { ReactNode } from 'react';
import { Palette } from './Palette';
import { useTheme } from './theme';

/**
 * Only what is on **every** page: the palette and the toast viewport. No bar.
 *
 * The bar used to live here, which meant the landing page and the docs wore the
 * same chrome — and a front page that looks like a documentation page is a front
 * page that has already given up. Each surface now brings its own: a floating
 * nav on the landing, a fixed bar in the docs.
 *
 * The `Toaster` is mounted once, here, because its live regions have to exist
 * before the content they announce — a viewport mounted at the moment a toast
 * fires announces nothing.
 */
const Search = createContext<() => void>(() => {});

/** Anything that wants to open the palette asks for it here. */
export const useSearch = () => useContext(Search);

export function Chrome({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  const [searching, setSearching] = useState(false);

  return (
    <Search.Provider value={() => setSearching(true)}>
      {children}
      <Palette open={searching} onOpenChange={setSearching} />
      <Toaster theme={theme} position="bottom-right" />
    </Search.Provider>
  );
}
