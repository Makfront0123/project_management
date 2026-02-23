
import { Input } from "@/shared/components/ui/input"
import Modal from "@/shared/components/Modal"
import TableMembers from "@/shared/components/Table"
import InviteMemberForm from "@/features/team/components/InviteMemberForm"
import { TeamNotFound } from "@/features/team/components/TeamNotFound"
import { useTeamMembersPage } from "@/features/team/hooks/useTeamMembersPage"
import { Button } from "@/shared/components/ui/button"

const TeamMembersPage = () => {
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

          {isAdmin && (
            <Button onClick={openInvite}>
              Invite new member
            </Button>
          )}
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
                />
              ))}
            </ul>
          )}
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
    </>
  )
}
export default TeamMembersPage