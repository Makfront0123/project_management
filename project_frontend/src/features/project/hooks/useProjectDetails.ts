import { useEffect } from "react";
import { useParams } from "react-router";

import { useProjectPermissions } from "./useProjectPermissions";

import { useTaskManager } from "../../task/hooks/useTasksManager";
import { useProjectStore } from "@/features/project/store/project_store";

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