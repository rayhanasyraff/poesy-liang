"use client"

import React, { useEffect, useState } from 'react';
import { pdfjs, Document, Page } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

type Props = {
  file: string;
};

// const options = {
//   cMapUrl: '/cmaps/',
// };

// The workerSrc property shall be specified.
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer: React.FC<Props> = ({ file }) => {
  
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [numPages, setNumPages] = useState<number>();
  // const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  useEffect(() => {
    
      function reportWindowSize() {
        setWindowWidth(window.innerWidth)
      }
      
      // Trigger this function on resize
      window.addEventListener('resize', reportWindowSize)
      
      //  Cleanup for componentWillUnmount
      return () => window.removeEventListener('resize', reportWindowSize)

  }, [])


  return (
    <>
      <Document 
      file={file} 
      onLoadSuccess={onDocumentLoadSuccess} 
      className="flex flex-col gap-2 items-center"
      loading=""
      >
        {new Array(numPages).fill(0).map((_, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} width={windowWidth > 1300 ? 1300 : 900}/>
        ))}
      </Document>
      {/* <p>
        Page {pageNumber} of {numPages}
      </p> */}
    </>
  );
};

export default PDFViewer;