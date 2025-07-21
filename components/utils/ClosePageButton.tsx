"use client";
import { useRouter } from "next/navigation";
import { CrossIcon } from "../icons/CrossIcon";

const ClosePageButton = ({ onClick }: { onClick?: () => void }) => {
  const router = useRouter();

  const defaultHandler = () => {
    router.push("/");
  };

  return (
    <button
      title="Close Button"
      type="button"
      onClick={onClick ?? defaultHandler}
      className="fixed top-5 left-5 hover:cursor-pointer"
      style={{
        zIndex: 99999,
        pointerEvents: "auto",
      }}
    >
      <CrossIcon />
    </button>
  );
};

export default ClosePageButton;
