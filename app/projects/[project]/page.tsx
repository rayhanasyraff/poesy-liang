"use client"

import Home from "@/app/page";
import ProjectPage from "@/components/page/ProjectPage";
import { useProjectFromPathname } from "@/hooks/useProjectFromPathname";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "@/constants/screenSize";
import useGetProjects from "@/hooks/useGetProjects";

export default function Page() {
  
  const isDesktop = useMediaQuery({ query: desktopSize });

  const projects = useGetProjects();
  const project = useProjectFromPathname(projects);
  
  if (project) {

    if (isDesktop) {
      return <ProjectPage project={project} />;
    }

  }

  return (
    <Home />
  );
}