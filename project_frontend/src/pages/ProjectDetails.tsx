import AssignTaskModal from "../components/projectDetails/AssignTaskModal";
import AttachmentModal from "../components/projectDetails/attachmentModal";
import CreateTag from "../components/projectDetails/CreateTag";
import TagList from "../components/projectDetails/TagList";
import TagModal from "../components/projectDetails/TagModal";
import TaskCard from "../components/projectDetails/TaskCard";
import TaskModal from "../components/projectDetails/TaskModal";
import { useProjectDetails } from "../hooks/useProjectDetails";
import type { Tag } from "../types/tag";



const ProjectDetails = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    editingTask,
    setEditingTask,
    showAssignModal,
    setShowAssignModal,
    selectedTask,
    teamId,
    setSelectedTask,
    selectedUserId,
    setSelectedUserId,
    team,
    isAdmin,
    acceptedMembers,
    currentProject,
    isLoading,
    tasks,
    taskAssignments,
    values,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    setValues,
    deleteTask,
    getTasks,
    assignTask,
    unassignTask,
    getTasksToUserAssignments,
    tasksLoaded,
    findAssignmentForTask,
    projectId,
    tags,
    deleteTag,
    updateTag,
    isTagModalOpen,
    setIsTagModalOpen,
    editingTag,
    setEditingTag,
    toggleTagOnTask,
    isAttachmentModalOpen,
    openAttachmentModal,
    closeAttachmentModal,
    onDeleteAttachment,
    attachmentTaskId,
    attachmentsByTask,
    

  } = useProjectDetails();


  if (!team || isLoading || !currentProject || !tasksLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500">
        Cargando...
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="p-20 w-full h-full flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">📋 Tareas del proyecto</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={() => {
              setEditingTask(null);
              setValues({ name: "", description: "" });
              setIsModalOpen(true);
            }}
          >
            ➕ Crear tarea
          </button>
        </div>

        <div className="flex items-center space-y-4 gap-x-10">
          <div className="flex flex-col gap-y-6 items-center min-w-4xl">
            {tasks.map((task) => {
              const assignment = findAssignmentForTask(task._id);

              return (
                <TaskCard
                  key={task._id}
                  task={task}
                  assignment={assignment}
                  isAdmin
                  onAssign={() => {
                    setSelectedTask(task);
                    setShowAssignModal(true);
                  }}
                  onUnassign={async () => {
                    setSelectedTask(task);
                    const userId = typeof assignment?.userId === "string"
                      ? assignment.userId
                      : assignment?.userId?._id;
                    if (!userId) return;
                    await unassignTask(task._id, userId);
                    await getTasksToUserAssignments(projectId!);
                  }}
                  onEdit={() => {
                    setEditingTask(task);
                    setValues({ name: task.name, description: task.description });
                    setIsModalOpen(true);
                  }}
                  onDelete={async () => {
                    await deleteTask(task._id, projectId!);
                    await getTasks(projectId!);
                  }}
                />
              );
            })}
          </div>
          <div className="flex flex-col">
            <CreateTag />
            <TagList
              tags={tags}
              onRemoveTag={(tagId) => deleteTag(tagId, teamId ?? "")}
              onEditTag={(tag) => {
                setEditingTag(tag);
                setIsTagModalOpen(true);
              }}
            />

          </div>


        </div>

        {isTagModalOpen && editingTag && (
          <TagModal
            isOpen={isTagModalOpen}
            onClose={() => {
              setIsTagModalOpen(false);
              setEditingTag(null);
            }}
            initialName={editingTag.name}
            onSubmit={async (newName: string) => {
              if (!editingTag) return;
              await updateTag(editingTag._id, teamId ?? "", { name: newName });
              setIsTagModalOpen(false);
              setEditingTag(null);
            }}


          />
        )}


        <TaskModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
            setValues({ name: "", description: "" });
          }}
          values={values}
          errors={errors}
          isSubmitting={isSubmitting}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isEditing={!!editingTask}
        />

        <AssignTaskModal
          isOpen={showAssignModal}
          onClose={() => {
            setShowAssignModal(false);
            setSelectedTask(null);
            setSelectedUserId("");
          }}
          acceptedMembers={acceptedMembers}
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
          onAssign={async () => {
            if (selectedTask && selectedUserId) {
              await assignTask(selectedTask._id, selectedUserId);
              setShowAssignModal(false);
              setSelectedTask(null);
              setSelectedUserId("");
            }
          }}
        />
      </div>
    );
  }


  return (
    <div className="p-20 w-full h-full flex flex-col gap-8">
      <h2 className="text-2xl font-bold text-center">📋 Tareas asignadas</h2>

      {taskAssignments.length === 0 ? (
        <p className="text-gray-500 text-center">No hay tareas asignadas</p>
      ) : (
        <div className="space-y-4">
          {taskAssignments.map((assignment) => (
            <div key={assignment._id} className="flex flex-col gap-2 border rounded p-4">
              <TaskCard
                assignment={assignment}
                attachments={
                  attachmentsByTask[
                  typeof assignment.taskId === "string"
                    ? assignment.taskId
                    : assignment.taskId?._id || ""
                  ]
                }
                onAttachmentClick={(taskId) => {
                  openAttachmentModal(taskId);
                }}
                onDeleteAttachment={onDeleteAttachment}
              
              />



              <AttachmentModal
                isOpen={isAttachmentModalOpen}
                onClose={closeAttachmentModal}
                taskId={attachmentTaskId}
                teamId={teamId ?? ""}
              />

              

              <div className="flex gap-2 flex-wrap items-center">
                <span className="font-semibold">Etiquetas:</span>
                {tags.map((tag) => {
                  const taskId = typeof assignment.taskId === 'string' ? assignment.taskId : assignment.taskId?._id;
                  const task = tasks.find((t) => t._id === taskId);
                  const isAssigned = task?.tags?.some((t: Tag) => t._id === tag._id);


                  return (
                    <button
                      key={tag._id}
                      onClick={() => {
                        if (!taskId) return;
                        toggleTagOnTask(taskId, tag._id, isAssigned ?? false);
                      }}


                      className={`px-2 py-1 rounded-full text-sm ${isAssigned ? "bg-green-300" : "bg-gray-200"}`}
                    >
                      {tag.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      )}
    </div>
  );

};

export default ProjectDetails;

