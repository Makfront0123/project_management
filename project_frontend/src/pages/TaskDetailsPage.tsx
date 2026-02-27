import { ActivityFeed } from "@/features/activity/components/ActivityFeed";
import { useActivity } from "@/features/activity/hooks/useActivity";
import AttachmentUploader from "@/features/attachment/components/AttachmentUploader";
import { useAttachments } from "@/features/attachment/hooks/useAttachments";
import TaskComments from "@/features/task/components/TaskComment";
import { useTaskWorkflows } from "@/features/task/hooks/useTaskWorkflows";
import useTaskStore from "@/features/task/store/task_store";
import { useTeamWorkflow } from "@/features/team/hooks/useTeamWorkflows";

import { Link, useParams } from "react-router";

const TaskDetailsPage = () => {
    const { taskId } = useParams();

    const { tasks } = useTaskStore();

    const { activeTeamId } = useTeamWorkflow();
    const { completeTask } = useTaskWorkflows()

    const {
        uploadAttachment, removeAttachment, replaceAttachment
    } = useAttachments(activeTeamId ?? '')

    const task = tasks.find(t => t._id === taskId);

    const { activities } = useActivity(task?._id);

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

                        {/* attachments */}
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
                                onComplete={completeTask}
                            />
                        </section>



                    </div>
                    <section className="mt-5">
                        <TaskComments taskId={task._id} />
                    </section>
                </div>
                <div className="flex flex-col w-full py-30 rounded-lg bg-black border-1 border-gray-600">
                    <ActivityFeed activities={activities} />
                </div>
            </div>
        </div>
    );
};

export default TaskDetailsPage;