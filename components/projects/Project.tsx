'use client';

import Link from 'next/link';
import useBaseUrl from '@/hooks/useBaseUrl';
import ImageHover from '../utils/ImageHover';
import { ReactNode, useEffect } from 'react';
import resizeChineseText from '@/utils/resizeChineseText';
import ProjectType from '@/types/ProjectType';
import { usePathname } from 'next/navigation';
import useDeviceContext from "@/hooks/useDeviceContext";
import { textStyle } from '@/constants/text';
import { cva } from 'class-variance-authority';

const projectTextStyle = cva(
  "", {
  variants: {
    screen: {
      wide: "inline mr-10 leading-18 break-all text-opacity",
      narrow: "",
    },
    hoverable: {
      true: "hover:text-opacity-100 hover:text-pink-yakuza",
      false: ""
    },
    isDisable: {
      true: "",
      false: ""
    },
    isSelected: {
      true: "",
      false: ""
    }
  },
  compoundVariants : [
    {
      screen: "wide",
      isDisable: false,
      className: textStyle({ size: "xxxl", weight: "light" })
    },
    {
      screen: "wide",
      isDisable: true,
      className: textStyle({ size: "xxxl", weight: "light", opacity: "disabled", color: "base" })
    },
    {
      screen: "narrow",
      isDisable: false,
      isSelected: false,
      className: textStyle({ size: "micro", weight: "light" })
    },
    {
      screen: "narrow",
      isDisable: true,
      isSelected: false,
      className: textStyle({ size: "micro", weight: "light", opacity: "disabled" })
    },
    {
      screen: "narrow",
      isDisable: false,
      isSelected: true,
      className: textStyle({ size: "micro", weight: "light", color: "selected", opacity: "selected" })
    }
  ],
  defaultVariants: {
    screen: "narrow",
    hoverable: false,
    isDisable: false,
    isSelected: false,
  }
});

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
        <h1 className={projectTextStyle({ screen: "wide", isDisable: true })}>{project.name}</h1>
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
        <ProjectLink href={url.toString()}>
          <h1 className={projectTextStyle({ screen: "wide", hoverable: true })}>{project.name}</h1>
        </ProjectLink>
      </div>
  )
}

function ProjectNarrowScreen({ url, project }: { url: URL, project: ProjectType }) {

  const urlPathname = usePathname();
  const projectPathnameFromUrl = urlPathname.toString().split("/").pop();

  const isPathnameSameAsProjectPathname = projectPathnameFromUrl == project.pathname;
  // const isNoProjectSelected = project.id == 1 && urlPathname.toString() == "/";
  const isProjectHighlighted = isPathnameSameAsProjectPathname;

  
  useEffect(() => {
    resizeChineseText("text-[6px]")
  }, [project.id]);

  if (project.visibility == "private") {
    return (
      <p id={`project-${project.id}`} className={projectTextStyle({ screen: "narrow", isDisable: true })}>{project.name}</p>
    )
  }

  if (isProjectHighlighted) {
    return (
      <ProjectLink href={url.toString()}>
        <p className={projectTextStyle({ screen: "narrow", hoverable: true, isSelected: true })}>
          {project.name}
        </p>
      </ProjectLink>
    )
  }

  return (
    <ProjectLink href={url.toString()}>
      <p className={projectTextStyle({ screen: "narrow", hoverable: true })}>
        {project.name}
      </p>
    </ProjectLink>
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