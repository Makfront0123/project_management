import { useCallback, useEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client"

import type { Message } from "../types/message"
import { uploadMessageAttachment } from "@/features/attachment/services/attachment_services"
import useMessageStore from "../store/message_store"
import useMessageSound from "./useMessageSound"

const useGlobalChat = (
    teamId: string,
    fromUserId: string
) => {

    const { messages, isLoading, getGlobalMessages, addMessage } = useMessageStore()
    const { playReceivedSound, playSentSound } = useMessageSound()

    const socketRef = useRef<Socket | null>(null)

    const [file, setFile] = useState<File | null>(null)
    const [text, setText] = useState("")
    const [error, setError] = useState<string | undefined>()
    const [isSubmitting, setIsSubmitting] = useState(false)

    // cargar historial
    useEffect(() => {

        if (teamId) {
            getGlobalMessages(teamId)
        }

    }, [teamId, getGlobalMessages])


    // socket
    useEffect(() => {

        socketRef.current = io(import.meta.env.VITE_API_SOCKET_URL, {
            withCredentials: true,
            transports: ["websocket"]
        })

        const socket = socketRef.current

        socket.on("connect", () => {

            console.log("✅ Socket conectado:", socket.id)

            socket.emit("joinTeamRoom", teamId)

        })

        socket.on("newMessage", (message: Message) => {

            console.log("NEW MESSAGE", message)

            addMessage(message)
            playReceivedSound()

        })

        return () => {

            socket.off("newMessage")
            socket.disconnect()

        }

    }, [teamId, addMessage, playReceivedSound])


    const sendMessage = useCallback(async (e: React.FormEvent) => {

        e.preventDefault()

        if (!text.trim() && !file) {
            setError("Message or attachment required")
            return
        }

        try {

            setIsSubmitting(true)

            let attachmentUrl: string | undefined

            if (file) {

                const upload = await uploadMessageAttachment(
                    teamId,
                    file
                )

                attachmentUrl = upload.url

            }

            socketRef.current?.emit("sendMessage", {
                teamId,
                text,
                attachments: attachmentUrl,
                sender: {
                    _id: fromUserId
                }
            })

            playSentSound()

            setText("")
            setFile(null)
            setError(undefined)

        } catch (err) {

            console.error(err)
            setError("Failed to send message")

        } finally {

            setIsSubmitting(false)

        }

    }, [text, file, teamId, fromUserId, playSentSound])


    return {
        messages,
        text,
        setText,
        error,
        isLoading,
        isSubmitting,
        sendMessage,
        file,
        setFile
    }

}

export default useGlobalChat