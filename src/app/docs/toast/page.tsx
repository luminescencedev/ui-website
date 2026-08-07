import type { Metadata } from 'next';
import { Code } from '@/components/site/Code';
import { Example } from '@/components/site/Example';
import { Around, DocPage, H2, H3, P, Related, Rule, Table, Hatch } from '@/components/site/page';
import { ToastBasic } from '@/components/site/demos/surfaces';

export const metadata: Metadata = {
  title: 'Toast',
  description:
    'A notification stack. Cards pile up in a corner, hovering fans them out, a swipe throws one away, and the countdown is the decoration.',
};

const marks = [
  { id: 'usage', label: 'Usage' },
  { id: 'imperative', label: 'The imperative API' },
  { id: 'examples', label: 'Examples' },
  { id: 'promise', label: 'Updating in place', sub: true },
  { id: 'tones', label: 'Tones', sub: true },
  { id: 'customization', label: 'Customization' },
  { id: 'styling', label: 'Styling reference' },
  { id: 'api', label: 'API reference' },
  { id: 'related', label: 'Related components' },
];

export default function ToastPage() {
  return (
    <DocPage
      eyebrow="Feedback"
      title="Toast"
      description="A notification stack. Cards pile up in a corner with the newest in front, hovering fans them out, and each card carries a strip of cells that burns down as its time runs out — the countdown is the decoration."
      marks={marks}
    >
      <H2 id="usage">Usage</H2>

      <Code
        lang="tsx"
        code={`import { Toaster, toast } from '@carabine/ui/toast';

function App() {
  return (
    <>
      <YourApp />
      <Toaster position="bottom-right" />
    </>
  );
}`}
      />

      <Example
        code={`toast.success('Deployed', { description: '3 services in 42s' });
toast.error('Deploy failed', { description: 'Build exited with 1' });
toast.warning('Two services are unhealthy');

const id = toast.loading('Deploying…');
toast.success('Deployed', { id });   // same slot, no exit, no re-entry`}
      >
        <ToastBasic />
      </Example>

      <Rule>
        Mount <strong>one</strong> <code>&lt;Toaster /&gt;</code>. The store is a singleton, so a
        second viewport draws every card twice.
      </Rule>

      <H2 id="imperative">The imperative API</H2>

      <P>
        A toast is fired from wherever the thing happened — a submit handler, a websocket message, a
        catch block — and none of those places has a React tree to render into. So the API is a
        function, the state is a store, and the viewport is mounted once at the root where its live
        region can exist <em>before</em> the content it announces.
      </P>

      <Code
        lang="ts"
        code={`toast.success(title, options?)   // → id
toast.error(title, options?)
toast.warning(title, options?)
toast.loading(title, options?)   // sticky: it ends when you end it
toast(state, title, options?)    // any state, including one you invented
toast.dismiss(id?)               // no id dismisses everything
toast.promise(work, copy)        // → the promise's value`}
      />

      <H2 id="examples">Examples</H2>

      <H3 id="promise">Updating in place</H3>

      <P>
        Pushing with an existing <code>id</code> replaces the contents and keeps the slot — no exit,
        no re-entry, no jump. <code>toast.promise</code> is that pattern wrapped up, and it{' '}
        <strong>re-throws</strong>: the toast reports the failure, it does not swallow it.
      </P>

      <Code
        lang="ts"
        code={`await toast.promise(deploy(), {
  loading: { title: 'Deploying…' },
  success: (result) => ({ title: 'Deployed', description: \`\${result.count} services\` }),
  error: (err) => ({ title: 'Deploy failed', description: String(err) }),
});`}
      />

      <H3 id="tones">Tones</H3>

      <P>
        A tone is what a state looks like: an icon, a colour per theme, three shades for the strip,
        and optionally an action it offers. The key set is open, so the same prop restyles a
        built-in state or invents one.
      </P>

      <Code
        lang="tsx"
        code={`import { Toaster, defaultTones, toast } from '@carabine/ui/toast';

<Toaster
  tones={{
    // the merge is per state, so a state you change spreads the default
    success: { ...defaultTones.success, cells: ['#34d399', '#10b981', '#059669'] },
    deploy: {
      icon: <Rocket className="size-4" />,
      color: { dark: '#a78bfa', light: '#7c3aed' },
      cells: ['#c4b5fd', '#a78bfa', '#8b5cf6'],
      sticky: true,
      action: { label: 'Logs', onClick: (id) => open(id) },
    },
  }}
/>

toast('deploy', 'Shipping to production…');`}
      />

      <H2 id="customization">Customization</H2>

      <Code
        lang="tsx"
        code={`<Toaster
  position="top-center"   // six anchors: top/bottom × left/center/right
  duration={7}            // seconds of life
  mode="snake"            // how the lit part of the strip moves. none drops it
  width={400}
  offset={20}             // from the viewport edges
  gap={12}                // between cards once expanded
  peek={14}               // how much of each card behind shows when collapsed
  scaleStep={0.05}        // scale shed per card going back
  visible={4}             // cards on screen while collapsed
  theme="light"
/>`}
      />

      <H2 id="styling">Styling reference</H2>

      <P>
        The card&apos;s core is <strong>opaque</strong>, and it is the one exception to the
        house&apos;s glass density. A card is the only surface here that floats over{' '}
        <em>another copy of itself</em>: what would show through is the card behind it, offset by
        the peek and scaled down — a duplicate of the same object, which reads as a rendering fault
        rather than as material.
      </P>

      <P>
        The blur cannot rescue that case either. A transform on an ancestor establishes a{' '}
        <strong>backdrop root</strong>, and <code>backdrop-filter</code> inside one has nothing left
        to sample — so anything living inside an animated <code>motion.div</code> is getting no blur
        at all, whatever the class says. A front card looking see-through and then settling opaque
        is that, not an entrance. The shell above it stays glass, because a shell is only ever seen
        as a ring, and the ring is over the page.
      </P>

      <H2 id="api">API reference</H2>

      <Hatch />

      <Table
        head={['Option', 'Type', 'Default', '']}
        rows={[
          ['id', 'number', 'new id', 'Reuse an existing toast instead of pushing one'],
          ['description', 'string', '—', 'Second line'],
          ['duration', 'number', "Toaster's", 'Seconds. Infinity never expires'],
          ['mode', 'StripMode', "Toaster's", 'none drops the strip for this toast only'],
          ['icon', 'ReactNode', "tone's", 'Overrides the state’s icon'],
          ['cells', '[string, string, string]', "tone's", 'Overrides the strip’s three shades'],
          ['action', 'ToastAction | null', "tone's", 'null drops the one the state offers'],
        ]}
      />

      <Table
        head={['Prop', 'Type', 'Default', '']}
        rows={[
          ['position', 'ToastPosition', "'bottom-right'", 'Six anchors'],
          ['duration', 'number', '5', 'Default seconds of life'],
          ['mode', "'plain' | 'snake' | 'none'", "'plain'", 'How the lit part of the strip moves'],
          ['width', 'number', '360', ''],
          ['offset', 'number', '16', 'Distance from the viewport edges'],
          ['gap', 'number', '12', 'Between cards once expanded'],
          ['peek', 'number', '14', 'How much of each card behind shows when collapsed'],
          ['scaleStep', 'number', '0.05', 'Scale shed per card going back'],
          ['visible', 'number', '3', 'Cards on screen while collapsed'],
          ['stiffness', 'number', '420', 'Spring strength'],
          ['damping', 'number', '34', 'Spring friction'],
          [
            'tones',
            'Record<string, Tone>',
            'built-ins',
            'Per-state look, merged over the defaults',
          ],
          ['label', 'string', "'Notifications'", 'Accessible name of the region'],
          ['closeLabel', 'string', "'Dismiss'", ''],
          ['theme', "'dark' | 'light'", "'dark'", ''],
        ]}
      />

      <H2 id="related">Related components</H2>

      <Related current="toast" />

      <Around current="toast" />
    </DocPage>
  );
}
