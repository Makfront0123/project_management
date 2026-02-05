interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const ProjectModal = ({ isOpen, onClose, onSave }: ProjectModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 space-y-4">
        <h2 className="text-xl font-bold">Edit Project</h2>

        {/* Aquí luego tu form */}

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={onSave}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
