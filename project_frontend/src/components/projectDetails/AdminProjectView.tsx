import type { AdminProjectViewProp } from "@/types/projects";
import AdminHeader from "./AdminHeader";
import { useProjectTabs } from "@/hooks/useProjectTabs";
import ProjectTabs from "./ProjectTabs";
import ProjectTasks from "../ProjectTasks";
import ProjectCalendar from "../ProjectCalendar";
import ProjectSettings from "../ProjectSettings";
import ProjectAnalytics from "../ProjectAnalytics";

const AdminProjectView = ({
  currentProject,
  actions,
  tasks
}: AdminProjectViewProp) => {

  const tabs = useProjectTabs();


  return (
    <div className="w-full h-full flex flex-col gap-6 p-4">

      <AdminHeader
        project={currentProject}
        onCreateTask={actions.createTask}
      />
      <ProjectTabs tabs={tabs} />

      <div className="mt-4">

        {tabs.isTasks && (
          <ProjectTasks tasks={tasks} />
        )}


        {tabs.isAnalytics && <ProjectAnalytics />}


        {tabs.isSettings && <ProjectSettings />}

        {tabs.isCalendar && <ProjectCalendar />}

      </div>

    </div>
  );
};

export default AdminProjectView;