import type { AdminProjectViewProp } from "@/types/projects";
import AdminHeader from "./AdminHeader";
import { useProjectTabs } from "@/hooks/useProjectTabs";
import ProjectTabs from "./ProjectTabs";
import ProjectTasks from "../ProjectTasks";
import ProjectCalendar from "../ProjectCalendar";
import ProjectSettings from "../ProjectSettings";
import ProjectAnalytics from "../ProjectAnalytics";
import { TaskFormModal } from "../TaskFormModal";

const AdminProjectView = ({
  currentProject,
  tasks,
  deleteTask,
  setEditingTask,
  editingTask,
  setIsModalOpen,
  isModalOpen
}: AdminProjectViewProp) => {

  const tabs = useProjectTabs();

  return (
    <div className="w-full h-full flex flex-col gap-6 p-4">

      <AdminHeader
        project={currentProject}
        onCreateTask={() => {
          setEditingTask(null);
          setIsModalOpen(true);
        }}
      />

      <TaskFormModal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) setEditingTask(null);
        }}
        teamId={currentProject?.teamId ?? null}
        projectId={currentProject?._id ?? null}
        editingTask={editingTask}
      />

      <ProjectTabs tabs={tabs} />

      <div className="mt-4">

        {tabs.isTasks && (
          <ProjectTasks
            tasks={tasks}
            onEdit={(task) => {
              setEditingTask(task);
              setIsModalOpen(true);
            }}
            onDelete={deleteTask}
          />
        )}

        {tabs.isAnalytics && <ProjectAnalytics />}
        {tabs.isSettings && <ProjectSettings />}
        {tabs.isCalendar && <ProjectCalendar />}

      </div>
    </div>
  );
};

export default AdminProjectView;