"use client"

import React, { createContext, useState } from 'react';
import { pdfjs, Document } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import PDFViewerPages from './PDFViewerPages';

// The workerSrc property shall be specified.
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type PDFViewerPropsType = {
  file: string;
};

interface DocumentInfoContextType {
  pageNumber: number | undefined,
  numPages: number | undefined,
  numPagesRendered: number,
  areAllPagesRendered: boolean | undefined,
  setNumPagesRendered: (numPagesRendered: number) => void,
  setAreAllPagesRendered: (areAllPagesRendered: boolean) => void
}

export const DocumentInfoContext =  createContext<DocumentInfoContextType>({
  pageNumber: 1,
  numPages: 1,
  numPagesRendered: 0,
  areAllPagesRendered: false,
  setNumPagesRendered: () => {},
  setAreAllPagesRendered: () => {}
}); 

export default function PDFViewer ({ file }: PDFViewerPropsType) {

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

// !numPages || numRenderedPages < numPages
  return (
    <DocumentInfoContext value={{ pageNumber, numPages, numPagesRendered, areAllPagesRendered, setNumPagesRendered, setAreAllPagesRendered }}>
      <Document 
      file={file} 
      onLoadSuccess={handleDocumentLoadSuccess} 
      className="flex flex-col items-center justify-center content-center"
      loading={""}
      // onItemClick={({pageNumber}) => console.log('Clicked an item from page ' + pageNumber + '!')}
      onLoadError={(error) => {
        console.log("Error while loading document! " + error.message);
        setIsDocumentLoadError(true);
      }}
      // onLoadProgress={({ loaded, total }) => console.log('Loading a document: ' + (loaded / total) * 100 + '%')}
      // onSourceError={(error) => console.log("Source error: " + error.message)}
      // onSourceSuccess={() => console.log("Source loaded!")}
      >
        <PDFViewerPages numPages={numPages} onChangePageNumber={handleChangePageNumber} />
      </Document>
    </DocumentInfoContext>
  );
};