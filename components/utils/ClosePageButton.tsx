"use client"

import Link from "next/link";
import { CrossIcon } from "../icons/CrossIcon";

const ClosePageButton = () => {
    return (
        <Link href="/">
            <div className="fixed top-5 left-5" style={{
                zIndex: "300"
            }}>
                <CrossIcon />
            </div>
        </Link>
    )
}

export default ClosePageButton;