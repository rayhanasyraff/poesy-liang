'use client';

import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import useBaseUrl from '@/hooks/useBaseUrl';
import ImageHover from '../utils/ImageHover';
import { useEffect } from 'react';
import resizeChineseText from '@/utils/resizeChineseText';
// import hoverPopupProjectListMobile from '@/utils/animation/hoverPopupProjectListMobile';

export interface ProjectType {
    id: number;
    date: string;
    pathname: string;
    category: string;
    description: string;
    name: string;
    image: string;
    portfolio: string;
    country: string;
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
        img={project.image} 
        />

        <div
        className='inline'
        id="project-name"
        >
        <Link 
        className="inline cursor-pointer font-bright-grotesk-light transition duration-500 ease-in-out opacity-80 hover:opacity-100"
        href={url.toString()}
        >
          <h1 className='text-6xl opacity-[0.77] hover:opacity-100 text-white hover:text-[#f04ff0] leading-18 inline break-all mr-10'>{project.name}</h1>
        </Link>
        </div>
      </div>
  )
}

function ProjectMobile({ url, project }: { url: URL, project: ProjectType }) {
  
  useEffect(() => {

    // hoverPopupProjectListMobile();
    resizeChineseText("text-[10px]")
  }, [project.id]);
  
  return (
      <div 
      id={`project-${project.id}`}
      className="project inline cursor-pointer font-bright-grotesk-light transition duration-500 ease-in-out opacity-80 hover:opacity-100"
      >
        <div>
          <Link href={url.toString()}>
            <p className='text-[10px] opacity-[0.77] hover:opacity-100 text-white hover:text-[#f04ff0]'>{project.name}</p>
          </Link>
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
