import type { TeamMember } from "@/features/team/types/teamMember"
import type { Message } from "../types/message"
import ChatInput from "./ChatInput"
import ChatMessages from "./ChatMessages"

type Props = {
    member?: TeamMember
    messages: Message[]
    isLoading: boolean
    isSubmitting: boolean
    text: string
    error?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: (e: React.FormEvent) => void
    onClean?: () => void
}

const ChatWindow = ({
    member,
    messages,
    isLoading,
    isSubmitting,
    text,
    error,
    onChange,
    onSubmit,
}: Props) => {
    if (!member) return <div className="flex items-center justify-center flex-col w-full h-full z-30">
        Click on a contact to view their status updates
    </div>
    return (
        <div className="flex flex-col w-full h-full z-30">
            <div className="h-16 border-b flex items-center px-4 bg-white">
                {member ? (
                    <div className="flex items-center gap-3">
                        <img
                            src={member.userId.image}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="font-medium">{member.userId.name}</span>
                    </div>
                ) : (
                    <span className="font-medium">Global Chat</span>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                <ChatMessages
                    messages={messages}
                    isLoading={isLoading}
                    isAdmin={false}
                    teamId=""
                    userId=""
                    deleteGlobalMessages={() => { }}
                    deletePrivateMessages={() => { }}
                />
            </div>
            <div className="p-4 border-t bg-white">
                <ChatInput
                    value={text}
                    error={error}
                    isSubmitting={isSubmitting}
                    onChange={onChange}
                    onSubmit={onSubmit}
                />
            </div>

        </div>
    )
}

export default ChatWindow