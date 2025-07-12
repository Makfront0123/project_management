import type { TeamMember } from "../types/teamMember";
import TeamMemberRow from "./TeamMemberRow";

type Props = {
  members: TeamMember[];
  onDelete?: (memberId: string, teamId: string) => void;
  onAccept?: (memberId: string, teamId: string) => void;
  onReject?: (userId: string, teamId: string) => void;
};

const TeamMemberTable = ({ members, onDelete, onAccept, onReject }: Props) => {
  return (
    <div className="overflow-x-auto shadow rounded-lg border border-gray-300 mt-6">
      <table className="min-w-full text-sm text-left bg-white">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="py-2 px-4">Nombre</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Rol</th>
            <th className="py-2 px-4">Estado</th>
            <th className="py-2 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <TeamMemberRow
              key={member._id}
              member={member}
              onDelete={onDelete}
              onAccept={onAccept}
              onReject={onReject}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamMemberTable;
