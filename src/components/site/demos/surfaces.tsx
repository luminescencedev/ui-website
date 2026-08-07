'use client';

import { useState } from 'react';
import { Button, HoverList, Progress, SegmentedControl, Skeleton, Tabs, toast } from '@carabine/ui';
import { Calendar, LayoutGrid, List, Rocket, Server, Trash2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTheme } from '../theme';

/** Everything that is not an input and does not open over the page. */

function Stage({ children, width = 300 }: { children: ReactNode; width?: number }) {
  return (
    <div className="w-full" style={{ maxWidth: width }}>
      {children}
    </div>
  );
}

/* ── Button ─────────────────────────────────────────────────────────────── */

export function ButtonVariants() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {(['primary', 'secondary', 'ghost', 'danger'] as const).map((variant) => (
        <Button key={variant} theme={theme} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  );
}

export function ButtonStates() {
  const { theme } = useTheme();
  const [busy, setBusy] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        theme={theme}
        variant="primary"
        loading={busy}
        icon={<Rocket className="size-4" />}
        onClick={() => {
          setBusy(true);
          window.setTimeout(() => setBusy(false), 1800);
        }}
      >
        Deploy
      </Button>

      <Button theme={theme} variant="secondary" copy="pnpm add @carabine/ui">
        pnpm add @carabine/ui
      </Button>

      <Button theme={theme} variant="danger" hold={1200} icon={<Trash2 className="size-4" />}>
        Hold to delete
      </Button>
    </div>
  );
}

export function ButtonOwn() {
  const { theme } = useTheme();

  return (
    <Button
      theme={theme}
      variant="brand"
      variants={{
        brand: {
          dark: {
            background: '#4a86ff',
            color: '#ffffff',
            hover: '#2465ff',
            sweep: '#91bdff',
          },
          light: {
            background: '#2465ff',
            color: '#ffffff',
            hover: '#1552ed',
            sweep: '#91bdff',
          },
        },
      }}
    >
      A fifth variant
    </Button>
  );
}

/* ── Tabs ───────────────────────────────────────────────────────────────── */

const projectTabs = [
  {
    id: 'overview',
    label: 'Overview',
    panel: <p className="pt-3 text-[13px]">Three services, all healthy.</p>,
  },
  {
    id: 'activity',
    label: 'Activity',
    badge: 12,
    panel: <p className="pt-3 text-[13px]">Twelve deploys this week.</p>,
  },
  {
    id: 'settings',
    label: 'Settings',
    panel: <p className="pt-3 text-[13px]">Region, secrets, domains.</p>,
  },
];

export function TabsChip() {
  const { theme } = useTheme();
  return (
    <Stage width={360}>
      <Tabs theme={theme} items={projectTabs} label="Project" />
    </Stage>
  );
}

export function TabsLine() {
  const { theme } = useTheme();
  return (
    <Stage width={360}>
      <Tabs theme={theme} items={projectTabs} variant="line" label="Project" />
    </Stage>
  );
}

export function TabsManual() {
  const { theme } = useTheme();
  return (
    <Stage width={360}>
      <Tabs theme={theme} items={projectTabs} activation="manual" full label="Project" />
    </Stage>
  );
}

/* ── Segmented control ──────────────────────────────────────────────────── */

export function SegmentBasic() {
  const { theme } = useTheme();
  const [range, setRange] = useState('week');

  return (
    <SegmentedControl
      theme={theme}
      items={[
        { id: 'day', label: 'Day' },
        { id: 'week', label: 'Week' },
        { id: 'month', label: 'Month' },
      ]}
      value={range}
      onValueChange={setRange}
      label="Range"
    />
  );
}

export function SegmentIcons() {
  const { theme } = useTheme();

  return (
    <SegmentedControl
      theme={theme}
      items={[
        { id: 'grid', label: 'Grid', icon: <LayoutGrid className="size-3.5" /> },
        { id: 'list', label: 'List', icon: <List className="size-3.5" /> },
        { id: 'calendar', label: 'Calendar', icon: <Calendar className="size-3.5" /> },
      ]}
      defaultValue="list"
      label="View"
    />
  );
}

export function SegmentFull() {
  const { theme } = useTheme();

  return (
    <Stage width={340}>
      <SegmentedControl
        theme={theme}
        items={[
          { id: 'monthly', label: 'Monthly' },
          { id: 'yearly', label: 'Yearly' },
        ]}
        defaultValue="yearly"
        full
        size={40}
        label="Billing"
      />
    </Stage>
  );
}

/* ── Hover list ─────────────────────────────────────────────────────────── */

