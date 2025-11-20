"use client"

import { FadeLoader, PulseLoader } from "react-spinners";

type SpinnerSize = "sm" | "md" | "lg";

type SpinnerProps = {
    className?: string;
    size?: SpinnerSize;
    color?: string;
};

const sizeConfig = {
    sm: {
        container: "flex items-center justify-center p-4",
        loaderHeight: 8,
        loaderWidth: 2,
        loaderMargin: 1,
    },
    md: {
        container: "flex items-center justify-center p-8",
        loaderHeight: 12,
        loaderWidth: 3,
        loaderMargin: 2,
    },
    lg: {
        container: "flex items-center justify-center w-full h-full min-h-screen",
        loaderHeight: 15,
        loaderWidth: 4,
        loaderMargin: 2,
    },
};

export default function Spinner({
    className = "",
    size = "md",
    color = "#ffffff"
}: SpinnerProps) {
    const config = sizeConfig[size];

    return (
        <div className={`${config.container} ${className}`}>
            <FadeLoader
                loading={true}
                color={color}
                height={config.loaderHeight}
                width={config.loaderWidth}
                margin={config.loaderMargin}
            />
        </div>
    );
}

// Inline spinner for smaller contexts (e.g., buttons, small areas)
export function InlineSpinner({
    className = "",
    color = "#ffffff",
    size = 8
}: {
    className?: string;
    color?: string;
    size?: number;
}) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <PulseLoader
                loading={true}
                color={color}
                size={size}
                speedMultiplier={0.8}
            />
        </div>
    );
}
