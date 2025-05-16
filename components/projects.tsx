"use client"

import Image from 'next/image'
import { useEffect } from 'react';

export interface Project {
    id: number;
    name: string;
    image: string;
    portfolio: string;
}

function ProjectImage({ id, name, img }: { id: number, name: string, img: string }) {

  useEffect(() => {
    
    document.addEventListener('mousemove', function(e) {
      const image = document.getElementById(`image-${id}`);
      const project = document.getElementById(`${id}`);

      if (project !== null && image !== null) {

        if (project.matches(':hover')) {
          image.className = "absolute";
          image.style.left = e.pageX + 'px';
          image.style.top = e.pageY + 40 + 'px';
        } else {
          image.className = "absolute invisible";
        }
      }
    });
  
  }, [])
  

  return (
      <Image
      src={img}
      width={250}
      height={250}
      alt={name}
      className="absolute invisible"
      id={`image-${id}`}
      />
  )
}

function Project({ project }: { project:Project}) {
    return (
      <div id={`${project.id}`}>
        <div 
        className="text-3xl hover:opacity-50 cursor-pointer"
        id="project-name"
        >
         <h1>{project.name}</h1>
        </div>
        <ProjectImage 
        id={project.id}
        name={project.name} 
        img={project.image} />
      </div>
    );
}

export default function ProjectsList( { projectsList }: { projectsList: Project[] } ) {
    return (
      <div className="flex ml-10 mt-9 justify-center gap-15 flex-wrap">
        {projectsList.map((project, i) => (
          <Project project={project} key={i} />
        ))}
      </div>
    );
}
    