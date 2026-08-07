import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider, script } from '@/components/site/theme';
import { Chrome } from '@/components/site/Chrome';
import './globals.css';

/**
 * Three families, and each one has exactly one job.
 *
 * Instrument Sans carries the voice. JetBrains Mono carries every number,
 * property name and identifier — including inside running prose, which is where
 * the pages get their texture: this library's writing is full of `offsetWidth`
 * and `0.22, 1, 0.36, 1`, and letting mono interrupt the sentence is a
 * personality that comes from the content rather than from a font choice.
 *
 * Instrument Serif is used for **one word** on the whole site. A third family
 * that appears everywhere is a third family; one that appears once is a moment.
 */
const instrument = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
});

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ui.carabine.studio'),
  title: {
    default: 'carabine/ui — twenty React components, one feel',
    template: '%s — carabine/ui',
  },
  description:
    'Twenty React components, styled by default and moving by default. One easing curve across all of them, both themes written out, every prop optional. Tailwind 4 and Motion.',
  openGraph: {
    type: 'website',
    siteName: 'carabine/ui',
    url: 'https://ui.carabine.studio',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    /*
     * `suppressHydrationWarning` because the script below writes `data-theme`
     * before React arrives, so the attribute React rendered and the attribute in
     * the document differ by design. Scoped to this element — nothing inside it
     * is exempt.
     */
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Before the first paint, or the page is light for a frame on its way to dark. */}
        <script dangerouslySetInnerHTML={{ __html: script }} />
      </head>
      <body className={`${instrument.variable} ${serif.variable} ${jetbrains.variable}`}>
        <ThemeProvider>
          {/* No bar here on purpose: each surface brings its own. */}
          <Chrome>{children}</Chrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
