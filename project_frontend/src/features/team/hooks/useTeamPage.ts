
import type { TeamMember } from "@/features/team/types/teamMember"
import { useState, useEffect } from "react"
import { getTeamMembers } from "../services/team_member"

export function useTeamPage(activeTeamId: string | null) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true
    if (!activeTeamId) {
      setTeamMembers([])
      return
    }

    const fetchMembers = async () => {
      setLoading(true)
      try {
        const members = await getTeamMembers(activeTeamId)
        if (isMounted) {
          setTeamMembers(members)
        }
      } catch (err) {
        console.error("Error fetching team members:", err)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchMembers()
    return () => {
      isMounted = false
    }
  }, [activeTeamId])

  return { teamMembers, loading }
}