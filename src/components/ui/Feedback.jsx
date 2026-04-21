// ── LicenseBadge ─────────────────────────────────────────────────────────
export function LicenseBadge({ isActive, isExpired, daysRemaining }) {
  if (isExpired || !isActive) {
    return (
      <span
        role="status"
        aria-label="License expired"
        className="inline-flex items-center gap-1.5 rounded-full bg-danger-50 px-3 py-1 text-xs font-semibold text-danger-700 border border-danger-500/30"
      >
        <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-danger-500 block" />
        Expired
      </span>
    );
  }
  if (daysRemaining <= 7) {
    return (
      <span
        role="status"
        aria-label={`License expires in ${daysRemaining} days`}
        className="inline-flex items-center gap-1.5 rounded-full bg-warning-50 px-3 py-1 text-xs font-semibold text-warning-700 border border-warning-500/30"
      >
        <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-warning-500 block animate-pulse" />
        Expires in {daysRemaining}d
      </span>
    );
  }
  return (
    <span
      role="status"
      aria-label="License active"
      className="inline-flex items-center gap-1.5 rounded-full bg-success-50 px-3 py-1 text-xs font-semibold text-success-700 border border-success-500/30"
    >
      <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-success-500 block" />
      Active
    </span>
  );
}

// ── Alert ─────────────────────────────────────────────────────────────────
const alertStyles = {
  error:   'bg-danger-50  border-danger-500/40  text-danger-700',
  warning: 'bg-warning-50 border-warning-500/40 text-warning-700',
  success: 'bg-success-50 border-success-500/40 text-success-700',
  info:    'bg-brand-50   border-brand-500/40   text-brand-700',
};

export function Alert({ type = 'info', message, onDismiss }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      aria-live="polite"
      className={`flex items-start gap-2 rounded-md border px-4 py-3 text-sm font-medium animate-fade-in ${alertStyles[type]}`}
    >
      <span className="shrink-0 mt-0.5" aria-hidden="true">{alertIcons[type]}</span>
      <span className="flex-1">{message}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className="shrink-0 ml-2 opacity-60 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current rounded"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      )}
    </div>
  );
}

const alertIcons = {
  error:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  warning: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  success: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  info:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
};

// ── Spinner ───────────────────────────────────────────────────────────────
export function Spinner({ size = 24, label = 'Loading…', className = '' }) {
  return (
    <span role="status" aria-label={label} className={`inline-flex ${className}`}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2.5" strokeLinecap="round" className="animate-spin" aria-hidden="true">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    </span>
  );
}
