"use client"

import Home from "@/app/page";
import { usePathname } from "next/navigation";
import data from "@/data/projects.json";
import dynamic from "next/dynamic";
import ClosePageButton from "@/components/utils/ClosePageButton";
import Spinner from "@/components/utils/Spinner";
import { useMediaQuery } from "react-responsive";
import ResponsiveImage from "@/components/utils/ResponsiveImage";
import useWindowSize from "@/hooks/useWindowSize";

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

  const windowSize = useWindowSize();

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

      if (project.contentImage) {
        return (
          <div className="flex flex-1 flex-row">
            <div className="flex flex-1"
            style={{
              marginTop: `${windowSize.height / 6}px`,
            }}
            >
              <ResponsiveImage image={project.contentImage[0]} name={project.name} />
            </div>
            <ClosePageButton />
          </div>
        )
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
