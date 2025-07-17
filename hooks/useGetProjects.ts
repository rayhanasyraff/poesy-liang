import data from "@/data/projects.json";

export default function useGetProjects() {

    const projects = data;
    const sortedProjectsByDescendingOrder = projects.slice().sort((a, b) => b.order - a.order);
    // const randomOrderedProjects = sortedProjectsByDescendingOrder.slice().sort(() => Math.random() - 0.5);

    return sortedProjectsByDescendingOrder;
}