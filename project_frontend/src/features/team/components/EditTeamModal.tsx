import Modal from "@/shared/components/Modal"
import { useForm } from "@/shared/hooks/useForm"
import { useTeamWorkflow } from "../hooks/useTeamWorkflows"
import CreateTeamForm from "./CreateTeamForm"
import type { UserTeamStatus } from "@/shared/types/userTeamStatus"
import { useEffect, useState } from "react"
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
    const [removeImage, setRemoveImage] = useState(false)
    const { updateTeam } = useTeamWorkflow()

    const form = useForm({
        initialValues: {
            name: "",
            description: "",
            image: null as File | string | null,
        },

        validate: (values) => {
            const errors: Record<string, string> = {}

            if (
                !values.name.trim() &&
                !values.description.trim() &&
                !values.image
            ) {
                errors.name = "You must update at least one field"
            }

            return errors
        },

        onSubmit: async (values) => {
            if (!team) return

            if (
                !values.name.trim() &&
                !values.description.trim() &&
                !values.image &&
                !removeImage
            ) {
                return
            }

            const formData = new FormData()

            if (values.name.trim()) {
                formData.append("name", values.name)
            }

            if (values.description.trim()) {
                formData.append("description", values.description)
            }

            if (values.image instanceof File) {
                formData.append("image", values.image)
            }

            if (removeImage) {
                formData.append("removeImage", "true")
            }

            await updateTeam(formData, team.team._id)

            onClose()
        }
    })

    useEffect(() => {
        if (!team || !isOpen) return

        form.setValues({
            name: team.team.name ?? "",
            description: team.team.description ?? "",
            image: team.team.image ?? null,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [team, isOpen])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Edit Workspace"
        >
            <CreateTeamForm
                form={form}
                isEditing
                onRemoveImage={() => setRemoveImage(true)}
            />
        </Modal>
    )
}