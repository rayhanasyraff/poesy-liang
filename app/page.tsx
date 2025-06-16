import Projects from "@/components/projects";
import Header from "@/components/Header";
import data from "@/data/projects.json";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <Projects projectsList={data}/>
      <Footer />
    </div>
  );
}
