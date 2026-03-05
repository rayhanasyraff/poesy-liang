'use client';

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import ClosePageButton from '../utils/ClosePageButton';
import useDeviceContext from '@/hooks/useDeviceContext';
import PressReleaseType from '@/types/PressReleaseType';

const PDFViewer = dynamic(() => import('../utils/PDFViewer/PDFViewer'), {
  ssr: false,
});

const PDFThumbnail = dynamic(() => import('../utils/PDFViewer/PDFThumbnail'), { ssr: false });

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function PressReleasePDFPage({
  item,
  onBack,
}: {
  item: PressReleaseType;
  onBack: () => void;
}) {
  const { isNarrowScreen } = useDeviceContext();

  const handlePrint = () => {
    const win = window.open(item.pdf, '_blank');
    if (win) win.print();
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Toolbar */}
      <div
        className={`flex items-center border-b border-white/20 ${
          isNarrowScreen ? 'flex-col gap-3 px-4 py-4' : 'flex-row justify-between px-8 py-3'
        }`}
      >
        <button
          className="text-white/60 hover:text-white font-bright-grotesk text-[12px] tracking-widest uppercase flex items-center gap-2 transition-colors self-start"
          onClick={onBack}
        >
          ← Press Releases
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          <a
            className="font-bright-grotesk text-[11px] tracking-widest uppercase px-4 py-1.5 border border-white/30 text-white/70 hover:text-white hover:border-white rounded-sm transition-colors"
            href={item.pdf}
            download
          >
            Download
          </a>
          <a
            className="font-bright-grotesk text-[11px] tracking-widest uppercase px-4 py-1.5 border border-white/30 text-white/70 hover:text-white hover:border-white rounded-sm transition-colors"
            href={item.pdf}
            target="_blank"
            rel="noreferrer"
          >
            Open
          </a>
          <button
            className="font-bright-grotesk text-[11px] tracking-widest uppercase px-4 py-1.5 border border-white/30 text-white/70 hover:text-white hover:border-white rounded-sm transition-colors"
            onClick={handlePrint}
          >
            Print
          </button>
        </div>
      </div>

      {/* Title bar */}
      <div className={`${isNarrowScreen ? 'px-4 py-3' : 'px-8 py-6'} border-b border-white/10`}>
        <p className="text-white/40 font-bright-grotesk text-[10px] tracking-widest uppercase mb-1">
          {formatDate(item.date)}
        </p>
        <h3 className="text-white font-bright-grotesk-light text-[15px] leading-snug">
          {item.title}
        </h3>
      </div>

      {/* PDF content */}
      <div className="flex-1 overflow-auto">
        <PDFViewer file={item.pdf} />
      </div>
    </div>
  );
}

