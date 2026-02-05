import { useCallback } from "react";
import type { CompleteTaskParams } from "@/types/workflows";
import useNotificationStore from "@/stores/notification_store";
import { useTeamMemberStore } from "@/stores/team_member_store";
import { useTaskAssignments } from "./projectDetails/useTaskAssignments";
import { useTaskManager } from "./projectDetails/useTasksManager";

interface TaskWorkflows {
    completeTask: (params: CompleteTaskParams) => Promise<void>;
    deleteTask: (taskId: string, projectId: string) => Promise<void>;
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

    return {
        completeTask,
        deleteTask,
    };
};