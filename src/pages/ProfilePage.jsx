import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLicense } from '../hooks/useLicense';
import { LicenseBadge } from '../components/ui/Feedback';
import { formatDate } from '../utils/jwt';

export default function ProfilePage() {
  const { user } = useAuth();
  const { isActive, isExpired, daysRemaining, plan, expiresAt, issuedAt, isWarning } = useLicense();

  useEffect(() => {
    document.title = 'My Profile — PhotoPrint';
  }, []);

  const initials = (user?.fullName || user?.email || '?')
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">

      {/* Page heading */}
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-ink-900">My Profile</h1>
        <p className="mt-1 text-sm text-ink-500">Your account details and license information.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* ── Account card ──────────────────────────────────────── */}
        <section
          aria-labelledby="account-heading"
          className="win-card p-6 flex flex-col items-center text-center gap-4"
        >
          {/* Avatar */}
          <div
            aria-hidden="true"
            className="w-20 h-20 rounded-full bg-brand-700 flex items-center justify-center text-white text-2xl font-bold select-none"
          >
            {initials}
          </div>

          <div>
            <h2 id="account-heading" className="text-lg font-bold text-ink-900">
              {user?.fullName || 'User'}
            </h2>
            <p className="text-sm text-ink-500 mt-0.5 break-all">{user?.email}</p>
          </div>

          <LicenseBadge isActive={isActive} isExpired={isExpired} daysRemaining={daysRemaining} />

          <dl className="w-full text-left border-t border-ink-100 pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <dt className="text-xs font-semibold text-ink-300 uppercase tracking-wide">User ID</dt>
              <dd className="text-xs font-mono text-ink-500 max-w-[120px] truncate">{user?.id}</dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-xs font-semibold text-ink-300 uppercase tracking-wide">Plan</dt>
              <dd className="text-xs font-semibold text-ink-700 capitalize">{plan}</dd>
            </div>
          </dl>
        </section>

        {/* ── License card ──────────────────────────────────────── */}
        <section
          aria-labelledby="license-heading"
          className="win-card p-6 md:col-span-2"
        >
          <h2 id="license-heading" className="text-base font-bold text-ink-900 mb-5 flex items-center gap-2">
            <KeyIcon aria-hidden="true" />
            License Details
          </h2>

          {/* Status banner */}
          {isExpired ? (
            <div role="alert" className="mb-5 rounded-lg bg-danger-50 border border-danger-500/30 px-4 py-3 text-sm text-danger-700 font-semibold flex items-center gap-2">
              <span aria-hidden="true">✗</span>
              Your license has expired. Please contact your administrator to renew.
            </div>
          ) : isWarning ? (
            <div role="status" className="mb-5 rounded-lg bg-warning-50 border border-warning-500/30 px-4 py-3 text-sm text-warning-700 font-semibold flex items-center gap-2">
              <span aria-hidden="true">⚠</span>
              Your license expires in <strong>{daysRemaining} day{daysRemaining !== 1 ? 's' : ''}</strong>. Contact your administrator to renew.
            </div>
          ) : isActive ? (
            <div role="status" className="mb-5 rounded-lg bg-success-50 border border-success-500/30 px-4 py-3 text-sm text-success-700 font-semibold flex items-center gap-2">
              <span aria-hidden="true">✓</span>
              Your license is active and valid.
            </div>
          ) : null}

          {/* License stats grid */}
          <dl className="grid grid-cols-1 xs:grid-cols-2 gap-4">
            <LicenseField label="Status">
              <LicenseBadge isActive={isActive} isExpired={isExpired} daysRemaining={daysRemaining} />
            </LicenseField>

            <LicenseField label="Plan">
              <span className="text-sm font-semibold text-ink-900 capitalize">{plan}</span>
            </LicenseField>

            <LicenseField label="Issued On">
              <span className="text-sm font-semibold text-ink-900">
                {issuedAt ? formatDate(issuedAt) : '—'}
              </span>
            </LicenseField>

            <LicenseField label="Expires On">
              <span className={`text-sm font-semibold ${isExpired ? 'text-danger-700' : isWarning ? 'text-warning-700' : 'text-ink-900'}`}>
                {expiresAt ? formatDate(expiresAt) : '—'}
              </span>
            </LicenseField>

            <LicenseField label="Days Remaining">
              {isExpired ? (
                <span className="text-sm font-bold text-danger-700">Expired</span>
              ) : (
                <div>
                  <span className={`text-2xl font-bold ${isWarning ? 'text-warning-700' : 'text-brand-700'}`}>
                    {daysRemaining}
                  </span>
                  <span className="text-sm text-ink-500 ml-1">days</span>
                </div>
              )}
            </LicenseField>

            <LicenseField label="Access Level">
              <span className="text-sm font-semibold text-ink-900">
                {isActive ? 'Full access' : 'Restricted'}
              </span>
            </LicenseField>
          </dl>

          {/* Progress bar for license period */}
          {!isExpired && issuedAt && expiresAt && (
            <div className="mt-6">
              <div className="flex justify-between text-xs text-ink-300 mb-1.5 font-medium">
                <span>License period</span>
                <span>{daysRemaining} days left</span>
              </div>
              <LicenseProgressBar issuedAt={issuedAt} expiresAt={expiresAt} isWarning={isWarning} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function LicenseField({ label, children }) {
  return (
    <div className="bg-surface-50 rounded-lg p-4 border border-ink-100/60">
      <dt className="text-xs font-semibold text-ink-300 uppercase tracking-wide mb-2">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function LicenseProgressBar({ issuedAt, expiresAt, isWarning }) {
  const total   = new Date(expiresAt) - new Date(issuedAt);
  const elapsed = Date.now() - new Date(issuedAt);
  const pct     = Math.min(100, Math.max(0, (elapsed / total) * 100));
  const color   = isWarning ? 'bg-warning-500' : 'bg-brand-600';

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`License ${Math.round(pct)}% used`}
      className="h-2.5 w-full bg-surface-200 rounded-full overflow-hidden"
    >
      <div
        className={`h-full rounded-full transition-all duration-700 ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

const KeyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
  </svg>
);
