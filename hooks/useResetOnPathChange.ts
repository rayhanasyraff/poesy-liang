// hooks/useResetOnPathChange.ts
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import useProjectNavigationStore from "./useProjectNavigationStore";

export default function useResetOnPathChange() {
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const reset = useProjectNavigationStore((s) => s.reset);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      reset(); // ✅ Reset only after route has changed
      prevPath.current = pathname;
    }
  }, [pathname, reset]);
}
