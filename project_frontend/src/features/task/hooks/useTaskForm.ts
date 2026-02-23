import { useEffect } from "react";

import type { Task, TaskFormValues } from "../types/task";
import { useForm } from "@/shared/hooks/useForm";
import useTaskStore from "../store/task_store";
export const useTaskForm = (
    projectId: string | undefined,
    editingTask: Task | null,
    onSuccess?: () => void
) => {
    const { createTask, updateTask } = useTaskStore();

    const validate = (values: TaskFormValues) => {
        const errors: Partial<Record<keyof TaskFormValues, string>> = {};

        if (!values.name.trim()) {
            errors.name = "El nombre es obligatorio";
        }

        return errors;
    };

    const form = useForm<TaskFormValues>({
        initialValues: {
            name: "",
            description: "",
            priority: "medium",
            dueDate: "",
            assignedUserId: null,
        },
        validate,
        onSubmit: async (values) => {
            if (!projectId) return;

            if (editingTask) {
                await updateTask(editingTask._id, values, projectId);
            } else {
                await createTask(projectId, values);
            }

            form.reset();
            onSuccess?.();
        },
    });
    useEffect(() => {
        if (!editingTask) return;

        form.setValues({
            name: editingTask.name,
            description: editingTask.description,
            priority: editingTask.priority,
            dueDate: editingTask.dueDate
                ? new Date(editingTask.dueDate).toISOString().split("T")[0]
                : "",
            assignedUserId: editingTask.assignedUsers?.[0]?._id ?? null,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingTask]);
    return form;
};