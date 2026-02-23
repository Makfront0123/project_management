import Modal from "@/shared/components/Modal"
import { Button } from "@/shared/components/ui/button"
import { useState } from "react"

type TeamLeaveModalProps = {
    isOpen: boolean
    onClose: () => void
    teamId: string | null
    teamName?: string
    onConfirm: (teamId: string) => Promise<void>
}

const TeamLeaveModal = ({
    isOpen,
    onClose,
    teamId,
    teamName,
    onConfirm,
}: TeamLeaveModalProps) => {

    const [isLeaving, setIsLeaving] = useState(false)

    const handleLeave = async () => {
        if (!teamId) return

        try {
            setIsLeaving(true)
            await onConfirm(teamId)
            onClose()
        } catch (error) {
            console.error(error)
        } finally {
            setIsLeaving(false)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Leave Team"
            footer={
                <div className="flex justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isLeaving}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="destructive"
                        onClick={handleLeave}
                        disabled={isLeaving}
                    >
                        {isLeaving ? "Leaving..." : "Leave"}
                    </Button>
                </div>
            }
        >
            <p className="text-sm text-muted-foreground">
                Are you sure you want to leave{" "}
                <span className="font-semibold text-foreground">
                    {teamName}
                </span>
                ?
            </p>

            <p className="text-xs text-red-500 mt-2">
                You will lose access to this team.
            </p>
        </Modal>
    )
}

export default TeamLeaveModal