"use client";

import { useRouter } from "next/navigation";
import { CrossIcon } from "../icons/CrossIcon";

const ClosePageButton = () => {
  const router = useRouter();

  const handleClose = () => {
    router.push("/"); // ✅ just navigate
  };

  return (
    <button
      title="Close"
      type="button"
      onClick={handleClose}
      className="fixed top-5 left-5 hover:cursor-pointer"
      style={{ zIndex: 300 }}
    >
      <CrossIcon />
    </button>
  );
};

export default ClosePageButton;
