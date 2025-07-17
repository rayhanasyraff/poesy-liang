"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useProjectNavigationStore from "./useProjectNavigationStore";

export default function useResetOnPathChange(): boolean {
  const pathname = usePathname();
  const reset = useProjectNavigationStore((state) => state.reset);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    reset(); // reset on route change
    setIsReady(true); // trigger render after reset
  }, [pathname, reset]);

  return isReady;
}
