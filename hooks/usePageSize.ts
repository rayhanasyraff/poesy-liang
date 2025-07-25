import { useContext, useEffect, useState } from "react";
import useWindowSize from "./useWindowSize";
import { DocumentInfoContext } from "@/components/utils/PDFViewer/PDFViewer";

export default function usePageSize() {

    const windowSize = useWindowSize();
    const { pageNumber, areAllPagesRendered, setAreAllPagesRendered, setNumPagesRendered, numPagesRendered } = useContext(DocumentInfoContext);
    

    const [pageSize, setPageSize] = useState({ width: 0, height: 0, margin: window.innerHeight / 2 });
    // const getPageByPageNumber = (pageNumber: number) => {
    //     const pages = document.getElementsByClassName("page");

    //     if (pages.length !== 0 && pages !== undefined && pages !== null) {
    //         for (let index = 0; index < pages.length; index++) {
    //             // const page = pages[index];
    //             // page.className = "page hidden";
    //         }

    //         const pageSelected = pages[pageNumber - 1];

    //         // pageSelected.className = "page";

    //         // console.log(pageSelected.clientHeight);
    //         if (pageSelected && pageSelected.clientHeight <= 100) {
    //             // pageSelected.className = "page hidden";
    //         }
            
    //         return pageSelected    //     }

    //     return null;
    // }

    // function getPageByPageNumber(pageNumber: number) {
    //     const pages = document.getElementsByClassName("page");

    //     if (pages.length !== 0 && pages !== undefined && pages !== null) {
    //         for (let index = 0; index < pages.length; index++) {
    //             const page = pages[index];
    //             page.className = "page hidden";
    //         }

    //         const pageSelected = pages[pageNumber - 1];

    //         pageSelected.className = "page";

    //         console.log(pageSelected.clientHeight);
    //         if (pageSelected && pageSelected.clientHeight <= 24 && areAllPagesRendered) {
    //             pageSelected.className = "page hidden";
    //         }
            
    //         return pageSelected;
    //     }

    //     return null;
    // }
    useEffect(() => {
        const maxWindowWidth = 1325;
        const minWindowWidth = 767;
        const pageHeight = document.getElementsByClassName("page")[0]?.clientHeight;
        const pagesContainer = document.getElementById('pages');        

        // pagesContainer?.clientWidth = windowSize.width;
        // if (pagesContainer && pagesContainer.style) {
        //     pagesContainer.style.width = windowSize.width + 'px';
        // }

        if (windowSize.width <= minWindowWidth) {
          pagesContainer?.style.setProperty('width', `${100}px`);  
        }

        let pageWidth = pagesContainer?.clientWidth ?? 0;

        // console.log(pagesContainer?.clientWidth);

        if (windowSize.width > minWindowWidth && windowSize.width <= maxWindowWidth) {
            pageWidth = windowSize.width;
        } else if (windowSize.width > maxWindowWidth) {
            pageWidth = maxWindowWidth;
        }

        // console.log(pageWidth, windowSize.width > minWindowWidth && windowSize.width <= maxWindowWidth, windowSize.width > minWindowWidth && windowSize.width <= maxWindowWidth)

        setPageSize({
            width: pageWidth,
            height: pageHeight ?? 0,
            margin: pageSize.height == windowSize.height ? windowSize.height / 2 : (windowSize.height - pageSize.height) / 2
        });

        // console.log(areAllPagesRendered);

        setNumPagesRendered(0);
        
    }, [pageNumber, windowSize.width, windowSize.height, pageSize.height, pageSize.width, areAllPagesRendered, numPagesRendered, setNumPagesRendered, setAreAllPagesRendered, windowSize]);


    return pageSize;
}