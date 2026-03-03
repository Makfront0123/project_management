import { ActivityFeed } from "@/features/activity/components/ActivityFeed";
import { useActivity } from "@/features/activity/hooks/useActivity";
import AttachmentUploader from "@/features/attachment/components/AttachmentUploader";
import { useAttachments } from "@/features/attachment/hooks/useAttachments";
import { useAuthStore } from "@/features/auth/store/auth_store";
import TaskComments from "@/features/task/components/TaskComment";
import { useTask } from "@/features/task/hooks/useTaks";
import { useTaskWorkflows } from "@/features/task/hooks/useTaskWorkflows";
import { useTeamWorkflow } from "@/features/team/hooks/useTeamWorkflows";
import { usePagination } from "@/shared/hooks/usePagination";

import { Link, useParams } from "react-router";

const TaskDetailsPage = () => {
    const { taskId, projectId } = useParams();

    const task = useTask(projectId, taskId);

    const { completeTask } = useTaskWorkflows();
    const { user } = useAuthStore();
    const { activeTeamId } = useTeamWorkflow();
    const handleCompleteTask = async (taskId: string) => {
        if (!user || !activeTeamId || !projectId) return;

        await completeTask({
            taskId,
            userId: user.id,
            projectId,
            teamId: activeTeamId
        });
    };
    const {
        uploadAttachment,
        replaceAttachment,
        removeAttachment
    } = useAttachments(activeTeamId ?? "", task?._id)

    const { activities } = useActivity(task?._id);
    console.log("activities", activities);
    const { items, page, totalPages, nextPage, prevPage } =
        usePagination(activities, 10);


    if (!task) {
        return <p>Task not found</p>;
    }

    return (
        <div className="flex flex-col items-start w-full my-10 px-10 gap-x-5">
            <Link to="/projects/team/project/tasks" className="flex gap-x-2 mb-5">
                <button className="text-sm text-gray-500 hover:underline border-1 border-gray-600 rounded-lg px-3">
                    Back to tasks
                </button>
                <span className="font-bold">{task.name}</span>
            </Link>
            <div className="flex w-full gap-x-5">
                <div className="flex-flex-col">
                    <div className="min-w-3xl  border-1 border-gray-600 rounded-lg p-8">
                        <span
                            className={`
            text-xs px-2 py-1 rounded font-medium uppercase
            ${task.priority === "high" && "bg-red-100 text-red-600"}
            ${task.priority === "medium" && "bg-yellow-100 text-yellow-600"}
            ${task.priority === "low" && "bg-green-100 text-green-600"}
          `}
                        >
                            {task.priority}
                        </span>
                        <h1 className="text-2xl mt-2 font-bold mb-2">
                            {task.name}
                        </h1>
                        <p className="text-gray-500 mb-6">
                            {task.description}
                        </p>
                        <section className="mb-8">
                            <h3 className="font-semibold mb-2">
                                Attachments
                            </h3>
                            <AttachmentUploader
                                taskId={task._id}
                                isCompleted={task.status === "completed"}
                                onUpload={uploadAttachment}
                                onUpdate={replaceAttachment}
                                onDelete={removeAttachment}
                                onComplete={handleCompleteTask}
                            />
                        </section>



                    </div>
                    <section className="mt-5">
                        <TaskComments taskId={task._id} />
                    </section>
                </div>
                <div className="flex flex-col w-full py-6 rounded-lg bg-black border-1 border-gray-600">
                    <h1 className="font-bold text-2xl ml-5 mb-2">Activities</h1>
                    <ActivityFeed activities={items} />
                    <div className="flex justify-between px-4 pt-36">
                        <button onClick={prevPage} disabled={page === 1}>
                            Prev
                        </button>

                        <span className="text-sm">
                            {page} / {totalPages}
                        </span>

                        <button onClick={nextPage} disabled={page === totalPages}>
                            Next
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TaskDetailsPage;