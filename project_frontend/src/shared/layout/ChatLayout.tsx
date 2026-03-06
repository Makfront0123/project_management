import ChatBackground from "@/features/chat/components/ChatBackground";
import ChatSidebar from "@/features/chat/components/ChatSidebar";
import ContactsPage from "@/pages/ContactsPage";
import { Outlet, useMatch } from "react-router";


const ChatLayout = () => {

  const isPrivateChat = useMatch("/team/:teamId/chat/contacts/*");

  return (
    <div className="h-screen w-full flex overflow-hidden">
      <ChatSidebar />
      {isPrivateChat && (
        <ContactsPage />
      )}
      <div className="flex-1 flex bg-gray-50">
        <Outlet />
      </div>

    </div>
  );
};

export default ChatLayout;