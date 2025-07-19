"use client"

import ProjectList from "../projects/ProjectList";
import AboutPage from "./AboutPage";
import PageBaseLayout from "../layout/PageBaseLayout";
import useNavigateToPage from "@/hooks/useNavigateToAnotherPage";
import useDeviceContext from "@/hooks/useDeviceContext";
import { usePathname } from "next/navigation";
import useNavigateToAnotherPage from "@/hooks/useNavigateToAnotherPage";

const HomePageBody = () => {
    return <ProjectList />;
}

export default function HomePage() {
  
    const navigateToAnotherPage = useNavigateToAnotherPage((state) => state.navigateToAnotherPage);
    const setNavigateToPage = useNavigateToPage((state) => state.setNavigateToAnotherPage);

    const { isNarrowScreen, isWideScreen } = useDeviceContext();

    const pathname = usePathname();
    
    const navigateToAboutPage = (navigateToAnotherPage && isWideScreen) || (isNarrowScreen && pathname === "/");

    if (navigateToAboutPage) {
        return <AboutPage />;
    }

    return (
      <PageBaseLayout onNavigate={() => setNavigateToPage(true)}>
        <HomePageBody />
      </PageBaseLayout>
    );
}
        