import React from "react";
import { Project } from "./projects";
import Link from "next/link";
import Image from 'next/image';
import dynamic from "next/dynamic";
export default function ProjectModal ({ project }: { project:Project }) {

const PDFViewer = dynamic(() => import('@/components/PDFViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-5xl">Loading...</h1>
    </div>
  ),
})

  return (
        <div className="flex flex-col bg-black">
            <div className="fixed top-0 left-0 z-100">
                <Link href="/" className="white">
                <Image
                src="/assets/images/back-arrow.svg"
                width={80}
                height={80}
                className="cursor-pointer"
                alt="back-arrow"
                />
              </Link>
            </div>
            <PDFViewer file={project.portfolio} />
        </div>
	);
};
