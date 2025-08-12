import taskAssignmentService from "../services/task_assignment_service.js";
import taskService from "../services/task_service.js";
import teamMemberRepo from "../repositories/team_member_repository.js";
import notificationService from "../services/notification_service.js";
import projectService from "../services/project_service.js";
export const assignUserToTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { userId } = req.body;
        const assignedBy = req.user.id;

        if (!userId || !assignedBy) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const result = await taskService.findTaskWithTeam(taskId);
        if (!result) {
            return res.status(404).json({ message: "Task or Project not found" });
        }

        const { task, teamId } = result;

        const member = await teamMemberRepo.getMemberOfTeam(teamId, userId);
        if (!member || member.status !== "accepted") {
            return res.status(403).json({ message: "User is not a valid member of this team" });
        }


        const existingAssignment = await taskAssignmentService.getUserAssignedToTask(taskId, userId);
        if (existingAssignment) {
            return res.status(409).json({ message: "User already assigned to task" });
        }

        const MAX_ASSIGNMENTS = 3;
        const currentAssignments = await taskAssignmentService.getTasksAssignedToUser(userId);

        if (currentAssignments.length >= MAX_ASSIGNMENTS) {
            return res.status(403).json({ message: "You can only assign up to 3 users to a task" });
        }


        const data = { taskId, userId, assignedBy };
        const taskAssignment = await taskAssignmentService.createTaskAssignment(data);

        const notificationMessage = `${req.user.name} has assigned you the task ${task.name}`;
        const notification = await notificationService.createNotification({
            recipient: userId,
            message: notificationMessage,
            type: "new_task_assignment",
            read: false,
            metadata: {
                taskId,
                teamId,
                redirectTo: `/team/${teamId}/projects/${task.projectId}/tasks/${task._id}`
            }
        });
        req.io.to(`user_${userId}`).emit("newNotification", notification);



        res.status(201).json({
            message: "Task assignment created successfully",
            taskAssignment,
            notification
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeUserFromTask = async (req, res) => {
    try {
        const { taskId, userId } = req.params;

        if (!taskId || !userId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const task = await taskService.findTaskById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const deleted = await taskAssignmentService.removeUserFromTask(taskId, userId);
        console.log("deleted:", deleted);
        if (!deleted) {
            return res.status(404).json({ message: "User is not assigned to task" });
        }

        const notificationMessage = `${req.user.name} has removed your assignment to the task ${task.name}`;
        const notification = await notificationService.createNotification({
            recipient: userId,
            message: notificationMessage,
            type: "task_unassignment",
            read: false,
            metadata: {
                taskId,
                teamId: task.teamId,
                redirectTo: `/team/${task.teamId}/projects/${task.projectId}/tasks/${task._id}`
            }
        });

        req.io.to(`user_${userId}`).emit("newNotification", notification);
        res.status(200).json({
            message: "User removed from task successfully",
            deleted,
            notification
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAllUsersAssignedToTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const users = await taskAssignmentService.getAllUsersAssignedToTask(taskId);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserAssignedToTask = async (req, res) => {
    try {
        const { taskId, userId } = req.params;
        const user = await taskAssignmentService.getUserAssignedToTask(taskId, userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTasksAssignedToUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await taskAssignmentService.getTasksAssignedToUser(userId);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const completeAssignedTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const userId = req.user.id;

        const assignment = await taskAssignmentService.getUserAssignedToTask(taskId, userId);
        if (!assignment) {
            return res.status(403).json({ message: "You are not assigned to this task" });
        }

        await taskService.markTaskAsCompleted(taskId);
        
        const task = await taskService.findTaskById(taskId);
        const project = await projectService.findProjectById(task.projectId);
        const admin = project.ownerId

        const notificationMessage = `${req.user.name} has marked the task ${task.name} as completed`;
        const notification = await notificationService.createNotification({
            recipient: admin,
            message: notificationMessage,
            type: "task_completed",
            read: false,
            metadata: {
                taskId,
                teamId: task.teamId,
                redirectTo: `/team/${task.teamId}/projects/${task.projectId}/tasks/${task._id}`
            }
        });

        req.io.to(`user_${userId}`).emit("newNotification", notification);

        res.status(200).json({ message: "Task marked as completed and assignment removed", notification });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAllAssignmentsByTaskId = async (req, res) => {
    try {
        const { taskId } = req.params;
        const deleted = await taskAssignmentService.deleteByTaskId(taskId);
        res.status(200).json({ message: "Assignments deleted successfully", deleted });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
