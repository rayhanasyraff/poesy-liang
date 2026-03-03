import data from "@/data/projects.json";
import ProjectType from "@/types/ProjectType";

const DEFAULT_IMAGE = "/assets/images/poesy-logo-pink.png";

// This will persist across the entire app lifecycle (during runtime)
let cachedSortedProjects: ProjectType[] | null = null;

function sortProjectsLatestFirstWithDefaultImageLast(projects: ProjectType[]): ProjectType[] {
  const priority = ["air", "blog", "yck", "the-rooftop-cat"];

  // Apply priority first (lower index => higher priority), then date desc, then order desc, then id desc
  return projects.slice().sort((a, b) => {
    const pa = priority.indexOf((a.pathname ?? '').toLowerCase());
    const pb = priority.indexOf((b.pathname ?? '').toLowerCase());
    const rankA = pa === -1 ? 100000 : pa;
    const rankB = pb === -1 ? 100000 : pb;
    if (rankA !== rankB) return rankA - rankB;

    const da = parseInt(a.date ?? '0', 10) || 0;
    const db = parseInt(b.date ?? '0', 10) || 0;
    if (db !== da) return db - da;
    const oa = a.order ?? 0;
    const ob = b.order ?? 0;
    if (ob !== oa) return ob - oa;
    return (b.id ?? 0) - (a.id ?? 0);
  });
}

export default function useGetProjects(): ProjectType[] {
  if (!cachedSortedProjects) {
    cachedSortedProjects = sortProjectsLatestFirstWithDefaultImageLast(data);
  }

  return cachedSortedProjects;
}
