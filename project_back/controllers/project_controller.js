import projectService from "../services/project_service.js";

export const createProject = async (req, res) => {
    try {
        const owner_id = req.user.id;
        const { name, description } = req.body;

        const { teamId } = req.params;

        if (!name || !teamId) {
            return res.status(400).json({ message: "Missing required fields: name or teamId" });
        }

        const data = {
            name,
            description,
            teamId: teamId,
            ownerId: owner_id,
        };

        const project = await projectService.createProject(data);
        res.status(201).json({
            message: "Project created successfully",
            project,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllProjects = async (req, res) => {
    try {
        const { teamId } = req.params;
        const projects = await projectService.getAllProjects(teamId);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProject = async (req, res) => {
    try {
        const { teamId, projectId } = req.params;

        const project = await projectService.getProjectById(teamId, projectId);
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProject = async (req, res) => {
    try {
        const { teamId, projectId } = req.params;


        const data = {
            name: req.body.name,
            description: req.body.description,
        }
        const updatedProject = await projectService.updateProject(teamId, projectId, data);
        res.status(200).json({
            message: "Project updated successfully",
            updatedProject,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteProject = async (req, res) => {
    try {
        const { teamId, projectId } = req.params;
        console.log("teamId:", teamId);
        console.log("projectId:", projectId);
        const deletedProject = await projectService.deleteProject(teamId, projectId);
        res.status(200).json({
            message: "Project deleted successfully",
            deletedProject,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}