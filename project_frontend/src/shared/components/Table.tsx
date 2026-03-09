import type { TeamMember } from "@/features/team/types/teamMember";
import { AppDropdown } from "./AppDropdown";
import { useActiveTeamRole } from "@/features/team/hooks/useActiveTeamRole";
import { useState } from "react";
import Modal from "./Modal";


type Props = {
    member: TeamMember;
    onDelete?: (memberId: string, teamId: string) => void;
};

const TableMembers = ({ member, onDelete }: Props) => {
    const { isAdmin } = useActiveTeamRole()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleConfirmDelete = () => {
        onDelete?.(member?.userId?._id, member.teamId)
        setIsModalOpen(false)
    }
    return (
        <>
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
                                                onClick: () => setIsModalOpen(true)
                                            },
                                        ]}
                                    />
                                </td>
                            )
                        }
                    </tr>
                </tbody>
            </table>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Remove member"
                footer={
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 rounded border"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleConfirmDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded"
                        >
                            Remove
                        </button>
                    </div>
                }
            >
                <p>
                    Are you sure you want to remove{" "}
                    <strong>{member.userId.name}</strong> from this team?
                </p>
            </Modal>
        </>
    );
};
export default TableMembers;