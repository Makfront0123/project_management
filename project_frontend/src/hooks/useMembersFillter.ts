import type { TeamMember } from "@/shared/types/teamMember"
import { useState, useMemo } from "react"


export type MemberStatusFilter = "all" | "accepted" | "pending" | "invited"

export const useMembersFilter = (members: TeamMember[]) => {
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState<MemberStatusFilter>("all")

    const filteredMembers = useMemo(() => {
        return members.filter((member) => {
            const matchesSearch =
                member.userId.name.toLowerCase().includes(search.toLowerCase()) ||
                member.userId.email.toLowerCase().includes(search.toLowerCase())
            const matchesStatus = status === "all" || member.status === status

            return matchesSearch && matchesStatus
        })
    }, [members, search, status])

    return {
        search,
        setSearch,
        status,
        setStatus,
        filteredMembers,
    }
}