"use client"

import Header from "@/components/base/Header";
import ProjectsPage from "@/components/page/ProjectsPage";

export default function Home() {

    return (
      <div className="flex flex-col">
        <Header />
        <ProjectsPage />
      </div>
    );
}
        