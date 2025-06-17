import Link from 'next/link';
import ProjectImage from './project-image';
import Image from 'next/image';

export interface Project {
    id: number;
    pathname: string;
    category: string;
    description: string;
    name: string;
    image: string;
    portfolio: string;
}

function Project({ project }: { project:Project}) {    
    const url = new URL(
      "/projects/" + project.name.toLowerCase().replace(/\s/g, "-").replace(/\'/g, ""), 
      process.env.NODE_ENV === "production" ? process.env.URL : "http://localhost:3000");

    return (
      <div 
      id={`${project.id}`}
      className="max-md:flex max-md:flex-col max-md:text-center max-md:items-center md:inline mr-10 "
      >
        <ProjectImage 
        id={project.id}
        name={project.name} 
        img={project.image} 
        />

        <div
        className='md:inline'
        id="project-name"
        >
         <Link 
         className="max-md:flex max-md:flex-col max-md:items-center md:inline md:break-all max-md:text-[40px] max-md:opacity-80 md:text-[50px] md:opacity-20 md:hover:opacity-80 cursor-pointer font-bright-grotesk-light md:transition md:duration-500 md:ease-in-out"
         href={url.toString()}
         >
          <div
          className='md:hidden max-md:bg-white max-md:w-140 max-md:h-100 max-md:flex max-md:items-center max-md:justify-center max-md:hover:contrast-150 max-md:transition max-md:duration-500 max-md:ease-in-out'
          >
            <Image 
            src={project.image} 
            alt={project.name}
            width={300}
            height={300}
            className=''
            ></Image>
          </div>
          <div className='md:hidden max-md:my-10'>
            <p className='md:hidden max-md:text-xl'>{project.category}</p>
            <h1 className='md:inline'>{project.name}</h1>
            <p className='md:hidden max-md:text-xl max-md:mt-5'>{project.description}</p>
          </div>

          <h1 className='max-md:hidden md:inline'>{project.name}</h1>
         </Link>

        </div>
      </div>
    );
}

export default function ProjectsList( { projectsList }: { projectsList: Project[] } ) {
    return (
      <div className="mt-10 mx-10">  
        {projectsList.map((project, i) => (
          <Project project={project} key={i} />
        ))}
      </div>
    );
}
    