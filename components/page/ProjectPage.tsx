import Home from "@/app/page";
import { desktopSize, mobileSize } from "@/constants/screenSize";
import { ProjectType } from "@/types/ProjectType";
import { useMediaQuery } from "react-responsive";
import ClosePageButton from "../utils/ClosePageButton";
import dynamic from "next/dynamic";
import Header from "../base/Header";
import useProjectNavigationStore from "@/hooks/useProjectNavigationStore";
import { useEffect } from "react";
import useResetOnPathChange from "@/hooks/useResetOnPathChange";
import { ResponsiveImage, ResponsiveButtonedImage } from '../utils/ResponsiveImage';


const PDFViewer = dynamic(() => import("../utils/PDFViewer/PDFViewer"), {
  ssr: false, // 👈 disables SSR for this component
});

const ProjectPageWithAttachedContentMobile = ({project}: {project: ProjectType, className?: string}) => {

    const { currentNavigatedId, navigateTo } = useProjectNavigationStore();

    const isNavigated = currentNavigatedId === project.id;

    function handleClick() {
        if (project.linkRedirect) {
            window.open(project.linkRedirect, "_blank");
        }
        if (project.contentPortfolio) {
            navigateTo(project.id); // 👈 This replaces any previously navigated project
        }
    }

    if (isNavigated) {
        return (
            <div className="flex flex-1 mr-10 scrollbar-hidden scrollbar-hidden-wrapper">
                <PDFViewer file={project.contentPortfolio?? ""} />
            </div>
        );
    }

    return (
        <div className="flex flex-3 mr-10 flex-col gap-3">
            <ResponsiveButtonedImage image={project.contentImage[0].src} name={project.name} onClick={handleClick} />
            <div className="flex justify-center items-center">
                <p className="text-white font-bright-grotesk text-[13px] text-center">tap for more</p>
            </div>
        </div>
    )
}

export function ProjectPageMobile({project}: {project: ProjectType}) {
    
    if (project.contentImage) {

        if (project.contentPortfolio || project.linkRedirect) {
            return <ProjectPageWithAttachedContentMobile project={project} />
        }

        return (
            <div className="flex flex-3 mr-10 flex-col">
                <ResponsiveImage image={project.contentImage[0].src} name={project.name} />
            </div>
        )
    }

    return (<></>);
}

function ProjectPageWithAttachedContentDesktop({project}: {project: ProjectType}) {
        
    const { currentNavigatedId, navigateTo } = useProjectNavigationStore();

    const isNavigated = currentNavigatedId === project.id;

    function handleClick() {
        if (project.linkRedirect) {
            window.open(project.linkRedirect, "_blank");
        }
        if (project.contentPortfolio) {
            navigateTo(project.id); // 👈 This replaces any previously navigated project
        }
    }

    if (isNavigated) {
        return (
            <div className="flex flex-1 flex-row">
                <PDFViewer file={project.contentPortfolio?? ""} />
                <ClosePageButton />
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col justify-center">
            <div className="flex flex-1 flex-col justify-center min-h-screen">
                <div className="flex flex-col gap-10 items-center">
                    <ResponsiveButtonedImage image={project.contentImage[0].src} name={project.name} onClick={handleClick} />
                    <div className="flex justify-center items-center">
                        <p className="text-white font-bright-grotesk-light text-2xl">tap for more</p>
                    </div>
                </div>
                <ClosePageButton />
            </div>
        </div>
    )
}

function ProjectPageDesktop({project}: {project: ProjectType}) {

    if (project.contentPortfolio || project.linkRedirect) {
        return <ProjectPageWithAttachedContentDesktop project={project} />
    }

    return (
        <div className="flex flex-1 flex-row">
            <div className="flex flex-1 flex-col justify-center min-h-screen">
                <div className="flex flex-col gap-10 items-center">
                    <ResponsiveImage image={project.contentImage[0].src} name={project.name} />
                </div>
            </div>
            <ClosePageButton />
        </div>
    )
}

export default function ProjectPage({ project }: { project: ProjectType }) {

  const isDesktop = useMediaQuery({ query: desktopSize });
  const isMobile = useMediaQuery({ query: mobileSize });
  
  const { currentNavigatedId, reset } = useProjectNavigationStore();

  // ✅ Reset if switching to a new project
  useEffect(() => {
    if (currentNavigatedId !== null && currentNavigatedId !== project.id) {
      reset();
    }
  }, [currentNavigatedId, project.id, reset]);

  useResetOnPathChange(); // 👈 add this here instead

  if (isDesktop) {
    return <ProjectPageDesktop project={project} />;
  }

  if (isMobile) {
    return (
      <>
        <Header />
        <ProjectPageMobile project={project} />
      </>
    );
  }

  return <Home />;
}