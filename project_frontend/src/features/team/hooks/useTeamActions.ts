import { useState } from "react"
import type { UserTeamStatus } from "@/shared/types/userTeamStatus"
export const useTeamActions = () => {
  const [selectedTeam, setSelectedTeam] =
    useState<UserTeamStatus | null>(null)

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isLeaveOpen, setIsLeaveOpen] = useState(false)

  const openLeave = (team: UserTeamStatus) => {
    setSelectedTeam(team)
    setIsLeaveOpen(true)
  }

  const closeLeave = () => {
    setIsLeaveOpen(false)
    setSelectedTeam(null)
  }

  const openDelete = (team: UserTeamStatus) => {
    setSelectedTeam(team)
    setIsDeleteOpen(true)
  }

  const closeDelete = () => {
    setSelectedTeam(null)
    setIsDeleteOpen(false)
  }

  const openEdit = (team: UserTeamStatus) => {
    setSelectedTeam(team)
    setIsEditOpen(true)
  }

  const closeEdit = () => {
    setSelectedTeam(null)
    setIsEditOpen(false)
  }

  return {
    selectedTeam,
    isDeleteOpen,
    isEditOpen,
    isLeaveOpen,
    openDelete,
    closeDelete,
    openEdit,
    closeEdit,
    openLeave,
    closeLeave,
  }
}