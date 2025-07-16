"use client";

import ProjectList from "../projects/ProjectList"
import data from "@/data/projects.json";
import { usePathname } from "next/navigation";
import { useMediaQuery } from 'react-responsive';
import { ProjectType } from "@/types/ProjectType";
import { desktopSize, mobileSize } from "@/constants/screenSize";
import { ProjectPageMobile } from "./ProjectPage";

const ProjectsPageMobile = ({data}: {data: ProjectType[], className?: string}) => {

    const pathname = usePathname();
    const segments = pathname.split("/");
    const result = segments.pop() || segments.pop();
    const project = data.find((project) => project.pathname === result) ?? data[0];

    return (
        <ProjectPageMobile project={project} />
    )
}

const ProjectsPageDesktop = ({data, className=""}: {data: ProjectType[], className?: string}) => {
  return (
    <div className={`${className}`}>
        <ProjectList projects={data} />
    </div>
  );
}

const ProjectsPage = ({className=""}: {className?: string}) => {

    const sortedData = data.sort((a, b) => a.order - b.order);

    const isDesktop = useMediaQuery({ query: desktopSize });
    const isMobile = useMediaQuery({ query: mobileSize });

    if (data) {
        
        if (isMobile) {
            return (<ProjectsPageMobile data={sortedData} className={className} />)
        }

        if (isDesktop) {
            return (<ProjectsPageDesktop data={sortedData} className={className} />)
        }
    }

    return <></>
}

export default ProjectsPage;