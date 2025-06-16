"use client"

import Home from "@/app/page";
import { usePathname } from "next/navigation";
import data from "@/data/projects.json";
import ProjectModal from "@/components/project-modal";

export default function Page() {
  const pathname = usePathname();

  const segments = pathname.split("/");
  const result = segments.pop() || segments.pop();

  const project = data.find((project) => project.pathname === result);

  if (project) {
    return (
      <div className="size-full">
        <div className="absolute w-full z-100">
          <ProjectModal project={project} />
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
