// useSharedData.ts
import { create } from 'zustand';

type PageNavigatorState = {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  clearPageNumber: () => void;
};

const usePageNavigator = create<PageNavigatorState>((set) => ({
  pageNumber: 1,
  setPageNumber: (pageNumber) => set({ pageNumber: pageNumber }),
  clearPageNumber: () => set({ pageNumber: 1 }),
}));

export default usePageNavigator;