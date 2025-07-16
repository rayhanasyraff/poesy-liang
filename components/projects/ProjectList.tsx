'use client';

import { useMediaQuery } from "react-responsive";
import Project from "./Project";
import { cva } from "class-variance-authority";
import { ProjectType } from "@/types/ProjectType";


const projectListVariants = cva("", {
  variants: {
    type: {
      mobile: "text-right mr-5",
      desktop: "mt-10 mx-10",
    },
  },
  defaultVariants: {
    type: "mobile",
  }
})

export default function ProjectList ({ projects }: { projects: ProjectType[] } ) {

    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

    if (isDesktop) {
      return (
        <div className={projectListVariants({ type: "desktop" })}>  
          {projects.map((project, i) => (
            <Project project={project} key={i} />
          ))}
        </div>
      );
    }

    return (
      <div className={projectListVariants({ type: "mobile" })}>  
        {projects.map((project, i) => (
          <Project project={project} key={i} />
        ))}
      </div>
    );
}
    