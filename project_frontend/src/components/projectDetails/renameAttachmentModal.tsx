import { useState, useEffect } from "react";
import Modal from "../Modal";

interface RenameAttachmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  onSubmit: (newName: string) => void;
}

const RenameAttachmentModal: React.FC<RenameAttachmentModalProps> = ({
  isOpen,
  onClose,
  currentName,
  onSubmit,
}) => {
  const [newName, setNewName] = useState(currentName);

  useEffect(() => {
    setNewName(currentName);
  }, [currentName]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">Renombrar archivo</h2>
        <input
          className="w-full border rounded px-3 py-2"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
            Cancelar
          </button>
          <button
            onClick={() => onSubmit(newName)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RenameAttachmentModal;