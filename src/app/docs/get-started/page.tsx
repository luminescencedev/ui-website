import type { Metadata } from 'next';
import Link from 'next/link';
import { Code } from '@/components/site/Code';
import { Install } from '@/components/site/Install';
import { Around, DocPage, H2, H3, P, Rule, Table } from '@/components/site/page';

export const metadata: Metadata = {
  title: 'Get started',
  description:
    'Install @carabine/ui, import the stylesheet, and render a component. Two lines, and one of them is the stylesheet.',
};

const marks = [
  { id: 'install', label: 'Install' },
  { id: 'stylesheet', label: 'The stylesheet' },
  { id: 'first', label: 'Your first component' },
  { id: 'theme', label: 'Themes' },
  { id: 'imports', label: 'Importing one component' },
  { id: 'tailwind', label: 'If you use Tailwind' },
  { id: 'next', label: 'Where to go next' },
];

export default function GetStarted() {
  return (
    <DocPage
      eyebrow="Getting started"
      title="Get started"
      description="Install it, import the stylesheet, render a component. There is no provider to mount, no config file to write, and no theme object to build."
      marks={marks}
    >
      <H2 id="install">Install</H2>

      <P>
        Three packages, and two of them you already have. <code>motion</code> is a peer rather than
        a dependency so your app owns the version — this library is not the only thing that will
        want to animate something.
      </P>

      <div style={{ marginBlock: 20 }}>
        <Install />
      </div>

      <Table
        head={['Package', 'Why']}
        rows={[
          ['@carabine/ui', 'The components'],
          ['motion', 'Peer. Every entrance, exit and gesture runs on it'],
          ['react · react-dom', 'Peer. 18 or 19'],
        ]}
      />

      <P>
        Its own dependencies are <code>lucide-react</code> and <code>zustand</code>, and nothing
        else. Nothing new goes in without a reason that survives being questioned.
      </P>

      <H2 id="stylesheet">The stylesheet</H2>

      <Rule>
        This is the one line people leave out, and leaving it out is the one way to install this
        library and see nothing at all.
      </Rule>

      <P>
        The components are styled with Tailwind utilities, compiled ahead of time into a single file
        that ships in the package. Import it once, wherever your app&apos;s global CSS is imported.
      </P>

      <Code
        lang="tsx"
        code={`// app/layout.tsx  —  or main.tsx, or wherever your global CSS goes
import '@carabine/ui/styles.css';`}
      />

      <P>
        It carries <strong>no preflight</strong>. A library has no business resetting its
        host&apos;s styles, so only the theme tokens and the utilities the components actually use
        are emitted — your own reset, your own base styles and your own utilities are untouched.
      </P>

      <H2 id="first">Your first component</H2>

      <P>
        Every prop is optional and every default is one we would ship.{' '}
        <code>&lt;Toaster /&gt;</code> with nothing on it is the version in the screenshots.
      </P>

      <Code
        lang="tsx"
        code={`import { Toaster, toast, Button } from '@carabine/ui';
import '@carabine/ui/styles.css';

export default function App() {
  return (
    <>
      {/* Mount the viewport once, high in the tree. */}
      <Toaster />

      <Button onClick={() => toast.success('Saved')}>Save changes</Button>
    </>
  );
}`}
      />

      <P>
        The viewport goes in once, near the root — not beside the thing that fires a toast. Its live
        regions have to exist <em>before</em> the content they announce, so a viewport mounted at
        the moment a toast fires announces nothing.
      </P>

      <H2 id="theme">Themes</H2>

      <P>
        There are two, they are both written out in full, and <strong>the theme is a prop</strong>.
      </P>

      <Code lang="tsx" code={`<Toaster theme="dark" />\n<Button theme="light">Save</Button>`} />

      <H3 id="theme-why">Why not a `dark:` variant</H3>

      <P>
        Because <code>dark:</code> resolves from the operating system. A light-themed page running
        on a dark-mode laptop would paint dark chrome inside it — the component would be answering a
        question the page had already answered differently.
      </P>

      <P>
        Most apps hold the theme somewhere already. Read it once and hand it down; there is no
        provider here to fight with the one you have.
      </P>

      <Code
        lang="tsx"
        code={`const theme = useYourTheme(); // whatever you already use

<Select theme={theme} items={countries} />
<Slider theme={theme} label="Volume" />`}
      />

      <H2 id="imports">Importing one component</H2>

      <P>
        Every component is its own entry point, so a project that wants one component pays for one
        component.
      </P>

      <Code
        lang="tsx"
        code={`import { Toast } from '@carabine/ui/toast';
import { Select } from '@carabine/ui/select';
import { cn } from '@carabine/ui/cn';`}
      />

      <P>
        The barrel — <code>@carabine/ui</code> — is there for convenience and tree shakes correctly
        under any modern bundler. Reach for the deep paths when you want the guarantee rather than
        the behaviour.
      </P>

      <H2 id="tailwind">If you use Tailwind</H2>

      <P>
        You have a second option, and it deduplicates: point your own build at the package instead
        of importing the compiled file, and the utilities the components use are merged with yours.
      </P>

      <Code
        lang="css"
        code={`@import 'tailwindcss';
@source '../node_modules/@carabine/ui/dist';`}
      />

      <P>
        Either path works. Importing the stylesheet is the one most people take, so it is the one
        this site takes too — anything broken about it is broken here first.
      </P>

      <H2 id="next">Where to go next</H2>

      <Table
        head={['Page', 'What it answers']}
        rows={[
          [
            <Link key="intro" href="/docs/introduction" style={{ color: 'var(--fg)' }}>
              Introduction
            </Link>,
            'What the library is, the rules it is built on, and what it refuses to do',
          ],
          [
            <span key="motion">The motion standard</span>,
            'One easing, the duration table, and why exits are faster than entrances',
          ],
          [
            <span key="components">Any component</span>,
            'How it works, then the API, then the refusals',
          ],
        ]}
      />
      <Around current="get-started" />
    </DocPage>
  );
}
