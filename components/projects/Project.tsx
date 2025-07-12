'use client';

import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import useBaseUrl from '@/hooks/useBaseUrl';
import ImageHover from '../utils/ImageHover';
import { ReactNode, useEffect } from 'react';
import resizeChineseText from '@/utils/resizeChineseText';

export interface ProjectType {
    id: number;
    date: string;
    pathname: string;
    category: string[];
    tags: string[];
    description: string;
    name: string;
    thumbnailImage: string[];
    contentImage: string[];
    contentPortfolio?: string;
    contentVideo?: string[];
    location?: string[];
    linkRedirect?: string;
}

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

  return (
      <div 
      id={`project-${project.id}`}
      className="project inline"
      >
        <ImageHover
        id={project.id}
        name={project.name} 
        img={project.thumbnailImage[0]} 
        />

        <div
        className='inline'
        id="project-name"
        >
          <ProjectLink 
          className="inline cursor-pointer font-bright-grotesk-light transition duration-500 ease-in-out opacity-80 hover:opacity-100"
          href={project.linkRedirect??  url.toString()}
          >
            <h1 className='text-6xl opacity-[0.77] hover:opacity-100 text-white hover:text-[#ff009f] leading-18 inline break-all mr-10'>{project.name}</h1>
          </ProjectLink>
        </div>
      </div>
  )
}

function ProjectMobile({ url, project }: { url: URL, project: ProjectType }) {
  
  useEffect(() => {
    resizeChineseText("text-[10px]")
  }, [project.id]);
  
  return (
      <div 
      id={`project-${project.id}`}
      className="project inline cursor-pointer font-bright-grotesk-light transition duration-500 ease-in-out opacity-80 hover:opacity-100"
      >
        <div>
          <ProjectLink href={project.linkRedirect??  url.toString()}>
            <p className='text-[10px] opacity-[0.77] hover:opacity-100 text-white hover:text-[#ff009f]'>{project.name}</p>
          </ProjectLink>
        </div>
      </div>
  )
}

export default function Project({ project }: { project: ProjectType }) {    
    
    const baseUrl = useBaseUrl();

    const url = new URL(
      "/projects/" + project.pathname, 
      baseUrl);

    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    
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
