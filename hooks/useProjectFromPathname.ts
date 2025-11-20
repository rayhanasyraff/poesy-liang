import { usePathname } from 'next/navigation';
import useGetProjects from './useGetProjects';

export function useProjectFromPathname() {

    const pathname = usePathname();
    const lowerPathname = pathname.toLowerCase();

    // Extract project path from URL (case-insensitive)
    // Supports both /projects/... and direct paths like /rtc/AIR
    let projectPath = '';

    if (lowerPathname.startsWith('/projects/')) {
        projectPath = pathname.slice('/projects/'.length);
    } else if (lowerPathname.startsWith('/rtc/')) {
        // For /rtc/AIR or /RTC/AIR routes
        projectPath = pathname.slice('/rtc/'.length);
    } else if (pathname.startsWith('/')) {
        // Remove leading slash for other direct paths
        projectPath = pathname.slice(1);
    }

    // Case-insensitive matching for project pathname
    const lowerProjectPath = projectPath.toLowerCase();
    const projects = useGetProjects();
    const project = projects.find((project) => project.pathname.toLowerCase() === lowerProjectPath);

    return project ?? null;
}
