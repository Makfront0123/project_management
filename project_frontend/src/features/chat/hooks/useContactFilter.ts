import type { TeamMember } from "@/features/team/types/teamMember"
import { useState, useMemo } from "react"

export const useContactsFilter = (members: TeamMember[]) => {
    const [search, setSearch] = useState("")

    const filteredContacts = useMemo(() => {
        return members.filter((member) =>
            member.userId.name.toLowerCase().includes(search.toLowerCase())
        )
    }, [members, search])

    return {
        search,
        setSearch,
        filteredContacts,
    }
}