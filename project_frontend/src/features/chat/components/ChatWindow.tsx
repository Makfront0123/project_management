import type { TeamMember } from "@/features/team/types/teamMember"
import type { Message } from "../types/message"
import ChatInput from "./ChatInput"
import ChatMessages from "./ChatMessages"
import { useEffect, useRef } from "react"

type Props = {
    type: "private" | "global"
    member?: TeamMember
    teamId: string
    currentUserId: string

    messages: Message[]
    isLoading: boolean
    isSubmitting: boolean
    text: string
    file: File | null
    error?: string

    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onFileChange: (file: File | null) => void
    onSubmit: (e: React.FormEvent) => void
}
const ChatWindow = ({
    type,
    member,
    teamId,
    currentUserId,
    messages,
    isLoading,
    isSubmitting,
    text,
    error,
    file,
    onFileChange,
    onChange,
    onSubmit
}: Props) => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])
    if (type === "private" && !member) {
        return (
            <div className="flex items-center justify-center h-full">
                Select a contact
            </div>
        )
    }

    return (

        <div className="flex flex-col w-full h-full">

            <div className="h-16 border-b flex items-center px-4 bg-white dark:bg-black">

                {type === "private" && member ? (

                    <div className="flex items-center gap-3">

                        <img
                            src={member.userId.image}
                            className="w-8 h-8 rounded-full object-cover"
                        />

                        <span className="font-medium">
                            {member.userId.name}
                        </span>

                    </div>

                ) : (

                    <span className="font-medium">
                        Global Chat
                    </span>

                )}

            </div>


            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-black">

                <ChatMessages
                    messages={messages}
                    isLoading={isLoading}
                    isAdmin={false}
                    teamId={teamId}
                    userId={currentUserId}
                    deleteGlobalMessages={() => { }}
                    deletePrivateMessages={() => { }}
                />
                <div ref={messagesEndRef} />
            </div>


            <div className="p-4 border-t bg-white dark:bg-black">

                <ChatInput
                    value={text}
                    file={file}
                    error={error}
                    isSubmitting={isSubmitting}
                    onChange={onChange}
                    onFileChange={onFileChange}
                    onSubmit={onSubmit}
                />

            </div>

        </div>

    )
}

export default ChatWindow