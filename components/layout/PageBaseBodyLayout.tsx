import ProjectList from "../projects/ProjectList";

const PageBaseBodyLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex flex-row mt-10">
        {children}
        <ProjectList />
    </div>
  );
}

export default PageBaseBodyLayout;