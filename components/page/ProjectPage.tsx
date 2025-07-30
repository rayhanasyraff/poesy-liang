import ProjectType from "@/types/ProjectType";
import ClosePageButton from "../utils/ClosePageButton";
import dynamic from "next/dynamic";
import useResetOnPathChange from "@/hooks/useResetOnPathChange";
import { ResponsiveImage, ResponsiveButtonedImage } from '../utils/ResponsiveImage';
import { ResponsiveVideo } from '../utils/ResponsiveVideo';
import useDeviceContext from "@/hooks/useDeviceContext";
import { useProjectFromPathname } from "@/hooks/useProjectFromPathname";
import PageBaseLayout from "../layout/PageBaseLayout";
import PageBaseBodyLayout from "../layout/PageBaseBodyLayout";
import ImageType from "@/types/ImageType";
import usePageNavigator from "@/hooks/usePageNavigator";
import VideoType from "@/types/VideoType";
import { useEffect } from "react";

const PDFViewer = dynamic(() => import("../utils/PDFViewer/PDFViewer"), {
  ssr: false, // 👈 disables SSR for this component
});

function ProjectPageContentWithDocumentNarrowScreen({portfolio, className}: {portfolio: string, className?: string}) {
    return (
        <div className={`flex flex-2 flex-row ${className}`}>
            <PDFViewer file={portfolio} />
        </div>
    );
}

const ProjectPageContentWithClickableImageNarrowScreen = ({name, image, className}: {name: string, image: ImageType, className?: string}) => {

    // const { currentNavigatedId, navigateTo } = useProjectNavigationStore();

    // const isNavigated = currentNavigatedId === project.id;

    const { setPageNumber } = usePageNavigator();    
    const pageTarget = image.action?.behavior.target;

    function handleClick() {
        
        const navigateToAnotherPage = pageTarget?.type == "page";
        const navigateToLink = pageTarget?.type == "url";

        if (pageTarget?.pageId && navigateToAnotherPage) {
            setPageNumber(pageTarget?.pageId);
        }

        if (navigateToLink) {
            window.open(pageTarget?.targetUrl, "_blank");
        }
    }

    return (
        <div className={`flex flex-4 mr-10 flex-col gap-3 ${className}`}>
            <ResponsiveButtonedImage image={image.src} name={name} onClick={handleClick} />
            <div className="flex justify-center items-center">
                <p className="text-white font-bright-grotesk text-[13px] opacity-[0.77] text-center">tap for more</p>
            </div>
        </div>
    )
}

function ProjectPageContentWithImageNarrowScreen({image, name, className}: {image: ImageType, name: string, className?: string}) {

    const isImageClickable = image.action?.name == "click";

    if (isImageClickable) {
        return (
            <ProjectPageContentWithClickableImageNarrowScreen name={name} image={image} className={className} />
        )
    }

    return (
        <div className="flex flex-3 mr-10 flex-col">
            <ResponsiveImage image={image.src} name={name} className={className} />
        </div>
    );
}

function ProjectPageContentNarrowScreen({project, className}: {project: ProjectType, className?: string}) {
    
    const isReady = useResetOnPathChange(); // ← move it here
    
    const { pageNumber } = usePageNavigator();
    const page = project.contentPages[pageNumber - 1]?? project.contentPages?.[0];

    if (!isReady) return null;

    if (page.portfolio) {
        return <ProjectPageContentWithDocumentNarrowScreen portfolio={page.portfolio} className={className} />
    }

    if (page.images) {
        return <ProjectPageContentWithImageNarrowScreen image={page.images[0]} name={project.name} className={className} />
    }

    return (<></>);
}

