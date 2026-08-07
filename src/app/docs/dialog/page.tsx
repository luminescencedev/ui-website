import type { Metadata } from 'next';
import { Code } from '@/components/site/Code';
import { Example } from '@/components/site/Example';
import { Around, DocPage, H2, H3, P, Related, Rule, Table, Hatch } from '@/components/site/page';
import { DialogBasic, DialogHeld } from '@/components/site/demos/overlays';

export const metadata: Metadata = {
  title: 'Dialog',
  description:
    'A modal panel. Focus is trapped inside it, the page is held still behind it, and Escape or the scrim closes it unless you say otherwise.',
};

const marks = [
  { id: 'usage', label: 'Usage' },
  { id: 'anatomy', label: 'Anatomy' },
  { id: 'examples', label: 'Examples' },
  { id: 'held', label: 'One that will not close', sub: true },
  { id: 'customization', label: 'Customization' },
  { id: 'styling', label: 'Styling reference' },
  { id: 'api', label: 'API reference' },
  { id: 'keyboard', label: 'Keyboard', sub: true },
  { id: 'related', label: 'Related components' },
];

export default function DialogPage() {
  return (
    <DocPage
      eyebrow="Overlay"
      title="Dialog"
      description="A modal panel. Focus is trapped inside it, the page is held still behind it, and it is the one overlay in the library that does not grow from an anchor — because it is not anchored to anything."
      marks={marks}
    >
      <H2 id="usage">Usage</H2>

      <Code lang="tsx" code={`import { Dialog } from '@carabine/ui/dialog';`} />

      <Example
        code={`<Dialog
  title="Delete project"
  description="Every deployment, log and secret goes with it. This cannot be undone."
  footer={
    <>
      <Button variant="ghost" onClick={cancel}>Cancel</Button>
      <Button variant="danger" onClick={destroy}>Delete</Button>
    </>
  }
>
  <Button variant="secondary">Delete project</Button>
</Dialog>`}
      >
        <DialogBasic />
      </Example>

      <Rule>
        Centred, and it stays centred. Everything else in this library grows out of the corner
        nearest what opened it; a dialog has no anchor to grow from, so it scales from its middle at
        0.96 and nowhere else.
      </Rule>

      <H2 id="anatomy">Anatomy</H2>

      <Code
        lang="tsx"
        code={`<div>                 // the scrim, and the page behind it is held still
  <div role="dialog">  //   the panel: glass shell, lit core, focus trapped
    {title}            //     also the accessible name
    {description}      //     wired up as aria-describedby
    {content}          //     the body
    {footer}           //     the row is ours, the buttons are yours
    <button />         //     the close, in the corner
  </div>
</div>`}
      />

      <P>
        The footer row is the component&apos;s and the buttons in it are yours. A dialog that
        shipped its own confirm and cancel would ship the wrong words, in the wrong order, in the
        wrong language.
      </P>

      <P>
        The <strong>panel</strong> scrolls, not the page: a dialog taller than the window has to
        stay reachable with everything behind it still held.
      </P>

      <H2 id="examples">Examples</H2>

      <H3 id="held">One that will not close</H3>

      <P>
        <code>dismissible={'{false}'}</code> turns off Escape and the scrim; <code>close</code>{' '}
        takes away the corner button. Use it for the moment where leaving would break something, and
        give the reader a way out inside the panel — a dialog with no exit at all is a bug wearing a
        design.
      </P>

      <Example
        code={`<Dialog
  title="Signing you in"
  description="This will not take long, and there is nothing to do about it."
  dismissible={false}
  close={false}
  width={360}
>
  <Button variant="secondary">Open a held dialog</Button>
</Dialog>`}
      >
        <DialogHeld />
      </Example>

      <H2 id="customization">Customization</H2>

      <Code
        lang="tsx"
        code={`<Dialog
  width={560}      // a maximum — it shrinks on a narrow screen
  padding={24}
  radius={24}
  offset={16}      // smallest distance kept from the window's edges
  zIndex={60}      // above the toast's 50, because it is above the toast
  openScale={0.96} // nothing appears from scale(0)
  theme="light"
/>`}
      />

      <H2 id="styling">Styling reference</H2>

      <P>
        Tailwind utilities plus <code>dialog.css</code>, which carries the panel&apos;s scrollbar.
        The material is the toast&apos;s — a glass shell around a core with a top-lit gradient,
        hairlines as inset shadows rather than borders. A dialog and a toast on the same screen are
        the same object at two sizes.
      </P>

      <H2 id="api">API reference</H2>

      <Hatch panel />

      <Table
        head={['Prop', 'Type', 'Default', '']}
        rows={[
          ['children', 'ReactNode', '—', 'The trigger. Leave it off and drive with open'],
          ['title', 'ReactNode', '—', 'Also the accessible name'],
          ['description', 'ReactNode', '—', 'Wired up as aria-describedby'],
          ['content', 'ReactNode', '—', 'The body'],
          ['footer', 'ReactNode', '—', 'Actions along the bottom'],
          ['open', 'boolean', '—', 'Controlled'],
          ['defaultOpen', 'boolean', 'false', ''],
          ['onOpenChange', '(open: boolean) => void', '—', ''],
          ['dismissible', 'boolean', 'true', 'Escape and the scrim'],
          ['close', 'boolean', 'true', 'The close button in the corner'],
          ['width', 'number', '440', 'A maximum — it shrinks on a narrow screen'],
          ['padding', 'number', '20', 'Inside the panel'],
          ['radius', 'number', '20', ''],
          ['offset', 'number', '16', 'Smallest distance kept from the viewport’s edges'],
          ['zIndex', 'number', '60', 'Above the toast’s 50'],
          ['container', 'HTMLElement | null', 'document.body', 'Where it portals to'],
          ['stiffness', 'number', '420', ''],
          ['damping', 'number', '34', ''],
          ['openScale', 'number', '0.96', 'Scale the panel grows from'],
          ['label', 'string', '—', 'Accessible name, when there is no title'],
          ['closeLabel', 'string', "'Close'", ''],
          ['theme', "'dark' | 'light'", "'dark'", ''],
        ]}
      />

      <H3 id="keyboard">Keyboard</H3>

      <Table
        head={['Key', '']}
        rows={[
          ['Tab', 'Cycles inside the panel, and does not leave it'],
          ['Shift + Tab', 'The same, backwards'],
          ['Esc', 'Closes, unless dismissible is off'],
        ]}
      />

      <P>
        Focus goes to the panel on open and returns to whatever opened it on close — including when
        the trigger has been removed in the meantime, in which case it falls back to the body rather
        than to nothing.
      </P>

      <H2 id="related">Related components</H2>

      <Related current="dialog" />

      <Around current="dialog" />
    </DocPage>
  );
}
