'use client';

import React, { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import Spinner from '../Spinner';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFThumbnail({ file, width, height }: { file: string, width?: number, height?: number }) {
  const [error, setError] = useState<string | null>(null);
  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;

  if (error) {
    return (
      <div style={style} className="flex items-center justify-center overflow-hidden bg-white/[0.02] p-2 text-sm text-white/60">
        Failed to load PDF thumbnail: {error}
        <div className="mt-2">
          <a href={file} target="_blank" rel="noreferrer" className="underline">Open PDF</a>
        </div>
      </div>
    );
  }

  return (
    <div style={style} className="flex items-center justify-center overflow-hidden">
      <Document file={file} loading={<Spinner size="sm" />} onLoadError={(err) => setError(String(err))}>
        <Page pageNumber={1} width={width} height={height} renderTextLayer={false} canvasBackground="transparent" onRenderError={(err) => setError(String(err))} />
      </Document>
    </div>
  );
}
