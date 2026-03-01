import { useEffect } from "react";
import useTaskStore from "../store/task_store";

export const useTask = (projectId?: string, taskId?: string) => {
    const { tasks, getTask } = useTaskStore();

    const task = tasks.find(t => t._id === taskId);

    useEffect(() => {
        if (!task && projectId && taskId) {
            getTask(projectId, taskId);
        }
    }, [projectId, taskId, task, getTask]);

    return task;
};