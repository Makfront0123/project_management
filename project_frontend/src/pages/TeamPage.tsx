import { useTeamStore } from "@/stores/team_store"
import { useTeamPage } from "@/hooks/useTeamPage"
import { Button } from "@/components/ui/button"
import { icons } from "@/shared/constants/icons"
import { Input } from "@/components/ui/input"
import { useMembersFilter } from "@/hooks/useMembersFillter"
import { usePagination } from "@/shared/hooks/usePagination"
import { useState } from "react"
import Modal from "@/shared/components/Modal"
import InviteMemberForm from "@/components/InviteMemberForm"
import { MoreHorizontal } from "lucide-react"
import { useTeamWorkflow } from "@/hooks/useTeamWorkflows"
import { AppDropdown } from "@/shared/components/AppDropdown"
import TableMembers from "@/shared/components/Table"


const TeamPage = () => {
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

  if (!activeTeamId) return <p className="text-gray-500">Loading team members...</p>
  if (loading)
    return <p className="text-gray-500">Loading team members...</p>

  return (
    <div className="flex flex-col w-full min-h-screen bg-white p-10">
      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="text-2xl font-bold">Team</h2>
          <p className="text-gray-300">
            Manage team members and their contributions
          </p>
        </div>

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

      {/* 🔥 Modal */}
      <Modal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        title="Invite Team Member"
      >
        <InviteMemberForm
          teamId={activeTeamId}
          onClose={() => setIsInviteOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default TeamPage