import { Page } from "react-pdf"
import PDFViewerPagesTouchController from "./PDFViewerPagesTouchController"
import PDFViewerPagesController from "./PDFViewerPagesController"
import usePageSize from "@/hooks/usePageSize"
import { DocumentInfoContext } from "./PDFViewer"
import { useContext, useEffect } from "react"

const PDFViewerPages = ({ numPages, onChangePageNumber }: { numPages: number | undefined, onChangePageNumber: (pageNumber: number) => void }) => {
  
  const pages = new Array(numPages).fill(0);

  const { pageNumber, numPagesRendered, setNumPagesRendered, areAllPagesRendered, setAreAllPagesRendered } = useContext(DocumentInfoContext);
  const pageSize =  usePageSize();
  
  useEffect(() => {
    if (numPages && numPagesRendered >= numPages) {
      setAreAllPagesRendered(true);
    }
  }, [numPages, numPagesRendered, setAreAllPagesRendered]);

  return (
      <div
        style={{
          display: "inline-block",
        }}
      >
        {/* <Spinner className={`
          ${areAllPagesRendered ? "hidden" : "visible"}`} /> */}
        <div style={{
          display: "inline-block",
          marginTop: `${pageSize.margin}px`,
          // visibility: areAllPagesRendered ? "visible" : "hidden",
        }}>
          {pages.map((_, index) => (
            <div
              key={`page_${index + 1}`}
              className="page hidden"
            >
              <PDFViewerPagesTouchController 
              onChangePageNumber={onChangePageNumber}  />
              <Page
              onRenderTextLayerError={(error) => console.log('Error while rendering text layer! ' + error.message) }
              renderTextLayer={false}
              canvasBackground="transparent"
              key={`page_${index + 1}`}
              pageNumber={index + 1} 
              width={pageSize.width}
              onGetAnnotationsError={(error) => console.log('Error while getting annotations! ' + error.message) }
              // onGetAnnotationsSuccess={(annotations) => console.log(annotations) }
              onGetStructTreeError={(error) => console.log('Error while getting text layer! ' + error.message) }
              // onGetStructTreeSuccess={(structTree) => console.log(structTree) }
              onGetTextError={(error) => console.log('Error while getting text layer! ' + error.message) }
              // onGetTextSuccess={(text) => console.log(text) }
              onLoadError={(error) => console.log('Error while loading page! ' + error.message)}
              // onLoadSuccess={(page) => console.log(page)}
              // onRenderAnnotationLayerSuccess={() => console.log("Annotation layer rendered successfully")}
              onRenderError={(error) => console.log('Error while rendering page! ' + error.message)}
              onRenderSuccess={() => {
                setNumPagesRendered(index + 1);
                console.log(index + 1)
              }}
              // onRenderTextLayerSuccess={() => console.log("Text layer rendered successfully")} 
              />
            </div>
          ))}
          <PDFViewerPagesController 
            numPages={numPages}
            pageNumber={pageNumber}
            onChangePageNumber={onChangePageNumber}
          />
        </div>
      </div>
  )
}

export default PDFViewerPages;