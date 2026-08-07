import Link from 'next/link';

/**
 * An empty screen is an invitation to act, not a mood. It says what happened and
 * gives the two places worth going.
 */
export default function NotFound() {
  return (
    <main className="mx-auto grid max-w-[1400px] place-items-center px-4 py-32 sm:px-6">
      <div style={{ maxWidth: '30rem' }}>
        <p className="eyebrow mb-4">404</p>
        <h1 className="display" style={{ fontSize: 34, marginBottom: 12 }}>
          There is nothing at this address.
        </h1>
        <p className="prose-site">
          The page has moved, or was never written. The component list is the fastest way back, and{' '}
          <span className="tick">⌘K</span> searches all of it from anywhere on the site.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/docs/introduction"
            className="press grid place-items-center rounded-lg px-4 text-[13.5px] font-medium"
            style={{ background: 'var(--fg)', color: 'var(--canvas)', height: 38 }}
          >
            Read the docs
          </Link>
          <Link
            href="/"
            className="press grid place-items-center rounded-lg px-4 text-[13.5px]"
            style={{ background: 'var(--border)', color: 'var(--fg)', height: 38 }}
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
