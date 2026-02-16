import { useState, useEffect } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select"

import { useTeamStore } from "@/stores/team_store"
import { useCreateTeamForm } from "@/hooks/useCreateTeamForm"
import { useTeamMemberStore } from "@/stores/team_member_store"
import CreateTeamForm from "./CreateTeamForm"
import Modal from "./Modal"
import { icons } from "@/core/icons"

export function SelectGroups() {
    const { teamMemberships } = useTeamMemberStore()
    const { activeTeamId, setActiveTeam } = useTeamStore()

    const [isModalOpen, setIsModalOpen] = useState(false)


    const createTeamForm = useCreateTeamForm(() => setIsModalOpen(false))


    useEffect(() => {
        if (!activeTeamId && teamMemberships.length) {
            setActiveTeam(teamMemberships[0].teamId)
        }
    }, [activeTeamId, teamMemberships, setActiveTeam])

    if (!teamMemberships.length) return null

    const selectedTeam = teamMemberships.find(
        (team) => team.teamId === activeTeamId
    )


    const handleChange = (value: string) => {
        if (value === "create") {
            setIsModalOpen(true)
            return
        }
        setActiveTeam(value)
    }

    return (
        <>
            <Select value={activeTeamId ?? ""} onValueChange={handleChange}>
                <SelectTrigger
                    className="
            w-full max-w-56
            border border-gray-300
            bg-white
            text-sm
            px-3 py-2
            rounded-md
            shadow-sm
            hover:border-gray-400
            focus:ring-2 focus:ring-primary/40
            transition
          "
                >
                    <SelectValue>
                        {selectedTeam?.name ?? "Selecciona un workspace"}
                    </SelectValue>
                </SelectTrigger>

                <SelectContent className="bg-white shadow-xl">
                    <SelectGroup>
                        <SelectLabel className="text-md text-black font-medium border-b border-gray-300 px-3 py-2">
                            Teams
                        </SelectLabel>

                        {teamMemberships.map((team) => (
                            <SelectItem
                                key={team.teamId}
                                value={team.teamId}
                                className="cursor-pointer"
                            >
                                {team.name}
                            </SelectItem>
                        ))}

                        <SelectItem
                            value="create"
                            className="cursor-pointer flex items-center opacity-50 text-gray-400"
                        >
                            <img src={icons.add} alt="Add" className="w-4 h-4" />
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