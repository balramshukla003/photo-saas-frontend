import { useRef, useState, useCallback } from 'react';

const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_MB = 10;

export default function UploadZone({ onFile, disabled }) {
  const inputRef  = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [fileError, setFileError] = useState('');

  const validate = (file) => {
    if (!ACCEPTED.includes(file.type)) {
      setFileError('Only JPEG, PNG, or WEBP images are accepted.');
      return false;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setFileError(`File is too large. Maximum size is ${MAX_MB}MB.`);
      return false;
    }
    setFileError('');
    return true;
  };

  const handleFile = useCallback((file) => {
    if (!file) return;
    if (validate(file)) onFile(file);
  }, [onFile]);

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e) => { e.preventDefault(); if (!disabled) setDragging(true); };
  const onDragLeave = () => setDragging(false);

  const onKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload photo — click or drag and drop"
        aria-disabled={disabled}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={onKeyDown}
        className={[
          'upload-zone relative flex flex-col items-center justify-center gap-4',
          'rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer',
          'min-h-[200px] sm:min-h-[240px] px-6 py-10 text-center',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2',
          disabled
            ? 'border-ink-100 bg-surface-50 cursor-not-allowed opacity-50'
            : dragging
              ? 'border-brand-500 bg-brand-50 scale-[1.01]'
              : 'border-ink-200 bg-white hover:border-brand-400 hover:bg-brand-50/50',
        ].join(' ')}
      >
        {/* Upload icon */}
        <span
          aria-hidden="true"
          className={`flex items-center justify-center w-14 h-14 rounded-full transition-colors ${
            dragging ? 'bg-brand-100 text-brand-700' : 'bg-surface-100 text-ink-300'
          }`}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </span>

        <div>
          <p className="text-sm font-semibold text-ink-700">
            {dragging ? 'Drop your photo here' : 'Click to upload or drag & drop'}
          </p>
          <p className="text-xs text-ink-300 mt-1">JPEG, PNG, WEBP · Max {MAX_MB}MB</p>
        </div>
      </div>

      {fileError && (
        <p role="alert" className="mt-2 text-xs text-danger-700 font-medium flex items-center gap-1">
          <span aria-hidden="true">⚠</span> {fileError}
        </p>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(',')}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={e => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
