import taskTagService from "../services/task_tag_service.js";

export const addTagToTask = async (req, res) => {
    try {
        const { taskId, tagId } = req.params;

        if (!taskId || !tagId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const data = {
            taskId,
            tagId,

        };

        const taskTag = await taskTagService.createTaskTag(data);

        res.status(201).json({
            message: "Task tag created successfully",
            taskTag,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const removeTagFromTask = async (req, res) => {
    try {
        const { taskId, tagId } = req.params;

        await taskTagService.removeTagFromTask(taskId, tagId);

        res.status(200).json({ message: "Tag removed from task" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const getAllTagsOfTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const tags = await taskTagService.getAllTagsOfTask(taskId);
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const getTagOfTask = async (req, res) => {
    try {
        const { taskId, tagId } = req.params;
        const tag = await taskTagService.getTagOfTask(taskId, tagId);
        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}