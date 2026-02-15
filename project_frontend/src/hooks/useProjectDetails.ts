import { useEffect } from "react";
import { useParams } from "react-router";

import { useProjectPermissions } from "./projectDetails/useProjectPermissions";

import { useTaskManager } from "./projectDetails/useTasksManager";
import { useProjectStore } from "@/stores/project_store";

export const useProjectDetails = () => {
    const { projectId, teamId } = useParams<{
        projectId: string;
        teamId: string;
    }>();

    const currentProject = useProjectStore(s => s.currentProject);
    const isLoading = useProjectStore(s => s.isLoadingProject);
    const getProject = useProjectStore(s => s.getProject);

    const { tasks } = useTaskManager(projectId);
    const { isAdmin } = useProjectPermissions(teamId);

    useEffect(() => {
        if (!projectId || !teamId) return;
        getProject(projectId, teamId);
    }, [projectId, teamId, getProject]);

    return {
        projectId,
        teamId,
        currentProject,
        tasks,
        isAdmin,
        isLoading,
    };
};