import type { Task } from "@/shared/types/task";
import { useMemo } from "react";

export const useFilteredTasks = (tasks: Task[], filter: string) => {
    return useMemo(() => {
        if (filter === "open") {
            return tasks.filter(t => t.status === "open");
        }

        if (filter === "completed") {
            return tasks.filter(t => t.status === "completed");
        }

        return tasks;
    }, [tasks, filter]);
};
