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
import Spinner from "../utils/Spinner";
import { notFound } from "next/navigation";
import TextDocumentViewer from "../utils/TextDocumentViewer";
import PressReleases from "./PressReleases";

const PDFViewer = dynamic(() => import("../utils/PDFViewer/PDFViewer"), {
  ssr: false,
});

function ProjectPageContentWithDocumentNarrowScreen({portfolio, text, className}: {portfolio: string | string[], text?: string, className?: string}) {
    return (
        <div className={`flex flex-1 flex-col h-screen overflow-y-auto ${className}`}>
            <div className="flex flex-col gap-3">
                {(!portfolio && text) && <div className="flex-1"><TextDocumentViewer text={text} /></div>}
                <div className="flex-1">
                    <PDFViewer file={portfolio} />
                </div>
            </div>
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
        <div className={`flex flex-4 flex-col gap-3 ${className}`}>
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
        <div className="flex flex-3 flex-col">
            <ResponsiveImage image={image.src} name={name} className={className} />
        </div>
    );
}

function ProjectPageTextBlock({ text }: { text: string }) {
    const paragraphs = text.split("\n\n");
    return (
        <div className="flex flex-col gap-4 overflow-y-auto">
            {paragraphs.map((p, i) => (
                <p key={i} className="text-white font-bright-grotesk text-[13px] leading-relaxed opacity-90">{p}</p>
            ))}
        </div>
    );
}

