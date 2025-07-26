 
import React from "react";
 
import Modal from "../Modal";
import type { TaskFormValues } from "../../types/task";
 

interface Props {
  isOpen: boolean;
  onClose: () => void;
  values: TaskFormValues;
  errors: Partial<TaskFormValues>;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? "Editar tarea" : "Crear tarea"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Nombre de la tarea"
            className="border p-2 w-full rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="Descripción"
            className="border p-2 w-full rounded"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isSubmitting
            ? isEditing
              ? "Actualizando..."
              : "Creando..."
            : isEditing
            ? "Actualizar tarea"
            : "Guardar tarea"}
        </button>
      </form>
    </Modal>
  );
};

export default TaskModal;
