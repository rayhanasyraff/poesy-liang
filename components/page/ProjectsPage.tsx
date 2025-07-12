"use client";

import ProjectList from "../projects/ProjectList"
import data from "@/data/projects.json";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useMediaQuery } from 'react-responsive';
import ResponsiveImage from "../utils/ResponsiveImage";

const PDFViewer = dynamic(() => import("../utils/PDFViewer/PDFViewer"), {
  ssr: false, // 👈 disables SSR for this component
});


const ProjectsPage = ({className=""}: {className?: string}) => {

    const pathname = usePathname();

    const segments = pathname.split("/");
    const result = segments.pop() || segments.pop();

    const project = data.find((project) => project.pathname === result) ?? data[0];

    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

    if (data) {
        if (isMobile) {
            if (project.contentPortfolio) {
                return (
                    <div className={`flex flex-1 flex-row h-dvh mt-10 ml-10 ${className}`}>
                        <div className="flex flex-1 mr-10 scrollbar-hidden">
                            <PDFViewer file={project.contentPortfolio?? ""} />
                        </div>
                        <ProjectList 
                        projects={data} />
                    </div>
                )
            }
            
            if (project.contentImage) {
                return (
                    <div className={`flex flex-1 flex-row h-dvh mt-10 ml-10 ${className}`}>
                        <div className="flex flex-1 mr-10">
                            <ResponsiveImage image={project.contentImage[0]} name={project.name} />
                        </div>
                        <ProjectList 
                        projects={data} />
                    </div>
                )
            }
        }

        if (isDesktop) {
            return (
                <div className={`${className}`}>
                    <ProjectList 
                    projects={data} />
                </div>
            )
        }
    }

    return <></>
}

export default ProjectsPage;