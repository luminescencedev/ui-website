'use client';

import { useState } from 'react';
import {
  Accordion,
  Button,
  ColorPicker,
  Dialog,
  Drawer,
  HoverList,
  Menu,
  OtpInput,
  Popover,
  Progress,
  SegmentedControl,
  Select,
  Skeleton,
  Slider,
  Switch,
  Tabs,
  TextField,
  Tooltip,
  progressTones,
  toast,
} from '@carabine/ui';
import { useSearch } from './Chrome';
import { useTheme } from './theme';

const scenes = [
  { id: 'components', label: 'Components' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'checkout', label: 'Checkout' },
];

/**
 * The card, and it is the page.
 *
 * There is nothing under it but the footer, which means this has to carry the
 * whole argument on its own: not a shelf of specimens, but every component in the
 * library, mounted, answering. A front page that shows a picture of itself is
 * asking to be believed; this one can be pressed.
 *
 * The frame is the library's own two bezels — a shell only ever seen as a ring,
 * a core the content is read against — at the size of a page section. Radii
 * concentric, same material as everything inside it.
 */
export function Showcase() {
  const [scene, setScene] = useState('components');
  const { theme } = useTheme();

  return (
    <div className="relative">
      {/*
       * Two ellipses, offset and of different temperature. One was flat: a single
       * hue at a single opacity reads as a coloured rectangle behind a card, and
       * two overlapping at different sizes read as light in a room.
       *
       * Both blurred far past any edge — a glow with a visible boundary is a
       * shape, and a shape behind a card is a second card.
       */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-[38%] -z-10 h-[520px] w-[820px] max-w-full -translate-x-1/2 rounded-full"
        style={{ background: 'var(--accent)', opacity: 0.22, filter: 'blur(150px)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 left-[66%] -z-10 h-[420px] w-[620px] max-w-full -translate-x-1/2 rounded-full"
        style={{ background: 'var(--accent-far)', opacity: 0.16, filter: 'blur(150px)' }}
      />

      <div className="mb-5 flex justify-center">
        <Tabs
          theme={theme}
          variant="chip"
          label="What to show"
          value={scene}
          onValueChange={setScene}
          items={scenes.map((s) => ({ id: s.id, label: s.label }))}
        />
      </div>

      <div className="bezel relative z-10">
        <div className="bezel-core">{scene === 'components' ? <Components /> : <Soon />}</div>
      </div>
    </div>
  );
}

function Soon() {
  return (
    <div className="grid place-items-center px-6" style={{ minHeight: 640 }}>
      <p className="prose-site max-w-[24rem] text-center">
        Not built yet. It is the same card with different furniture in it — a real screen rather
        than a shelf of specimens.
      </p>
    </div>
  );
}

/**
 * A cell. The hairlines come from a 1px grid gap with the grid's own background
 * showing through, which is one border rather than thirty — and no doubled line
 * where two cells meet.
 *
 * `minWidth: 0` is the whole responsive story. A grid item's default is
 * `min-width: auto`, which means it **refuses to shrink below its content** — so
 * anything with a fixed width inside it stops the column from narrowing and
 * spills into the next one instead. That is what put the one-time code on top of
 * the progress bars.
 *
 * The same trap catches flex children, and it is the reason `min-w-0` appears on
 * every measured row inside the library itself.
 */
function Cell({
  wide = false,
  label,
  children,
}: {
  /** Two columns from `sm` up, one below it. */
  wide?: boolean;
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      /*
       * The span is a class, not an inline style, and that is the fix rather
       * than a preference. `grid-column: span 2` in a **one-column** grid does
       * not clamp — it makes the grid invent a second, implicit column, and the
       * whole card becomes twice as wide as its container. On a phone that is
       * the card hanging off the side of the page.
       *
       * A class can be conditioned on the breakpoint; an inline style cannot.
       */
      className={`flex min-w-0 flex-col gap-3.5 p-5 ${wide ? 'sm:col-span-2' : ''}`}
      style={{ background: 'var(--surface)' }}
    >
      {label && <p className="eyebrow">{label}</p>}
      {children}
    </div>
  );
}

function Components() {
  const { theme } = useTheme();
  const search = useSearch();

  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState<string | null>('pro');
  const [country, setCountry] = useState<string | null>(null);
  const [volume, setVolume] = useState(62);
  const [price, setPrice] = useState(240);
  const [range, setRange] = useState('month');
  const [tab, setTab] = useState('overview');
  const [live, setLive] = useState(true);
  const [alerts, setAlerts] = useState(false);
  const [code, setCode] = useState('');
  const [brand, setBrand] = useState('#679BF4');
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(true);

  return (
    /*
     * Tailwind's `grid-cols-N` already emits `repeat(N, minmax(0, 1fr))`, so the
     * tracks themselves will narrow. What stops them is `min-width: auto` on the
     * items — see `Cell`.
     */
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      style={{ gap: 1, background: 'var(--border)' }}
    >
      {/* ── Row 1 ────────────────────────────────────────────────────────── */}
      <Cell label="Fields">
        <TextField
          theme={theme}
          label="Email"
          placeholder="you@studio.com"
          value={email}
          onValueChange={setEmail}
        />
        <TextField theme={theme} label="Workspace" defaultValue="carabine" error="Already taken" />
      </Cell>

      <Cell label="Select">
        <Select
          theme={theme}
          label="Plan"
          value={plan}
          onValueChange={setPlan}
          items={[
            { id: 'free', label: 'Free', description: 'One project' },
            { id: 'pro', label: 'Pro', description: '$20 a month' },
            { id: 'team', label: 'Team', description: 'SSO, audit logs' },
          ]}
        />
        <Select
          theme={theme}
          label="Country"
          searchable
          clearable
          placeholder="Search…"
          value={country}
          onValueChange={setCountry}
          items={[
            { id: 'fr', label: 'France', group: 'Europe' },
            { id: 'de', label: 'Germany', group: 'Europe' },
            { id: 'jp', label: 'Japan', group: 'Asia' },
            { id: 'kr', label: 'Korea', group: 'Asia' },
          ]}
        />
      </Cell>

      <Cell label="Sliders">
        <Slider
          theme={theme}
          label="Volume"
          value={volume}
          onValueChange={setVolume}
          showValue
          format={(at) => `${at}%`}
        />
        <Slider
          theme={theme}
          label="Budget"
          min={0}
          max={500}
          step={10}
          marks
          value={price}
          onValueChange={setPrice}
          showValue
          format={(at) => `€${at}`}
        />
      </Cell>

      <Cell label="Switches">
        <Switch theme={theme} label="Live updates" checked={live} onCheckedChange={setLive} />
        <Switch theme={theme} label="Email alerts" checked={alerts} onCheckedChange={setAlerts} />
        <Switch theme={theme} label="Locked" defaultChecked disabled aria-label="Locked" />
      </Cell>

      {/* ── Row 2 ────────────────────────────────────────────────────────── */}
      <Cell label="One-time code">
        {/*
         * Sized to the column rather than left at its default. A cell is
         * `size × 0.82` wide, so six of them at the default 48 want 276px and
         * the narrowest column here gives 239 — the component was never wrong,
         * it was being asked for more room than it had.
         */}
        <OtpInput theme={theme} value={code} onValueChange={setCode} length={6} size={38} gap={5} />
        <p className="prose-site" style={{ fontSize: 12.5 }}>
          Six cells drawn over one real input. Paste the whole code and it lands.
        </p>
      </Cell>

      <Cell label="Progress">
        {/*
         * Colour where the library actually has it. Progress is neutral by
         * default on purpose — green means *finished* and red means *failed*, and
         * a bar coloured before it is either has answered a question nobody
         * asked — but a page showing what the tones are for should show them.
         */}
        <Progress
          theme={theme}
          value={100}
          color={progressTones.success}
          showValue
          label="Synced"
        />
        <Progress theme={theme} value={volume} showValue label="Upload" />
        <Progress theme={theme} label="Working" color={progressTones.loading} />
        <Progress
          theme={theme}
          variant="bar"
          value={41}
          color={progressTones.error}
          showValue
          label="Failed"
        />
      </Cell>

      <Cell label="Segmented">
        <SegmentedControl
          theme={theme}
          label="Range"
          value={range}
          onValueChange={setRange}
          full
          items={[
            { id: 'day', label: 'Day' },
            { id: 'week', label: 'Week' },
            { id: 'month', label: 'Month' },
          ]}
        />
        {/* Short labels on purpose: a measured indicator in a 239px column has
            no room for three long words, and a tab row that scrolls sideways in
            a demo card reads as a bug. */}
        <Tabs
          theme={theme}
          variant="line"
          label="Section"
          value={tab}
          onValueChange={setTab}
          items={[
            { id: 'overview', label: 'All' },
            { id: 'activity', label: 'Activity' },
            { id: 'settings', label: 'Settings' },
          ]}
        />
      </Cell>

      <Cell label="Colour">
        <div className="flex items-center gap-3">
          <ColorPicker theme={theme} value={brand} onValueChange={setBrand} />
          <span
            className="text-[13px]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-muted)' }}
          >
            {brand}
          </span>
        </div>
        <p className="prose-site" style={{ fontSize: 12.5 }}>
          A flower of overlapping petals, with a lightness arc on its edge.
        </p>
      </Cell>

      {/* ── Row 3 ────────────────────────────────────────────────────────── */}
      <Cell wide label="One bar, sliding">
        <HoverList
          theme={theme}
          items={[
            { id: 'a', label: 'Ledger sync', description: 'Ran 2 minutes ago' },
            { id: 'b', label: 'Invoice export', description: 'Queued' },
            { id: 'c', label: 'Nightly backup', description: 'Done · 4 hours ago' },
          ]}
          onSelect={(item) => toast.success(item.label as string)}
        />
      </Cell>

      <Cell wide label="Everything that opens">
        <div className="flex flex-wrap gap-2">
          <Menu
            theme={theme}
            items={[
              { id: 'dup', label: 'Duplicate', shortcut: '⌘D' },
              { id: 'rename', label: 'Rename' },
              { id: 'sep', separator: true },
              { id: 'del', label: 'Delete', danger: true },
            ]}
            onSelect={(item) => toast.success(item.label as string)}
          >
            <Button theme={theme} size={30} variant="secondary">
              Menu
            </Button>
          </Menu>

          <Popover
            theme={theme}
            width={230}
            content={
              <p className="prose-site" style={{ fontSize: 13 }}>
                It grows out of the corner nearest the thing that opened it, and flips when there is
                no room.
              </p>
            }
          >
            <Button theme={theme} size={30} variant="secondary">
              Popover
            </Button>
          </Popover>

          <Dialog
            theme={theme}
            title="Delete project"
            description="This cannot be undone."
            footer={
              <Button theme={theme} size={32} variant="danger" hold={1200}>
                Hold to delete
              </Button>
            }
          >
            <Button theme={theme} size={30} variant="secondary">
              Dialog
            </Button>
          </Dialog>

          <Drawer
            theme={theme}
            title="Filters"
            description="Pull the handle to throw it back"
            content={
              <div className="flex flex-col gap-4">
                <Slider theme={theme} label="Max price" defaultValue={120} max={500} showValue />
                <Switch theme={theme} label="In stock only" defaultChecked />
              </div>
            }
          >
            <Button theme={theme} size={30} variant="secondary">
              Drawer
            </Button>
          </Drawer>

          <Tooltip theme={theme} content="The first one waits, the rest of the row does not">
            <Button theme={theme} size={30} variant="secondary">
              Tooltip
            </Button>
          </Tooltip>

          <Button theme={theme} size={30} variant="secondary" onClick={search}>
            Command palette
          </Button>
        </div>

        {/*
         * The plate is the point. `plate={false}` was saving vertical space and
         * throwing away the thing worth showing: the toast's two bezels around
         * the rows, concentric radii, glass outside and a top-lit core inside.
         * A card demonstrating the library should not be quietly opting out of
         * the library's own material.
         */}
        <Accordion
          theme={theme}
          padding={11}
          radius={14}
          items={[
            {
              id: 'why',
              title: 'Why one easing?',
              content: <p>A library whose parts move differently has no feel at all.</p>,
            },
            {
              id: 'dark',
              title: 'Why no dark: variants?',
              content: (
                <p>
                  They resolve from the operating system, so they fire on a light page running on a
                  dark-mode machine.
                </p>
              ),
            },
          ]}
        />
      </Cell>

      {/* ── Row 4 ────────────────────────────────────────────────────────── */}
      <Cell wide label="The wait, and the swap">
        <div className="flex items-center gap-3">
          <Switch theme={theme} label="Loading" checked={waiting} onCheckedChange={setWaiting} />
        </div>
        <Skeleton theme={theme} loading={waiting} lines={3}>
          <p className="prose-site" style={{ fontSize: 13.5 }}>
            The swap is the component, not the shimmer. Both states share one grid cell so the box
            never collapses between them, and they trade places through a blur rather than a
            crossfade.
          </p>
        </Skeleton>
      </Cell>

      <Cell wide label="One button, four states">
        <div className="flex flex-wrap gap-2">
          <Button
            theme={theme}
            size={32}
            loading={loading}
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                toast.success('Deployed');
              }, 1400);
            }}
          >
            Deploy
          </Button>
          <Button theme={theme} size={32} variant="secondary" copy="pnpm add @carabine/ui">
            Copy install
          </Button>
          <Button theme={theme} size={32} variant="danger" hold={1400}>
            Hold to wipe
          </Button>
          <Button theme={theme} size={32} variant="ghost" onClick={() => toast.error('Failed')}>
            Fire a toast
          </Button>
        </div>
        <p className="prose-site" style={{ fontSize: 12.5 }}>
          Loading, copying and holding are states of one component rather than three exports that
          share a shape.
        </p>
      </Cell>
    </div>
  );
}
