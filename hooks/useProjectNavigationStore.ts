// stores/useProjectNavigationStore.ts
import { create } from "zustand";

interface ProjectNavigationState {
  currentNavigatedId: number | null;
  navigateTo: (id: number) => void;
  reset: () => void;
}

const useProjectNavigationStore = create<ProjectNavigationState>((set) => ({
  currentNavigatedId: null,
  navigateTo: (id) => set({ currentNavigatedId: id }),
  reset: () => set({ currentNavigatedId: null }),
}));

export default useProjectNavigationStore;
