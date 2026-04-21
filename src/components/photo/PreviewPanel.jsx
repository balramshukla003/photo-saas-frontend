import { useRef } from 'react';

// Passport photo: 35mm × 45mm
// A4: 210mm × 297mm
// At 96dpi: 1mm ≈ 3.7795px
// Passport at 96dpi: 35*3.78 ≈ 132px × 45*3.78 ≈ 170px
// 5 across: 5 * 132 = 660px + 4*4px gap ≈ 676px → scale to container

const PHOTOS_PER_ROW = 5;
const TOTAL_PHOTOS   = 20; // 4 rows × 5 cols = fills A4 nicely

export default function PreviewPanel({ imageBase64, mimeType = 'image/png' }) {
  const printRef = useRef(null);
  const src = imageBase64 ? `data:${mimeType};base64,${imageBase64}` : null;

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;

    const printWin = window.open('', '_blank', 'width=900,height=700');
    printWin.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>PhotoPrint — Passport Photos</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          @page { size: A4 portrait; margin: 5mm; }
          body { background: white; }
          .a4-sheet {
            width: 200mm;
            min-height: 287mm;
            display: grid;
            grid-template-columns: repeat(${PHOTOS_PER_ROW}, 35mm);
            grid-template-rows: repeat(4, 45mm);
            gap: 2mm;
            padding: 2mm;
            background: white;
          }
          .photo-cell {
            width: 35mm; height: 45mm;
            overflow: hidden;
            border: 0.3mm solid #ccc;
          }
          .photo-cell img {
            width: 100%; height: 100%;
            object-fit: cover; object-position: top;
            display: block;
          }
        </style>
      </head>
      <body>
        <div class="a4-sheet">
          ${Array(TOTAL_PHOTOS).fill(0).map(() =>
            `<div class="photo-cell"><img src="${src}" alt="Passport photo" /></div>`
          ).join('')}
        </div>
        <script>window.onload = () => { window.print(); window.close(); }<\/script>
      </body>
      </html>
    `);
    printWin.document.close();
  };

  if (!src) return null;

  return (
    <section aria-labelledby="preview-heading" className="animate-fade-in">
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 mb-4">
        <h2 id="preview-heading" className="text-base font-bold text-ink-900">
          A4 Print Preview
          <span className="ml-2 text-xs font-normal text-ink-300">
            ({PHOTOS_PER_ROW} per row · {TOTAL_PHOTOS} total)
          </span>
        </h2>
        <button
          type="button"
          onClick={handlePrint}
          className="print-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-brand-700 text-white text-sm font-semibold hover:bg-brand-800 active:bg-brand-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          aria-label="Print A4 sheet with 20 passport photos"
        >
          <PrintIcon aria-hidden="true" />
          Print A4
        </button>
      </div>

      {/* Scrollable A4 preview */}
      <div
        className="overflow-x-auto rounded-xl border border-ink-100 bg-surface-50 p-3 sm:p-5"
        role="img"
        aria-label="A4 sheet preview with 20 passport-size photos arranged in 4 rows of 5"
      >
        {/* A4 proportional preview sheet */}
        <div
          ref={printRef}
          className="print-area mx-auto bg-white shadow-win-md"
          style={{
            width: 'min(100%, 600px)',
            aspectRatio: '210 / 297',
            display: 'grid',
            gridTemplateColumns: `repeat(${PHOTOS_PER_ROW}, 1fr)`,
            gridTemplateRows: 'repeat(4, 1fr)',
            gap: '3px',
            padding: '8px',
          }}
        >
          {Array(TOTAL_PHOTOS).fill(0).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden border border-ink-100/50"
              style={{ aspectRatio: '35 / 45' }}
            >
              <img
                src={src}
                alt={i === 0 ? 'Processed passport photo' : ''}
                aria-hidden={i !== 0}
                className="w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      <p className="mt-2 text-xs text-ink-300 text-center" aria-live="polite">
        Each photo: 35mm × 45mm · Layout: A4 (210mm × 297mm)
      </p>
    </section>
  );
}

const PrintIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 6 2 18 2 18 9"/>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
    <rect x="6" y="14" width="12" height="8"/>
  </svg>
);
