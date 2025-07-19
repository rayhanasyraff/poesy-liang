import { usePathname } from 'next/navigation';
import useGetProjects from './useGetProjects';

export function useProjectFromPathname() {

    const pathname = usePathname();
    const segments = pathname.split("/");
    const result = segments.pop() || segments.pop();

    const projects = useGetProjects();
    const project = projects.find((project) => project.pathname === result) ?? projects[0];

    return project;
}
