import Modal from "@/shared/components/Modal"
import { useForm } from "@/shared/hooks/useForm"
import { useTeamWorkflow } from "../hooks/useTeamWorkflows"
import CreateTeamForm from "./CreateTeamForm"
import type { UserTeamStatus } from "@/shared/types/userTeamStatus"

type EditTeamModalProps = {
    isOpen: boolean
    onClose: () => void
    team?: UserTeamStatus | null
}

export const EditTeamModal = ({
    isOpen,
    onClose,
    team,
}: EditTeamModalProps) => {
    const { updateTeam } = useTeamWorkflow()

    const form = useForm({
        initialValues: {
            name: team?.name ?? "",
            description: team?.description ?? "",
        },

        validate: (values) => {
            const errors: Record<string, string> = {}

            if (!values.name.trim()) {
                errors.name = "Name is required"
            }

            return errors
        },

        onSubmit: async (values) => {
            if (!team) return

            await updateTeam(
                {
                    name: values.name,
                    description: values.description,
                },
                team.teamId
            )

            onClose()
        }
    })

    return (
        <Modal
            key={team?.teamId ?? "edit"}
            isOpen={isOpen}
            onClose={onClose}
            title="Edit Workspace"
        >
            <CreateTeamForm
                form={form}
                isEditing
            />
        </Modal>
    )
}