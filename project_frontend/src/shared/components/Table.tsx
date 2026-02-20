import { useAuthStore } from "@/features/auth/store/auth_store";
import type { TeamMember } from "@/features/team/types/teamMember";


type Props = {
    member: TeamMember;
    onDelete?: (memberId: string, teamId: string) => void;
};

const TableMembers = ({ member, onDelete }: Props) => {
    const currentUserId = useAuthStore(state => state.user?.id);

    const isSelfAdmin = member.role === 'admin' && member.userId._id === currentUserId;

    return (
        <table className="flex flex-col animate-slide-in-left w-full border-collapse border border-gray-300 rounded-lg shadow-sm mt-10">
            <thead className="border-b border-gray-300 bg-gray-200 w-full p-3">
                <tr className="flex justify-between font-semibold [&>th]:text-black">
                    <th className="w-1/5 text-left">Name</th>
                    <th className="w-1/5 text-left">Email</th>
                    <th className="w-1/5 text-left">Role</th>
                    <th className="w-1/5 text-left">Status</th>
                    <th className="w-1/5 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr className="flex justify-between items-center mt-2 text-black p-3">
                    <td className="w-1/5">{member.userId.name}</td>
                    <td className="w-1/5">{member.userId.email}</td>
                    <td className="w-1/5">{member.role}</td>
                    <td className="w-1/5">{member.status}</td>
                    <td className="w-1/5">
                        {onDelete && (
                            <button
                                disabled={isSelfAdmin}
                                className={`text-white px-3 py-1 rounded ${isSelfAdmin ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                                onClick={() => onDelete(member?.userId?._id, member.teamId)}
                            >
                                Delete
                            </button>
                        )}
                    </td>
                </tr>
            </tbody>
        </table>
    );
};
export default TableMembers;