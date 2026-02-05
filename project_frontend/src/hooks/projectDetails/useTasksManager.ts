import useTaskStore from "@/stores/task_store";
import { useEffect } from "react";
import { useParams } from "react-router";

export const useTaskManager = () => {
    const {
        tasks,
        createTask,
        getTasks,
        updateTask,
        deleteTask,
    } = useTaskStore();
    const { projectId } = useParams();

    useEffect(() => {
        getTasks(projectId ?? '');
    }, [getTasks, projectId]);

    return {
        tasks,
        createTask,
        getTasks,
        updateTask,
        deleteTask,
    };
};
