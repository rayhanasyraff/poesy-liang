// useSharedData.ts
import { create } from 'zustand';

type NavigateToAnotherPageState = {
  navigateToAnotherPage: boolean;
  setNavigateToAnotherPage: (navigateToAnotherPage: boolean) => void;
  clearNavigateToAnotherPage: () => void;
};

const useNavigateToAnotherPage = create<NavigateToAnotherPageState>((set) => ({
  navigateToAnotherPage: false,
  setNavigateToAnotherPage: (navigateToAnotherPage) => set({ navigateToAnotherPage: navigateToAnotherPage }),
  clearNavigateToAnotherPage: () => set({ navigateToAnotherPage: false }),
}));

export default useNavigateToAnotherPage;