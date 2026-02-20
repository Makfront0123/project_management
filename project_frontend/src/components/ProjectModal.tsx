import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useForm } from "@/shared/hooks/useForm";
import { useProjectWorkflows } from "@/hooks/useProjectWorkflows";
import type { Project } from "@/shared/types/projects";


interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teamId: string | null;
  project?: Project;
}
export interface FormValues {
  name: string;
  description: string;
}

export const ProjectModal = ({
  open,
  onOpenChange,
  teamId,
  project,
}: Props) => {
  const { createProject, updateProject } = useProjectWorkflows();

  const isEditing = !!project;

  const form = useForm<FormValues>({
    initialValues: {
      name: project?.name ?? "",
      description: project?.description ?? "",
    },

    enableReinitialize: true, // 🔥 IMPORTANTE si usas values dinámicos

    validate: (values) => {
      const errors: Partial<Record<keyof FormValues, string>> = {};

      if (!values.name.trim()) {
        errors.name = "Name is required";
      }

      return errors;
    },

    onSubmit: async (values) => {
      if (isEditing && project) {
        await updateProject(project._id, {
          name: values.name,
          description: values.description,
        });
      } else {
        await createProject({
          name: values.name,
          description: values.description,
          teamId: teamId ?? "",
        });
      }

      onOpenChange(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Project" : "Create Project"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit} className="space-y-4">

          <div>
            <Input
              name="name"
              placeholder="Project name"
              value={form.values.name}
              onChange={form.handleChange}
            />

            {form.errors.name && (
              <p className="text-sm text-red-500">
                {form.errors.name}
              </p>
            )}
          </div>

          <Textarea
            name="description"
            placeholder="Description"
            value={form.values.description}
            onChange={form.handleChange}
          />

          <DialogFooter>
            <Button type="submit" disabled={form.isSubmitting}>
              {form.isSubmitting
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                  ? "Update"
                  : "Create"}
            </Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
};