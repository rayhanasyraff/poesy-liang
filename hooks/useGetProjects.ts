import data from "@/data/projects.json";

export default function useGetProjects() {

    const projects = data;
    const sortedProjects = projects.slice().sort((a, b) => a.order - b.order);
    const randomOrderedProjects = sortedProjects.slice().sort(() => Math.random() - 0.5);

    return sortedProjects;
}