import { ProjectType } from '@/types/ProjectType';
import { usePathname } from 'next/navigation';

export function useProjectFromPathname(data: ProjectType[]) {
    const pathname = usePathname();
    const segments = pathname.split("/");
    const result = segments.pop() || segments.pop();
    const project = data.find((project) => project.pathname === result) ?? data[0];

  return project;
}
