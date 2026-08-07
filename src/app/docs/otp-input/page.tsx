import type { Metadata } from 'next';
import { Code } from '@/components/site/Code';
import { Example } from '@/components/site/Example';
import {
  Around,
  DocPage,
  H2,
  H3,
  P,
  Refuses,
  Related,
  Rule,
  Table,
  Hatch,
} from '@/components/site/page';
import { OtpBasic, OtpLetters, OtpStates } from '@/components/site/demos/inputs';

export const metadata: Metadata = {
  title: 'OTP input',
  description:
    'A one-time code, in cells. One real input underneath, cells drawn over it — so paste, autofill and the software keyboard all work without being reimplemented.',
};

const marks = [
  { id: 'usage', label: 'Usage' },
  { id: 'mechanism', label: 'One input, many cells' },
  { id: 'examples', label: 'Examples' },
  { id: 'states', label: 'Verified and wrong', sub: true },
  { id: 'letters', label: 'Letters, and masking', sub: true },
  { id: 'customization', label: 'Customization' },
  { id: 'styling', label: 'Styling reference' },
  { id: 'api', label: 'API reference' },
  { id: 'refuses', label: 'What it refuses' },
  { id: 'related', label: 'Related components' },
];

export default function OtpPage() {
  return (
    <DocPage
      eyebrow="Input"
      title="OTP input"
      description="A one-time code, in cells. There is one real input underneath and the cells are drawn over it — which is why paste, autofill and the phone keyboard all behave."
      marks={marks}
    >
      <H2 id="usage">Usage</H2>

      <Code lang="tsx" code={`import { OtpInput } from '@carabine/ui/otp-input';`} />

      <Example code={`<OtpInput length={6} groups={3} value={code} onValueChange={setCode} />`}>
        <OtpBasic />
      </Example>

      <Rule>
        Six inputs is six things to keep in sync, and every one of them is a place for a caret to go
        missing. There is one.
      </Rule>

      <H2 id="mechanism">One input, many cells</H2>

      <P>
        The cells are <code>div</code>s. Underneath them sits a single transparent{' '}
        <code>&lt;input&gt;</code> with <code>autocomplete=&quot;one-time-code&quot;</code>, and
        everything a code field is expected to do — paste six digits at once, take the code the OS
        offers from an SMS, show a numeric keyboard, be found by a password manager — is that input
        doing its job rather than six of them being coordinated.
      </P>

      <P>
        The caret is drawn, not native, and its blink lives in <code>otp.css</code>: a{' '}
        <code>steps()</code> keyframe is not something a utility can express.
      </P>

      <H2 id="examples">Examples</H2>

      <H3 id="states">Verified and wrong</H3>

      <P>
        Three states, and the component draws all three without deciding which one you are in.{' '}
        <code>verified</code> turns the cells, pulses once and goes read-only; <code>error</code>{' '}
        turns them the other way, shakes once, and says why.
      </P>

      <Example
        code={`<OtpInput length={4} value="1234" verified />
<OtpInput length={4} value="9999" error="That code has expired." />`}
      >
        <OtpStates />
      </Example>

      <H3 id="letters">Letters, and masking</H3>

      <P>
        <code>allow</code> filters what may be typed — everything else is dropped rather than
        rejected with a message. <code>uppercase</code> is on by default for anything that is not
        digits, and <code>mask</code> draws dots.
      </P>

      <Example code={`<OtpInput length={5} allow="alphanumeric" mask defaultValue="A7K" />`}>
        <OtpLetters />
      </Example>

      <H2 id="customization">Customization</H2>

      <Code
        lang="tsx"
        code={`<OtpInput
  length={8}
  groups={4}      // a separator every N cells
  size={44}       // cell height; the width, radius and type follow it
  radius={12}
  gap={6}
  onComplete={verify}   // fires once the last cell fills
  theme="light"
/>`}
      />

      <H2 id="styling">Styling reference</H2>

      <P>
        Tailwind utilities plus <code>otp.css</code> for the caret&apos;s blink and the error shake.
        Each cell is a recess — the text field&apos;s material at another size — so a code field and
        a text field on the same form read as the same thing.
      </P>

      <H2 id="api">API reference</H2>

      <Hatch />

      <Table
        head={['Prop', 'Type', 'Default', '']}
        rows={[
          ['length', 'number', '6', 'How many cells'],
          ['value', 'string', '—', 'Controlled'],
          ['defaultValue', 'string', "''", ''],
          ['onValueChange', '(value: string) => void', '—', ''],
          ['onComplete', '(value: string) => void', '—', 'Fired once the last cell fills'],
          [
            'allow',
            "'digits' | 'letters' | 'alphanumeric'",
            "'digits'",
            'Everything else is dropped',
          ],
          ['uppercase', 'boolean', 'on unless digits', ''],
          ['mask', 'boolean', 'false', 'Dots instead of characters'],
          ['groups', 'number', '—', 'A separator every N cells'],
          ['error', 'ReactNode', '—', 'Turns the cells, shakes once, says why'],
          ['verified', 'boolean', 'false', 'Accepted: turns, pulses, goes read-only'],
          ['verifiedLabel', 'string', "'Code verified'", 'Announced when it turns'],
          ['size', 'number', '48', 'Cell height; width, radius and type follow it'],
          ['radius', 'number', 'size × 0.25', ''],
          ['gap', 'number', '8', ''],
          ['theme', "'dark' | 'light'", "'dark'", ''],
          ['disabled', 'boolean', 'false', ''],
          ['label', 'string', "'Verification code'", 'Accessible name'],
        ]}
      />

      <H2 id="refuses">What it refuses</H2>

      <Refuses
        items={[
          {
            title: 'No countdown, no resend',
            why: 'Both belong to whatever sent the code, which knows when it expires and how to send another. A field that owned a timer would have to be told when the timer started, which is the same as not owning it.',
          },
          {
            title: 'No verifying of its own',
            why: (
              <>
                <code>verified</code> and <code>error</code> are told to it. It draws three states;
                deciding which one you are in is the server&apos;s job.
              </>
            ),
          },
        ]}
      />

      <H2 id="related">Related components</H2>

      <Related current="otp-input" />

      <Around current="otp-input" />
    </DocPage>
  );
}
