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
};

function PDFViewerSingle ({ file }: { file: string }) {

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numPagesRendered, setNumPagesRendered] = useState<number>(0);
  const [areAllPagesRendered, setAreAllPagesRendered] = useState<boolean>(false);

  const [isDocumentLoadError, setIsDocumentLoadError] = useState<boolean>(false);

  function handleDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function handleChangePageNumber(pageNumber: number) {
    setPageNumber(pageNumber);
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
    </DocumentInfoContext>
  );
}

export default function PDFViewer ({ file }: PDFViewerPropsType) {
  const files = Array.isArray(file) ? file : [file];

  return (
    <div
    className='flex flex-1 justify-center scrollbar-hidden scrollbar-hidden-wrapper'
    id="pages"
    >
      <div className="flex flex-col content-center gap-3">
        {files.map((f, i) => <PDFViewerSingle key={i} file={f} />)}
      </div>
    </div>
  );
};