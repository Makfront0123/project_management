import taskAssignmentService from "../services/task_assignment_service.js";
import taskService from "../services/task_service.js";
import teamMemberRepo from "../repositories/team_member_repository.js";

export const assignUserToTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { userId } = req.body;
        const assignedBy = req.user.id;

        if (!userId || !assignedBy) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const result = await taskService.findTaskWithTeam(taskId);
        console.log("result:", result);
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


        const data = { taskId, userId, assignedBy };
        const taskAssignment = await taskAssignmentService.createTaskAssignment(data);



        res.status(201).json({
            message: "Task assignment created successfully",
            taskAssignment,
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

        const deleted = await taskAssignmentService.removeUserFromTask(taskId, userId);
        console.log("deleted:", deleted);
        if (!deleted) {
            return res.status(404).json({ message: "User is not assigned to task" });
        }

        res.status(200).json({
            message: "User removed from task successfully",
            deleted
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
