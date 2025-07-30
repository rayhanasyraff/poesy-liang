import { useEffect, useState } from "react";
import { narrowScreen, wideScreen } from "@/constants/screenBreakpoints";
import { useMediaQuery } from "react-responsive";
import MobileDetect from "mobile-detect";

type ScreenProfile = {
  hdr: boolean;
  colorDepth: number;
  pixelRatio: number;
  type: "High-Fidelity Display" | "Standard Display" | "Low-Fidelity Display";
  notes?: string[];
};

function getScreenProfile(): ScreenProfile {
  const hdr = window.matchMedia?.("(dynamic-range: high)")?.matches ?? false;
  const colorDepth = window.screen.colorDepth;
  const pixelRatio = window.devicePixelRatio;

  const notes: string[] = [];

  const isHighFidelity = hdr && colorDepth >= 24 && pixelRatio > 1.5;
  const isStandard =
    (!hdr && colorDepth >= 24 && pixelRatio <= 2) ||
    (hdr && colorDepth >= 24 && pixelRatio <= 1.5);

  let type: ScreenProfile["type"];

  if (isHighFidelity) {
    type = "High-Fidelity Display";
    notes.push("Great for media-rich interfaces or color-sensitive content.");
  } else if (isStandard) {
    type = "Standard Display";
    notes.push("Most users fall into this category.");
  } else {
    type = "Low-Fidelity Display";
    notes.push("Watch for washed-out colors or low detail.");
  }

  return {
    hdr,
    colorDepth,
    pixelRatio,
    type,
    notes,
  };
}

export default function useDeviceContext() {
  const [isPhoneDevice, setIsPhoneDevice] = useState(false);
  const [isTabletDevice, setIsTabletDevice] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [screenProfile, setScreenProfile] = useState<ScreenProfile | null>(null);

  const isWideScreen = useMediaQuery({ query: wideScreen });
  const isNarrowScreen = useMediaQuery({ query: narrowScreen });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const md = new MobileDetect(window.navigator.userAgent);

      const phone = !!md.phone();
      const tablet = !!md.tablet();
      const mobile = phone || tablet;
      const nativeTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

      setIsPhoneDevice(phone);
      setIsTabletDevice(tablet);
      setIsMobileDevice(mobile);
      setIsTouchDevice(nativeTouch || mobile);

      setScreenProfile(getScreenProfile());
    }
  }, []);

  return {
    isWideScreen,
    isNarrowScreen,
    isPhoneDevice,
    isTabletDevice,
    isMobileDevice,
    isTouchDevice,
    screenProfile,
  };
}
