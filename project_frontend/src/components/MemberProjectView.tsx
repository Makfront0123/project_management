
import type { Tag } from "@/types/tag";
import type { Task } from "@/types/task";
import type { TaskAssignment } from "@/types/task_assignment";
import AttachmentModal from "./projectDetails/attachmentModal";
import TaskCard from "./projectDetails/TaskCard";
import TaskFilter from "./projectDetails/TaskFilter";
import TaskComments from "./TaskComment";
import type { Attachment } from "@/types/attachment";

interface ProjectData {
    tasks: Task[];
    tags: Tag[];
    attachmentsByTask: Record<string, Attachment[]>;
    teamId?: string;
}
interface ProjectUI {
    isAttachmentModalOpen: boolean;
    attachmentTaskId: string | null;
    openAttachmentModal: (taskId: string) => void;
    closeAttachmentModal: () => void;
}
export interface ProjectActions {
    deleteAttachment: (attachmentId: string) => void;
    updateAttachment: (attachmentId: string, file: File) => void;
    completeAssignedTask: (assignmentId: string) => void;
    toggleTagOnTask: (
        taskId: string,
        tagId: string,
        isAssigned: boolean
    ) => void;
}
interface Props {
    data: ProjectData;
    ui: ProjectUI;
    actions: ProjectActions;
    filter: "all" | "open" | "completed";
    setFilter: React.Dispatch<
        React.SetStateAction<"all" | "open" | "completed">
    >;
    pendingAssignments: TaskAssignment[];
    completedAssignments: TaskAssignment[];
    selectedCommentTask: Task | null;
    setSelectedCommentTask: React.Dispatch<
        React.SetStateAction<Task | null>
    >;
}

const MemberProjectView = ({
    data,
    ui,
    actions,
    filter,
    setFilter,
    pendingAssignments,
    completedAssignments,
    selectedCommentTask,
    setSelectedCommentTask,
}: Props) => {
    return (
        <div className="p-20 w-full h-full flex flex-col gap-8">

            <TaskFilter value={filter} onChange={setFilter} />

            {/* PENDING TASKS */}
            {pendingAssignments.length === 0 ? (
                <p className="text-gray-500 text-center">
                    you have no pending tasks
                </p>
            ) : (
                <>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                        ⏳ Pending Tasks
                    </h3>

                    <div className="space-y-4 mb-8">
                        {pendingAssignments.map((assignment) => {
                            const taskId =
                                typeof assignment.taskId === "string"
                                    ? assignment.taskId
                                    : assignment.taskId?._id;

                            const task = data.tasks.find((t: Task) => t._id === taskId);

                            if (!task) return null;

                            return (
                                <div
                                    key={assignment._id}
                                    className="flex flex-col animate-slide-in-top gap-2 border border-white rounded p-4"
                                >
                                    <TaskCard
                                        assignment={assignment}
                                        isCompleted={false}
                                        attachments={
                                            data.attachmentsByTask[taskId ?? ""]
                                        }
                                        onAttachmentClick={ui.openAttachmentModal}
                                        onDeleteAttachment={actions.deleteAttachment}
                                        onUpdateAttachment={actions.updateAttachment}
                                        onCompleteAssignedTask={
                                            actions.completeAssignedTask
                                        }
                                    />

                                    {/* TAGS */}
                                    <div className="flex gap-2 animate-slide-in-top flex-wrap items-center">
                                        <span className="font-semibold text-white">
                                            Tags:
                                        </span>

                                        {data.tags.map((tag: Tag) => {
                                            const isAssigned = task.tags?.some(
                                                (t: Tag) => t._id === tag._id
                                            );

                                            return (
                                                <button
                                                    key={`${tag._id}-${assignment._id}`}
                                                    onClick={() => {
                                                        if (!taskId) return;

                                                        actions.toggleTagOnTask(
                                                            taskId,
                                                            tag._id,
                                                            isAssigned ?? false
                                                        );
                                                    }}
                                                    className={`px-2 py-1 rounded-full text-sm ${isAssigned
                                                        ? "bg-green-300"
                                                        : "bg-gray-200"
                                                        }`}
                                                >
                                                    {tag.name}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* COMMENTS */}
                                    <div className="mt-2 ml-4">
                                        <button
                                            onClick={() => {
                                                if (selectedCommentTask?._id === taskId) {
                                                    setSelectedCommentTask(null);
                                                } else {
                                                    setSelectedCommentTask(task);
                                                }
                                            }}
                                            className="text-blue-600 text-sm hover:underline"
                                        >
                                            💬{" "}
                                            {selectedCommentTask?._id === taskId
                                                ? "Ocultar"
                                                : "Ver"}{" "}
                                            comentarios
                                        </button>

                                        {selectedCommentTask?._id === taskId && (
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
                </>
            )}

            {/* COMPLETED TASKS */}
            {completedAssignments.length > 0 && (
                <>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                        ✅ Completed Tasks
                    </h3>

                    <div className="space-y-4">
                        {completedAssignments.map((assignment) => {
                            const taskId =
                                typeof assignment.taskId === "string"
                                    ? assignment.taskId
                                    : assignment.taskId?._id;

                            return (
                                <div
                                    key={assignment._id}
                                    className="flex flex-col animate-slide-in-top gap-2 border rounded p-4 bg-green-50"
                                >
                                    <TaskCard
                                        assignment={assignment}
                                        isCompleted={true}
                                        attachments={
                                            data.attachmentsByTask[taskId ?? ""]
                                        }
                                    />
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {/* ATTACHMENT MODAL */}
            <AttachmentModal
                isOpen={ui.isAttachmentModalOpen}
                onClose={ui.closeAttachmentModal}
                taskId={ui.attachmentTaskId}
                teamId={data.teamId ?? ""}
            />
        </div>
    );
};

export default MemberProjectView;