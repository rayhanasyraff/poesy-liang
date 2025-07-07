import { useContext, useEffect, useState } from "react";
import useWindowSize from "./useWindowSize";
import { DocumentInfoContext } from "@/components/utils/PDFViewer/PDFViewer";

export default function usePageSize() {

    const windowSize = useWindowSize();
    const { pageNumber, areAllPagesRendered, setAreAllPagesRendered, setNumPagesRendered, numPagesRendered } = useContext(DocumentInfoContext);
    

    const [pageSize, setPageSize] = useState({ width: 0, height: 0, margin: window.innerHeight / 2 });
    const pagesContainer = document.getElementById('pages');

    const getPageByPageNumber = (pageNumber: number) => {
        const pages = document.getElementsByClassName("page");

        if (pages.length !== 0 && pages !== undefined && pages !== null) {
            for (let index = 0; index < pages.length; index++) {
                // const page = pages[index];
                // page.className = "page hidden";
            }

            const pageSelected = pages[pageNumber - 1];

            // pageSelected.className = "page";

            // console.log(pageSelected.clientHeight);
            if (pageSelected && pageSelected.clientHeight <= 100) {
                // pageSelected.className = "page hidden";
            }
            
            return pageSelected;
        }

        return null;
    }

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
        const maxWidth = 1325;
        const pageSelected = pageNumber ? getPageByPageNumber(pageNumber) : null;

        // pagesContainer?.clientWidth = windowSize.width;
        // if (pagesContainer && pagesContainer.style) {
        //     pagesContainer.style.width = windowSize.width + 'px';
        // }        

        setPageSize({
            width: pagesContainer && pagesContainer.clientWidth <= maxWidth ? pagesContainer.clientWidth : maxWidth,
            height: pageSelected ? pageSelected.clientHeight : 0,
            margin: pageSize.height == windowSize.height ? windowSize.height / 2 : (windowSize.height - pageSize.height) / 2
        });

        // console.log(areAllPagesRendered);

        setNumPagesRendered(0);
        
    }, [pageNumber, windowSize.width, windowSize.height, pageSize.height, pageSize.width, areAllPagesRendered, numPagesRendered, setNumPagesRendered, setAreAllPagesRendered, pagesContainer]);


    return pageSize;
}