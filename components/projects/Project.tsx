'use client';

import Link from 'next/link';
import useBaseUrl from '@/hooks/useBaseUrl';
import ImageHover from '../utils/ImageHover';
import { ReactNode, useEffect } from 'react';
import resizeChineseText from '@/utils/resizeChineseText';
import ProjectType from '@/types/ProjectType';
import { usePathname } from 'next/navigation';
import useDeviceContext from "@/hooks/useDeviceContext";


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

function ProjectWideScreen({ url, project }: { url: URL, project: ProjectType }) {

  useEffect(() => {
    resizeChineseText("text-[48px]")
  }, [project.id]);

  if (project.visibility == "private") {
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

function ProjectNarrowScreenText({children, project}: {children: ReactNode, project: ProjectType}) {
  const urlPathname = usePathname();
  const projectPathnameFromUrl = urlPathname.toString().split("/").pop();

  const isPathnameSameAsProjectPathname = projectPathnameFromUrl == project.pathname;
  // const isNoProjectSelected = project.id == 1 && urlPathname.toString() == "/";
  const isProjectHighlighted = isPathnameSameAsProjectPathname;

  if (isProjectHighlighted) {
    return (
      <p className="text-[6px] font-bright-grotesk-light text-[#f04ff0] opacity-100">
        {children}
      </p>
    )
  }

  return (
    <p className="text-[6px] font-bright-grotesk-light hover:text-[#f04ff0] opacity-[0.77] text-white">
      {children}
    </p>
  )
}

function ProjectNarrowScreen({ url, project }: { url: URL, project: ProjectType }) {
  
  useEffect(() => {
    resizeChineseText("text-[6px]")
  }, [project.id]);

  if (project.visibility == "private") {
    return (
      <div 
      id={`project-${project.id}`}
      className="project transition duration-500 ease-in-out opacity-80"
      >
        <div>
            <p className='text-[6px] font-bright-grotesk-light opacity-[0.5] text-white'>{project.name}</p>
        </div>
      </div>
    )
  }

  return (
      <div 
      id={`project-${project.id}`}
      className="project cursor-pointer transition duration-500 ease-in-out opacity-80 hover:opacity-100"
      >
        <div>
          <ProjectLink href={url.toString()}>
            <ProjectNarrowScreenText project={project}>{project.name}</ProjectNarrowScreenText>
          </ProjectLink>
        </div>
      </div>
  )
}

export default function Project({ project }: { project: ProjectType }) {    
    
    const baseUrl = useBaseUrl();
    const url = new URL("/projects/" + project.pathname, baseUrl);

    const { isWideScreen, isNarrowScreen } = useDeviceContext();
    
    if (isWideScreen) {
      return (
        <ProjectWideScreen url={url} project={project} />
      )
    }

    if (isNarrowScreen) {
      return (
        <ProjectNarrowScreen url={url} project={project} />
      );
    }

    return <></>

}
