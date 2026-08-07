'use client';

import { useState } from 'react';
import { ColorPicker, OtpInput, Select, Slider, Switch, TextField } from '@carabine/ui';
import { Globe, Lock, Mail } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTheme } from '../theme';

/**
 * The input demos, and every one of them is the real component with real props.
 *
 * They live in client files rather than inline in the pages so the pages stay
 * server components — which is what keeps Shiki, and its whole TextMate grammar,
 * out of the bundle.
 */

function Stage({ children, width = 260 }: { children: ReactNode; width?: number }) {
  return (
    <div className="w-full" style={{ maxWidth: width }}>
      {children}
    </div>
  );
}

/* ── Switch ─────────────────────────────────────────────────────────────── */

export function SwitchBasic() {
  const { theme } = useTheme();
  const [on, setOn] = useState(true);

  return <Switch theme={theme} label="Notifications" checked={on} onCheckedChange={setOn} />;
}

export function SwitchSizes() {
  const { theme } = useTheme();

  return (
    <div className="flex items-center gap-6">
      <Switch theme={theme} defaultChecked width={36} height={18} inset={2} aria-label="Small" />
      <Switch theme={theme} defaultChecked aria-label="Default" />
      <Switch theme={theme} defaultChecked width={64} height={32} inset={4} aria-label="Large" />
    </div>
  );
}

export function SwitchSkin() {
  const { theme } = useTheme();

  return (
    <div className="flex items-center gap-6">
      <Switch
        theme={theme}
        label="Live"
        defaultChecked
        skin={{ on: '#22c55e', thumbOn: '#052e16' }}
      />
      <Switch
        theme={theme}
        label="Alert"
        defaultChecked
        skin={{ on: '#f43f5e', thumbOn: '#4c0519' }}
      />
    </div>
  );
}

/* ── Slider ─────────────────────────────────────────────────────────────── */

export function SliderBasic() {
  const { theme } = useTheme();
  const [at, setAt] = useState(40);

  return (
    <Stage>
      <Slider
        theme={theme}
        label="Volume"
        value={at}
        onValueChange={setAt}
        showValue
        format={(value) => `${value}%`}
      />
    </Stage>
  );
}

export function SliderSteps() {
  const { theme } = useTheme();

  return (
    <Stage>
      <Slider
        theme={theme}
        label="Temperature"
        min={16}
        max={30}
        step={0.5}
        defaultValue={21}
        marks
        showValue
        format={(value) => `${value.toFixed(1)}°C`}
      />
    </Stage>
  );
}

export function SliderShape() {
  const { theme } = useTheme();

  return (
    <Stage>
      <Slider theme={theme} label="Thicker" defaultValue={62} height={12} thumb={22} showValue />
    </Stage>
  );
}

/* ── Text field ─────────────────────────────────────────────────────────── */

export function FieldBasic() {
  const { theme } = useTheme();

  return (
    <Stage>
      <TextField
        theme={theme}
        label="Project name"
        defaultValue="carabine"
        hint="Used in URLs, so keep it short."
        full
      />
    </Stage>
  );
}

export function FieldError() {
  const { theme } = useTheme();
  const [value, setValue] = useState('arthur@');

  const bad = !value.includes('@') || value.endsWith('@');

  return (
    <Stage>
      <TextField
        theme={theme}
        label="Email"
        type="email"
        icon={<Mail className="size-4" />}
        value={value}
        onValueChange={setValue}
        error={bad ? 'That does not look like an address.' : undefined}
        hint="We only use it for deploy failures."
        full
      />
    </Stage>
  );
}

export function FieldFloat() {
  const { theme } = useTheme();

  return (
    <Stage>
      <TextField
        theme={theme}
        label="Domain"
        float
        placeholder=""
        trailing={<span className="text-[11px]">.dev</span>}
        icon={<Globe className="size-4" />}
        full
      />
    </Stage>
  );
}

/* ── OTP ────────────────────────────────────────────────────────────────── */

export function OtpBasic() {
  const { theme } = useTheme();
  const [code, setCode] = useState('');

  return (
    <OtpInput theme={theme} length={6} groups={3} size={36} value={code} onValueChange={setCode} />
  );
}

export function OtpStates() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center gap-5">
      <OtpInput theme={theme} length={4} size={40} value="1234" verified onValueChange={() => {}} />
      <OtpInput
        theme={theme}
        length={4}
        size={40}
        value="9999"
        error="That code has expired."
        onValueChange={() => {}}
      />
    </div>
  );
}

export function OtpLetters() {
  const { theme } = useTheme();

  return (
    <OtpInput theme={theme} length={5} allow="alphanumeric" mask size={40} defaultValue="A7K" />
  );
}

/* ── Select ─────────────────────────────────────────────────────────────── */

const countries = [
  { id: 'fr', label: 'France', description: 'Paris', group: 'Europe' },
  { id: 'be', label: 'Belgium', description: 'Brussels', group: 'Europe' },
  { id: 'ch', label: 'Switzerland', description: 'Bern', group: 'Europe' },
  { id: 'jp', label: 'Japan', description: 'Tokyo', group: 'Asia' },
  { id: 'kr', label: 'South Korea', description: 'Seoul', group: 'Asia' },
];

export function SelectBasic() {
  const { theme } = useTheme();
  const [value, setValue] = useState<string | null>('fr');

  return (
    <Stage>
      <Select
        theme={theme}
        label="Country"
        items={countries}
        value={value}
        onValueChange={setValue}
        hint="Where you are billed"
      />
    </Stage>
  );
}

export function SelectSearch() {
  const { theme } = useTheme();

  return (
    <Stage>
      <Select
        theme={theme}
        label="Country"
        items={countries}
        searchable
        clearable
        placeholder="Anywhere"
      />
    </Stage>
  );
}

export function SelectError() {
  const { theme } = useTheme();

  return (
    <Stage>
      <Select
        theme={theme}
        label="Plan"
        items={[
          { id: 'free', label: 'Free', icon: <Globe className="size-4" /> },
          {
            id: 'pro',
            label: 'Pro',
            icon: <Lock className="size-4" />,
            description: '€19 a month',
          },
          { id: 'ent', label: 'Enterprise', disabled: true, description: 'Talk to us' },
        ]}
        error="Pick a plan to continue."
      />
    </Stage>
  );
}

/* ── Colour picker ──────────────────────────────────────────────────────── */

export function PickerBasic() {
  const { theme } = useTheme();
  const [color, setColor] = useState('#FC8835');

  return (
    <div className="flex items-center gap-4">
      <ColorPicker theme={theme} value={color} onValueChange={setColor} />
      <span
        className="text-[12px]"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-muted)' }}
      >
        {color}
      </span>
    </div>
  );
}

export function PickerOwn() {
  const { theme } = useTheme();

  return (
    <ColorPicker
      theme={theme}
      size={132}
      defaultValue="#4A86FF"
      rings={[
        { radius: 0, colors: ['#FFFFFF'], label: () => 'White' },
        { radius: 0.18, colors: ['#F4F4F5', '#D4D4D8', '#A1A1AA', '#71717A'] },
        {
          radius: 0.34,
          colors: ['#4A86FF', '#2465FF', '#B372DE', '#F43F5E', '#F59E0B', '#22C55E'],
          rotate: 15,
        },
      ]}
    />
  );
}
