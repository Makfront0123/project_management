import type { Task } from "@/types/task";
import TaskCard from "./projectDetails/TaskCard";
import TaskFilter from "./projectDetails/TaskFilter";
import TaskModal from "./projectDetails/TaskModal";
import AssignTaskModal from "./projectDetails/AssignTaskModal";
import CreateTag from "./projectDetails/CreateTag";
import TagList from "./projectDetails/TagList";
import TaskComments from "./TaskComment";

interface Props {
    data: any;
    ui: any;
    actions: any;
    form: any;
    filter: "all" | "open" | "completed";
    setFilter: React.Dispatch<React.SetStateAction<"all" | "open" | "completed">>;
    filteredTasks: Task[];
    selectedCommentTask: Task | null;
    setSelectedCommentTask: React.Dispatch<React.SetStateAction<Task | null>>;
}

const AdminProjectView = ({
    data,
    ui,
    actions,
    form,
    filter,
    setFilter,
    filteredTasks,
    selectedCommentTask,
    setSelectedCommentTask,
}: Props) => {
    return (
        <div className="p-0 w-full h-full flex flex-col gap-8">

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">
                    📋 Tasks in project
                </h2>

                <TaskFilter value={filter} onChange={setFilter} />

                <div className="flex items-center gap-x-20">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        onClick={() => {
                            ui.setEditingTask(null);
                            form.setValues({ name: "", description: "" });
                            ui.setIsModalOpen(true);
                        }}
                    >
                        ➕ Create task
                    </button>
                </div>
            </div>

            {/* EMPTY STATE */}
            {filteredTasks.length === 0 && (
                <p className="text-gray-500 text-center">
                    You have no pending tasks
                </p>
            )}

            <div className="flex items-start space-y-4 gap-x-10">

                {/* TASK COLUMN */}
                <div className="flex flex-col gap-y-6 items-center min-w-4xl min-h-[130vh]">
                    {filteredTasks.map((task) => {
                        const assignment = actions.findAssignmentForTask(task._id);

                        return (
                            <div key={task._id} className="w-full">

                                <TaskCard
                                    task={task}
                                    isCompleted={task.status === "completed"}
                                    assignment={assignment}
                                    isAdmin
                                    onAssign={() => {
                                        ui.setSelectedTask(task);
                                        ui.setShowAssignModal(true);
                                    }}
                                    onUnassign={async () => {
                                        if (!assignment) return;

                                        const userId =
                                            typeof assignment.userId === "string"
                                                ? assignment.userId
                                                : assignment.userId?._id;

                                        if (!userId) return;

                                        await actions.unassignTask(task._id, userId);
                                    }}
                                    onEdit={() => {
                                        ui.setEditingTask(task);
                                        form.setValues({
                                            name: task.name,
                                            description: task.description,
                                        });
                                        ui.setIsModalOpen(true);
                                    }}
                                    onDelete={() =>
                                        actions.deleteTask(task._id, data.projectId!)
                                    }
                                    onCompleteAssignedTask={actions.completeAssignedTask}
                                />

                                {/* COMMENTS */}
                                <div className="mt-2 ml-4">
                                    <button
                                        onClick={() => {
                                            if (task.status === "completed") return;

                                            setSelectedCommentTask(
                                                selectedCommentTask?._id === task._id ? null : task
                                            );
                                        }}
                                        className={`text-sm ${task.status === "completed"
                                                ? "text-gray-400 cursor-not-allowed"
                                                : "text-blue-600 hover:underline"
                                            }`}
                                        disabled={task.status === "completed"}
                                    >
                                        💬{" "}
                                        {selectedCommentTask?._id === task._id
                                            ? "Hide"
                                            : "Show"}{" "}
                                        comments
                                    </button>

                                    {selectedCommentTask?._id === task._id && (
                                        <div className="animate-slide-in-top mt-4 border rounded-lg p-4 bg-gray-50">
                                            <div className="flex justify-between items-center mb-3">
                                                <h3 className="text-md font-bold text-gray-700">
                                                    Comments about:
                                                    <span className="text-indigo-600 ml-2">
                                                        {task.name}
                                                    </span>
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

                {/* TAG SIDEBAR */}
                <div className="flex flex-col">
                    <CreateTag />

                    <TagList
                        tags={data.tags}
                        onRemoveTag={(tagId) =>
                            actions.deleteTag(tagId, data.teamId ?? "")
                        }
                        onEditTag={(tag) => {
                            ui.setEditingTag(tag);
                            ui.setIsTagModalOpen(true);
                        }}
                    />
                </div>
            </div>

            {/* MODALS */}

            <TaskModal
                isOpen={ui.isModalOpen}
                onClose={() => {
                    ui.setIsModalOpen(false);
                    ui.setEditingTask(null);
                    form.setValues({ name: "", description: "" });
                }}
                values={form.values}
                errors={form.errors}
                isSubmitting={form.isSubmitting}
                handleChange={form.handleChange}
                handleSubmit={form.handleSubmit}
                isEditing={!!ui.editingTask}
            />

            <AssignTaskModal
                isOpen={ui.showAssignModal}
                onClose={() => {
                    ui.setShowAssignModal(false);
                    ui.setSelectedTask(null);
                    ui.setSelectedUserId("");
                }}
                acceptedMembers={data.acceptedMembers}
                selectedUserId={ui.selectedUserId}
                setSelectedUserId={ui.setSelectedUserId}
                onAssign={async () => {
                    if (ui.selectedTask && ui.selectedUserId) {
                        await actions.assignTask(
                            ui.selectedTask._id,
                            ui.selectedUserId
                        );
                        ui.setShowAssignModal(false);
                    }
                }}
            />
        </div>
    );
};

export default AdminProjectView;