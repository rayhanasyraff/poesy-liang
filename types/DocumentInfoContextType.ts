export default interface DocumentInfoContextType {
  pageNumber: number | undefined,
  numPages: number | undefined,
  numPagesRendered: number,
  areAllPagesRendered: boolean | undefined,
  setNumPagesRendered: (numPagesRendered: number) => void,
  setAreAllPagesRendered: (areAllPagesRendered: boolean) => void
}