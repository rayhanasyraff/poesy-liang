"use client";

import ProjectList from "../projects/ProjectList"
import { useMediaQuery } from 'react-responsive';
import { desktopSize, mobileSize } from "@/constants/screenSize";
import { ProjectPageMobile } from "./ProjectPage";
import { useProjectFromPathname } from "@/hooks/useProjectFromPathname";
import useGetProjects from "@/hooks/useGetProjects";

const ProjectsPageMobile = ({className=""}: {className?: string}) => {

    const projects = useGetProjects();
    const project = useProjectFromPathname(projects);

    if (project.contentImage) {

        return (
            <div className={`flex flex-1 flex-row h-dvh mt-10 ${className}`}>
                <ProjectPageMobile project={project} />
                <ProjectList />
            </div>
        )
    }

    return (
        <div className={`${className}`}>
            <ProjectList />
        </div>
    )
}

const ProjectsPageDesktop = ({className=""}: {className?: string}) => {
  return (
    <div className={`${className}`}>
        <ProjectList />
    </div>
  );
}

const ProjectsPage = ({className=""}: {className?: string}) => {

    const isDesktop = useMediaQuery({ query: desktopSize });
    const isMobile = useMediaQuery({ query: mobileSize });

    const projects = useGetProjects();

    if (projects) {
        
        if (isMobile) {
            return (<ProjectsPageMobile />)
        }

        if (isDesktop) {
            return (<ProjectsPageDesktop className={className} />)
        }
    }

    return <></>
}

export default ProjectsPage;