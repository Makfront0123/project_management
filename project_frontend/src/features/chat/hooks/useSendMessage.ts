import { useState } from "react"
import { sendMessage } from "../services/message_services"

export const useSendMessage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const send = async (
        teamId: string,
        text: string,
        file: File | null
    ) => {
        try {
            setIsSubmitting(true)

            await sendMessage(teamId, text, file)

        } finally {
            setIsSubmitting(false)
        }
    }

    return { send, isSubmitting }
}