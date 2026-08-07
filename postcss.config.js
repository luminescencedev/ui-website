/**
 * Tailwind 4 is a PostCSS plugin and nothing else — no config file, no content
 * globs. What it scans is declared in the stylesheet with `@source`, and what it
 * emits is declared there too.
 *
 * This file was `{}` before, which is why nothing Tailwind wrote ever reached the
 * page.
 */
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
