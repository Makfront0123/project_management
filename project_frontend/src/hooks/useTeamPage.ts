import { getTeamMembers } from "@/services/team_member"
import type { TeamMember } from "@/types/teamMember"
import { useState, useEffect } from "react"



export function useTeamPage(activeTeamId: string | null) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!activeTeamId) return

    const fetchMembers = async () => {
      setLoading(true)
      try {
        const members = await getTeamMembers(activeTeamId)
        setTeamMembers(members)
      } catch (err) {
        console.error("Error fetching team members:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [activeTeamId])

  return { teamMembers, loading }
}