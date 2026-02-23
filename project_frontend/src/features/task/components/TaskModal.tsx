import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";

import type { TaskFormValues } from "@/features/task/types/task";
import type { TeamMember } from "@/features/team/types/teamMember";

interface Props {
  isOpen: boolean;
  onClose: () => void;

  values: TaskFormValues;
  errors: Partial<Record<keyof TaskFormValues, string>>;
  isSubmitting: boolean;

  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;

  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;

  isEditing: boolean;
  teamMembers: TeamMember[];
}

const TaskModal: React.FC<Props> = ({
  isOpen,
  onClose,
  values,
  errors,
  isSubmitting,
  handleChange,
  handleSubmit,
  isEditing,
  teamMembers
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar tarea" : "Crear tarea"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="space-y-1">
            <Input
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Nombre de la tarea"
            />

            {errors.name && (
              <p className="text-sm text-red-500">
                {errors.name}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder="Descripción"
              rows={4}
            />

            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <select
              name="priority"
              value={values.priority}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div className="space-y-1">
            <Input
              type="date"
              name="dueDate"
              value={values.dueDate ?? ""}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <select
              name="assignedUserId"
              value={values.assignedUserId ?? ""}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            >
              <option value="">Sin asignar</option>
              {teamMembers
                .filter(
                  (member) =>
                    member.role !== "admin" &&
                    member.status === "accepted"
                )
                .map((member) => (
                  <option
                    key={member.userId._id}
                    value={member.userId._id}
                  >
                    {member.userId.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">

            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? isEditing
                  ? "Actualizando..."
                  : "Creando..."
                : isEditing
                  ? "Actualizar"
                  : "Guardar"}
            </Button>

          </div>
        </form>

      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
