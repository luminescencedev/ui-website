import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-inner">
        <span className="not-found-code">404</span>
        <div className="not-found-divider" />
        <div className="not-found-body">
          <h1 className="not-found-title">Page not found</h1>
          <p className="not-found-desc">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <Link href="/introduction" className="not-found-btn">
          Back to docs
        </Link>
      </div>
    </div>
  );
}
