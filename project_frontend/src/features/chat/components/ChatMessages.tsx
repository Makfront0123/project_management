import { formatDateNumeric } from "@/shared/utils/formatDate"
import type { Message } from "../types/message"



type Props = {
    messages: Message[]
    isLoading: boolean
    isAdmin: boolean
    selectedMemberId?: string
    teamId: string
    userId: string
    deleteGlobalMessages: (teamId: string) => void
    deletePrivateMessages: (teamId: string, memberId: string, userId: string) => void
}

const ChatMessages = ({
    messages,
    isLoading,
    isAdmin,
    selectedMemberId,
    teamId,
    userId,
    deleteGlobalMessages,
    deletePrivateMessages
}: Props) => {

    if (isLoading) {
        return <p>Loading messages...</p>
    }

    return (
        <div>

            {isAdmin && (
                <button
                    className="p-2 mb-5 rounded bg-blue-600 text-white"
                    onClick={() => {
                        if (selectedMemberId) {
                            deletePrivateMessages(teamId, selectedMemberId, userId)
                        } else {
                            deleteGlobalMessages(teamId)
                        }
                    }}
                >
                    Clean Chat
                </button>
            )}

            <div className="flex flex-col gap-5">
                {messages.map((msg) => (
                    <div key={msg._id} className="p-2 rounded bg-gray-100">
                        <p className="text-sm text-gray-600">
                            <strong>
                                {msg.sender?.name || "Usuario desconocido"}
                                <span className="text-[12px] text-gray-400 font-light ml-2">
                                    {formatDateNumeric(msg.createdAt)}
                                </span>
                            </strong>

                            <span>{msg.text}</span>
                        </p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ChatMessages