function ProjectPageContentNarrowScreenWithVideoOnInitialFullscreen({video}: {video: VideoType}) {
    return (
        <div className="flex flex-1 flex-row">
            <div className="flex flex-1 flex-col justify-center min-h-screen">
                <div className="flex flex-col gap-10 items-center">
                    <ResponsiveVideo 
                    video={video.src}
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

    const { pageNumber } = usePageNavigator();
    const page = project.contentPages[pageNumber - 1]?? project.contentPages?.[0];

    if (page.videos) {
        return (
            <ProjectPageContentNarrowScreenWithVideoOnInitialFullscreen video={page.videos[0]} />
        )
    }
    
    return (
        <PageBaseLayout>
            <PageBaseBodyLayout>
                <ProjectPageContentNarrowScreen project={project} className="mr-10" />
            </PageBaseBodyLayout>
        </PageBaseLayout>
    )
}

function ProjectPageContentWithClickableImageWideScreen({name, image}: {name: string, image: ImageType}) {
       
    const { setPageNumber } = usePageNavigator();    
    const pageTarget = image.action?.behavior.target;

    function handleClick() {
        
        const navigateToAnotherPage = pageTarget?.type == "page";
        const navigateToLink = pageTarget?.type == "url";

        if (pageTarget?.pageId && navigateToAnotherPage) {
            setPageNumber(pageTarget?.pageId);
        }

        if (navigateToLink) {
            window.open(pageTarget?.targetUrl, "_blank");
        }
    }

    return (
        <div className="flex flex-1 flex-col justify-center">
            <div className="flex flex-1 flex-col justify-center min-h-screen">
                <div className="flex flex-col gap-10 items-center">
                    <ResponsiveButtonedImage image={image.src} name={name} onClick={handleClick} />
                    <div className="flex justify-center items-center">
                        <p className="text-white font-bright-grotesk-light text-2xl opacity-[0.77]">tap for more</p>
                    </div>
                </div>
                <ClosePageButton />
            </div>
        </div>
    )
}

function ProjectPageContentWithDocumentWideScreen({portfolio}: {portfolio: string}) {
    return (
        <div className="flex flex-1 flex-row">
            <PDFViewer file={portfolio} />
            <ClosePageButton />
        </div>
    );
}

function ProjectPageContentWithVideoWideScreen({video}: {video: VideoType}) {
    return (
        <div className="relative">
            <ClosePageButton />
            <div className="flex flex-1 flex-row">
                <div className="flex flex-1 flex-col justify-center min-h-screen">
                <div className="flex flex-col gap-10 items-center">
                    <ResponsiveVideo video={video.src} isFullscreen />
                </div>
                </div>
            </div>
        </div>
    )
}

function ProjectPageContentWithImageWideScreen({name, image}: {name: string, image: ImageType}) {

    const isImageClickable = image.action?.name == "click";

    if (isImageClickable) {
        return (
            <ProjectPageContentWithClickableImageWideScreen name={name} image={image} />
        )
    }

    return (
        <div className="flex flex-1 flex-row">
            <div className="flex flex-1 flex-col justify-center min-h-screen">
                <div className="flex flex-col gap-10 items-center">
                    <ResponsiveImage image={image.src} name={name} />
                </div>
            </div>
            <ClosePageButton />
        </div>
    )     
}

function ProjectPageContentWideScreen({project}: {project: ProjectType}) {
    
    const isReady = useResetOnPathChange();
    
    const { pageNumber } = usePageNavigator();
    const page = project.contentPages[pageNumber - 1]?? project.contentPages?.[0];

    if (!isReady) return null;

    if (page.portfolio) {
        return (
            <ProjectPageContentWithDocumentWideScreen portfolio={page.portfolio} />
        )
    }

    if (page.images) {    
        return (
            <ProjectPageContentWithImageWideScreen name={project.name} image={page.images[0]} />
        )     
    }

    if (page.videos) {     
        return (
            <ProjectPageContentWithVideoWideScreen video={page.videos[0]} />
        )
    }

    return (<></>)
}

function ProjectPageWideScreen({project}: {project: ProjectType}) {
    return <ProjectPageContentWideScreen project={project} />
}

export default function ProjectPage() {

  const { isNarrowScreen, isWideScreen } = useDeviceContext();
  const project = useProjectFromPathname();
  
  const { setPageNumber } = usePageNavigator();

    useEffect(() => {

        if (project?.contentPages?.length > 0) {
            setPageNumber(1); // Only reset if valid
        }

    }, [project?.contentPages?.length, project.id, setPageNumber]);

    if (isNarrowScreen) {
        return <ProjectPageNarrowScreen project={project} />;
    }

    if (isWideScreen) {
        return <ProjectPageWideScreen project={project} />;
    }

    return <></>;
}