// hooks/useProjectNavigation.ts
import { useEffect, useRef, useState } from "react";

// Shared across all hook instances
const navigatedStateMap = new Map<number, boolean>();

export default function useProjectNavigation(projectId: number) {
  const [isNavigated, setIsNavigatedState] = useState(() => navigatedStateMap.get(projectId) ?? false);

  // Track previous project to reset it
  const previousProjectId = useRef<number | null>(null);

  const setIsNavigated = (value: boolean) => {
    if (value) {
      // Clear all other states to ensure only one project is navigated
      navigatedStateMap.clear();
      navigatedStateMap.set(projectId, true);
    } else {
      navigatedStateMap.delete(projectId);
    }
    setIsNavigatedState(value);
  };

  useEffect(() => {
    // If switching from another project, reset it
    if (previousProjectId.current !== null && previousProjectId.current !== projectId) {
      navigatedStateMap.delete(previousProjectId.current);
    }

    // Update state from current map
    const value = navigatedStateMap.get(projectId) ?? false;
    setIsNavigatedState(value);

    // Store this project as the previous one
    previousProjectId.current = projectId;
  }, [projectId]);

  return { isNavigated, setIsNavigated };
}
