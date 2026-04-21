import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-surface-50 px-4">
      <div className="text-center max-w-sm animate-slide-up">
        <p aria-hidden="true" className="text-8xl font-bold text-ink-100 select-none">404</p>
        <h1 className="text-xl font-bold text-ink-900 mt-2">Page not found</h1>
        <p className="text-sm text-ink-500 mt-2">The page you're looking for doesn't exist.</p>
        <Link
          to="/photo"
          className="inline-flex mt-6 items-center gap-2 px-5 py-2.5 rounded-md bg-brand-700 text-white text-sm font-semibold hover:bg-brand-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          Go to home
        </Link>
      </div>
    </div>
  );
}

export function ExpiredPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-surface-50 px-4">
      <div className="text-center max-w-sm animate-slide-up win-card p-10">
        <span aria-hidden="true" className="flex items-center justify-center w-16 h-16 rounded-full bg-danger-50 text-danger-500 mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </span>
        <h1 className="text-xl font-bold text-ink-900">License Expired</h1>
        <p className="text-sm text-ink-500 mt-2">
          Your PhotoPrint license has expired. Please contact your administrator to renew access.
        </p>
        <p className="mt-4 text-xs text-ink-300">
          You can still view your profile, but photo processing is disabled.
        </p>
        <Link
          to="/profile"
          className="inline-flex mt-6 items-center gap-2 px-5 py-2.5 rounded-md bg-brand-700 text-white text-sm font-semibold hover:bg-brand-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
