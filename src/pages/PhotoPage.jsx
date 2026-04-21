import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLicense } from '../hooks/useLicense';
import { photoApi } from '../services/api';
import UploadZone from '../components/photo/UploadZone';
import PreviewPanel from '../components/photo/PreviewPanel';
import Button from '../components/ui/Button';
import { Alert, Spinner } from '../components/ui/Feedback';

const STEPS = {
  IDLE:       'idle',
  PROCESSING: 'processing',
  DONE:       'done',
  ERROR:      'error',
};

export default function PhotoPage() {
  const { token } = useAuth();
  const { isActive, isExpired } = useLicense();
  const [step, setStep]         = useState(STEPS.IDLE);
  const [file, setFile]         = useState(null);
  const [preview, setPreview]   = useState(null);     // original preview URL
  const [processed, setProcessed] = useState(null);   // { base64, mimeType }
  const [errMsg, setErrMsg]     = useState('');

  useEffect(() => {
    document.title = 'Photo Print — PhotoPrint';
    return () => { if (preview) URL.revokeObjectURL(preview); };
  }, [preview]);

  const handleFile = useCallback((f) => {
    setFile(f);
    setProcessed(null);
    setErrMsg('');
    setStep(STEPS.IDLE);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(f));
  }, [preview]);

  const handleProcess = async () => {
    if (!file || !isActive) return;
    setStep(STEPS.PROCESSING);
    setErrMsg('');
    try {
      const res = await photoApi.process(file, token);
      if (!res.success) throw new Error(res.message || 'Processing failed.');
      setProcessed({ base64: res.processedImageBase64, mimeType: res.mimeType });
      setStep(STEPS.DONE);
    } catch (err) {
      setErrMsg(err.message || 'Something went wrong. Please try again.');
      setStep(STEPS.ERROR);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setProcessed(null);
    setErrMsg('');
    setStep(STEPS.IDLE);
  };

  const licenseBlocked = !isActive || isExpired;

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 animate-fade-in">

      {/* Page header */}
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-ink-900">Photo Print</h1>
        <p className="mt-1 text-sm text-ink-500">
          Upload a photo — background is auto-removed, image enhanced, and laid out print-ready on A4.
        </p>
      </header>

      {/* License blocked banner */}
      {licenseBlocked && (
        <Alert
          type="error"
          message="Your license is expired or inactive. Photo processing is unavailable. Please contact your administrator."
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-4">

        {/* ── Left: Upload + controls ─────────────────────────── */}
        <div className="flex flex-col gap-5">

          {/* Step indicator */}
          <StepIndicator step={step} />

          {/* Upload zone */}
          <div className="win-card p-5 sm:p-6">
            <h2 className="text-sm font-bold text-ink-700 mb-4 flex items-center gap-2">
              <span aria-hidden="true" className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-700 text-white text-xs font-bold">1</span>
              Upload Photo
            </h2>
            <UploadZone onFile={handleFile} disabled={licenseBlocked || step === STEPS.PROCESSING} />
          </div>

          {/* Original preview thumbnail */}
          {preview && (
            <div className="win-card p-5 sm:p-6 animate-slide-up">
              <h2 className="text-sm font-bold text-ink-700 mb-3 flex items-center gap-2">
                <span aria-hidden="true" className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-700 text-white text-xs font-bold">2</span>
                Original Photo
              </h2>
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-24 h-32 rounded-lg overflow-hidden border border-ink-100 bg-surface-50">
                  <img
                    src={preview}
                    alt="Original uploaded photo preview"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-ink-900 truncate">{file?.name}</p>
                  <p className="text-xs text-ink-300 mt-1">
                    {file ? `${(file.size / 1024).toFixed(0)} KB · ${file.type.split('/')[1].toUpperCase()}` : ''}
                  </p>
                  <div className="mt-4 flex flex-col xs:flex-row gap-2">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleProcess}
                      loading={step === STEPS.PROCESSING}
                      disabled={licenseBlocked || step === STEPS.PROCESSING}
                      icon={<ProcessIcon />}
                      aria-label="Process photo: remove background and enhance"
                    >
                      Process Photo
                    </Button>
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={handleReset}
                      disabled={step === STEPS.PROCESSING}
                      aria-label="Reset and upload a different photo"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Processing status */}
          {step === STEPS.PROCESSING && (
            <div
              role="status"
              aria-live="polite"
              aria-label="Processing your photo, please wait"
              className="win-card p-5 flex items-center gap-4 animate-fade-in"
            >
              <Spinner size={28} className="text-brand-600" label="Processing photo" />
              <div>
                <p className="text-sm font-bold text-ink-900">Processing your photo…</p>
                <p className="text-xs text-ink-300 mt-0.5">Removing background · Enhancing quality</p>
              </div>
            </div>
          )}

          {/* Error */}
          {step === STEPS.ERROR && (
            <Alert type="error" message={errMsg} onDismiss={() => setStep(STEPS.IDLE)} />
          )}

          {/* How it works */}
          <div className="win-card p-5">
            <h2 className="text-xs font-bold text-ink-300 uppercase tracking-widest mb-3">How it works</h2>
            <ol className="flex flex-col gap-2.5" aria-label="Processing steps">
              {[
                ['Upload', 'Choose JPEG, PNG, or WEBP photo'],
                ['Process', 'BG removed + image enhanced automatically'],
                ['Preview', 'A4 sheet with 20 passport photos rendered'],
                ['Print', 'Send directly to printer, no extra steps'],
              ].map(([title, desc], i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span aria-hidden="true" className="shrink-0 w-5 h-5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span>
                    <strong className="text-ink-700">{title}</strong>
                    <span className="text-ink-300 ml-1.5">{desc}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* ── Right: A4 Preview ────────────────────────────────── */}
        <div className="flex flex-col gap-5">
          {processed ? (
            <div className="win-card p-5 sm:p-6">
              <h2 className="text-sm font-bold text-ink-700 mb-4 flex items-center gap-2">
                <span aria-hidden="true" className="flex items-center justify-center w-6 h-6 rounded-full bg-success-500 text-white text-xs font-bold">✓</span>
                Processed · Ready to Print
              </h2>
              <PreviewPanel
                imageBase64={processed.base64}
                mimeType={processed.mimeType}
              />
            </div>
          ) : (
            <div className="win-card p-5 sm:p-6 flex flex-col items-center justify-center min-h-[320px] text-center gap-4">
              <span aria-hidden="true" className="flex items-center justify-center w-16 h-16 rounded-full bg-surface-100 text-ink-100">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-300">No photo processed yet</p>
                <p className="text-xs text-ink-100 mt-1">Upload and process a photo to see the A4 print preview here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StepIndicator({ step }) {
  const steps = [
    { id: STEPS.IDLE,       label: 'Upload',    shortLabel: 'Upload'  },
    { id: STEPS.PROCESSING, label: 'Processing', shortLabel: 'Process' },
    { id: STEPS.DONE,       label: 'Ready',     shortLabel: 'Ready'   },
  ];

  const activeIdx = step === STEPS.ERROR ? 1
    : steps.findIndex(s => s.id === step);

  return (
    <nav aria-label="Photo processing steps" className="win-card px-4 sm:px-6 py-3">
      <ol className="flex items-center justify-between">
        {steps.map((s, i) => {
          const isDone    = i < activeIdx || step === STEPS.DONE;
          const isActive  = i === activeIdx && step !== STEPS.ERROR;
          const isError   = step === STEPS.ERROR && i === 1;
          return (
            <li
              key={s.id}
              aria-current={isActive ? 'step' : undefined}
              className={`flex items-center gap-1.5 sm:gap-2 text-xs font-semibold ${
                isError   ? 'text-danger-700' :
                isActive  ? 'text-brand-700' :
                isDone    ? 'text-success-700' :
                            'text-ink-300'
              }`}
            >
              <span
                aria-hidden="true"
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                  isError   ? 'bg-danger-50 border-danger-500 text-danger-700' :
                  isActive  ? 'bg-brand-700 border-brand-700 text-white' :
                  isDone    ? 'bg-success-500 border-success-500 text-white' :
                              'bg-white border-ink-200 text-ink-300'
                }`}
              >
                {isDone && !isActive ? '✓' : i + 1}
              </span>
              <span className="hidden xs:block">{s.label}</span>
              {i < steps.length - 1 && (
                <span aria-hidden="true" className="flex-1 h-0.5 w-4 sm:w-8 bg-ink-100 mx-1 sm:mx-2 rounded" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

const ProcessIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="13 2 13 9 20 9"/><path d="M13 2L3 9h10l-8 13 18-11H13V2z"/>
  </svg>
);
