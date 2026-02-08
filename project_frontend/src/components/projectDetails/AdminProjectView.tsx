import type { AdminProjectViewProp } from "@/types/projects";
import AdminHeader from "./AdminHeader";
import { useProjectTabs } from "@/hooks/useProjectTabs";
import ProjectTabs from "./ProjectTabs";
import ProjectTasks from "../ProjectTasks";
import ProjectCalendar from "../ProjectCalendar";
import ProjectSettings from "../ProjectSettings";
import ProjectAnalytics from "../ProjectAnalytics";
import { useState } from "react";
import { CreateTaskModal } from "../CreateTaskModal";

const AdminProjectView = ({
  currentProject,
  tasks
}: AdminProjectViewProp) => {

  const tabs = useProjectTabs();

  const [openTaskModal, setOpenTaskModal] = useState(false);

  return (
    <div className="w-full h-full flex flex-col gap-6 p-4">

      <AdminHeader
        project={currentProject}
        onCreateTask={() => setOpenTaskModal(true)}
      />

      <CreateTaskModal
        open={openTaskModal}
        onOpenChange={setOpenTaskModal}
        teamId={currentProject?.teamId ?? null}
        projectId={currentProject?._id ?? null}
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