function ProjectPageContentWithImageAndTextNarrowScreen({image, name, text, className}: {image: ImageType, name: string, text: string, className?: string}) {
    const { setPageNumber } = usePageNavigator();
    const pageTarget = image.action?.behavior.target;
    const isClickable = image.action?.name == "click";

    function handleClick() {
        const navigateToAnotherPage = pageTarget?.type == "page";
        const navigateToLink = pageTarget?.type == "url";
        if (pageTarget?.pageId && navigateToAnotherPage) setPageNumber(pageTarget?.pageId);
        if (navigateToLink) window.open(pageTarget?.targetUrl, "_blank");
    }

    const paragraphs = text.split("\n\n");

    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            <div className="flex flex-col gap-2">
                {isClickable ? (
                    <>
                        <ResponsiveButtonedImage image={image.src} name={name} onClick={handleClick} scale={60} />
                        <div className="flex justify-center items-center">
                            <p className="text-white font-bright-grotesk text-[11px] opacity-[0.77] text-center">tap for more</p>
                        </div>
                    </>
                ) : (
                    <ResponsiveImage image={image.src} name={name} scale={60} />
                )}
            </div>
            <div className="flex-1 pb-10 flex flex-col gap-2 px-4">
                {paragraphs.map((p, i) => (
                    <p key={i} className="text-white font-bright-grotesk text-[9px] leading-relaxed opacity-90">{p}</p>
                ))}
            </div>
        </div>
    );
}
function ProjectPageContentNarrowScreen({project, className}: {project: ProjectType, className?: string}) {

    const isReady = useResetOnPathChange(); // ← move it here

    const { pageNumber, setPageNumber } = usePageNavigator();
    const page = project.contentPages[pageNumber - 1]?? project.contentPages?.[0];

    if (!isReady) return <Spinner size="md" />;

    if (page.pressReleases) {
        return <PressReleases pressReleases={page.pressReleases} />
    }

    if (page.portfolio) {
        return <ProjectPageContentWithDocumentNarrowScreen portfolio={page.portfolio} text={page.text} className={className} />
    }

    if (page.images && page.text) {
        const portfolioIndex = project.contentPages?.findIndex((p) => !!p.portfolio) ?? -1;
        if (portfolioIndex !== -1) {
            return (
                <div className="relative">
                    <ProjectPageContentWithImageAndTextNarrowScreen image={page.images[0]} name={project.name} text={page.text} className={className} />
                    <div className="px-4 pb-6 flex justify-center">
                        <button
                            className="font-bright-grotesk text-[11px] tracking-widest uppercase px-4 py-1.5 border border-white/30 text-white/70 hover:text-white hover:border-white rounded-sm transition-colors"
                            onClick={() => setPageNumber(portfolioIndex + 1)}
                        >
                            View Document
                        </button>
                    </div>
                </div>
            );
        }

        return <ProjectPageContentWithImageAndTextNarrowScreen image={page.images[0]} name={project.name} text={page.text} className={className} />
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
                <ProjectPageContentNarrowScreen project={project} />
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

function ProjectPageContentWithDocumentWideScreen({portfolio, text}: {portfolio: string | string[], text?: string}) {
    return (
        <div className="flex flex-1 flex-col h-screen overflow-y-auto">
            <div className="flex flex-col gap-3">
                {(!portfolio && text) && <div className="flex-1"><TextDocumentViewer text={text} /></div>}
                <div className="flex-1">
                    <PDFViewer file={portfolio} />
                </div>
            </div>
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

function ProjectPageContentWithImageAndTextWideScreen({name, image, text}: {name: string, image: ImageType, text: string}) {
    const paragraphs = text.split("\n\n");
    const { setPageNumber } = usePageNavigator();
    const pageTarget = image.action?.behavior.target;

    function handleClick() {
        const navigateToAnotherPage = pageTarget?.type == "page";
        const navigateToLink = pageTarget?.type == "url";
        if (pageTarget?.pageId && navigateToAnotherPage) setPageNumber(pageTarget?.pageId);
        if (navigateToLink) window.open(pageTarget?.targetUrl, "_blank");
    }

    const isClickable = image.action?.name == "click";

    return (
        <div className="flex flex-1 flex-row min-h-screen">
            <div className="flex flex-1 flex-col justify-center items-center gap-10">
                {isClickable ? (
                    <>
                        <ResponsiveButtonedImage image={image.src} name={name} onClick={handleClick} />
                        <div className="flex justify-center items-center">
                            <p className="text-white font-bright-grotesk-light text-2xl opacity-[0.77]">tap for more</p>
                        </div>
                    </>
                ) : (
                    <ResponsiveImage image={image.src} name={name} />
                )}
            </div>
            <div className="flex flex-1 flex-col justify-center overflow-y-auto px-10 max-h-screen gap-4">
                {paragraphs.map((p, i) => (
                    <p key={i} className="text-white font-bright-grotesk text-[15px] leading-relaxed opacity-90">{p}</p>
                ))}
            </div>
            <ClosePageButton />
        </div>
    );
}

function ProjectPageContentWideScreen({project}: {project: ProjectType}) {

    const isReady = useResetOnPathChange();

    const { pageNumber, setPageNumber } = usePageNavigator();
    const page = project.contentPages[pageNumber - 1]?? project.contentPages?.[0];

    if (!isReady) return <Spinner size="lg" />;

    if (page.pressReleases) {
        return <PressReleases pressReleases={page.pressReleases} />
    }

    if (page.portfolio) {
        return (
            <ProjectPageContentWithDocumentWideScreen portfolio={page.portfolio} text={page.text} />
        )
    }

    if (page.images && page.text) {
        const portfolioIndex = project.contentPages?.findIndex((p) => !!p.portfolio) ?? -1;
        if (portfolioIndex !== -1) {
            return (
                <div className="relative">
                    <ProjectPageContentWithImageAndTextWideScreen name={project.name} image={page.images[0]} text={page.text} />
                    <div className="absolute top-6 right-10">
                        <button
                            className="font-bright-grotesk text-[11px] tracking-widest uppercase px-4 py-1.5 border border-white/30 text-white/70 hover:text-white hover:border-white rounded-sm transition-colors"
                            onClick={() => setPageNumber(portfolioIndex + 1)}
                        >
                            View Document
                        </button>
                    </div>
                </div>
            )
        }

        return (
            <ProjectPageContentWithImageAndTextWideScreen name={project.name} image={page.images[0]} text={page.text} />
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

  // Show 404 if project not found
  if (!project) {
    notFound();
  }

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

  return <Spinner size="lg" />;
}