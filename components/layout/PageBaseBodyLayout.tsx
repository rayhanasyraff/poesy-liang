import ProjectList from "../projects/ProjectList";
import useDeviceContext from '@/hooks/useDeviceContext';

const PageBaseBodyLayout = ({children}: {children: React.ReactNode}) => {
  const { isNarrowScreen } = useDeviceContext();

  if (isNarrowScreen) {
    return (
      <div className="flex flex-row mt-10 gap-3">
        <div className="flex-[2] flex min-w-0">
          <div className="w-full max-w-full overflow-auto">
            <div className="w-full flex flex-col items-center justify-start">
              {children}
            </div>
          </div>
        </div>
        <div className="flex-none self-start mr-2">
          <ProjectList />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row mt-10">
        {children}
        <ProjectList />
    </div>
  );
}

export default PageBaseBodyLayout;