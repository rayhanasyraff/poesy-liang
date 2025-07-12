"use client"

import Home from "@/app/page";
import { usePathname } from "next/navigation";
import data from "@/data/projects.json";
import dynamic from "next/dynamic";
import ClosePageButton from "@/components/utils/ClosePageButton";
import Spinner from "@/components/utils/Spinner";
import { useMediaQuery } from "react-responsive";

export default function Page() {
  const pathname = usePathname();

  const segments = pathname.split("/");
  const result = segments.pop() || segments.pop();

  const project = data.find((project) => project.pathname === result);

  const PDFViewer = dynamic(() => import('@/components/utils/PDFViewer/PDFViewer'), {
    ssr: false,
    loading: () => <Spinner />,
  })

  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  if (project) {
    if (isDesktop) {
      if (project.contentPortfolio) {
        return (
          <div className="flex flex-1 flex-row">
            <PDFViewer file={project.contentPortfolio} />
            <ClosePageButton />
          </div>
        );
      }
    }

    if (isMobile) {
      return (
        <div>
          <Home />
        </div>
      );
    }
  }

  return (
    <div>
      <Home />
    </div>
  );
}
