'use client';

import { useMediaQuery } from "react-responsive";
import Project from "./Project";
import { cva } from "class-variance-authority";
import useGetProjects from "@/hooks/useGetProjects";
import { desktopSize, mobileSize } from "@/constants/screenSize";


const projectListVariants = cva("", {
  variants: {
    type: {
      mobile: "text-right mr-5 flex flex-1 flex-col",
      desktop: "mt-10 mx-10",
    },
  },
  defaultVariants: {
    type: "mobile",
  }
})

export default function ProjectList () {

    const isDesktop = useMediaQuery({ query: desktopSize });
    const isMobile = useMediaQuery({ query:  mobileSize });
    
    const projects = useGetProjects();

    if (projects) {
      if (isDesktop) {
        return (
          <div className={projectListVariants({ type: "desktop" })}>  
            {projects.map((project, i) => (
              <Project project={project} key={i} />
            ))}
          </div>
        );
      }

      if (isMobile) {
        return (
          <div className={projectListVariants({ type: "mobile" })}>  
            {projects.map((project, i) => (
              <Project project={project} key={i} />
            ))}
          </div>
        );
      }
    }

    return (<></>)
}
    