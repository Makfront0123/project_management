import CreateTeamForm from "@/features/team/components/CreateTeamForm"
import { TeamCard } from "@/features/team/components/TeamCard"
import TeamDeleteModal from "@/features/team/components/TeamDeleteModal"
import { TeamNotFound } from "@/features/team/components/TeamNotFound"
import { useCreateTeamForm } from "@/features/team/hooks/useCreateTeamForm"
import { useTeamActions } from "@/features/team/hooks/useTeamActions"
import { useTeamWorkflow } from "@/features/team/hooks/useTeamWorkflows"
import { useUserTeams } from "@/features/team/hooks/useUserTeam"
import Modal from "@/shared/components/Modal"
import { Button } from "@/shared/components/ui/button"
import { icons } from "@/shared/constants/icons"
import { useState } from "react"
import { useNavigate } from "react-router"


const TeamPage = () => {
    const { teamMemberships } = useUserTeams()
    const { setActiveTeam, activeTeamId, deleteTeam } = useTeamWorkflow()
    const navigate = useNavigate()

    const {
        selectedTeam,
        isDeleteOpen,
        isEditOpen,
        openDelete,
        closeDelete,
        openEdit,
        closeEdit,
    } = useTeamActions()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const createTeamForm = useCreateTeamForm(() =>
        setIsModalOpen(false)
    )

    const handleSelectTeam = (teamId: string) => {
        setActiveTeam(teamId)
        navigate("/dashboard")
    }

    return (
        <>
            {!activeTeamId ? (
                <div className="mt-20">
                    <TeamNotFound onCreate={() => setIsModalOpen(true)} />
                </div>
            ) : (
                <div className="flex flex-col p-8">
                    <div className="flex items-center justify-between mb-10">
                        <h1 className="font-bold text-xl">Teams</h1>

                        <Button onClick={() => setIsModalOpen(true)}>
                            <img src={icons.add} alt="Add" className="w-4 h-4" />
                            Create new team
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teamMemberships.map((team) => (
                            <TeamCard
                                key={team.teamId}
                                name={team.name}
                                role={team.role}
                                createdAt={team.createdAt}
                                members={team.members}
                                onClick={() => handleSelectTeam(team.teamId)}
                                onEdit={() => openEdit(team)}
                                onDelete={() => openDelete(team)}
                            />
                        ))}
                    </div>
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create new workspace"
            >
                <CreateTeamForm form={createTeamForm} />
            </Modal>
            <TeamDeleteModal
                isOpen={isDeleteOpen}
                onClose={closeDelete}
                teamId={selectedTeam?.teamId ?? null}
                teamName={selectedTeam?.name}
                onConfirm={deleteTeam}
            />
            <Modal
                isOpen={isEditOpen}
                onClose={closeEdit}
                title="Edit Team"
            >
                {selectedTeam && (
                    <CreateTeamForm
                        form={createTeamForm}
                    />
                )}
            </Modal>
        </>
    )
}

export default TeamPage