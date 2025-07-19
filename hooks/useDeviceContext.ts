import { narrowScreen, wideScreen } from "@/constants/screenBreakpoints";
import { useMediaQuery } from "react-responsive";

export default function useDeviceContext() {
    const isWideScreen = useMediaQuery({ query: wideScreen });
    const isNarrowScreen = useMediaQuery({ query: narrowScreen });

    return {
        isWideScreen,
        isNarrowScreen
    };
}
