import { useAuthStore } from "@/features/auth/store/auth_store"
import ChatWindow from "@/features/chat/components/ChatWindow"
import useGlobalChat from "@/features/chat/hooks/useGlobalChat"
import { useParams } from "react-router"

const ChatGlobalPage = () => {

  const { teamId } = useParams()
  const { user } = useAuthStore()

  const {
    messages,
    text,
    setText,
    file,
    setFile,
    error,
    isLoading,
    isSubmitting,
    sendMessage
  } = useGlobalChat(
    teamId ?? "",
    user?.id ?? ""
  )
  return (

    <ChatWindow
      type="global"
      teamId={teamId ?? ''}
      currentUserId={user?.id ?? ""}
      messages={messages}
      text={text}
      file={file}
      error={error}
      isLoading={isLoading}
      isSubmitting={isSubmitting}
      onChange={(e) => setText(e.target.value)}
      onFileChange={setFile}
      onSubmit={sendMessage}
    />
  )

}

export default ChatGlobalPage