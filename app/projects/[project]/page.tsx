"use client"

import Home from "@/app/page";
import { usePathname } from "next/navigation";
import data from "@/data/projects.json";
import dynamic from "next/dynamic";
import ClosePageButton from "@/components/utils/ClosePageButton";
import Spinner from "@/components/utils/Spinner";

export default function Page() {
  const pathname = usePathname();

  const segments = pathname.split("/");
  const result = segments.pop() || segments.pop();

  const project = data.find((project) => project.pathname === result);

  const PDFViewer = dynamic(() => import('@/components/utils/PDFViewer/PDFViewer'), {
    ssr: false,
    loading: () => <Spinner />,
  })

  if (project) {
    return (
      <div className="size-full">
        <div className="absolute w-full z-100">
          <div className="flex flex-col bg-black">
              <ClosePageButton />
              <PDFViewer file={project.portfolio} />
          </div>        
        </div>
      </div>
    );
  }

  return (
    <div>
      <Home />
    </div>
  );
}
