import { useTeamStore } from "@/features/team/store/team_store"
import { useTeamPage } from "@/features/team/hooks/useTeamPage"
import { Button } from "@/shared/components/ui/button"
import { icons } from "@/shared/constants/icons"
import { Input } from "@/shared/components/ui/input"
import { useMembersFilter } from "@/features/team/hooks/useMembersFillter"
import { usePagination } from "@/shared/hooks/usePagination"
import { useState } from "react"
import Modal from "@/shared/components/Modal"

import { MoreHorizontal } from "lucide-react"
import { useTeamWorkflow } from "@/features/team/hooks/useTeamWorkflows"
import { AppDropdown } from "@/shared/components/AppDropdown"
import TableMembers from "@/shared/components/Table"
import InviteMemberForm from "@/features/team/components/InviteMemberForm"
import { useCreateTeamForm } from "@/features/team/hooks/useCreateTeamForm"
import { TeamNotFound } from "@/features/team/components/TeamNotFound"
import CreateTeamForm from "@/features/team/components/CreateTeamForm"
import { useActiveTeamRole } from "@/features/team/hooks/useActiveTeamRole"


const TeamMembersPage = () => {
  const { activeTeamId } = useTeamStore()
  const { teamMembers, loading } = useTeamPage(activeTeamId)
  const { search, setSearch, filteredMembers } = useMembersFilter(teamMembers)
  const { deleteTeam } = useTeamWorkflow()
  const {
    page,
    totalPages,
    items: paginatedMembers,
    nextPage,
    prevPage,
    setPage,
  } = usePagination(filteredMembers, 3)

  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isAdmin } = useActiveTeamRole()
  const createTeamForm = useCreateTeamForm(() =>
    setIsModalOpen(false)
  )
  if (loading)
    return <p className="text-gray-500">Loading team members...</p>

  return (
    <>
      {
        !activeTeamId ? (
          <div className="mt-20">
            <TeamNotFound onCreate={() => setIsModalOpen(true)} />
          </div>
        ) : (
          <div className="flex flex-col w-full min-h-screen bg-white p-10">
            <div className="flex items-center justify-between w-full">
              <div>
                <h2 className="text-2xl font-bold">Team</h2>
                <p className="text-gray-300">
                  Manage team members and their contributions
                </p>
              </div>

              {
                isAdmin && (
                  <div className="flex items-center gap-x-2">
                    <Button onClick={() => setIsInviteOpen(true)}>
                      <img src={icons.sidebar03} alt="Add" className="w-5 h-5" />
                      Invite new member
                    </Button>
                    <AppDropdown
                      trigger={<MoreHorizontal className="size-6" />}
                      items={[
                        {
                          label: "Edit", onClick:
                            () => { }
                        },
                        { label: "Delete", onClick: () => deleteTeam(activeTeamId ?? ''), variant: "destructive" },
                      ]}
                    />
                  </div>
                )
              }
            </div>

            <Input
              className="max-w-[15rem] mt-5"
              placeholder="Search Team Members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex flex-col items-center mt-5 w-full">
              {paginatedMembers.length === 0 ? (
                <p className="text-gray-500">No members found.</p>
              ) : (
                <>
                  <ul className="space-y-2 w-full">
                    {paginatedMembers
                      .filter(
                        (member) =>
                          member.teamId === activeTeamId &&
                          member.status === "accepted"
                      )
                      .map((member) => (
                        <TableMembers key={member._id} member={member} />
                      ))}
                  </ul>

                  {totalPages > 1 && (
                    <div className="flex gap-2 mt-10 justify-center">
                      <button
                        onClick={prevPage}
                        disabled={page === 1}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                      >
                        Prev
                      </button>

                      {[...Array(totalPages)].map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setPage(idx + 1)}
                          className={`px-3 py-1 rounded ${page === idx + 1
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200"
                            }`}
                        >
                          {idx + 1}
                        </button>
                      ))}

                      <button
                        onClick={nextPage}
                        disabled={page === totalPages}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>


          </div>
        )
      }

      <Modal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        title="Invite Team Member"
      >d
        <InviteMemberForm
          teamId={activeTeamId}
          onClose={() => setIsInviteOpen(false)}
        />
      </Modal>
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

export default TeamMembersPage