const rows = [
  {
    id: 'prod',
    label: 'Production',
    description: '3 services · eu-west',
    icon: <Server className="size-4" />,
  },
  {
    id: 'staging',
    label: 'Staging',
    description: '1 service',
    icon: <Server className="size-4" />,
  },
  { id: 'preview', label: 'Preview', description: 'Built on every push' },
];

export function HoverBasic() {
  const { theme } = useTheme();
  const [last, setLast] = useState<string | null>(null);

  return (
    <Stage>
      <HoverList
        theme={theme}
        items={rows}
        onSelect={(item) => setLast(item.id)}
        label="Environments"
      />
      <p
        className="mt-2 text-[12px]"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-subtle)' }}
      >
        {last ? `chose ${last}` : 'nothing chosen'}
      </p>
    </Stage>
  );
}

export function HoverPlate() {
  const { theme } = useTheme();

  return (
    <Stage>
      <HoverList theme={theme} items={rows} plate onSelect={() => {}} label="Environments" />
    </Stage>
  );
}

/* ── Skeleton ───────────────────────────────────────────────────────────── */

export function SkeletonSwap() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);

  return (
    <Stage>
      <div className="flex flex-col gap-4">
        <Skeleton
          theme={theme}
          loading={loading}
          width={['70%', '100%', '86%']}
          height={11}
          gap={9}
        >
          <div>
            <p className="text-[13px] font-medium" style={{ color: 'var(--fg)' }}>
              Arthur Garnier
            </p>
            <p className="text-[12.5px]" style={{ color: 'var(--fg-muted)' }}>
              Design engineer, Lyon. Building a component library that ships its opinions.
            </p>
          </div>
        </Skeleton>

        <Button
          theme={theme}
          variant="secondary"
          size={30}
          onClick={() => setLoading((was) => !was)}
        >
          {loading ? 'Arrive' : 'Wait again'}
        </Button>
      </div>
    </Stage>
  );
}

export function SkeletonShapes() {
  const { theme } = useTheme();

  return (
    <div className="flex items-center gap-4">
      <Skeleton theme={theme} circle height={44} />
      <div className="w-[180px]">
        <Skeleton theme={theme} width={['80%', '55%']} height={10} gap={8} />
      </div>
      <div className="w-[120px]">
        <Skeleton theme={theme} ratio={16 / 9} radius={10} />
      </div>
    </div>
  );
}

export function SkeletonInline() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);

  return (
    <Stage width={340}>
      <p className="text-[13.5px]" style={{ color: 'var(--fg-muted)' }}>
        Deployed to{' '}
        <Skeleton theme={theme} loading={loading} inline width={72} height={11}>
          <strong style={{ color: 'var(--fg)' }}>eu-west-1</strong>
        </Skeleton>{' '}
        in 42 seconds.
      </p>

      <Button theme={theme} variant="ghost" size={28} onClick={() => setLoading((was) => !was)}>
        Toggle
      </Button>
    </Stage>
  );
}

/* ── Progress ───────────────────────────────────────────────────────────── */

export function ProgressBasic() {
  const { theme } = useTheme();

  return (
    <Stage>
      <div className="flex flex-col gap-4">
        <Progress theme={theme} value={62} showValue label="Uploading photos" />
        <Progress theme={theme} label="Working" />
      </div>
    </Stage>
  );
}

export function ProgressRange() {
  const { theme } = useTheme();

  return (
    <Stage>
      <Progress
        theme={theme}
        value={3}
        max={7}
        showValue
        format={(step) => `${step}/7`}
        label="Step three of seven"
      />
    </Stage>
  );
}

export function ProgressBar() {
  const { theme } = useTheme();

  return (
    <Stage>
      <Progress theme={theme} variant="bar" value={78} height={8} showValue label="Disk" />
    </Stage>
  );
}

/* ── Toast ──────────────────────────────────────────────────────────────── */

export function ToastBasic() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        theme={theme}
        variant="secondary"
        size={30}
        onClick={() => toast.success('Deployed', { description: '3 services in 42s' })}
      >
        success
      </Button>
      <Button
        theme={theme}
        variant="secondary"
        size={30}
        onClick={() => toast.error('Deploy failed', { description: 'Build exited with 1' })}
      >
        error
      </Button>
      <Button
        theme={theme}
        variant="secondary"
        size={30}
        onClick={() => toast.warning('Two services are unhealthy')}
      >
        warning
      </Button>
      <Button
        theme={theme}
        variant="secondary"
        size={30}
        onClick={() => {
          const id = toast.loading('Deploying…');
          window.setTimeout(() => toast.success('Deployed', { id }), 1600);
        }}
      >
        loading → success
      </Button>
    </div>
  );
}

/*
 * No second `<Toaster />` here. The site mounts one in its chrome, the store is
 * a singleton, and a second viewport would draw every card twice — which is the
 * first thing the toast's own README tells you not to do.
 */
