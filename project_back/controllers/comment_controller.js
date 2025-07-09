import commentService from "../services/comment_service.js";
export const createComment = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { comment } = req.body;
        const userId = req.user.id;

        const data = {
            comment,
            taskId,
            userId: userId,
        };

        const newComment = await commentService.createComment(data);
        res.status(201).json({
            message: "Comment created successfully",
            newComment,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllCommentsByTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const comments = await commentService.getAllCommentsByTask(taskId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


export const getComment = async (req, res) => {
    try {
        const { taskId, commentId } = req.params;
        const comment = await commentService.getCommentById(commentId, taskId);
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { taskId, commentId } = req.params;
        await commentService.deleteComment(commentId, taskId);
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}