export default function PressReleases({
  pressReleases,
}: {
  pressReleases: PressReleaseType[];
}) {
  const [selected, setSelected] = useState<PressReleaseType | null>(null);
  const { isNarrowScreen, isWideScreen } = useDeviceContext();

  const sorted = useMemo(() => {
    return [...pressReleases].sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });
  }, [pressReleases]);

  if (!pressReleases || pressReleases.length === 0) {
    return <div className="text-white/50 font-bright-grotesk text-[13px]">No press releases available.</div>;
  }

  if (selected) {
    return (
      <div className="relative flex flex-col w-full">
        {isWideScreen && <ClosePageButton />}
        <PressReleasePDFPage item={selected} onBack={() => setSelected(null)} />
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col w-full overflow-x-hidden ${isNarrowScreen ? 'px-4 pb-8' : 'px-8 pb-12'}`}>
      {isWideScreen && <ClosePageButton />}

      {/* Header */}
      <div className={`${isNarrowScreen ? 'pb-5' : 'pt-8 pb-6'}`}>
        <h2
          className={`text-white font-bright-grotesk-light tracking-widest uppercase ${
            isNarrowScreen ? 'text-[18px]' : 'text-[22px]'
          }`}
        >
          Press Release
        </h2>
      </div>

      {/* Column headers / narrow card list */}
      {isNarrowScreen ? (
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-200px)] pb-6">
          {sorted.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className="w-full bg-white/[0.03] hover:bg-white/[0.05] rounded-md p-1 transition-colors cursor-pointer"
            >
              <div className="w-full h-20 mb-2 overflow-hidden rounded-sm">
                <PDFThumbnail file={item.pdf} width={300} />
              </div>

              <div className="bg-white/[0.02] p-1 rounded-sm">
                <p className="text-white/40 text-[10px] mb-1">{formatDate(item.date)}</p>
                <h4 className="text-white/75 text-[12px] mb-1 leading-tight">{item.title}</h4>
                <div className="flex items-center justify-between mt-1">
                  <a
                    href={item.pdf}
                    download
                    onClick={(e) => e.stopPropagation()}
                    className="font-bright-grotesk text-[9px] tracking-widest uppercase px-2 py-0.5 border border-white/25 text-white/55 hover:text-white rounded-sm"
                  >
                    ↓ PDF
                  </a>
                  <a
                    href={item.pdf}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="font-bright-grotesk text-[9px] text-white/60"
                  >
                    Open
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div
            className={`flex items-center gap-4 border-t border-b border-white/20 ${
              isNarrowScreen ? 'py-2' : 'py-2.5'
            }`}
          >
            <span className={`flex-shrink-0 text-white/35 font-bright-grotesk text-[9px] tracking-widest uppercase ${isNarrowScreen ? 'w-16' : 'w-28'}`}>
              Date
            </span>
            {!isNarrowScreen && (
              <span className={`flex-shrink-0 text-white/35 font-bright-grotesk text-[9px] tracking-widest uppercase w-28`}>
                Preview
              </span>
            )}
            <span className="flex-1 text-white/35 font-bright-grotesk text-[9px] tracking-widest uppercase">
              Title
            </span>
            <span className={`flex-shrink-0 text-white/35 font-bright-grotesk text-[9px] tracking-widest uppercase ${isNarrowScreen ? 'w-16' : 'w-20'} text-right`}>
              PDF
            </span>
          </div>

          {/* Press release rows */}
          <div className="flex flex-col">
            {sorted.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 border-b border-white/10 hover:bg-white/[0.02] transition-colors group text-sm"
              >
                {/* Date */}
                <div className={`flex-shrink-0 ${isNarrowScreen ? 'w-16 py-2' : 'w-28 py-4'}`}>
                  <span className="text-white/40 font-bright-grotesk text-[11px]">
                    {formatDate(item.date)}
                  </span>
                </div>

                {/* Thumbnail preview (hidden on narrow screens) */}
                {!isNarrowScreen && (
                  <div className="flex-shrink-0 flex items-center justify-center w-28 py-3">
                    <div className="w-full h-full">
                      <PDFThumbnail file={item.pdf} width={120} />
                    </div>
                  </div>
                )}

                {/* Title — clickable */}
                <div className={`flex-1 ${isNarrowScreen ? 'py-2' : 'py-5'} pl-4 min-w-0`}>
                  <button
                    className="text-left text-white/75 hover:text-white font-bright-grotesk text-[13px] leading-relaxed transition-colors w-full whitespace-normal break-words"
                    style={{ maxWidth: isNarrowScreen ? 'calc(100vw - 140px)' : undefined }}
                    onClick={() => setSelected(item)}
                  >
                    {item.title}
                  </button>
                </div>

                {/* Download PDF */}
                <div className={`flex-shrink-0 ${isNarrowScreen ? 'w-16' : 'w-20'} flex justify-end ${isNarrowScreen ? 'py-1' : 'py-4'}`}>
                  <a
                    className="font-bright-grotesk text-[10px] tracking-widest uppercase px-3 py-1.5 border border-white/25 text-white/55 hover:text-white hover:border-white/70 rounded-sm transition-colors"
                    href={item.pdf}
                    download
                    onClick={(e) => e.stopPropagation()}
                  >
                    ↓ PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
