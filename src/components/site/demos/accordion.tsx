'use client';

import { useState } from 'react';
import { Accordion } from '@carabine/ui';
import { CreditCard, Package, RotateCcw } from 'lucide-react';
import { useTheme } from '../theme';

/**
 * The demos, and every one of them is the real component with the real props.
 *
 * They live in one client file rather than inline in the page so the page itself
 * stays a server component — which is what keeps Shiki, and its whole TextMate
 * grammar, out of the bundle.
 */

const faq = [
  {
    id: 'orders',
    title: 'How do I place an order?',
    content: (
      <p>
        Add what you want to the basket and check out. Nothing is charged until the order is
        confirmed, and the confirmation arrives by email within a minute.
      </p>
    ),
  },
  {
    id: 'shipping',
    title: 'When will it ship?',
    content: (
      <p>
        Same day for anything ordered before 2pm, next working day after that. Tracking is sent the
        moment the parcel leaves.
      </p>
    ),
  },
  {
    id: 'refunds',
    title: 'How do I request a refund?',
    content: (
      <p>
        Thirty days, no reason needed. Open the order in your account and press <em>Return</em> —
        the label is generated for you.
      </p>
    ),
  },
];

export function Basic() {
  const { theme } = useTheme();
  return (
    <Accordion className="w-full max-w-[27rem]" theme={theme} items={faq} defaultValue={['orders']} />
  );
}

export function Multiple() {
  const { theme } = useTheme();
  return (
    <Accordion className="w-full max-w-[27rem]" theme={theme} items={faq} multiple defaultValue={['orders', 'shipping']} />
  );
}

export function Rich() {
  const { theme } = useTheme();

  const items = [
    {
      id: 'delivery',
      icon: <Package className="size-4" />,
      title: 'Delivery',
      description: 'Where it is, and when it lands',
      content: <p>Dispatched from Lyon, delivered by the carrier you picked at checkout.</p>,
    },
    {
      id: 'payment',
      icon: <CreditCard className="size-4" />,
      title: 'Payment',
      description: 'Cards, and what is stored',
      content: (
        <p>Nothing is stored here. The card lives with the processor and we hold a token.</p>
      ),
    },
    {
      id: 'returns',
      icon: <RotateCcw className="size-4" />,
      title: 'Returns',
      description: 'Not available on this plan',
      disabled: true,
      content: <p>Unreachable — the row is stepped over by the arrow keys too.</p>,
    },
  ];

  return (
    <Accordion className="w-full max-w-[27rem]" theme={theme} items={items} />
  );
}

export function Bare() {
  const { theme } = useTheme();
  return (
    <Accordion className="w-full max-w-[27rem]" theme={theme} items={faq} plate={false} />
  );
}

export function Controlled() {
  const { theme } = useTheme();
  const [value, setValue] = useState<string[]>(['shipping']);

  return (
    <div className="flex w-full max-w-[27rem] flex-col gap-3">
      <Accordion theme={theme} items={faq} value={value} onValueChange={setValue} multiple />
      <p
        className="text-[12px]"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-subtle)' }}
      >
        value = [{value.map((id) => `'${id}'`).join(', ')}]
      </p>
    </div>
  );
}
