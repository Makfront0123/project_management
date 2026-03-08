import taskService from "../services/task_service.js";
import TaskAssignment from "../models/TaskAssignment.js";
import Activity from "../models/ActivityLog.js";
import Project from "../models/Project.js";
import teamMemberRepo from "../repositories/team_member_repository.js";
import notificationService from "../services/notification_service.js";
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

        const project = await Project.findById(projectId);

        await Activity.create({
            teamId: project.teamId,
            projectId,
            taskId: task._id,
            user: req.user.id,
            type: "task-created",
            message: "task created",
            metadata: {
                taskName: task.name,
                projectName: project.name
            }
        });


        if (assignedUserId) {
            const member = await teamMemberRepo.getMemberOfTeam(project.teamId, assignedUserId);

            await TaskAssignment.create({
                taskId: task._id,
                userId: assignedUserId,
                assignedBy: req.user.id,
            });

            const notificationMessage = `${req.user.name} has assigned you the task ${task.name}`;
            const notification = await notificationService.createNotification({
                recipient: assignedUserId,
                message: notificationMessage,
                type: "new_task_assignment",
                read: false,
                metadata: {
                    taskId: task._id,
                    teamId: project.teamId,
                    redirectTo: `/projects/${project._id}/tasks/${task._id}`
                }
            });
            req.io.to(`user_${assignedUserId}`).emit("newNotification", notification);
        }
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
};


export const getTaskByUser = async (req, res) => {
    try {

        const userId = req.user.id;

        const tasks = await taskService.getTasksByUser(userId);

        res.status(200).json(tasks);

    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getTaskByUserByProject = async (req, res) => {
    try {

        const { projectId } = req.params;

        const userId = req.user.id;

        const tasks = await taskService.getTasksByUserAndProject(
            userId,
            projectId
        );

        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTask = async (req, res) => {
    try {

        const { projectId, taskId } = req.params;
        const userId = req.user.id;

        const result = await taskService.findTaskWithTeam(taskId);

        if (!result) {
            return res.status(404).json({ message: "Task not found" });
        }

        const { task, teamId } = result;

        const member = await teamMemberRepo.getMemberOfTeam(teamId, userId);

        const isAdmin = member?.role === "admin";
        const isAssigned = await taskService.isTaskAssignedToUser(taskId, userId);

        if (!isAdmin && !isAssigned) {
            return res.status(403).json({ message: "Not authorized to access this task" });
        }

        const taskData = await taskService.getTaskById(projectId, taskId);

        res.status(200).json(taskData);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; export const updateTask = async (req, res) => {
    try {

        const { projectId, taskId } = req.params;
        const { name, description, priority, assignedUserId } = req.body;

        const data = { name, description, priority };

        const updatedTask = await taskService.updateTask(taskId, projectId, data);

        const project = await Project.findById(projectId);

        const currentAssignment = await TaskAssignment.findOne({ taskId });

        const currentUserId = currentAssignment?.userId?.toString();
        if (assignedUserId && assignedUserId !== currentUserId) {
            if (currentAssignment) {

                await TaskAssignment.deleteOne({ taskId });

                await Activity.create({
                    type: "task-unassigned",
                    user: req.user.id,
                    targetUser: currentAssignment.userId,
                    teamId: project.teamId,
                    projectId,
                    taskId,
                    metadata: {
                        taskName: updatedTask.name,
                        targetUserName: currentAssignment.userName
                    }
                });

                const notification = await notificationService.createNotification({
                    recipient: currentAssignment.userId,
                    message: `${req.user.name} unassigned you from task ${updatedTask.name}`,
                    type: "task_unassigned",
                    metadata: {
                        taskId,
                        projectId,
                        redirectTo: "/dashboard"
                    }
                });

                req.io.to(`user_${currentAssignment.userId}`).emit("newNotification", notification);
            }

            const member = await teamMemberRepo.getMemberOfTeam(project.teamId, assignedUserId);

            if (member) {

                await TaskAssignment.create({
                    taskId,
                    userId: assignedUserId,
                    assignedBy: req.user.id
                });

                await Activity.create({
                    type: "task-assigned",
                    user: req.user.id,
                    targetUser: assignedUserId,
                    teamId: project.teamId,
                    projectId,
                    taskId,
                    metadata: {
                        taskName: updatedTask.name,
                        projectName: project.name,
                        targetUserName: member.userName,
                        role: member.role
                    }
                });

                const notification = await notificationService.createNotification({
                    recipient: assignedUserId,
                    message: `${req.user.name} has assigned you the task ${updatedTask.name}`,
                    type: "new_task_assignment",
                    metadata: {
                        taskId,
                        projectId,
                        redirectTo: `/projects/${projectId}/tasks/${taskId}`
                    }
                });

                req.io.to(`user_${assignedUserId}`).emit("newNotification", notification);
            }
        }

        res.status(200).json({
            message: "Task updated successfully",
            updatedTask
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getTasksWithAssignments = async (req, res) => {
    try {

        const { projectId, taskId } = req.params;

        const task = await taskService.getTaskWithAssignments(
            projectId,
            taskId
        );

        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteTask = async (req, res) => {
    try {

        const { projectId, taskId } = req.params;

        const task = await taskService.getTaskById(projectId, taskId);

        await taskService.deleteTask(projectId, taskId);

        const project = await Project.findById(projectId);

        await Activity.create({
            teamId: project.teamId,
            projectId,
            taskId,
            user: req.user.id,
            type: "task-deleted",
            message: "task deleted",
            metadata: {
                taskName: task.name,
                projectName: project.name
            }
        });
        res.status(200).json({
            message: "Task deleted successfully",
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};