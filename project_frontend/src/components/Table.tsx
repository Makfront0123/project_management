import type { TeamMember } from "../types/teamMember";


import { useAuthStore } from "../stores/auth_store";

type Props = {
    member: TeamMember;
    onDelete?: (memberId: string, teamId: string) => void;
};

const Table = ({ member, onDelete }: Props) => {
    const currentUserId = useAuthStore(state => state.user?.id);

    const isSelfAdmin = member.role === 'admin' && member.userId._id === currentUserId;

    return (
        <table className="flex flex-col w-full border-collapse border p-5 border-gray-300 rounded-lg shadow-md mb-4">
            <thead className="border-b border-gray-300 p-4">
                <tr className="flex justify-between font-semibold">
                    <th className="w-1/5 text-left">Name</th>
                    <th className="w-1/5 text-left">Email</th>
                    <th className="w-1/5 text-left">Role</th>
                    <th className="w-1/5 text-left">Status</th>
                    <th className="w-1/5 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr className="flex justify-between items-center mt-2">
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
export default Table;