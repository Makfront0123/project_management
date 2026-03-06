import { useAuthStore } from "@/features/auth/store/auth_store"
import ChatWindow from "@/features/chat/components/ChatWindow"
import usePrivateChat from "@/features/chat/hooks/usePrivateChat"
import { useTeamMember } from "@/features/team/hooks/useTeamMember"
import { useParams } from "react-router"
const PrivateChatPage = () => {

  const { memberId } = useParams()
  const { user } = useAuthStore()
  const member = useTeamMember(memberId)
  const {
    messages,
    text,
    error,
    isLoading,
    isSubmitting,
    sendMessage,
    setText
  } = usePrivateChat(user?.id ?? "", memberId ?? "")



  return (
    <ChatWindow
      member={member}
      messages={messages}
      text={text}
      error={error}
      isLoading={isLoading}
      isSubmitting={isSubmitting}
      onChange={(e) => setText(e.target.value)}
      onSubmit={sendMessage}
    />
  )
}

export default PrivateChatPage