import usePageSize from "@/hooks/usePageSize";
import { useContext } from "react";
import { DocumentInfoContext } from "./PDFViewer";

const PDFViewerPagesTouchControllerNextButton = ({ onChangePageNumber }: { onChangePageNumber: (pageNumber: number) => void }) => {

    const { pageNumber, numPages } = useContext(DocumentInfoContext);

    const handleChangePageNumberNext = () => {
        if (pageNumber && numPages && pageNumber < numPages) {
            onChangePageNumber(pageNumber + 1);
        }
    }

    return (
        <PDFViewerPagesTouchControllerButton onChangePageNumber={handleChangePageNumberNext}>
            <div className="flex flex-col flex-1 "></div>
        </PDFViewerPagesTouchControllerButton>
    )
}


const PDFViewerPagesTouchControllerPreviousButton = ({ onChangePageNumber }: { onChangePageNumber: (pageNumber: number) => void }) => {

    const { pageNumber, numPages } = useContext(DocumentInfoContext);

    const handleChangePageNumberPrevious = () => {
        if (pageNumber && numPages && pageNumber > 1) {
            onChangePageNumber(pageNumber - 1);
        }
    }

    return (
        <PDFViewerPagesTouchControllerButton onChangePageNumber={handleChangePageNumberPrevious}>
            <div className="flex flex-col flex-1"></div>
        </PDFViewerPagesTouchControllerButton>
    )
}

const PDFViewerPagesTouchControllerButton = ({ children, onChangePageNumber }: { children: React.ReactNode, onChangePageNumber: () => void | undefined}) => {
    return  (
        <button
        className="flex flex-row flex-1 cursor-pointer" 
        onClick={onChangePageNumber}
        onTouchStart={onChangePageNumber}>
            {children}
        </button>
    );
}

const PDFViewerPagesTouchController = ({onChangePageNumber}: {onChangePageNumber: (pageNumber: number) => void}) => {
    
    const pageSize = usePageSize();

    return (
        <>
            <div className="absolute z-100">
                <div 
                className="flex flex-row"
                style={{width: pageSize.width, height: pageSize.height}}
                >
                    <PDFViewerPagesTouchControllerPreviousButton onChangePageNumber={onChangePageNumber} />
                    <PDFViewerPagesTouchControllerNextButton onChangePageNumber={onChangePageNumber} />
                </div>
            </div>
        </>
    )
}

export default PDFViewerPagesTouchController;