'use client';

import { useMediaQuery } from "react-responsive";
import Project, { ProjectType } from "./Project";
import { cva } from "class-variance-authority";


const projectListVariants = cva("mt-10 mx-10", {
  variants: {
    type: {
      mobile: "text-right",
      desktop: "",
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
    