'use client';

import Project from "./Project";
import { cva } from "class-variance-authority";
import useGetProjects from "@/hooks/useGetProjects";
import useDeviceContext from '@/hooks/useDeviceContext';
import cn from "@/utils/cn";


const projectListStyle = cva("", {
  variants: {
    screen: {
      narrow: "text-right mr-5 flex flex-col",
      wide: "",
    },
  },
  defaultVariants: {
    screen: "wide",
  }
})

export default function ProjectList ({ className, searchQuery }: { className?: string, searchQuery?: string }) {

    const { isWideScreen, isNarrowScreen } = useDeviceContext();
    
    const projects = useGetProjects(searchQuery);

    if (projects) {
      if (isWideScreen) {
        return (
          <div className={cn(projectListStyle({ screen: "wide" }), className)}>  
            {projects.map((project, i) => (
              <Project project={project} key={i} />
            ))}
          </div>
        );
      }

      if (isNarrowScreen) {
        return (
          <div className={cn(projectListStyle({ screen: "narrow" }), className)}>  
            {projects.map((project, i) => (
              <Project project={project} key={i} />
            ))}
          </div>
        );
      }
    }

    return (<></>)
}
    