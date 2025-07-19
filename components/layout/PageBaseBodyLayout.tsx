import ProjectList from "../projects/ProjectList";

const PageBaseBodyLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex flex-1 flex-row h-dvh mt-10">
        {children}
        <ProjectList />
    </div>
  );
}

export default PageBaseBodyLayout;