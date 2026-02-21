import Modal from "@/shared/components/Modal"
import { Button } from "@/shared/components/ui/button"
import { useState } from "react"

type TeamDeleteModalProps = {
    isOpen: boolean
    onClose: () => void
    teamId: string | null
    teamName?: string
    onConfirm: (teamId: string) => Promise<string>
}
const TeamDeleteModal = ({
    isOpen,
    onClose,
    teamId,
    teamName,
    onConfirm,
}: TeamDeleteModalProps) => {

    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!teamId) return

        try {
            setIsDeleting(true)
            const message = await onConfirm(teamId)
            console.log(message)
            onClose()
        } catch (error) {
            console.error(error)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Delete Team"
            footer={
                <div className="flex justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isDeleting}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                </div>
            }
        >
            <p className="text-sm text-muted-foreground">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-foreground">
                    {teamName}
                </span>
                ?
            </p>

            <p className="text-xs text-red-500 mt-2">
                This action cannot be undone.
            </p>
        </Modal>
    )
}
export default TeamDeleteModal