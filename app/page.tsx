import Projects from "@/components/projects";
import Header from "@/components/header";
import data from "@/data/projects.json";

export default function Home() {
  return (
    <div>
      <Header />
      <Projects projectsList={data}/>
    </div>
  );
}
