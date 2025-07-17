'use client';

import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import useBaseUrl from '@/hooks/useBaseUrl';
import ImageHover from '../utils/ImageHover';
import { ReactNode, useEffect } from 'react';
import resizeChineseText from '@/utils/resizeChineseText';
import { ProjectType } from '@/types/ProjectType';
import { desktopSize, mobileSize } from '@/constants/screenSize';
import { usePathname } from 'next/navigation';

function ProjectLink({href, className, children}: {href: string, className?: string, children: ReactNode}) {

  if (href.startsWith("https://www.youtube.com/")) {
    <button 
    onClick={() => {
      const videoUrl = href;
      const win = window.open(videoUrl, "_blank");

      if (win) {
        win.focus();
      } else {
        alert("Please allow popups for this site.");
      }
    }}
    className={className}>
      {children}
    </button>
  }

  return (
    <Link 
    href={href}
    className={className}>
      {children}
    </Link>
  )

}

function ProjectDesktop({ url, project }: { url: URL, project: ProjectType }) {

  useEffect(() => {
    resizeChineseText("text-[48px]")
  }, [project.id]);

  if (project.contentVideo && project.contentVideo[0].src) {
    return (
      <div 
      id={`project-${project.id}`}
      className="project inline"
      >
        <ImageHover
        id={project.id}
        name={project.name} 
        img={project.thumbnailImage[0].src}
        width={project.thumbnailImage[0].width}
        height={project.thumbnailImage[0].height} 
        />

        <div
        className='inline'
        id="project-name"
        >
          <ProjectLink 
          className="inline cursor-pointer transition duration-500 ease-in-out opacity-80 hover:opacity-100"
          href={url.toString()}
          >
            <h1 className='text-6xl opacity-[0.77] font-bright-grotesk-light hover:opacity-100 text-white hover:text-[#f04ff0] leading-18 inline break-all mr-10'>{project.name}</h1>
          </ProjectLink>
        </div>
      </div>
    )
  }

  if (project.contentImage && project.contentImage[0].src == "/assets/images/poesy-logo-pink.png") {
    return (
      <div 
      id={`project-${project.id}`}
      className="project inline"
      >
        <div
        className='inline'
        id="project-name"
        >
          <h1 className='text-6xl opacity-[0.3] font-bright-grotesk-light text-white leading-18 inline break-all mr-10'>{project.name}</h1>
        </div>
      </div>
    )
  }

  return (
      <div 
      id={`project-${project.id}`}
      className="project inline"
      >
        <ImageHover
        id={project.id}
        name={project.name} 
        img={project.thumbnailImage[0].src}
        width={project.thumbnailImage[0].width}
        height={project.thumbnailImage[0].height} 
        />

        <div
        className='inline'
        id="project-name"
        >
          <ProjectLink 
          className="inline cursor-pointer transition duration-500 ease-in-out opacity-80 hover:opacity-100"
          href={url.toString()}
          >
            <h1 className='text-6xl opacity-[0.77] font-bright-grotesk-light hover:opacity-100 text-white hover:text-[#f04ff0] leading-18 inline break-all mr-10'>{project.name}</h1>
          </ProjectLink>
        </div>
      </div>
  )
}

function ProjectMobileText({children, project}: {children: ReactNode, project: ProjectType}) {
  const urlPathname = usePathname();
  const projectPathnameFromUrl = urlPathname.toString().split("/").pop();

  const isPathnameSameAsProjectPathname = projectPathnameFromUrl == project.pathname;
  // const isNoProjectSelected = project.id == 1 && urlPathname.toString() == "/";
  const isProjectHighlighted = isPathnameSameAsProjectPathname;

  if (isProjectHighlighted) {
    return (
      <p className="text-[10px] font-bright-grotesk-light text-[#f04ff0] opacity-100">
        {children}
      </p>
    )
  }

  return (
    <p className="text-[10px] font-bright-grotesk-light opacity-[0.77] text-white">
      {children}
    </p>
  )
}

function ProjectMobile({ url, project }: { url: URL, project: ProjectType }) {
  
  useEffect(() => {
    resizeChineseText("text-[10px]")
  }, [project.id]);
  
  if (project.contentVideo && project.contentVideo[0].src) {
    return (
      <div 
      id={`project-${project.id}`}
      className="project inline cursor-pointer transition duration-500 ease-in-out opacity-80 hover:opacity-100"
      >
        <div>
          <ProjectLink href={url.toString()}>
            <ProjectMobileText project={project}>{project.name}</ProjectMobileText>
          </ProjectLink>
        </div>
      </div>
    )
  }

  if (project.contentImage[0].src == "/assets/images/poesy-logo-pink.png") {
    return (
      <div 
      id={`project-${project.id}`}
      className="project inline transition duration-500 ease-in-out opacity-80"
      >
        <div>
            <p className='text-[10px] font-bright-grotesk-light opacity-[0.5] text-white'>{project.name}</p>
        </div>
      </div>
    )
  }

  return (
      <div 
      id={`project-${project.id}`}
      className="project inline cursor-pointer transition duration-500 ease-in-out opacity-80 hover:opacity-100"
      >
        <div>
          <ProjectLink href={url.toString()}>
            <ProjectMobileText project={project}>{project.name}</ProjectMobileText>
          </ProjectLink>
        </div>
      </div>
  )
}

export default function Project({ project }: { project: ProjectType }) {    
    
    const baseUrl = useBaseUrl();
    const url = new URL("/projects/" + project.pathname, baseUrl);

    const isDesktop = useMediaQuery({ query: desktopSize });
    const isMobile = useMediaQuery({ query: mobileSize });
    
    if (isDesktop) {
      return (
        <ProjectDesktop url={url} project={project} />
      )
    }

    if (isMobile) {
      return (
        <ProjectMobile url={url} project={project} />
      );
    }

    return <></>

}
