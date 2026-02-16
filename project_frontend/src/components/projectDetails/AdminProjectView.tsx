import type { AdminProjectViewProp } from "@/types/projects";
import AdminHeader from "./AdminHeader";
import { useProjectTabs } from "@/hooks/useProjectTabs";
import ProjectTabs from "./ProjectTabs";
import ProjectTasks from "../ProjectTasks";
import ProjectCalendar from "../ProjectCalendar";
import ProjectSettings from "../ProjectSettings";
import ProjectAnalytics from "../ProjectAnalytics";
import TaskModal from "./TaskModal";

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

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isEditing={!!editingTask}
        values={editingTask ?? {}}
        errors={{}}
        isSubmitting={false} handleChange={() => { }} handleSubmit={() => { }} />

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
        {tabs.isSettings && <ProjectSettings project={currentProject} />}
        {tabs.isCalendar && <ProjectCalendar tasks={tasks} />}

      </div>
    </div>
  );
};

export default AdminProjectView;