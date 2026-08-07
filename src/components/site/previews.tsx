'use client';

import {
  Accordion,
  Button,
  ColorPicker,
  CommandPalette,
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
} from '@carabine/ui';
import { Copy, Share2, Trash2 } from 'lucide-react';
import { useTheme } from './theme';

/**
 * One miniature per component, for the page that lists them all.
 *
 * **Every tile is the real component**, at real props — nothing here is a
 * drawing of a component. A catalogue built out of mock-ups is a catalogue that
 * drifts, and the first person to notice is the one who installed the package
 * expecting what they saw.
 *
 * The consequence is that some of these are triggers rather than panels: a menu,
 * a dialog and a drawer have nothing on the page until they are opened, so what
 * a tile can honestly show is the button that opens them. That is what you would
 * see, which is the point.
 *
 * The tiles are `inert` where they are used, so none of this is operable — a
 * card that is a link cannot also contain a slider you are meant to drag.
 */

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'usage', label: 'Usage' },
  { id: 'logs', label: 'Logs' },
];

const rows = [
  { id: 'copy', label: 'Copy link', icon: <Copy className="size-3.5" /> },
  { id: 'share', label: 'Share', icon: <Share2 className="size-3.5" /> },
  { id: 'delete', label: 'Delete', icon: <Trash2 className="size-3.5" />, danger: true },
];

const countries = [
  { id: 'fr', label: 'France' },
  { id: 'be', label: 'Belgium' },
  { id: 'ch', label: 'Switzerland' },
];

export function Preview({ slug }: { slug: string }) {
  const { theme } = useTheme();

  switch (slug) {
    case 'accordion':
      return (
        <Accordion
          theme={theme}
          radius={14}
          padding={10}
          defaultValue={['a']}
          items={[
            { id: 'a', title: 'Shipping', content: <p className="text-[12px]">Same day.</p> },
            { id: 'b', title: 'Returns', content: <p className="text-[12px]">Thirty days.</p> },
          ]}
        />
      );

    case 'button':
      return (
        <div className="flex items-center gap-2">
          <Button theme={theme} variant="primary" size={32}>
            Deploy
          </Button>
          <Button theme={theme} variant="secondary" size={32}>
            Cancel
          </Button>
        </div>
      );

    case 'color-picker':
      return <ColorPicker theme={theme} value="#4a86ff" size={132} plate={false} />;

    case 'command-palette':
      return (
        <CommandPalette theme={theme} shortcut={null} items={[]}>
          <Button theme={theme} variant="secondary" size={32}>
            Search commands ⌘K
          </Button>
        </CommandPalette>
      );

    case 'dialog':
      return (
        <Dialog theme={theme} title="Delete project" description="This cannot be undone.">
          <Button theme={theme} variant="secondary" size={32}>
            Delete project
          </Button>
        </Dialog>
      );

    case 'drawer':
      return (
        <Drawer theme={theme} side="right" title="Filters" content={<p>…</p>}>
          <Button theme={theme} variant="secondary" size={32}>
            Filters
          </Button>
        </Drawer>
      );

    case 'hover-list':
      return <HoverList theme={theme} items={rows} radius={14} padding={5} label="Actions" />;

    case 'menu':
      return (
        <Menu theme={theme} items={rows} label="Project actions">
          Actions
        </Menu>
      );

    case 'otp-input':
      return <OtpInput theme={theme} length={4} size={34} gap={5} value="26" />;

    case 'popover':
      return (
        <Popover theme={theme} content={<p className="text-[12px]">Anchored to its trigger.</p>}>
          <Button theme={theme} variant="secondary" size={32}>
            Details
          </Button>
        </Popover>
      );

    case 'progress':
      return (
        <div className="w-full max-w-[190px]">
          <Progress theme={theme} value={62} showValue label="Uploading" />
        </div>
      );

    case 'segmented-control':
      return (
        <SegmentedControl
          theme={theme}
          items={[
            { id: 'day', label: 'Day' },
            { id: 'week', label: 'Week' },
            { id: 'month', label: 'Month' },
          ]}
          defaultValue="week"
          label="Range"
        />
      );

    case 'select':
      return (
        <div className="w-full max-w-[190px]">
          <Select theme={theme} items={countries} defaultValue="fr" label="Country" />
        </div>
      );

    case 'skeleton':
      return (
        <div className="w-full max-w-[190px]">
          <Skeleton theme={theme} loading width={['100%', '72%', '86%']} height={10} gap={8} />
        </div>
      );

    case 'slider':
      return (
        <div className="w-full max-w-[190px]">
          <Slider theme={theme} defaultValue={62} label="Volume" showValue />
        </div>
      );

    case 'switch':
      return (
        <div className="flex items-center gap-3">
          <Switch theme={theme} defaultChecked aria-label="Notifications" />
          <Switch theme={theme} aria-label="Sound" />
        </div>
      );

    case 'tabs':
      return <Tabs theme={theme} items={tabs} defaultValue="overview" label="Project" />;

    case 'text-field':
      return (
        <div className="w-full max-w-[190px]">
          <TextField theme={theme} label="Project" defaultValue="carabine" />
        </div>
      );

    case 'tooltip':
      return (
        <Tooltip theme={theme} content="Copy link" placement="top">
          <Button theme={theme} variant="ghost" size={32} icon={<Copy className="size-4" />} />
        </Tooltip>
      );

    default:
      return null;
  }
}

/** Whether a tile exists at all, so the grid does not draw an empty stage. */
export const previewed = (slug: string): boolean => KNOWN.has(slug);

const KNOWN = new Set([
  'accordion',
  'button',
  'color-picker',
  'command-palette',
  'dialog',
  'drawer',
  'hover-list',
  'menu',
  'otp-input',
  'popover',
  'progress',
  'segmented-control',
  'select',
  'skeleton',
  'slider',
  'switch',
  'tabs',
  'text-field',
  'tooltip',
]);
