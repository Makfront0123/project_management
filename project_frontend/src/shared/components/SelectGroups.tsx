import { useState, useEffect } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/shared/components/ui/select"

import { icons } from "@/shared/constants/icons"
import { useUserTeams } from "@/features/team/hooks/useUserTeam"
import { useTeamWorkflow } from "@/features/team/hooks/useTeamWorkflows"
import CreateTeamForm from "@/features/team/components/CreateTeamForm"
import Modal from "./Modal"
import { useCreateTeamForm } from "@/features/team/hooks/useCreateTeamForm"
import { generateAvatar } from "../utils/generateAvatar"

export function SelectGroups() {
    const { teamMemberships, refetch } = useUserTeams()
    const { activeTeamId, setActiveTeam } = useTeamWorkflow()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const createTeamForm = useCreateTeamForm(() => {
        refetch()
        setIsModalOpen(false)
    })
    useEffect(() => {
        if (!activeTeamId && teamMemberships.length > 0) {
            setActiveTeam(teamMemberships[0].teamId)
        }
    }, [activeTeamId, setActiveTeam, teamMemberships])

    const handleChange = (value: string) => {
        if (value === "create") {
            setIsModalOpen(true)
            return
        }

        setActiveTeam(value)
    }

    return (
        <>
            <Select
                value={activeTeamId ?? undefined}
                onValueChange={handleChange}
            >
                <SelectTrigger className="w-full max-w-56 border overflow-hidden border-gray-300 bg-white text-sm px-0 py-2 rounded-md shadow-sm hover:border-gray-400 focus:ring-2 focus:ring-primary/40 transition">
                    <SelectValue placeholder="Selecciona un workspace" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-black shadow-xl ">
                    <SelectGroup>
                        <SelectLabel className="text-md text-black font-medium border-b border-gray-300 px-3 py-4">
                            Teams
                        </SelectLabel>

                        {teamMemberships.map((membership) => (
                            <SelectItem
                                key={membership.team._id}
                                value={membership.team._id}
                                className="cursor-pointer flex items-center gap-x-4"
                            >
                                <img
                                    src={
                                        membership.team.image ??
                                        generateAvatar(membership.team.name).avatar
                                    }
                                    alt={membership.team.name}
                                    className="w-10 h-10 rounded-md"
                                />
                                <span className="dark:text-white text-black">
                                    {membership.team.name}
                                </span>
                            </SelectItem>
                        ))}
                        <SelectItem
                            value="create"
                            className="cursor-pointer flex items-center opacity-50 text-gray-400"
                        >
                            <img
                                src={icons.add}
                                alt="Add"
                                className="w-4 h-4"
                            />
                            Create new team
                        </SelectItem>

                    </SelectGroup>
                </SelectContent>
            </Select>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create new workspace"
            >
                <CreateTeamForm form={createTeamForm} />
            </Modal>
        </>
    )
}