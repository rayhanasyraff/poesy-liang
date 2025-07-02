'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import useBaseUrl from '@/hooks/useBaseUrl';
import ImageHover from '../utils/ImageHover';

export interface ProjectType {
    id: number;
    pathname: string;
    category: string;
    description: string;
    name: string;
    image: string;
    portfolio: string;
}

function ProjectDesktop({ url, project }: { url: URL, project: ProjectType }) {
  return (
      <div 
      id={`${project.id}`}
      className="inline"
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
        className="inline opacity-20 hover:opacity-80 cursor-pointer font-bright-grotesk-light transition duration-500 ease-in-out"
        href={url.toString()}
        >
          <h1 className='text-6xl leading-18 inline break-all mr-10'>{project.name}</h1>
        </Link>
        </div>
      </div>
  )
}


function ImageMobile({ project }: { project: ProjectType }) {

  return (
    <Image 
    src={project.image}
    width={300}
    height={300}
    alt={project.name}
    />
  )

  // const isImageExist = useCheckImage(project.image);


  // if (isImageExist) {
  //   return (
  //     <Image 
  //     src={project.image}
  //     width={300}
  //     height={300}
  //     alt={project.name}
  //     />
  //   )
  // }

  // return (
  //   <div className='bg-gray-300 w-[500px] h-[300px]'>
  //   </div>
  // )
  
}

function ProjectMobile({ url, project }: { url: URL, project: ProjectType }) {
  return (
      <div 
      id={`${project.id}`}
      className="flex flex-col text-center items-center"
      >
        <div id="project-name">
          <Link 
          className="opacity-80 hover:opacity-100 cursor-pointer font-bright-grotesk-light transition duration-500 ease-in-out"
          href={url.toString()}
          >
            <div
            className="flex flex-col items-center"
            >
              <ImageMobile project={project} />
            </div>
            <div className='my-10'>
              <p className='text-sm'>{project.category}</p>
              <h1 className='text-3xl'>{project.name}</h1>
              <p  className="mt-5 text-sm">{project.description}</p>
            </div>
          </Link>
        </div>
      </div>
  )
}

export default function Project({ project }: { project: ProjectType }) {    
    
    const baseUrl = useBaseUrl();

    const url = new URL(
      "/projects/" + project.name.toLowerCase().replace(/\s/g, "-").replace(/\'/g, ""), 
      baseUrl);

    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
    
    if (isDesktop) {
      return (
        <ProjectDesktop url={url} project={project} />
      )
    }

    return (
      <ProjectMobile url={url} project={project} />
    );
}
