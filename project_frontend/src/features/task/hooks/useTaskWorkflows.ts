import { useCallback } from "react";
import type { CompleteTaskParams } from "@/shared/types/workflows";

import { useTeamMemberStore } from "@/features/team/store/team_member_store";
import { useTaskAssignments } from "./useTaskAssignments";
import { useTaskManager } from "./useTasksManager";
import type { Task, TaskPriority } from "@/features/task/types/task";
import useNotificationStore from "@/features/notification/store/notification_store";
interface TaskWorkflows {
    completeTask: (params: CompleteTaskParams) => Promise<void>;
    deleteTask: (taskId: string, projectId: string) => Promise<void>;
    updateTask: (taskId: string, data: Partial<Task>) => Promise<void>;
    createTask: (params: CreateTaskParams) => Promise<void>;
}

interface CreateTaskParams {
    name: string;
    description: string;
    projectId: string;
    priority?: TaskPriority;
    assignedUserId?: string | null;
}

export const useTaskWorkflows = (): TaskWorkflows => {

    const {
        tasks,
        createTask,
        updateTask,
        deleteTask
    } = useTaskManager();

    const assignments = useTaskAssignments();
    const { teamMembers } = useTeamMemberStore();
    const { addNotification } = useNotificationStore();

    const completeTask = useCallback(
        async ({
            taskId,
            userId,
            projectId,
            teamId,
        }: CompleteTaskParams): Promise<void> => {

            await assignments.completeAssignedTask(taskId, userId);

            await assignments.getTasksToUserAssignments(projectId);

            const completedTask = tasks.find(
                (t) => t._id === taskId
            );

            const completedMember = teamMembers.find(
                (m) => m.userId._id === userId
            );

            const adminMember = teamMembers.find(
                (m) => m.role === "admin"
            );

            if (!completedTask || !completedMember || !adminMember) {
                return;
            }

            const message = `${completedTask.name} ha sido completada por ${completedMember.userId.name}`;

            await addNotification({
                _id: projectId,
                message,
                recipient: adminMember.userId,
                read: false,
                metadata: { teamId },
                type: "task-completion",
            });

        },
        [
            assignments,
            tasks,
            teamMembers,
            addNotification,
        ]
    );

    const handleDeleteTask = useCallback(
        async (taskId: string, projectId: string): Promise<void> => {
            await deleteTask(taskId, projectId);
        },
        [deleteTask]
    );

    const handleUpdateTask = useCallback(
        async (taskId: string, data: Partial<Task>): Promise<void> => {
            await updateTask(taskId, data, data.projectId ?? '');
        },
        [updateTask]
    );

    const handleCreateTask = useCallback(
        async ({
            name,
            description,
            projectId,
            priority,
            assignedUserId,
        }: CreateTaskParams): Promise<void> => {

            await createTask(projectId, {
                name,
                description,
                priority,
                assignedUserId,
            });

        },
        [createTask]
    );

    return {
        completeTask,
        deleteTask: handleDeleteTask,
        updateTask: handleUpdateTask,
        createTask: handleCreateTask
    };
};