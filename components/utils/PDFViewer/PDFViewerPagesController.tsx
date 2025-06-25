import { LeftArrowIcon } from "@/components/icons/LeftArrowIcon";
import { RightArrowIcon } from "@/components/icons/RightArrowIcon";
import { MouseEventHandler, useContext } from "react";
import { cva } from "class-variance-authority";
import { DocumentInfoContext } from "./PDFViewer";

const pdfViewerPagesControllerStyle = cva("my-5 cursor-pointer", {
    variants: {
        type: {
            invisible: "invisible",
            visible: "",
        },
    },
    defaultVariants: {
        type: "visible",
    }
});

const PDFViewerPagesControllerButtonPrevious = ({ onChangePageNumber }: { onChangePageNumber: (pageNumber: number) => void }) => {

    const { pageNumber, numPages } = useContext(DocumentInfoContext);

    const onChangePageNumberPrevious = () => {
        if (pageNumber && numPages && pageNumber > 1) {
            onChangePageNumber(pageNumber - 1);
        }
    }

    return (
        <>
            <PDFViewerPagesControllerButton onChangePageNumber={onChangePageNumberPrevious}>
                <div className={pdfViewerPagesControllerStyle(pageNumber && pageNumber == 1 ? { type: "invisible"} : { type: "visible" })}>
                    <RightArrowIcon />
                </div>
            </PDFViewerPagesControllerButton>
        </>
    )

}

const PDFViewerPagesControllerButtonNext = ({ onChangePageNumber }: { onChangePageNumber: (pageNumber: number) => void }) => {

    const { pageNumber, numPages } = useContext(DocumentInfoContext);

    const onChangePageNumberNext = () => {
        if (pageNumber && numPages && pageNumber < numPages) {
            onChangePageNumber(pageNumber + 1);
        }
    }
    
    return (
        <>
            <PDFViewerPagesControllerButton onChangePageNumber={onChangePageNumberNext}>
                <div className={pdfViewerPagesControllerStyle(pageNumber && pageNumber == numPages ? { type: "invisible"} : { type: "visible"})}>
                    <LeftArrowIcon />
                </div>
            </PDFViewerPagesControllerButton>
        </>
    )
}

const PDFViewerPagesControllerButton = ({ children, onChangePageNumber }: { children: React.ReactNode, onChangePageNumber: MouseEventHandler<HTMLButtonElement> | undefined}) => {
    return  (
        <>
            <button 
            onClick={onChangePageNumber}>
                {children}
            </button>
        </>
    );
}

const PDFViewerPagesController = ({numPages, pageNumber, onChangePageNumber}: {numPages: number | undefined, pageNumber: number | undefined, onChangePageNumber: (pageNumber: number) => void}) => {
  return (
    <div className='flex flex-row items-center justify-center mt-1'>
      <PDFViewerPagesControllerButtonPrevious onChangePageNumber={onChangePageNumber} />
      <p className='mx-10 text-white font-bright-grotesk-light'>{pageNumber} / {numPages}</p>
      <PDFViewerPagesControllerButtonNext onChangePageNumber={onChangePageNumber} />
    </div>
  );
}

export default PDFViewerPagesController;