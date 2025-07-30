import type { Member } from "../../types/teamMember";
import Modal from "../Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  acceptedMembers: Member[];
  selectedUserId: string;
  setSelectedUserId: (val: string) => void;
  onAssign: () => void;
}

const AssignTaskModal: React.FC<Props> = ({
  isOpen,
  onClose,
  acceptedMembers,
  selectedUserId,
  setSelectedUserId,
  onAssign,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Asignar tarea a un miembro">
      <div className="space-y-4">
        <label className="block font-semibold">Member of the team</label>
        <select
          className="w-full border p-2 rounded"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">Select a member</option>
          {acceptedMembers.map((member) => (
            <option key={member._id} value={member.userId._id}>
              {member.userId.name} ({member.userId.email})
            </option>
          ))}
        </select>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
          disabled={!selectedUserId}
          onClick={onAssign}
        >
          Assign Task
        </button>
      </div>
    </Modal>
  );
};

export default AssignTaskModal;
