import { useEffect, useState } from "react";

import type { TaskComment } from "../types/comment";
import { useCommentStore } from "../stores/comment_store";

interface TaskCommentsProps {
    taskId: string;
}

const TaskComments: React.FC<TaskCommentsProps> = ({ taskId }) => {
    const { comments, getCommentsByTask, createComment, deleteComment } = useCommentStore();
    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        getCommentsByTask(taskId);
    }, [getCommentsByTask, taskId]);

    const handleAddComment = async () => {
        if (!commentText.trim()) return;
        await createComment(taskId, commentText);
        setCommentText("");
        await getCommentsByTask(taskId);
    };

    const handleDeleteComment = async (commentId: string) => {
        await deleteComment(taskId, commentId);
        await getCommentsByTask(taskId);
    };

    return (
        <div className="mt-4 bg-white border-t pt-4">
            <h4 className="text-md font-semibold mb-2">Comentarios</h4>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {comments.map((c: TaskComment) => (
                    <div
                        key={c._id}
                        className="flex justify-between items-start text-sm bg-gray-50 p-2 rounded"
                    >
                        <div>
                            <p className="text-gray-800">{c.comment}</p>
                            <p className="text-gray-400 text-xs">
                                {new Date(c.createdAt).toLocaleString()}
                            </p>
                        </div>
                        <button
                            onClick={() => handleDeleteComment(c._id)}
                            className="text-red-500 text-xs hover:underline"
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-3 flex gap-2">
                <input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="flex-1 border rounded p-2 text-sm"
                    placeholder="Escribe un comentario..."
                />
                <button
                    onClick={handleAddComment}
                    className="bg-blue-600 text-white px-3 py-1 text-sm rounded"
                >
                    Comentar
                </button>
            </div>
        </div>
    );

};

export default TaskComments;
