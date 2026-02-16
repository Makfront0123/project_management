

import { useTeamMemberStore } from "@/stores/team_member_store";
import { useTeamStore } from "@/stores/team_store";
import { useEffect } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
export function SelectGroups() {
    const { teamMemberships } = useTeamMemberStore()
    const { activeTeamId, setActiveTeam } = useTeamStore()
    useEffect(() => {
        if (!activeTeamId && teamMemberships.length) {
            setActiveTeam(teamMemberships[0].teamId)
        }
    }, [activeTeamId, teamMemberships, setActiveTeam])

    if (!teamMemberships.length) return null

    const selectedTeam = teamMemberships.find(
        (team) => team.teamId === activeTeamId
    )

    return (
        <Select
            value={activeTeamId ?? ""}
            onValueChange={setActiveTeam}
        >
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

            <SelectContent className="">
                <SelectGroup className="rounded-sm  bg-white shadow-xl flex flex-col items-start justify-center w-full min-w-[31vh] absolute top-5">
                    <SelectLabel className="text-md text-black font-medium border-b border-gray-300 px-3 py-2 w-full">
                        Teams
                    </SelectLabel>

                    {teamMemberships.map((team) => (
                        <SelectItem
                            key={team.teamId}
                            value={team.teamId}
                            className="cursor-pointer p-4"
                        >
                            {team.name}
                        </SelectItem>
                    ))}
                    <SelectItem
                        value="create"
                        className="cursor-pointer p-4 text-gray-300 mt-2 text-sm hover:text-black"
                    >
                        Create new team
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}