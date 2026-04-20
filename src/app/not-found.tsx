import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-inner">
        <div className="not-found-code">404</div>
        <h1 className="not-found-title">Page not found</h1>
        <p className="not-found-desc">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/introduction" className="not-found-btn">
          Go to docs
        </Link>
      </div>
    </div>
  );
}
