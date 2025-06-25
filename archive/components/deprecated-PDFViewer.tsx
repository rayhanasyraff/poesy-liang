"use client"

import useWindowSize from '@/hooks/usePageSize';
import React, { useEffect, useState } from 'react';
import { pdfjs, Document, Page } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { LeftArrowIcon } from '../../components/icons/LeftArrowIcon';

type PDFViewerPropsType = {
  file: string;
};

type PDFViewerPagesType = {
  numPages: number | undefined,
  width: number | undefined
}

// The workerSrc property shall be specified.
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewerPages = ({ numPages, width }: PDFViewerPagesType) => {
    return (
    <>
      {new Array(numPages).fill(0).map((_, index) => (
        <Page 
        className="page"
        key={`page_${index + 1}`} 
        pageNumber={index + 1} 
        width={width}/>
      ))}
    </>
  )

}

export default function PDFViewer ({ file }: PDFViewerPropsType) {
  
  const [numPages, setNumPages] = useState<number>();  
  const { windowWidth, windowHeight } =  useWindowSize();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (windowWidth <= 1325) {
      setWidth(windowWidth);
      setHeight(document.getElementsByClassName("page")[0]?.clientHeight);
    } else {
      setWidth(1325);
      setHeight(document.getElementsByClassName("page")[0]?.clientHeight);

    }
  })
  
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <>
      <Document 
      file={file} 
      onLoadSuccess={onDocumentLoadSuccess} 
      className="flex flex-col items-center justify-center content-center"
      loading=""
      >
        <div 
        className={`flex flex-col items-center gap-3 overflow-scroll`}
        style={{
          margin: `${(windowHeight-height) / 2}px 0`,
          width: `${width}px`,
          height: `${height}px`
        }}
        >
          <PDFViewerPages 
          width={width}
          numPages={numPages} />
        </div>
      </Document>
    </>
  );
};