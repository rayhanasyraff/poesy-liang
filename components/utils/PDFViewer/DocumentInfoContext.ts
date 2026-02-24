import { createContext } from "react";
import DocumentInfoContextType from "@/types/DocumentInfoContextType";

export const DocumentInfoContext = createContext<DocumentInfoContextType>({
  pageNumber: 1,
  numPages: 1,
  numPagesRendered: 0,
  areAllPagesRendered: false,
  setNumPagesRendered: () => {},
  setAreAllPagesRendered: () => {}
});
