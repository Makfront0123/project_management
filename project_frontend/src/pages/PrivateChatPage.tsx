import { useAuthStore } from "@/features/auth/store/auth_store"
import ChatWindow from "@/features/chat/components/ChatWindow"
import usePrivateChat from "@/features/chat/hooks/usePrivateChat"
import { useTeamMember } from "@/features/team/hooks/useTeamMember"
import { useParams } from "react-router"

const PrivateChatPage = () => {

  const { memberId, teamId } = useParams();

  const { user } = useAuthStore();

  const member = useTeamMember(memberId);

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
  } = usePrivateChat(
    teamId ?? "",
    user?.id ?? "",
    member?.userId._id ?? "",
  );

  return (
    <ChatWindow
      type="private"
      member={member}
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
  );

};

export default PrivateChatPage;