import { useCallback } from "react";
import type { CompleteTaskParams } from "@/shared/types/workflows";
import useNotificationStore from "@/stores/notification_store";
import { useTeamMemberStore } from "@/stores/team_member_store";
import { useTaskAssignments } from "../../../hooks/projectDetails/useTaskAssignments";
import { useTaskManager } from "../../../hooks/projectDetails/useTasksManager";
import type { Task, TaskPriority } from "@/features/task/types/task";

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
    const tasks = useTaskManager();
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

            const completedTask = tasks.tasks.find(
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
            tasks.tasks,
            teamMembers,
            addNotification,
        ]
    );

    const deleteTask = useCallback(
        async (taskId: string, projectId: string): Promise<void> => {
            await tasks.deleteTask(taskId, projectId);
        },
        [tasks]
    );

    const updateTask = useCallback(
        async (taskId: string, data: Partial<Task>): Promise<void> => {
            await tasks.updateTask(taskId, data, data.projectId ?? '');
        },
        [tasks]
    );

    const createTask = useCallback(
        async ({
            name,
            description,
            projectId,
            priority,
            assignedUserId,
        }: CreateTaskParams): Promise<void> => {

            await tasks.createTask(projectId, {
                name,
                description,
                priority,
                assignedUserId,
            });

        },
        [tasks]
    );
    return {
        completeTask,
        deleteTask,
        createTask,
        updateTask
    };
};