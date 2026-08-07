/**
 * The site's own nav, and the only place the list of components lives.
 *
 * It mirrors `docs/meta.json` in the library rather than reading it: the pages
 * here are written by hand, so nothing is generated from that file and pretending
 * otherwise would be a coupling that does no work. What it does share is the
 * category grouping, which the roadmap decided and which the command palette
 * still uses.
 *
 * The **sidebar** is flat and alphabetical below the two short groups at the top.
 * Twenty items under six headings is six places to look; twenty in one sorted
 * list is one, and somebody hunting for `Slider` already knows its name.
 */

export type Entry = {
  slug: string;
  title: string;
  blurb: string;
  /** Written, or still to write. Unwritten pages are not linked. */
  ready?: boolean;
};

export type Group = {
  name: string;
  entries: Entry[];
};

export const overview: Group = {
  name: 'Overview',
  entries: [
    {
      slug: 'components',
      title: 'All components',
      blurb: 'Everything in the library',
      ready: true,
    },
  ],
};

export const started: Group = {
  name: 'Getting started',
  entries: [
    {
      slug: 'introduction',
      title: 'Introduction',
      blurb: 'What this is, and what it refuses',
      ready: true,
    },
    {
      slug: 'get-started',
      title: 'Quick start',
      blurb: 'Two lines, and one is the stylesheet',
      ready: true,
    },
    {
      slug: 'design-principles',
      title: 'Design principles',
      blurb: 'Ten rules, and each one came from getting it wrong',
      ready: true,
    },
    {
      slug: 'motion',
      title: 'The motion standard',
      blurb: 'One easing, and it is an ease-out',
      ready: true,
    },
    {
      slug: 'theming',
      title: 'Theming',
      blurb: 'Both palettes written out, and the theme is a prop',
      ready: true,
    },
  ],
};

/**
 * The categories. Kept because they are a claim about what a library needs — and
 * because the command palette groups by them, where the list is short enough for
 * headings to help rather than to fragment.
 */
export const groups: Group[] = [
  {
    name: 'Overlay',
    entries: [
      { slug: 'dialog', title: 'Dialog', blurb: 'Focus trapped, the page held still', ready: true },
      {
        slug: 'popover',
        title: 'Popover',
        blurb: 'Grows out of the edge it lands on',
        ready: true,
      },
      {
        slug: 'tooltip',
        title: 'Tooltip',
        blurb: 'The first one waits, the rest do not',
        ready: true,
      },
      {
        slug: 'menu',
        title: 'Menu',
        blurb: 'Commands, from a click or a right-click',
        ready: true,
      },
      { slug: 'drawer', title: 'Drawer', blurb: 'A sheet you can throw back', ready: true },
      {
        slug: 'command-palette',
        title: 'Command palette',
        blurb: 'The one that refuses to animate',
        ready: true,
      },
    ],
  },
  {
    name: 'Input',
    entries: [
      {
        slug: 'text-field',
        title: 'Text field',
        blurb: 'A recess, and a message that arrives',
        ready: true,
      },
      {
        slug: 'otp-input',
        title: 'OTP input',
        blurb: 'Cells drawn over one real input',
        ready: true,
      },
      {
        slug: 'color-picker',
        title: 'Color picker',
        blurb: 'A flower of petals, and a lightness arc',
        ready: true,
      },
      { slug: 'switch', title: 'Switch', blurb: 'A thumb you can throw', ready: true },
      {
        slug: 'slider',
        title: 'Slider',
        blurb: 'Springs to a jump, never to a finger',
        ready: true,
      },
      {
        slug: 'select',
        title: 'Select',
        blurb: 'One answer, and the list under the field',
        ready: true,
      },
    ],
  },
  {
    name: 'Action',
    entries: [
      {
        slug: 'button',
        title: 'Button',
        blurb: 'Loading, copying, holding to confirm',
        ready: true,
      },
    ],
  },
  {
    name: 'Navigation',
    entries: [
      {
        slug: 'tabs',
        title: 'Tabs',
        blurb: 'An indicator that lands on a measured tab',
        ready: true,
      },
      {
        slug: 'segmented-control',
        title: 'Segmented control',
        blurb: 'Labels clipped to the thumb, not timed against it',
        ready: true,
      },
      {
        slug: 'accordion',
        title: 'Accordion',
        blurb: 'A measured height, not a guessed maximum',
        ready: true,
      },
    ],
  },
  {
    name: 'Feedback',
    entries: [
      {
        slug: 'toast',
        title: 'Toast',
        blurb: 'Stacking, hover to expand, swipe to dismiss',
        ready: true,
      },
      {
        slug: 'skeleton',
        title: 'Skeleton',
        blurb: 'The swap is the component, not the shimmer',
        ready: true,
      },
      {
        slug: 'progress',
        title: 'Progress',
        blurb: "The toast's strip, in another tense",
        ready: true,
      },
    ],
  },
  {
    name: 'List',
    entries: [
      {
        slug: 'hover-list',
        title: 'Hover list',
        blurb: 'One bar sliding between rows',
        ready: true,
      },
    ],
  },
];

/** Every component, sorted by name — what the sidebar shows. */
export const components: Entry[] = groups
  .flatMap((group) => group.entries)
  .sort((a, b) => a.title.localeCompare(b.title));

/** Which category a component is in, for the page that lists them all. */
export const categoryOf = (slug: string) =>
  groups.find((group) => group.entries.some((entry) => entry.slug === slug))?.name ?? '';

export const all: Entry[] = [...overview.entries, ...started.entries, ...components];

export const href = (slug: string) => `/docs/${slug}`;

/** How many are documented, said out loud rather than rounded up. */
export const written = components.filter((entry) => entry.ready).length;
