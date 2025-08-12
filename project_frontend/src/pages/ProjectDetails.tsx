import { useState } from "react";
import Modal from "../components/Modal";
import AssignTaskModal from "../components/projectDetails/AssignTaskModal";
import AttachmentModal from "../components/projectDetails/attachmentModal";
import CreateTag from "../components/projectDetails/CreateTag";
import MenuButton from "../components/projectDetails/MenuButton";
import TagList from "../components/projectDetails/TagList";
import TagModal from "../components/projectDetails/TagModal";
import TaskCard from "../components/projectDetails/TaskCard";
import TaskModal from "../components/projectDetails/TaskModal";
import { useProjectDetails } from "../hooks/useProjectDetails";
import type { Tag } from "../types/tag";
import TaskComments from "../components/TaskComment";
import type { Task } from "../types/task";
import TaskFilter from "../components/projectDetails/TaskFilter";



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
    onUpdateAttachment,
    onCompleteAssignedTask,
    onEditProject,
    isProjectModalOpen,
    updateProject,
    getProject,
    setIsProjectModalOpen,
    projectValues,
    setProjectValues,
    onDeleteProject,

  } = useProjectDetails();

  const [selectedCommentTask, setSelectedCommentTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<"all" | "open" | "completed">("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "open") return task.status === "open";
    if (filter === "completed") return task.status === "completed";
    return true;
  })

  const filteredAssignments = taskAssignments.filter((assignment) => {
    const taskId = typeof assignment.taskId === "string" ? assignment.taskId : assignment.taskId?._id;
    const task = tasks.find((t) => t._id === taskId);
    if (!task) return false;

    if (filter === "open") return task.status === "open";
    if (filter === "completed") return task.status === "completed";
    return true;
  });

  const completedAssignments = filteredAssignments.filter((assignment) => {
    const taskId = typeof assignment.taskId === 'string' ? assignment.taskId : assignment.taskId?._id;
    const task = tasks.find((t) => t._id === taskId);
    return task?.status === 'completed';
  });

  const pendingAssignments = filteredAssignments.filter((assignment) => {
    const taskId = typeof assignment.taskId === 'string' ? assignment.taskId : assignment.taskId?._id;
    const task = tasks.find((t) => t._id === taskId);
    return task?.status !== 'completed';
  });





  if (!team || isLoading || !currentProject || !tasksLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500">
        Project not found
      </div>
    );
  }



  if (isAdmin) {
    return (
      <div className="p-0 w-full h-full flex flex-col  gap-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">📋 Tasks in project</h2>
          <TaskFilter value={filter} onChange={setFilter} />
          <div className="flex items-center gap-x-20">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={() => {
                setEditingTask(null);
                setValues({ name: "", description: "" });
                setIsModalOpen(true);
              }}
            >
              ➕ Create task
            </button>

            <MenuButton
              onEdit={() => {
                onEditProject();
              }}
              onDelete={() => {
                onDeleteProject();
              }}
            />
          </div>


        </div>

        {tasks.length === 0 && (
          <p className="text-gray-500 text-center">You have no pending tasks</p>
        )}

        <div className="flex items-start space-y-4 gap-x-10">
          <div className="flex flex-col gap-y-6 items-center min-w-4xl min-h-[130vh]">
            {filteredTasks.map((task) => {
              const assignment = findAssignmentForTask(task._id);

              return (
                <div key={task._id} className="w-full">
                  <TaskCard
                    task={task}
                    isCompleted={task.status === "completed"}
                    assignment={assignment}
                    isAdmin
                    onAssign={() => {
                      setSelectedTask(task);
                      setShowAssignModal(true);
                    }}
                    onUnassign={async () => {

                      setSelectedTask(task);
                      const userId =
                        typeof assignment?.userId === "string"
                          ? assignment.userId
                          : (assignment?.userId as unknown as { _id: string })?._id;


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
                    onCompleteAssignedTask={onCompleteAssignedTask}
                  />

                  <div className="mt-2 ml-4">
                    <button
                      onClick={() => {
                        if (task.status === "completed") return;
                        setSelectedCommentTask(
                          selectedCommentTask?._id === task._id ? null : task
                        );
                      }}
                      className={`text-sm ${task.status === "completed" ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:underline"
                        }`}
                      disabled={task.status === "completed"}
                    >
                      💬 {selectedCommentTask?._id === task._id ? "Hide" : "Show"} comments
                    </button>


                    {selectedCommentTask?._id === task._id && (
                      <div className="animate-slide-in-top mt-4 border rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-md font-bold text-gray-700">
                            Comments about:{" "}
                            <span className="text-indigo-600">{task.name}</span>
                          </h3>
                          <button
                            onClick={() => setSelectedCommentTask(null)}
                            className="text-sm text-red-500 hover:underline"
                          >
                            Close
                          </button>
                        </div>
                        <TaskComments taskId={task._id} />
                      </div>
                    )}
                  </div>

                </div>
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

        {isProjectModalOpen && (
          <Modal
            isOpen={isProjectModalOpen}
            onClose={() => {
              setIsProjectModalOpen(false);
              setProjectValues({ name: "", description: "" });
            }}
            title="Edit Project"
          >
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await updateProject(projectId!, projectValues, teamId!);
                setIsProjectModalOpen(false);
                setProjectValues({ name: "", description: "" });
                await getProject(projectId!, teamId!);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  value={projectValues.name}
                  onChange={(e) =>
                    setProjectValues((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  value={projectValues.description}
                  onChange={(e) =>
                    setProjectValues((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>
          </Modal>
        )}



      </div>
    );
  }



  return (
    <div className="p-20 w-full h-full flex flex-col gap-8">
      <TaskFilter value={filter} onChange={setFilter} />
      {pendingAssignments.length === 0 ? (
        <p className="text-gray-500 text-center">you have no pending tasks</p>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-2 text-white">⏳ Pending Tasks</h3>
          <div className="space-y-4 mb-8">
            {pendingAssignments.map((assignment) => (
              <div key={assignment._id} className="flex flex-col animate-slide-in-top gap-2 border border-white rounded p-4">
                <TaskCard
                  assignment={assignment}
                  isCompleted={false}
                  attachments={attachmentsByTask[
                    typeof assignment.taskId === "string"
                      ? assignment.taskId
                      : assignment.taskId?._id || ""
                  ]}
                  onAttachmentClick={openAttachmentModal}
                  onDeleteAttachment={onDeleteAttachment}
                  onUpdateAttachment={onUpdateAttachment}
                  onCompleteAssignedTask={onCompleteAssignedTask}
                />
                {
                  pendingAssignments.length > 0 && (
                    <div className="flex gap-2 animate-slide-in-top flex-wrap items-center">
                      <span className="font-semibold text-white">Tagsº:</span>
                      {tags.map((tag) => {
                        const taskId =
                          typeof assignment.taskId === "string"
                            ? assignment.taskId
                            : assignment.taskId?._id;

                        const task = tasks.find((t) => t._id === taskId);
                        const isAssigned = task?.tags?.some((t: Tag) => t._id === tag._id);

                        return (
                          <button
                            key={`${tag._id}-${assignment._id}`}
                            onClick={() => {
                              if (!taskId) return;
                              toggleTagOnTask(taskId, tag._id, isAssigned ?? false);
                            }}
                            className={`px-2 py-1 rounded-full text-sm ${isAssigned ? "bg-green-300" : "bg-gray-200"
                              }`}
                          >
                            {tag.name}
                          </button>
                        );
                      })}
                    </div>

                  )
                }


                <div className="mt-2 ml-4">
                  <button
                    onClick={() => {
                      const taskId =
                        typeof assignment.taskId === "string"
                          ? assignment.taskId
                          : assignment.taskId?._id;
                      const task = tasks.find((t) => t._id === taskId);
                      if (selectedCommentTask?._id === taskId) {
                        setSelectedCommentTask(null);
                      } else if (task) {
                        setSelectedCommentTask(task);
                      }
                    }}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    💬 {selectedCommentTask?._id === (typeof assignment.taskId === "string" ? assignment.taskId : assignment.taskId?._id) ? "Ocultar" : "Ver"} comentarios
                  </button>

                  {selectedCommentTask?._id ===
                    (typeof assignment.taskId === "string"
                      ? assignment.taskId
                      : assignment.taskId?._id) && (
                      <div className="animate-slide-in-top mt-4 border rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-md font-bold text-gray-700">
                            Comments about:{" "}
                            <span className="text-indigo-600">
                              {selectedCommentTask.name}
                            </span>
                          </h3>
                          <button
                            onClick={() => setSelectedCommentTask(null)}
                            className="text-sm text-red-500 hover:underline"
                          >
                            Close
                          </button>
                        </div>
                        <TaskComments taskId={selectedCommentTask._id} />
                      </div>
                    )}
                </div>


              </div>
            ))}
          </div>
        </>
      )}

      {completedAssignments.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mb-2 text-white">✅ Completed Tasks</h3>
          <div className="space-y-4">
            {completedAssignments.map((assignment) => (
              <div key={assignment._id} className="flex flex-col animate-slide-in-top gap-2 border rounded p-4 bg-green-50">
                <TaskCard
                  assignment={assignment}
                  isCompleted={true}
                  attachments={attachmentsByTask[
                    typeof assignment.taskId === "string"
                      ? assignment.taskId
                      : assignment.taskId?._id || ""
                  ]}

                />



              </div>
            ))}
          </div>
        </>
      )}

      <AttachmentModal
        isOpen={isAttachmentModalOpen}
        onClose={closeAttachmentModal}
        taskId={attachmentTaskId}
        teamId={teamId ?? ""}
      />

    </div>
  );

};

export default ProjectDetails;

