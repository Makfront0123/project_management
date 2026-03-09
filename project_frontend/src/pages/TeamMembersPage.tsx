
import { Input } from "@/shared/components/ui/input"
import Modal from "@/shared/components/Modal"
import TableMembers from "@/shared/components/Table"
import InviteMemberForm from "@/features/team/components/InviteMemberForm"
import { TeamNotFound } from "@/features/team/components/TeamNotFound"
import { useTeamMembersPage } from "@/features/team/hooks/useTeamMembersPage"
import { Button } from "@/shared/components/ui/button"
import { useNavigate } from "react-router"
import { useTeamMembersWorkflow } from "@/features/team/hooks/useTeamMembersWorkflow"
import { useState } from "react"

const TeamMembersPage = () => {
  const navigate = useNavigate()
  const {
    activeTeamId,
    isAdmin,
    search,
    setSearch,
    paginatedMembers,
    totalPages,
    page,
    nextPage,
    prevPage,
    setPage,
    isInviteOpen,
    openInvite,
    closeInvite,
  } = useTeamMembersPage()
  const [isDeleteMembersOpen, setIsDeleteMembersOpen] = useState(false)
  const openDeleteMembers = () => setIsDeleteMembersOpen(true)
  const closeDeleteMembers = () => setIsDeleteMembersOpen(false)

  const { deleteMember, deleteMembers } = useTeamMembersWorkflow(activeTeamId ?? '')

  if (!activeTeamId) {
    return (
      <div className="mt-20">
        <TeamNotFound onCreate={openInvite} />
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col w-full min-h-screen bg-white dark:bg-black p-10">
        <div className="flex items-center justify-between w-full">
          <div>
            <h2 className="text-2xl font-bold">Team</h2>
            <p className="text-gray-300">
              Manage team members and their contributions
            </p>
          </div>

          <div className="flex items-center gap-x-4">
            <Button
              onClick={() => navigate(`/team/${activeTeamId}/chat/contacts`)}
              variant={'ghost'} className="border-2 border-gray-800">
              Chat
            </Button>

            {isAdmin && (
              <div className="flex gap-x-3">
                <Button onClick={openInvite}>
                  Invite new member
                </Button>
                <Button
                  variant="destructive"
                  onClick={openDeleteMembers}
                >
                  Delete Members
                </Button>
              </div>
            )}
          </div>
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
            <ul className="space-y-2 w-full">
              {paginatedMembers.map((member) => (
                <TableMembers
                  key={member._id}
                  member={member}
                  onDelete={deleteMember}
                />
              ))}
            </ul>
          )}
          {totalPages > 1 && (
            <div className="flex gap-2 mt-10 justify-center">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 text-black"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPage(idx + 1)}
                  className={`px-3 py-1 rounded ${page === idx + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-black"
                    }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                onClick={nextPage}
                disabled={page === totalPages}
                className="px-3 py-1 bg-gray-200 text-black rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isInviteOpen}
        onClose={closeInvite}
        title="Invite Team Member"
      >
        <InviteMemberForm
          teamId={activeTeamId}
          onClose={closeInvite}
        />
      </Modal>
      <Modal
        isOpen={isDeleteMembersOpen}
        onClose={closeDeleteMembers}
        title="Delete Team Members"
        footer={
          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={closeDeleteMembers}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={async () => {
                await deleteMembers(activeTeamId)
                closeDeleteMembers()
              }}
            >
              Delete Members
            </Button>
          </div>
        }
      >
        <p className="text-gray-600 dark:text-gray-300">
          This will remove <strong>all team members</strong> except the admin.
        </p>

        <p className="text-red-500 mt-2">
          This action cannot be undone.
        </p>
      </Modal>
    </>
  )
}
export default TeamMembersPage