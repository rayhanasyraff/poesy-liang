import Footer from "@/components/base/Footer";
import Header from "@/components/base/Header";
import ProjectsPage from "@/components/page/ProjectsPage";

const Projects = () => {
    return (
    <div className="flex flex-col">
      <Header />
      <ProjectsPage />
      <Footer />
    </div>
    );
}

export default Projects;