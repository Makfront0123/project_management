import taskService from "../services/task_service.js";
import projectService from "../services/project_service.js";

export const getTeamIdFromRequest = async (req) => {
    let teamId = req.body?.teamId || req.params?.teamId || req.query?.teamId;

    if (!teamId && req.params?.taskId) {
        const task = await taskService.findTaskById(req.params.taskId);
        const projectId = task?.projectId;

        if (projectId) {
            const project = await projectService.findProjectById(projectId);
            teamId = project?.teamId;
        }
    }

    return teamId;
};

