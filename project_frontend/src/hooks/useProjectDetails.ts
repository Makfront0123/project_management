import type { Task } from "@/types/task";
import { useState } from "react";
import { useParams } from "react-router";
import { useAttachments } from "./projectDetails/useAttachments";
import { useProjectData } from "./projectDetails/useProjectData";
import { useProjectPermissions } from "./projectDetails/useProjectPermissions";
import { useTaskAssignments } from "./projectDetails/useTaskAssignments";
import { useTaskManager } from "./projectDetails/useTasksManager";
import { useTaskWorkflows } from "./useTaskWorkflows";
export const useProjectDetails = () => {
    const { projectId, teamId } = useParams();
    const project = useProjectData(teamId, projectId);
    const tasks = useTaskManager();
    const assignments = useTaskAssignments();
    const attachments = useAttachments(teamId);
    const permissions = useProjectPermissions(teamId);
    const { completeTask, deleteTask } = useTaskWorkflows();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [isTagModalOpen, setIsTagModalOpen] = useState(false);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

    const [editingTask, setEditingTask] = useState<Task | null>(null);

    return {
        projectId,
        teamId,

        ...project,
        ...tasks,
        ...assignments,
        ...attachments,
        ...permissions,

        isModalOpen,
        setIsModalOpen,

        showAssignModal,
        setShowAssignModal,

        isTagModalOpen,
        setIsTagModalOpen,

        isProjectModalOpen,
        setIsProjectModalOpen,

        editingTask,
        setEditingTask,

        completeTask,
        deleteTask,
    };
};