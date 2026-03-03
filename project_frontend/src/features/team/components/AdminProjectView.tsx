
import AdminHeader from "./AdminHeader";
import { useProjectTabs } from "@/features/project/hooks/useProjectTabs";
import ProjectCalendar from "../../project/components/ProjectCalendar";
import ProjectSettings from "../../project/components/ProjectSettings";
import ProjectAnalytics from "../../project/components/ProjectAnalytics";
import TaskModal from "../../task/components/TaskModal";
import ProjectTasks from "@/features/project/components/ProjectTasks";
import ProjectTabs from "@/features/project/components/ProjectTabs";
import type { AdminProjectViewProp } from "@/features/project/types/projects";
import { useState } from "react";
import Modal from "@/shared/components/Modal";
import { Button } from "@/shared/components/ui/button";
import TaskFilter from "@/features/task/components/TaskFilter";

const AdminProjectView = ({
  currentProject,
  tasks,
  deleteTask,
  setEditingTask,
  editingTask,
  setIsModalOpen,
  filter,
  setFilter,
  isModalOpen,
  acceptedMembers,
  taskForm
}: AdminProjectViewProp) => {
  console.log("tasks", tasks);
  const tabs = useProjectTabs();
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  return (
    <div className="w-full min-h-screen flex flex-col gap-6 p-4">

      <AdminHeader
        project={currentProject}
        onCreateTask={() => {
          setEditingTask(null);
          setIsModalOpen(true);
        }}
      />

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          taskForm.reset();
          setIsModalOpen(false);
        }}
        isEditing={!!editingTask}
        values={taskForm.values}
        errors={taskForm.errors}
        isSubmitting={taskForm.isSubmitting}
        handleChange={taskForm.handleChange}
        handleSubmit={taskForm.handleSubmit}
        teamMembers={acceptedMembers}
      />

      <ProjectTabs tabs={tabs} />

      <div className="mt-4">

        {tabs.isTasks && (
          <>
            <div className="mb-4">
              <TaskFilter value={filter} onChange={setFilter} />
            </div>

            <ProjectTasks
              tasks={tasks}
              onEdit={(task) => {
                setEditingTask(task);
                setIsModalOpen(true);
              }}
              onDelete={(taskId) => {
                setTaskToDelete(taskId);
              }}
            />
          </>
        )}
        <Modal
          isOpen={!!taskToDelete}
          onClose={() => setTaskToDelete(null)}
          title="Eliminar tarea"
          footer={
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setTaskToDelete(null)}
              >
                Cancelar
              </Button>

              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => {
                  if (taskToDelete) {
                    deleteTask(taskToDelete);
                  }
                  setTaskToDelete(null);
                }}
              >
                Eliminar
              </Button>
            </div>
          }
        >
          <p className="text-sm text-gray-600">
            Esta acción no se puede deshacer.
          </p>
        </Modal>

        {tabs.isAnalytics && <ProjectAnalytics />}
        {tabs.isSettings && <ProjectSettings project={currentProject} />}
        {tabs.isCalendar && <ProjectCalendar tasks={tasks} />}

      </div>
    </div>
  );
};

export default AdminProjectView;