import { useEffect, useState } from "react";
import useTaskStore from "../store/task_store";

export const useTask = (projectId?: string, taskId?: string) => {
    const { tasks, getTask } = useTaskStore();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<number | null>(null);

    const task = tasks.find(t => t._id === taskId);

    useEffect(() => {
        const fetchTask = async () => {
            if (!task && projectId && taskId) {
                try {
                    setLoading(true);
                    setError(null);

                    await getTask(projectId, taskId);

                } catch (err: any) {
                    setError(err.response?.status || 500);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchTask();
    }, [projectId, taskId, task, getTask]);

    return { task, loading, error };
};