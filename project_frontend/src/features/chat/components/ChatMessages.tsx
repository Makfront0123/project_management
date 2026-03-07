import { formatDateNumeric } from "@/shared/utils/formatDate"
import type { Message } from "../types/message"
import { useAuthStore } from "@/features/auth/store/auth_store"



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
    isAdmin,
    selectedMemberId,
    teamId,
    userId,
    deleteGlobalMessages,
    deletePrivateMessages
}: Props) => {
    const { user } = useAuthStore()
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

            <div className="flex flex-col gap-8">
                {messages.map((msg: Message) => {
                    const isMine = msg.sender?._id === user?.id
                    const onlyImage = !msg.text && msg.attachments
                    return (
                        <div
                            key={msg._id}
                            className={`flex ${isMine ? "justify-end" : "justify-start"} relative mt-6`}
                        >
                            {isMine && (
                                <div className="absolute -top-6 right-0">You</div>
                            )}
                            <div
                                className={`
                                    ${onlyImage ? "min-w-[20%] " : "min-w-[60%] "} p-3 rounded-lg
                                    ${isMine
                                        ? "bg-blue-600 dark:bg-gray-700 text-white"
                                        : "bg-gray-200 text-gray-900"
                                    }
                                `}
                            >
                                {!isMine && (
                                    <p className="text-xs font-semibold">
                                        {msg.sender?.name || "Usuario desconocido"}
                                    </p>
                                )}

                                {msg.text && (
                                    <p className="text-sm">{msg.text}</p>
                                )}

                                {msg.attachments && (
                                    <img
                                        src={msg.attachments}
                                        className="max-w-[220px] w-full h-auto object-cover rounded-lg mt-2"
                                        alt="attachment"
                                    />
                                )}

                                <p className="text-[11px] opacity-70 mt-1">
                                    {formatDateNumeric(msg.createdAt)}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default ChatMessages