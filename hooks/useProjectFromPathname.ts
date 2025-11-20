import { usePathname } from 'next/navigation';
import useGetProjects from './useGetProjects';

export function useProjectFromPathname() {

    const pathname = usePathname();

    // Extract project path from URL
    // Supports both /projects/... and direct paths like /rtc/AIR
    let projectPath = pathname;

    if (pathname.startsWith('/projects/')) {
        projectPath = pathname.replace('/projects/', '');
    } else if (pathname.startsWith('/RTC/')) {
        // For /RTC/AIR routes, extract path after /RTC/ and lowercase to match pathname
        projectPath = pathname.replace('/RTC/', '').toLowerCase();
    } else if (pathname.startsWith('/')) {
        // Remove leading slash for other direct paths
        projectPath = pathname.slice(1);
    }

    const projects = useGetProjects();
    const project = projects.find((project) => project.pathname === projectPath);

    return project ?? null;
}
