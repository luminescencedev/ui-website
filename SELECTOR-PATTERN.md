# Pill Tab Selector Pattern

> Reference for the tab selector style used in the docs site (`PackageManagerBlock` and `CodePreview`).  
> Bring this to the UI library source to add a generic `<Tabs>` or `<Selector>` compound component.

---

## Visual behaviour

- Tabs sit inside a **pill container** (`rgba(0,0,0,.04)` bg, `border-radius: 8px`, `padding: 3px`)
- **Inactive** tab: muted grey text (`#aaaaaa`), transparent bg
- **Hover** (inactive only): slightly darker text (`#555`), faint bg (`rgba(0,0,0,.04)`)
- **Active** tab: white bg, dark text (`#111`), subtle shadow — feels like a raised pill
- Transitions: `120ms ease` on `background`, `color`, `box-shadow`
- Right side of the header always has a `CopyButton` (from `@carabine/ui`)

---

## CSS classes

```css
/* Header bar — flex row, space-between, matches CodePreview header exactly */
.pm-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: #fafafa;
  border-bottom: 1px solid #ebebeb;
  gap: 12px;
}

/* Pill container */
.pm-tabs {
  display: flex;
  align-items: center;
  gap: 2px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  padding: 3px;
}

/* Individual tab button */
.pm-tab {
  display: inline-flex;
  align-items: center;
  padding: 5px 12px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #aaaaaa;
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  transition: background 120ms ease, color 120ms ease, box-shadow 120ms ease;
  white-space: nowrap;
  user-select: none;
}

.pm-tab:hover:not(.pm-tab--active) {
  color: #555555;
  background: rgba(0, 0, 0, 0.04);
}

.pm-tab--active {
  background: #ffffff;
  color: #111111;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
}
```

These values are **identical** to what `@carabine/ui`'s `CodePreview` injects for `[data-cui-code-preview-tabs]` and `[data-cui-code-preview-tab]`. Mirror those CSS custom-property names when building the component:

| Class token | CodePreview CSS var equivalent |
|---|---|
| `#fafafa` header bg | `--cp-header-bg` |
| `#ebebeb` border | `--cp-header-border` |
| `#aaaaaa` inactive color | `--cp-tab-color` |
| `#111111` active color | `--cp-tab-active-color` |
| white active bg | `--cp-tab-active-bg` |
| shadow | `--cp-tab-active-shadow` |

---

## React component (docs implementation)

```tsx
'use client';
import React from 'react';
import { CopyButton } from '@carabine/ui';

type PM = 'npm' | 'pnpm' | 'yarn' | 'bun';

const PM_COMMANDS: Record<PM, string> = {
  npm:  'npm install @carabine/ui',
  pnpm: 'pnpm add @carabine/ui',
  yarn: 'yarn add @carabine/ui',
  bun:  'bun add @carabine/ui',
};

export function PackageManagerBlock() {
  const [active, setActive] = React.useState<PM>('npm');

  return (
    <div className="codeblock">
      <div className="pm-header">
        <div className="pm-tabs">
          {(['npm', 'pnpm', 'yarn', 'bun'] as PM[]).map((pm) => (
            <button
              key={pm}
              className={`pm-tab${active === pm ? ' pm-tab--active' : ''}`}
              onClick={() => setActive(pm)}
            >
              {pm}
            </button>
          ))}
        </div>
        {/* Uses the real CopyButton component — animated clipboard→check icon */}
        <CopyButton value={PM_COMMANDS[active]} />
      </div>
      <pre style={{ background: '#fafafa', padding: '16px 24px', margin: 0, overflowX: 'auto' }}>
        <code>{PM_COMMANDS[active]}</code>
      </pre>
    </div>
  );
}
```

---

## Generalised component idea for `@carabine/ui`

When porting this to the library, consider a compound component API like:

```tsx
<Selector defaultValue="npm">
  <Selector.Header>
    <Selector.Tabs>
      <Selector.Tab value="npm">npm</Selector.Tab>
      <Selector.Tab value="pnpm">pnpm</Selector.Tab>
      <Selector.Tab value="yarn">yarn</Selector.Tab>
      <Selector.Tab value="bun">bun</Selector.Tab>
    </Selector.Tabs>
    <Selector.Actions>
      {/* e.g. CopyButton wired to active value via context */}
    </Selector.Actions>
  </Selector.Header>
  <Selector.Content value="npm">npm install @carabine/ui</Selector.Content>
  <Selector.Content value="pnpm">pnpm add @carabine/ui</Selector.Content>
  <Selector.Content value="yarn">yarn add @carabine/ui</Selector.Content>
  <Selector.Content value="bun">bun add @carabine/ui</Selector.Content>
</Selector>
```

Key implementation notes:
- Mirror the `CodePreview` compound component pattern already in the library
- Use a React context to share `active` value between `Tabs` and `Content`
- Expose `unstyled` prop on root to allow full CSS override (same as other components)
- `data-cui-selector`, `data-cui-selector-tab`, `data-state="active"` for CSS targeting
- The pill-tab CSS can be extracted from `CodePreview`'s injected styles and shared
