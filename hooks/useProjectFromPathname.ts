import { usePathname } from 'next/navigation';
import useGetProjects from './useGetProjects';

export function useProjectFromPathname() {

    const pathname = usePathname();

    // Extract project path from URL
    // Supports both /projects/... and direct paths like /rtc/AIR
    let projectPath = pathname;

    if (pathname.startsWith('/projects/')) {
        projectPath = pathname.replace('/projects/', '');
    } else if (pathname.startsWith('/rtc/')) {
        // For /rtc/AIR routes, extract just the path after /rtc/
        projectPath = pathname.replace('/rtc/', '');
    } else if (pathname.startsWith('/')) {
        // Remove leading slash for other direct paths
        projectPath = pathname.slice(1);
    }

    const projects = useGetProjects();
    const project = projects.find((project) => project.pathname === projectPath) ?? projects[0];

    return project;
}
