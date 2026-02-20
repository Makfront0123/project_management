import type { AdminProjectViewProp } from "@/shared/types/projects";
import AdminHeader from "./AdminHeader";
import { useProjectTabs } from "@/hooks/useProjectTabs";
import ProjectCalendar from "../../features/project/components/ProjectCalendar";
import ProjectSettings from "../../features/project/components/ProjectSettings";
import ProjectAnalytics from "../../features/project/components/ProjectAnalytics";
import TaskModal from "./TaskModal";
import type { TaskFormValues } from "@/shared/types/task";
import ProjectTasks from "@/features/project/components/ProjectTasks";
import ProjectTabs from "@/features/project/components/ProjectTabs";

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
  const emptyTaskForm: TaskFormValues = {
    name: "",
    description: "",
  };

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
        values={editingTask ?? emptyTaskForm}
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