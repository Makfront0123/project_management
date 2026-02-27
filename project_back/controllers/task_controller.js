import taskService from "../services/task_service.js";
import TaskAssignment from "../models/TaksAssignment.js";
export const createTask = async (req, res) => {
    try {

        const { projectId } = req.params;

        const {
            name,
            description,
            priority,
            assignedUserId,
            dueDate,
        } = req.body;

        const task = await taskService.createTask({
            name,
            description,
            projectId,
            priority,
            status: "open",
            dueDate,
        });

        await TaskAssignment.create({
            taskId: task._id,
            userId: assignedUserId,
            assignedBy: req.user.id,
        });

        res.status(201).json({
            message: "Task created",
            task,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getAllTasksByProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const tasks = await taskService.getAllTasksByProject(projectId);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getTaskByUserByProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const userId = req.user.id;

        const tasks = await taskService.getTasksByUserAndProject(userId, projectId);

        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTask = async (req, res) => {
    try {
        const { projectId, taskId } = req.params;
        const task = await taskService.getTaskById(projectId, taskId);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateTask = async (req, res) => {
    try {
        const { projectId, taskId } = req.params;
        const { name, description } = req.body;

        const data = {
            name,
            description,
        }
        const updatedTask = await taskService.updateTask(taskId, projectId, data);
        res.status(200).json({
            message: "Task updated successfully",
            updatedTask,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getTaskByUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const tasks = await taskService.getTasksByUser(userId);

        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTasksWithAssignments = async (req, res) => {
    try {
        const { projectId, taskId } = req.params;
        const task = await taskService.getTaskWithAssignments(projectId, taskId);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const deleteTask = async (req, res) => {
    try {
        const { projectId, taskId } = req.params;

        await taskService.deleteTask(projectId, taskId);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}