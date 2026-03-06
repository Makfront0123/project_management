import { usePagination } from "@/shared/hooks/usePagination"
import { useState } from "react"
import { useTeamStore } from "../store/team_store"
 
import { useActiveTeamRole } from "./useActiveTeamRole"
import { useMembersFilter } from "./useMembersFillter"
import { useTeamMembers } from "./useTeamMembers"

export const useTeamMembersPage = () => {
  const { activeTeamId } = useTeamStore()
  const { isAdmin } = useActiveTeamRole()

  const teamMembers = useTeamMembers(activeTeamId??'')

  const { search, setSearch, filteredMembers } =
    useMembersFilter(teamMembers)

  const {
    page,
    totalPages,
    items: paginatedMembers,
    nextPage,
    prevPage,
    setPage,
  } = usePagination(filteredMembers, 3)

  const [isInviteOpen, setIsInviteOpen] = useState(false)

  return {
    activeTeamId,
    isAdmin,
    search,
    setSearch,
    paginatedMembers,
    page,
    totalPages,
    nextPage,
    prevPage,
    setPage,
    isInviteOpen,
    openInvite: () => setIsInviteOpen(true),
    closeInvite: () => setIsInviteOpen(false),
  }
}