import ProjectList from "../projects/ProjectList"
import data from "@/data/projects.json";

const ProjectsPage = ({className}: {className?: string}) => {
    return (
        <div className="flex">
            <ProjectList 
            projects={data} />
        </div>
    )
}

export default ProjectsPage;