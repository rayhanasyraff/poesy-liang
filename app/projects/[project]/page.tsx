"use client"

import Home from "@/app/page";
import { usePathname } from "next/navigation";
import data from "@/data/projects.json";
import ProjectPage from "@/components/page/ProjectPage";

export default function Page() {
  
  const pathname = usePathname();
  const segments = pathname.split("/");
  const result = segments.pop() || segments.pop();
  const project = data.find((project) => project.pathname === result);

  if (project) {
    return <ProjectPage project={project} />
  }

  return (
    <Home />
  );
}