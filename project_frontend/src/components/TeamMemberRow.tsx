import type { TeamMember } from "../types/teamMember";

type Props = {
  member: TeamMember;
  onDelete?: (memberId: string, teamId: string) => void;
  onAccept?: ( userId: string, teamId: string) => void;
  onReject?: (userId: string, teamId: string) => void;
};

const TeamMemberRow = ({ member, onDelete, onAccept, onReject }: Props) => {
  const isAdmin = member.role === "admin";
  const isPending = member.status === "pending";
 

  return (
    <tr className="border-b border-gray-200">
      <td className="py-2 px-4">{member.userId.name}</td>
      <td className="py-2 px-4">{member.userId.email}</td>
      <td className="py-2 px-4 capitalize">{member.role}</td>
      <td className="py-2 px-4 capitalize">{member.status}</td>
      <td className="py-2 px-4 space-x-2">
        {isPending && (
          <>
            <button
              onClick={() => onAccept?.(member?.userId._id, member.teamId)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
            >
              Aceptar
            </button>
            <button
              onClick={() => onReject?.(member?.userId._id, member.teamId)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              Rechazar
            </button>
          </>
        )}

        {!isPending && onDelete && !isAdmin && (
          <button
            onClick={() => onDelete(member._id, member.teamId)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            Eliminar
          </button>
        )}
      </td>
    </tr>
  );
};

export default TeamMemberRow;
