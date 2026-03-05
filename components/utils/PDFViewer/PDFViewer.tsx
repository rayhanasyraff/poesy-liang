import React, { useState } from 'react';
import { pdfjs, Document } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import PDFViewerPages from './PDFViewerPages';
import { DocumentInfoContext } from './DocumentInfoContext';
import Spinner from '../Spinner';

// The workerSrc property shall be specified.
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type PDFViewerPropsType = {
  file: string | string[];
  showToolbar?: boolean;
};

function PDFViewerSingle ({ file, showToolbar }: { file: string, showToolbar?: boolean }) {

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numPagesRendered, setNumPagesRendered] = useState<number>(0);
  const [areAllPagesRendered, setAreAllPagesRendered] = useState<boolean>(false);

  const [isDocumentLoadError, setIsDocumentLoadError] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);

  function handleDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function handleChangePageNumber(pageNumber: number) {
    setPageNumber(pageNumber);
  }

  function handleZoomIn() {
    const newZoom = Math.min(2, zoom + 0.1);
    setZoom(newZoom);
    const pagesContainer = document.getElementById('pages');
    if (pagesContainer && (pagesContainer as HTMLElement).style) (pagesContainer as HTMLElement).style.zoom = String(newZoom);
  }

  function handleZoomOut() {
    const newZoom = Math.max(0.5, zoom - 0.1);
    setZoom(newZoom);
    const pagesContainer = document.getElementById('pages');
    if (pagesContainer && (pagesContainer as HTMLElement).style) (pagesContainer as HTMLElement).style.zoom = String(newZoom);
  }

  if (isDocumentLoadError) {
    return (
      <div className="flex flex-col items-center justify-center content-center w-screen h-screen text-3xl font-bright-grotesk-semibold">
        <h1>Error while loading document!</h1>
      </div>
    )
  }

  return (
    <DocumentInfoContext value={{ pageNumber, numPages, numPagesRendered, areAllPagesRendered, setNumPagesRendered, setAreAllPagesRendered }}>
      <div className="flex flex-col gap-2">
        {showToolbar && (
        <div className="flex items-center gap-2 px-4 py-2">
          <a href={file} target="_blank" rel="noreferrer" className="text-white/80 bg-black/30 px-3 py-1 rounded">Open</a>
          <a href={file} download className="text-white/80 bg-black/30 px-3 py-1 rounded">Download</a>
          <button onClick={() => window.open(file, '_blank')} className="text-white/80 bg-black/30 px-3 py-1 rounded">Print</button>
          <button onClick={handleZoomOut} className="text-white/80 bg-black/30 px-3 py-1 rounded">-</button>
          <span className="text-white/80">{Math.round(zoom*100)}%</span>
          <button onClick={handleZoomIn} className="text-white/80 bg-black/30 px-3 py-1 rounded">+</button>
        </div>
        )}
      <Document
      file={file}
      onLoadSuccess={handleDocumentLoadSuccess}
      className="flex flex-col content-center "
      loading={<Spinner size="lg" />}
      onLoadError={(error) => {
        console.log("Error while loading document! " + error.message);
        setIsDocumentLoadError(true);
      }}
      >
        <PDFViewerPages numPages={numPages} onChangePageNumber={handleChangePageNumber} />
      </Document>
      </div>
    </DocumentInfoContext>
  );
}

export default function PDFViewer ({ file, showToolbar }: PDFViewerPropsType) {
  const files = Array.isArray(file) ? file : [file];

  return (
    <div
    className='w-full flex justify-center scrollbar-hidden scrollbar-hidden-wrapper overflow-x-hidden'
    id="pages"
    >
      <div className="flex flex-col content-center gap-3 w-full">
        {files.map((f, i) => <PDFViewerSingle key={i} file={f} showToolbar={showToolbar} />)}
      </div>
    </div>
  );
};