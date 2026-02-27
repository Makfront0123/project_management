import { useEffect, useState } from "react";
import { useCommentStore } from "../store/comment_store";

interface TaskCommentsProps {
    taskId: string;
}

const TaskComments: React.FC<TaskCommentsProps> = ({ taskId }) => {
    const { comments, getCommentsByTask, createComment, deleteComment } =
        useCommentStore();

    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        getCommentsByTask(taskId);
    }, [getCommentsByTask, taskId]);

    const handleAddComment = async () => {
        if (!commentText.trim()) return;

        await createComment(taskId, commentText);
        setCommentText("");
    };

    const handleDeleteComment = async (commentId: string) => {
        await deleteComment(taskId, commentId);
        await getCommentsByTask(taskId);
    };

    return (
        <div
            className="
      w-full
      border
      rounded-xl
      bg-white
      dark:bg-gray-900
      flex
      flex-col
      p-6
      gap-6
    "
        >
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Comments</h3>
                <span className="text-xs text-gray-400">
                    {comments.length} comments
                </span>
            </div>

            {/* COMMENTS LIST */}
            <div
                className="
        flex
        flex-col
        gap-4
        max-h-[400px]
        overflow-y-auto
        pr-2
      "
            >
                {comments.length === 0 && (
                    <p className="text-sm text-gray-400">
                        No comments yet. Start the discussion.
                    </p>
                )}

                {comments.map((c) => (
                    <div
                        key={c._id}
                        className="
            border
            rounded-lg
            p-3
            bg-gray-50
            dark:bg-gray-800
            flex
            flex-col
            gap-1
          "
                    >
                        {/* USER */}
                        <div className="flex justify-between items-center text-xs text-gray-400">
                            <span className="font-medium text-gray-600">
                                {c.userId?.name ?? "User"}
                            </span>

                            <span>
                                {new Date(c.createdAt).toLocaleString()}
                            </span>
                        </div>

                        {/* COMMENT */}
                        <p className="text-sm text-gray-700 dark:text-gray-200">
                            {c.comment}
                        </p>

                        {/* ACTIONS */}
                        <div className="flex justify-end">
                            <button
                                onClick={() => handleDeleteComment(c._id)}
                                className="text-xs text-red-500 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* INPUT */}
            <div className="flex gap-3 items-end border-t pt-4">
                <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={1}
                    placeholder="Write a comment..."
                    className="
            flex-1
            border
            rounded-lg
            p-3
            text-sm
            resize-none
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
                />

                <button
                    onClick={handleAddComment}
                    className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded-lg
            text-sm
            hover:bg-blue-700
            transition
          "
                >
                    Comment
                </button>
            </div>
        </div>
    );
};

export default TaskComments;