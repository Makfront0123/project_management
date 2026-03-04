import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/dialog";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";

import { useForm } from "@/shared/hooks/useForm";
import { useProjectWorkflows } from "@/features/project/hooks/useProjectWorkflows";
 

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teamId: string | null;
}

export interface FormValues {
  name: string;
  description: string;
}

export const ProjectModal = ({ open, onOpenChange, teamId }: Props) => {
  const { createProject } = useProjectWorkflows();

  const form = useForm<FormValues>({
    initialValues: { name: "", description: "" },
    validate: (values) => {
      const errors: Partial<Record<keyof FormValues, string>> = {};
      if (!values.name.trim()) errors.name = "Name is required";
      return errors;
    },
    onSubmit: async (values) => {
      if (!teamId) return;
      await createProject({ name: values.name, description: values.description, teamId });
      form.reset(); // limpiamos el formulario
      onOpenChange(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Project name"
            value={form.values.name}
            onChange={form.handleChange}
          />
          {form.errors.name && <p className="text-sm text-red-500">{form.errors.name}</p>}

          <Textarea
            name="description"
            placeholder="Description"
            value={form.values.description}
            onChange={form.handleChange}
          />

          <DialogFooter>
            <Button type="submit" disabled={form.isSubmitting}>
              {form.isSubmitting ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};