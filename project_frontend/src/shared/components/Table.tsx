import type { TeamMember } from "@/features/team/types/teamMember";
import { AppDropdown } from "./AppDropdown";
import { useActiveTeamRole } from "@/features/team/hooks/useActiveTeamRole";


type Props = {
    member: TeamMember;
    onDelete?: (memberId: string, teamId: string) => void;
};

const TableMembers = ({ member, onDelete }: Props) => {
    const { isAdmin } = useActiveTeamRole()

    return (
        <table className="flex flex-col w-full border-collapse border overflow-hidden border-gray-300 rounded-lg shadow-sm mt-10">
            <thead className="border-b border-gray-300 bg-gray-200 dark:bg-black w-full p-3">
                <tr className="flex justify-evenly font-semibold [&>th]:text-black dark:[&>th]:text-white">
                    <th className="w-1/5 text-left">Name</th>
                    <th className="w-1/5 text-left">Email</th>
                    <th className="w-1/5 text-left">Role</th>
                    <th className="w-1/5 text-left">Status</th>
                    <th className="w-1/5 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr className="flex justify-evenly items-center text-black dark:text-white p-3 dark:bg-gray-900 bg-white">
                    <td className="w-1/5">{member.userId.name}</td>
                    <td className="w-1/5">{member.userId.email}</td>
                    <td className="w-1/5">{member.role}</td>
                    <td className="w-1/5">{member.status}</td>
                    {
                        isAdmin && (
                            <td className="w-1/5 flex justify-start">
                                <AppDropdown
                                    trigger={
                                        <button className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800">
                                            ⋮
                                        </button>
                                    }
                                    items={[
                                        {
                                            label: "Remove member",
                                            variant: "destructive",
                                            onClick: () =>
                                                onDelete?.(member?.userId?._id, member.teamId),
                                        },
                                    ]}
                                />
                            </td>
                        )
                    }
                </tr>
            </tbody>
        </table>
    );
};
export default TableMembers;