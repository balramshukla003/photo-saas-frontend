import { useState, useId } from 'react';

// ── Base Input ────────────────────────────────────────────────────────────
export function Input({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  hint,
  required = false,
  disabled = false,
  autoComplete,
  inputMode,
  className = '',
  icon = null,
}) {
  const uid = useId();
  const fieldId   = id || uid;
  const errorId   = `${fieldId}-error`;
  const hintId    = `${fieldId}-hint`;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={fieldId}
          className="text-sm font-semibold text-ink-700"
        >
          {label}
          {required && (
            <span className="text-danger-500 ml-0.5" aria-hidden="true"> *</span>
          )}
          {required && <span className="sr-only"> (required)</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300 pointer-events-none"
          >
            {icon}
          </span>
        )}
        <input
          id={fieldId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-describedby={[error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined}
          aria-invalid={!!error}
          className={[
            'w-full rounded-md border bg-white px-3 py-2.5 text-sm text-ink-900',
            'placeholder:text-ink-300 transition-colors duration-150',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-1',
            'disabled:bg-surface-100 disabled:text-ink-300 disabled:cursor-not-allowed',
            icon ? 'pl-9' : '',
            error
              ? 'border-danger-500 focus-visible:ring-danger-500'
              : 'border-ink-100 hover:border-ink-300 focus-visible:border-brand-600',
          ].join(' ')}
        />
      </div>

      {hint && !error && (
        <p id={hintId} className="text-xs text-ink-500">{hint}</p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-danger-700 font-medium flex items-center gap-1">
          <span aria-hidden="true">⚠</span> {error}
        </p>
      )}
    </div>
  );
}

// ── Password Input with show/hide toggle ──────────────────────────────────
export function InputPassword({ label = 'Password', id, value, onChange, error, required = false, autoComplete = 'current-password' }) {
  const [show, setShow] = useState(false);
  const uid = useId();
  const fieldId = id || uid;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-semibold text-ink-700">
        {label}
        {required && <span className="text-danger-500 ml-0.5" aria-hidden="true"> *</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      <div className="relative">
        <input
          id={fieldId}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          className={[
            'w-full rounded-md border bg-white px-3 py-2.5 pr-11 text-sm text-ink-900',
            'placeholder:text-ink-300 transition-colors duration-150',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-1',
            error
              ? 'border-danger-500 focus-visible:ring-danger-500'
              : 'border-ink-100 hover:border-ink-300 focus-visible:border-brand-600',
          ].join(' ')}
        />
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-300 hover:text-ink-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded"
        >
          {show ? <EyeOff /> : <Eye />}
        </button>
      </div>
      {error && (
        <p id={`${fieldId}-error`} role="alert" className="text-xs text-danger-700 font-medium flex items-center gap-1">
          <span aria-hidden="true">⚠</span> {error}
        </p>
      )}
    </div>
  );
}

function Eye() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  );
}
function EyeOff() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}
