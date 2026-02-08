import type { Task } from "@/types/task";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAttachments } from "./projectDetails/useAttachments";
import { useProjectPermissions } from "./projectDetails/useProjectPermissions";
import { useTaskAssignments } from "./projectDetails/useTaskAssignments";
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

    const tasks = useTaskManager();
    const assignments = useTaskAssignments();
    const attachments = useAttachments(teamId);
    const permissions = useProjectPermissions(teamId);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] =
        useState<Task | null>(null);

    useEffect(() => {
        if (!projectId || !teamId) return;

        getProject(projectId, teamId);
    }, [projectId, teamId, getProject]);

    return {
        projectId,
        teamId,

        currentProject,
        isLoading,

        ...tasks,
        ...assignments,
        ...attachments,
        ...permissions,

        isModalOpen,
        setIsModalOpen,

        editingTask,
        setEditingTask,
    };
};