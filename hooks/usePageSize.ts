import { useContext, useEffect, useState } from "react";
import { DocumentInfoContext } from "@/components/utils/PDFViewer/DocumentInfoContext";

export default function usePageSize() {

    const { pageNumber, areAllPagesRendered, setAreAllPagesRendered, setNumPagesRendered, numPagesRendered } = useContext(DocumentInfoContext);

    const [pageSize, setPageSize] = useState({ width: 0, height: 0, margin: window.innerHeight / 2 });

    useEffect(() => {
        const maxWidth = 1325;

        const measure = () => {
            const pagesContainer = document.getElementById('pages');
            if (!pagesContainer) return;

            const containerWidth = pagesContainer.clientWidth;
            const pageHeight = document.getElementsByClassName("page")[0]?.clientHeight ?? 0;
            const width = Math.min(containerWidth, maxWidth);

            setPageSize({
                width,
                height: pageHeight,
                margin: pageHeight === window.innerHeight ? window.innerHeight / 2 : (window.innerHeight - pageHeight) / 2,
            });
        };

        const pagesContainer = document.getElementById('pages');
        if (!pagesContainer) return;

        const observer = new ResizeObserver(measure);
        observer.observe(pagesContainer);
        measure();

        return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber, areAllPagesRendered, numPagesRendered]);

    useEffect(() => {
        setNumPagesRendered(0);
    }, [pageNumber, setNumPagesRendered]);

    return pageSize;
}
