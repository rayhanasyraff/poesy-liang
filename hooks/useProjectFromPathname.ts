import { usePathname } from 'next/navigation';
import useGetProjects from './useGetProjects';

export function useProjectFromPathname() {

    const pathname = usePathname();
    // Extract everything after /projects/ to support nested paths like rtc/AIR
    const projectPath = pathname.replace('/projects/', '');

    const projects = useGetProjects();
    const project = projects.find((project) => project.pathname === projectPath) ?? projects[0];

    return project;
}
