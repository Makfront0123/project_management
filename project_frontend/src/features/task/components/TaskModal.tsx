import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import type { TaskFormValues } from "@/features/task/types/task";

interface Props {
  isOpen: boolean;
  onClose: () => void;

  values: TaskFormValues;
  errors: Partial<TaskFormValues>;

  isSubmitting: boolean;

  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;

  isEditing: boolean;
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
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">

        {/* Header */}
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar tarea" : "Crear tarea"}
          </DialogTitle>
        </DialogHeader>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Name */}
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

          {/* Description */}
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

          {/* Actions */}
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
