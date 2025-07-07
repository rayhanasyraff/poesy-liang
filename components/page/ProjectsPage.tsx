"use client";

import ProjectList from "../projects/ProjectList"
import data from "@/data/projects.json";
import dynamic from "next/dynamic";
import { useMediaQuery } from 'react-responsive';

const PDFViewer = dynamic(() => import("../utils/PDFViewer/PDFViewer"), {
  ssr: false, // 👈 disables SSR for this component
});


const ProjectsPage = ({className=""}: {className?: string}) => {

    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

    if (isMobile) {
        return (
            <div className={`flex flex-1 flex-row h-dvh ${className}`}>
                <div className="flex flex-1 mr-10">
                    <PDFViewer file={data[0].portfolio} />
                </div>
                <ProjectList 
                projects={data} />
            </div>
        )
    }

    if (isDesktop) {
        return (
            <div className={`${className}`}>
                <ProjectList 
                projects={data} />
            </div>
        )
    }

    return <></>
}

export default ProjectsPage;