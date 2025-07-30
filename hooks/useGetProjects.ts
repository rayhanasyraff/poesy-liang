import data from "@/data/projects.json";
import ProjectType from "@/types/ProjectType";

const DEFAULT_IMAGE = "/assets/images/poesy-logo-pink.png";

function searchProjects(projects: ProjectType[], keyword: string): ProjectType[] {
  const lowerKeyword = keyword.toLowerCase().trim();

  return projects.filter((project) => {
    const titleMatch = project.name?.toLowerCase().includes(lowerKeyword);
    const descriptionMatch = project.description?.toLowerCase().includes(lowerKeyword);
    const tagMatch = project.tags?.some(tag =>
      tag.toLowerCase().includes(lowerKeyword)
    );

    return titleMatch || descriptionMatch || tagMatch;
  });
}

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function sortByVisibilityAndRandomizePublic(data: ProjectType[]): ProjectType[] {
  const publicData = data.filter(item => item.visibility === 'public');
  const privateData = data.filter(item => item.visibility === 'private');

  const shuffledPublic = shuffle(publicData);

  return [...shuffledPublic, ...privateData];
}

export default function useGetProjects(searchQuery?: string): ProjectType[] {
  
  let projects: ProjectType[] = data;

  projects = sortByVisibilityAndRandomizePublic(projects);

  if (searchQuery) {
    projects = searchProjects(projects, searchQuery);
  }

  return projects;
}
