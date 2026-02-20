import { useState } from "react"
import { useTeamMemberStore } from "@/stores/team_member_store"

export const useInviteMember = (teamId: string) => {
    const teamMemberStore = useTeamMemberStore()

    const [email, setEmail] = useState("")
    const [role, setRole] = useState<"admin" | "member">("member")
    const [loading, setLoading] = useState(false)

    const inviteMember = async () => {
        if (!email.trim()) return false

        try {
            setLoading(true)

            await teamMemberStore.inviteMember(
                teamId,
                email,
                role
            )

            setEmail("")
            setRole("member")

            return true
        } finally {
            setLoading(false)
        }
    }

    return {
        email,
        setEmail,
        role,
        setRole,
        loading,
        inviteMember,
    }
}