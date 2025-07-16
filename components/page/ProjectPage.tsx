import Home from "@/app/page";
import { desktopSize, mobileSize } from "@/constants/screenSize";
import { ProjectType } from "@/types/ProjectType";
import { useMediaQuery } from "react-responsive";
import ResponsiveImage from "../utils/ResponsiveImage";
import ClosePageButton from "../utils/ClosePageButton";
import useWindowSize from "@/hooks/useWindowSize";
import dynamic from "next/dynamic";
import ProjectList from "../projects/ProjectList";
import data from "@/data/projects.json";
import Header from "../base/Header";
import useProjectNavigationStore from "@/hooks/useProjectNavigationStore";
import { useEffect } from "react";
import useResetOnPathChange from "@/hooks/useResetOnPathChange";


const PDFViewer = dynamic(() => import("../utils/PDFViewer/PDFViewer"), {
  ssr: false, // 👈 disables SSR for this component
});

const ProjectPageMobileNavigator = ({project}: {project: ProjectType, className?: string}) => {

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
            <div className={`flex flex-1 flex-row h-dvh mt-10 ml-10`}>
                <div className="flex flex-1 mr-10 scrollbar-hidden scrollbar-hidden-wrapper">
                    <PDFViewer file={project.contentPortfolio?? ""} />
                </div>
                <ProjectList projects={data} />
            </div>
        );
    }

    return (
        <div className={`flex flex-1 flex-row h-dvh mt-10 ml-10`}>
                <div className="flex mr-10 flex-col">
                    <div className="flex justify-center items-center mt-20">
                        <p className="text-white font-bright-grotesk-light text-xl text-center">Press on the picture to know more about this project</p>
                    </div>
                    <button
                    title="Image Button"
                    className="hover:cursor-pointer flex flex-1"
                    onClick={handleClick}
                    >
                        <ResponsiveImage image={project.contentImage[0].src} name={project.name} />
                    </button>
                </div>
            <ProjectList projects={data} />
        </div>
    )
}

export function ProjectPageMobile({project}: {project: ProjectType}) {
    if (project.contentImage) {

        if (project.contentPortfolio || project.linkRedirect) {
            return <ProjectPageMobileNavigator project={project} />
        }

        return (
            <div className={`flex flex-1 flex-row h-dvh mt-10 ml-10`}>
                <div className="flex flex-1 mr-10 flex-col">
                    <div className="flex flex-1">
                        <ResponsiveImage image={project.contentImage[0].src} name={project.name} />
                    </div>
                </div>
                <ProjectList projects={data} />
            </div>
        )
    }

    return (
        <div className={``}>
            <ProjectList projects={data} />
        </div>
    );
}

function ProjectPageDesktopNavigator({project}: {project: ProjectType}) {
    
    const windowSize = useWindowSize();
    
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
                <ClosePageButton 
                // onClick={() => reset()} 
                />
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col">
                <div className="flex justify-center items-center mt-20">
                    <p className="text-white font-bright-grotesk-light text-2xl">Press on the picture to know more about this project</p>
                </div>
                <button
                title="Image Button"
                className="hover:cursor-pointer"
                onClick={handleClick}
                >
                    <div 
                    className="flex flex-1"
                    style={{
                        marginTop: `${windowSize.height / 10}px`,
                    }}
                    >
                        <ResponsiveImage image={project.contentImage[0].src} name={project.name} />
                    </div>
                </button>
            </div>
            <ClosePageButton 
            // onClick={() => reset()}
            />
        </div>
    )
}

function ProjectPageDesktop({project}: {project: ProjectType}) {

    const windowSize = useWindowSize();

    if (project.contentPortfolio || project.linkRedirect) {
        return <ProjectPageDesktopNavigator project={project} />
    }

    return (
        <div className="flex flex-1 flex-row">
            <div className="flex flex-1"
            style={{
                marginTop: `${windowSize.height / 6}px`,
            }}
            >
                <ResponsiveImage image={project.contentImage[0].src} name={project.name} />
            </div>
            <ClosePageButton 
            // onClick={() => reset()}
            />
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