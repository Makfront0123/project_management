
import { Icon } from "@iconify/react";
import { chatNavLinks } from "@/shared/constants/navLinks";
import { NavLink, useNavigate, useParams } from "react-router";

const ChatSidebar = () => {
    const { teamId } = useParams<{ teamId: string }>();
    const navigate = useNavigate();

    return (
        <div className="bg-white flex flex-col min-w-[12vh] gap-3 p-2 shadow-lg border-r border-gray-200">
            <button
                onClick={() => navigate(`/dashboard`)}
                className="flex items-center justify-center h-14 rounded-lg text-gray-500 hover:bg-gray-100 transition"
            >
                <Icon icon="mdi:arrow-left" className="size-6" />
            </button>
            <div className="h-px bg-gray-200 my-1" />

            {chatNavLinks.map((link) => {
                const fullPath = `/team/${teamId}/chat/${link.path}`;

                return (
                    <NavLink
                        key={link.name}
                        to={fullPath}
                        end={link.path === ""}
                        className={({ isActive }) =>
                            `flex items-center justify-center h-14 rounded-lg transition
              ${isActive
                                ? "bg-blue-500 text-white"
                                : "text-gray-500 hover:bg-gray-100"
                            }`
                        }
                    >
                        <Icon icon={link.icon} className="size-6" />
                    </NavLink>
                );
            })}
        </div>
    );
};

export default ChatSidebar;

/*
const ChatSidebar = ({
    teamMembers,
    userId,
    selectedMember,
    setSelectedMember,
    getGlobalMessages,
    getPrivateMessages
}: Props) => {

    const membersToDisplay = teamMembers.filter(
        (member) => member.userId._id !== userId
    )

    return (
        <div className="bg-white flex flex-col">

            <div className="flex-shrink-0 p-10">
                <button
                    onClick={() => {
                        setSelectedMember(null)
                        getGlobalMessages()
                    }}
                    className={`p-2 w-full rounded-xl font-semibold ${!selectedMember ? "bg-blue-600 text-white" : "bg-gray-400 text-white"
                        }`}
                >
                    Chat General
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-10 pb-10 space-y-2">
                {membersToDisplay.map((member) => (
                    <button
                        key={member._id}
                        onClick={() => {
                            const selected = {
                                id: member.userId._id,
                                name: member.userId.name,
                                email: member.userId.email
                            }

                            setSelectedMember(selected)
                            getPrivateMessages(userId, selected.id)
                        }}
                        className={`p-2 w-full rounded-xl hover:opacity-70 duration-300 ${selectedMember?.id === member.userId._id
                                ? "bg-blue-600 text-white"
                                : "bg-gray-600 text-white"
                            }`}
                    >
                        {member.userId.name ?? member.userId.email}
                    </button>
                ))}
            </div>

        </div>
    )
}

export default ChatSidebar
*/