import { useParams } from "react-router";
import { useAuthStore } from "../stores/auth_store";
import { useState, useEffect } from "react";
import { useForm } from "../hooks/useForm";
import useTeamChat from "../hooks/useTeamChat";
import useMessageStore from "../stores/message_store";
import { useTeamMemberStore } from "../stores/team_member_store";
import type { User } from "../types/auth";
import usePrivateChat from "../hooks/usePrivateChat";
import type { MessageFormValues } from "../types/message";
import useMessageSound from "../hooks/useMessageSound";
import { formatDate } from "../utils/formatDate";
import { deletePrivateMessages } from "../services/message_services";



const TeamChatPage = () => {
    const { teamId } = useParams<{ teamId: string }>();
    const { user } = useAuthStore();
    const { teamMembers, fetchTeamMembers } = useTeamMemberStore();
    const [selectedMember, setSelectedMember] = useState<User | null>(null);

    const { messages, isLoading, getPrivateMessages, getGlobalMessages, deleteGlobalMessages } = useMessageStore();


    const { sendMessage: sendGlobalMessage } = useTeamChat(teamId ?? "");
    const { sendPrivateMessage } = usePrivateChat(user?.id ?? "", selectedMember?.id ?? "");
    const { playSentSound } = useMessageSound();

    const isAdmin = teamMembers.some(
        (member) => member.userId._id === user?.id && member.role === "admin"
    );

    useEffect(() => {
        if (teamId && !selectedMember) {
            getGlobalMessages(teamId);
        } else if (user && selectedMember) {
            getPrivateMessages(user.id, selectedMember.id);

        }


    }, [teamId, getGlobalMessages, selectedMember, user, getPrivateMessages]);

    useEffect(() => {
        if (teamId) {
            fetchTeamMembers(teamId);
        }
    }, [teamId, fetchTeamMembers]);


    const {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        setValues,
    } = useForm<MessageFormValues>({
        initialValues: { message: "" },
        onSubmit: async (values) => {
            if (!values.message.trim()) return;

            if (user && teamId) {
                if (selectedMember) {
                    await sendPrivateMessage(values.message);
                    await getPrivateMessages(user.id, selectedMember.id);
                } else {
                    await sendGlobalMessage(values.message, user, null);
                    await getGlobalMessages(teamId);
                }
                playSentSound();
            }
            setValues({ message: "" });
        },
        validate: (values) => {
            const errors: Partial<Record<keyof MessageFormValues, string>> = {};
            if (!values.message.trim()) {
                errors.message = "Message is required";
            }
            return errors;
        },
    });

    if (!user) return <div className="p-10 text-center">Loading user...</div>;

    const membersToDisplay = teamMembers.filter(
        (member) => member.userId._id !== user.id
    );

    return (
        <div className="h-screen w-full flex p-0">
            <div className="bg-white rounded-xl min-w-[30vh] max-h-[77.5vh] flex flex-col">
                <div className="flex-shrink-0 p-10">
                    <button
                        onClick={() => {
                            setSelectedMember(null);
                            if (teamId) {
                                getGlobalMessages(teamId);
                            }
                        }}
                        className={`p-2 w-full rounded-xl font-semibold ${!selectedMember ? "bg-blue-600 text-white" : "bg-gray-400 text-white"}`}
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
                                };
                                setSelectedMember(selected);
                                getPrivateMessages(user.id, selected.id);
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

            <div className="flex flex-col w-full">
                <div className="flex-1 max-h-[72vh] overflow-y-scroll bg-gray-900 p-4 rounded">
                    <div>
                        {isLoading ? (
                            <p>Loading messages...</p>
                        ) : (
                            <div>
                                {
                                    isAdmin && (
                                        <button className="p-2 mb-5 rounded bg-blue-600 text-white"
                                            onClick={() => {
                                                if (selectedMember) {
                                                    deletePrivateMessages(teamId ?? '', selectedMember.id, user?.id ?? '');
                                                } else {
                                                    deleteGlobalMessages(teamId ?? '');
                                                }
                                            }}>
                                            Clean Chat
                                        </button>
                                    )
                                }
                                <div className="flex flex-col gap-5">
                                    {
                                        messages.map((msg) => (
                                            <div key={msg._id} className="p-2 rounded bg-gray-100">
                                                <p className="text-sm text-gray-600">
                                                    <strong>
                                                        {msg.sender?.name || 'Usuario desconocido'}
                                                        <span className="text-[12px] text-gray-400 font-light ml-2">
                                                            {formatDate(msg.createdAt)}
                                                        </span>
                                                    </strong>
                                                    <span>{msg.text}</span>
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <div className="flex">
                        <input
                            name="message"
                            value={values.message}
                            onChange={handleChange}
                            className="flex-1 border p-2 rounded-l bg-gray-900 text-white"
                            placeholder="Mensaje para el equipo..."
                            disabled={isSubmitting}
                        />
                        <button
                            type="submit"
                            className="bg-red-600 text-white px-4 rounded-r"
                            disabled={isSubmitting}
                        >
                            Send
                        </button>
                    </div>
                    {errors.message && (
                        <span className="text-red-500 text-sm">{errors.message}</span>
                    )}
                </form>
            </div>

        </div>
    );
};

export default TeamChatPage;