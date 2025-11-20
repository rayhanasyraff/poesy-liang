'use client';

import Project from "./Project";
import { cva } from "class-variance-authority";
import useGetProjects from "@/hooks/useGetProjects";
import useDeviceContext from '@/hooks/useDeviceContext';
import Spinner from "@/components/utils/Spinner";


const projectListVariants = cva("", {
  variants: {
    type: {
      mobile: "text-right mr-5 flex flex-col",
      desktop: "mt-10 mx-10",
    },
  },
  defaultVariants: {
    type: "mobile",
  }
})

export default function ProjectList () {

    const { isWideScreen, isNarrowScreen } = useDeviceContext();
    
    const projects = useGetProjects();

    if (projects) {
      if (isWideScreen) {
        return (
          <div className={projectListVariants({ type: "desktop" })}>
            {projects.map((project, i) => (
              <Project project={project} key={i} />
            ))}
          </div>
        );
      }

      if (isNarrowScreen) {
        return (
          <div className={projectListVariants({ type: "mobile" })}>
            {projects.map((project, i) => (
              <Project project={project} key={i} />
            ))}
          </div>
        );
      }
    }

    return <Spinner size="lg" />;
}
    