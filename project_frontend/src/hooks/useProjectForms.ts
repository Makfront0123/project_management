import { useForm } from "@/hooks/useForm";
import { useProjectStore } from "@/stores/project_store";
import useTaskStore from "@/stores/task_store";
import type { Project } from "@/types/projects";
import type { Task } from "@/types/task";


export const useProjectForm = (
    projectId: string | undefined,
    teamId: string | undefined,
    editingTask: Task,
    isEditingProject: boolean,
    currentProject: Project
) => {
    const { createTask, updateTask } = useTaskStore();
    const { updateProject } = useProjectStore();

    const validate = (values: any) => {
        const errors: any = {};
        if (!values.name.trim()) errors.name = "El nombre es obligatorio";
        if (!values.description.trim())
            errors.description = "La descripción es obligatoria";
        return errors;
    };

    const form = useForm({
        initialValues: { name: "", description: "" },
        validate,
        onSubmit: async (formValues) => {
            if (!projectId) return;

            if (isEditingProject) {
                await updateProject(projectId, currentProject, teamId!);
            } else if (editingTask) {
                await updateTask(editingTask._id, formValues, projectId);
            } else {
                await createTask(projectId, formValues);
            }
        },
    });

    return form;
};