import data from "@/data/projects.json";
import { ProjectType } from "@/types/ProjectType";

const DEFAULT_IMAGE = "/assets/images/poesy-logo-pink.png";

// This will persist across the entire app lifecycle (during runtime)
let cachedSortedProjects: ProjectType[] | null = null;

function sortProjectsRandomlyWithDefaultImageLast(projects: ProjectType[]): ProjectType[] {
  const withCustomImage = projects.filter(
    (p) => p.contentImage[0]?.src !== DEFAULT_IMAGE
  );

  const withDefaultImage = projects.filter(
    (p) => p.contentImage[0]?.src === DEFAULT_IMAGE
  );

  // Shuffle only the custom image projects
  for (let i = withCustomImage.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [withCustomImage[i], withCustomImage[j]] = [withCustomImage[j], withCustomImage[i]];
  }

  return [...withCustomImage, ...withDefaultImage];
}

export default function useGetProjects(): ProjectType[] {
  if (!cachedSortedProjects) {
    cachedSortedProjects = sortProjectsRandomlyWithDefaultImageLast(data);
  }

  return cachedSortedProjects;
}
