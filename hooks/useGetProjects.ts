import data from "@/data/projects.json";
import ProjectType from "@/types/ProjectType";

const DEFAULT_IMAGE = "/assets/images/poesy-logo-pink.png";

// This will persist across the entire app lifecycle (during runtime)
let cachedSortedProjects: ProjectType[] | null = null;

function sortProjectsLatestFirstWithDefaultImageLast(projects: ProjectType[]): ProjectType[] {
  // Primary: order ascending (smaller numbers first). Missing order treated as very large number.
  // Secondary: date descending (latest first). Tertiary: id descending.
  return projects.slice().sort((a, b) => {
    const oa = typeof a.order === 'number' ? a.order : 100000;
    const ob = typeof b.order === 'number' ? b.order : 100000;
    if (oa !== ob) return oa - ob;

    const da = parseInt(a.date ?? '0', 10) || 0;
    const db = parseInt(b.date ?? '0', 10) || 0;
    if (db !== da) return db - da;

    return (b.id ?? 0) - (a.id ?? 0);
  });
}

export default function useGetProjects(): ProjectType[] {
  if (!cachedSortedProjects) {
    cachedSortedProjects = sortProjectsLatestFirstWithDefaultImageLast(data);
  }

  return cachedSortedProjects;
}
