import useTaskStore from "@/features/task/store/task_store";
import { useEffect } from "react";

export const useTaskManager = (projectId?: string) => {
    const { tasks, getTasks, createTask, updateTask, deleteTask } = useTaskStore();

    useEffect(() => {
        if (!projectId) return;
        getTasks(projectId);
    }, [projectId, getTasks]);

    return {
        tasks,
        createTask,
        updateTask,
        deleteTask,
    };
};
