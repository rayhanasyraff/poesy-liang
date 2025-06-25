import Link from "next/link";
import { CrossIcon } from "../icons/CrossIcon";

const ClosePageButton = () => {
    return (
        <div className="fixed top-5 left-5 z-100">
            <Link href="/" className="white">
                <CrossIcon />
            </Link>
        </div>
    )
}

export default ClosePageButton;