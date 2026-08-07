import { createHighlighter } from 'shiki';
import type { Highlighter } from 'shiki';

/**
 * One highlighter for the whole build.
 *
 * Shiki loads a full TextMate grammar and two themes, which is slow once and
 * instant afterwards — so it is created once and awaited by everything. Without
 * the cache, twenty pages with six examples each pay that cost a hundred and
 * twenty times.
 *
 * Both themes are baked into the same output as CSS variables. The site cannot
 * ask Shiki for a theme at render time, because the theme here is a client
 * decision on `data-theme` and this runs on the server — so it emits both and
 * `globals.css` picks one with the same attribute the components read.
 */
let held: Promise<Highlighter> | undefined;

const highlighter = () => {
  held ??= createHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: ['tsx', 'ts', 'bash', 'json', 'css'],
  });

  return held;
};

export async function highlight(code: string, lang = 'tsx') {
  const shiki = await highlighter();

  return shiki.codeToHtml(code.trim(), {
    lang,
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
  });
}
