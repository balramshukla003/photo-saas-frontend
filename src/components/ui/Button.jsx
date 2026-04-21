// Button — WCAG AAA contrast, keyboard accessible, loading state
const variants = {
  primary:   'bg-brand-700 hover:bg-brand-800 active:bg-brand-950 text-white border-transparent focus-visible:ring-brand-300',
  secondary: 'bg-white hover:bg-surface-50 active:bg-surface-100 text-ink-700 border-ink-100 hover:border-ink-300',
  danger:    'bg-danger-500 hover:bg-danger-700 active:bg-danger-700 text-white border-transparent',
  ghost:     'bg-transparent hover:bg-surface-100 active:bg-surface-200 text-ink-700 border-transparent',
};

const sizes = {
  sm:  'h-8  px-3 text-sm  gap-1.5',
  md:  'h-10 px-4 text-sm  gap-2',
  lg:  'h-12 px-6 text-base gap-2',
  xl:  'h-14 px-8 text-base gap-2.5',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon = null,
  iconRight = false,
  type = 'button',
  onClick,
  className = '',
  'aria-label': ariaLabel,
}) {
  const isDisabled = disabled || loading;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={loading}
      className={[
        'inline-flex items-center justify-center font-semibold rounded-md border',
        'transition-all duration-150 select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
    >
      {loading ? (
        <span className="flex items-center gap-2" aria-hidden="false">
          <Spinner size={size === 'lg' || size === 'xl' ? 20 : 16} />
          <span>Please wait…</span>
        </span>
      ) : (
        <>
          {icon && !iconRight && <span className="shrink-0" aria-hidden="true">{icon}</span>}
          {children}
          {icon && iconRight && <span className="shrink-0" aria-hidden="true">{icon}</span>}
        </>
      )}
    </button>
  );
}

function Spinner({ size = 16 }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round"
      className="animate-spin"
      aria-label="Loading"
      role="status"
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}
