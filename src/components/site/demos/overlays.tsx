'use client';

import { useState } from 'react';
import {
  Button,
  CommandPalette,
  Dialog,
  Drawer,
  Menu,
  Popover,
  Slider,
  Switch,
  Tooltip,
} from '@carabine/ui';
import { Copy, Download, ExternalLink, Pencil, Share2, Trash2 } from 'lucide-react';
import { useTheme } from '../theme';

/** The overlay demos. Real components, real triggers, real panels. */

const commands = [
  { id: 'rename', label: 'Rename', icon: <Pencil className="size-4" />, shortcut: 'F2' },
  { id: 'copy', label: 'Copy link', icon: <Copy className="size-4" />, shortcut: '⌘C' },
  { id: 'share', label: 'Share', icon: <Share2 className="size-4" /> },
  { id: 'sep', separator: true, label: '' },
  { id: 'delete', label: 'Delete', icon: <Trash2 className="size-4" />, danger: true },
];

/* ── Dialog ─────────────────────────────────────────────────────────────── */

export function DialogBasic() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      theme={theme}
      open={open}
      onOpenChange={setOpen}
      title="Delete project"
      description="Every deployment, log and secret goes with it. This cannot be undone."
      footer={
        <>
          <Button theme={theme} variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button theme={theme} variant="danger" onClick={() => setOpen(false)}>
            Delete
          </Button>
        </>
      }
    >
      <Button theme={theme} variant="secondary">
        Delete project
      </Button>
    </Dialog>
  );
}

export function DialogHeld() {
  const { theme } = useTheme();

  return (
    <Dialog
      theme={theme}
      title="Signing you in"
      description="This will not take long, and there is nothing to do about it."
      dismissible={false}
      close={false}
      width={360}
      footer={<span className="text-[12px]">Escape and the scrim are both off.</span>}
    >
      <Button theme={theme} variant="secondary">
        Open a held dialog
      </Button>
    </Dialog>
  );
}

/* ── Drawer ─────────────────────────────────────────────────────────────── */

export function DrawerBasic() {
  const { theme } = useTheme();

  return (
    <Drawer
      theme={theme}
      title="Filters"
      description="Narrow the list"
      content={
        <div className="flex flex-col gap-4 py-2">
          <Switch theme={theme} label="In stock only" defaultChecked />
          <Slider theme={theme} label="Max price" defaultValue={40} showValue />
        </div>
      }
      footer={
        <Button theme={theme} variant="primary" full>
          Show 42 results
        </Button>
      }
    >
      <Button theme={theme} variant="secondary">
        Filters
      </Button>
    </Drawer>
  );
}

export function DrawerSides() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Drawer
          key={side}
          theme={theme}
          side={side}
          size={side === 'left' || side === 'right' ? 320 : undefined}
          title={`From the ${side}`}
          content={<p className="py-2 text-[13px]">Throw it back towards the edge it came from.</p>}
        >
          <Button theme={theme} variant="secondary" size={30}>
            {side}
          </Button>
        </Drawer>
      ))}
    </div>
  );
}

/* ── Popover ────────────────────────────────────────────────────────────── */

export function PopoverBasic() {
  const { theme } = useTheme();

  return (
    <Popover
      theme={theme}
      width={240}
      content={
        <div className="flex flex-col gap-3">
          <p className="text-[13px] font-medium">Display</p>
          <Switch theme={theme} label="Compact rows" />
          <Slider theme={theme} label="Density" defaultValue={60} />
        </div>
      }
    >
      <Button theme={theme} variant="secondary">
        Options
      </Button>
    </Popover>
  );
}

export function PopoverSides() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Popover
          key={side}
          theme={theme}
          placement={side}
          content={<p className="text-[12.5px]">Grown from the {side} edge.</p>}
        >
          <Button theme={theme} variant="secondary" size={30}>
            {side}
          </Button>
        </Popover>
      ))}
    </div>
  );
}

/* ── Tooltip ────────────────────────────────────────────────────────────── */

export function TooltipBasic() {
  const { theme } = useTheme();

  const tools = [
    { key: 'copy', label: 'Copy link', icon: <Copy className="size-4" /> },
    { key: 'share', label: 'Share', icon: <Share2 className="size-4" /> },
    { key: 'download', label: 'Download', icon: <Download className="size-4" /> },
    { key: 'open', label: 'Open in a new tab', icon: <ExternalLink className="size-4" /> },
  ];

  return (
    <div className="flex items-center gap-1">
      {tools.map((tool) => (
        <Tooltip key={tool.key} theme={theme} content={tool.label}>
          <Button theme={theme} variant="ghost" aria-label={tool.label} icon={tool.icon} />
        </Tooltip>
      ))}
    </div>
  );
}

export function TooltipDelay() {
  const { theme } = useTheme();

  return (
    <div className="flex items-center gap-3">
      <Tooltip theme={theme} content="Waits 600ms" delay={600}>
        <Button theme={theme} variant="secondary" size={30}>
          Patient
        </Button>
      </Tooltip>
      <Tooltip theme={theme} content="Answers at once" delay={0}>
        <Button theme={theme} variant="secondary" size={30}>
          Immediate
        </Button>
      </Tooltip>
    </div>
  );
}

/* ── Menu ───────────────────────────────────────────────────────────────── */

export function MenuBasic() {
  const { theme } = useTheme();
  const [last, setLast] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-3">
      <Menu theme={theme} items={commands} onSelect={(item) => setLast(item.id)} label="Actions">
        Actions
      </Menu>
      <span
        className="text-[12px]"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-subtle)' }}
      >
        {last ? `ran ${last}` : 'nothing yet'}
      </span>
    </div>
  );
}

export function MenuContext() {
  const { theme } = useTheme();

  return (
    <Menu theme={theme} trigger="context" items={commands} label="Canvas actions">
      <div
        className="grid h-28 w-full max-w-[280px] place-items-center rounded-xl text-[12.5px]"
        style={{
          border: '1px dashed var(--border-strong)',
          color: 'var(--fg-subtle)',
        }}
      >
        Right-click anywhere in here
      </div>
    </Menu>
  );
}

/* ── Command palette ────────────────────────────────────────────────────── */

export function PaletteBasic() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  const items = [
    { id: 'new', label: 'New project', group: 'Create', shortcut: '⌘N' },
    { id: 'invite', label: 'Invite a teammate', group: 'Create' },
    { id: 'deploy', label: 'Deploy to production', group: 'Actions', shortcut: '⌘⏎' },
    { id: 'logs', label: 'Open logs', group: 'Actions', keywords: ['debug', 'output'] },
    { id: 'billing', label: 'Billing', group: 'Settings', description: 'Plan, invoices, seats' },
  ];

  return (
    <CommandPalette
      theme={theme}
      items={items}
      open={open}
      onOpenChange={setOpen}
      shortcut={null}
      placeholder="Type a command…"
      footer={<span>↑↓ to move · ↵ to run · esc to close</span>}
    >
      <Button theme={theme} variant="secondary">
        Open the palette
      </Button>
    </CommandPalette>
  );
}
