import { useEffect, useState } from "react";
import type { TagModalProps } from "../../types/tag";

 

const TagModal = ({ isOpen, onClose, onSubmit, initialName }: TagModalProps) => {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg space-y-4">
        <h2 className="text-xl font-bold">Editar Tag</h2>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => onSubmit(name)}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagModal;
