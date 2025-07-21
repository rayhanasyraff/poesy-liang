import { ProjectType } from "@/types/ProjectType";
import ClosePageButton from "../utils/ClosePageButton";
import dynamic from "next/dynamic";
import useProjectNavigationStore from "@/hooks/useProjectNavigationStore";
import useResetOnPathChange from "@/hooks/useResetOnPathChange";
import { ResponsiveImage, ResponsiveButtonedImage } from '../utils/ResponsiveImage';
import { ResponsiveVideo } from '../utils/ResponsiveVideo';
import useDeviceContext from "@/hooks/useDeviceContext";
import { useProjectFromPathname } from "@/hooks/useProjectFromPathname";
import PageBaseLayout from "../layout/PageBaseLayout";
import PageBaseBodyLayout from "../layout/PageBaseBodyLayout";

const PDFViewer = dynamic(() => import("../utils/PDFViewer/PDFViewer"), {
  ssr: false, // 👈 disables SSR for this component
});

const ProjectPageContentWithAttachmentsNarrowScreen = ({project}: {project: ProjectType, className?: string}) => {

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
            <div className="flex flex-4 mr-10 scrollbar-hidden scrollbar-hidden-wrapper">
                <PDFViewer file={project.contentPortfolio?? ""} />
            </div>
        );
    }

    return (
        <div className="flex flex-4 mr-10 flex-col gap-3">
            <ResponsiveButtonedImage image={project.contentImage[0].src} name={project.name} onClick={handleClick} />
            <div className="flex justify-center items-center">
                <p className="text-white font-bright-grotesk text-[13px] opacity-[0.77] text-center">tap for more</p>
            </div>
        </div>
    )
}

function ProjectPageContentNarrowScreen({project}: {project: ProjectType}) {
    
    const isReady = useResetOnPathChange(); // ← move it here
    
    if (!isReady) return null;

    if (project.contentImage) {

        if (project.contentPortfolio || project.linkRedirect) {
            return <ProjectPageContentWithAttachmentsNarrowScreen project={project} />
        }

        if (project.contentImage) {
            return (
                <div className="flex flex-3 mr-10 flex-col">
                    <ResponsiveImage image={project.contentImage[0].src} name={project.name} />
                </div>
            )
        }
    }

    return (<></>);
}


function ProjectPageContentNarrowScreenWithVideoOnInitialFullscreen({project}: {project: ProjectType}) {
    return (
        <div className="flex flex-1 flex-row">
            <div className="flex flex-1 flex-col justify-center min-h-screen">
                <div className="flex flex-col gap-10 items-center">
                    <ResponsiveVideo 
                    video={project.contentVideo ? project.contentVideo[0].src : ""} 
                    width={project.contentVideo ? project.contentVideo[0].width : 0}
                    isFullscreen={true}
                    autoplay={true}
                    loop={true}
                    />
                </div>
            </div>
            <ClosePageButton />
        </div>
    )
}

function ProjectPageNarrowScreen({project}: {project: ProjectType}) {

    if (project.contentVideo && project.contentVideo[0].isFullscreenOnInitial) {
        return (
            <ProjectPageContentNarrowScreenWithVideoOnInitialFullscreen project={project} />
        )
    }
    
    return (
        <PageBaseLayout>
            <PageBaseBodyLayout>
                <ProjectPageContentNarrowScreen project={project} />
            </PageBaseBodyLayout>
        </PageBaseLayout>
    )
}

function ProjectPageContentWithAttachmentsWideScreen({project}: {project: ProjectType}) {
        
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
                        <p className="text-white font-bright-grotesk-light text-2xl opacity-[0.77]">tap for more</p>
                    </div>
                </div>
                <ClosePageButton />
            </div>
        </div>
    )
}

function ProjectPageContentWideScreen({project}: {project: ProjectType}) {
    
    const isReady = useResetOnPathChange(); // ← move it here
    
    if (!isReady) return null;

    if (project.contentPortfolio || project.linkRedirect) {
        return <ProjectPageContentWithAttachmentsWideScreen project={project} />
    }

    if (project.contentVideo) {        
        return (
            <div className="relative">
            {/* ✅ Always on top of everything */}
            <ClosePageButton />

            <div className="flex flex-1 flex-row">
                <div className="flex flex-1 flex-col justify-center min-h-screen">
                <div className="flex flex-col gap-10 items-center">
                    <ResponsiveVideo video={project.contentVideo[0].src} isFullscreen />
                </div>
                </div>
            </div>
            </div>
        )
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

function ProjectPageWideScreen({project}: {project: ProjectType}) {
    return <ProjectPageContentWideScreen project={project} />
}

export default function ProjectPage() {

  const { isNarrowScreen, isWideScreen } = useDeviceContext();
  const project = useProjectFromPathname();
  
  if (isNarrowScreen) {
    return <ProjectPageNarrowScreen project={project} />;
  }

  if (isWideScreen) {
    return <ProjectPageWideScreen project={project} />;
  }

  return <></>;
}