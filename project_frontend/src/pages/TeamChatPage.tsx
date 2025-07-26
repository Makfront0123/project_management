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



const TeamChatPage = () => {
    const { teamId } = useParams<{ teamId: string }>();
    const { user } = useAuthStore();
    const { teamMembers, fetchTeamMembers } = useTeamMemberStore();
    const [selectedMember, setSelectedMember] = useState<User | null>(null);

    const { messages, isLoading, getPrivateMessages, getGlobalMessages } = useMessageStore();


    const { sendMessage: sendGlobalMessage } = useTeamChat(teamId ?? "");
    const { sendPrivateMessage } = usePrivateChat(user?.id ?? "", selectedMember?.id ?? "");
    const { playSentSound } = useMessageSound();



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
                    sendPrivateMessage(values.message);
                } else {
                    sendGlobalMessage(values.message, user, null);
                }

                playSentSound();
            }
            setValues({ message: "" });
        },
        validate: (values) => {
            const errors: Partial<Record<keyof MessageFormValues, string>> = {};
            if (!values.message.trim()) {
                errors.message = "El mensaje no puede estar vacío.";
            }
            return errors;
        },
    });

    if (!user) return <div className="p-10 text-center">Cargando usuario...</div>;

    const membersToDisplay = teamMembers.filter(
        (member) => member.userId._id !== user.id
    );

    return (
        <div className="h-screen w-screen flex p-20">
            <div className="bg-gray-200 rounded-xl min-w-[30vh] h-full">
                <div className="flex flex-col p-10 gap-y-2">
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
                <div className="flex flex-col min-h-[72vh] overflow-y-auto bg-gray-100 p-4 rounded">
                    <div className="mt-4 space-y-2">
                        {isLoading ? (
                            <p>Cargando mensajes...</p>
                        ) : (
                            messages.map((msg) => (
                                <div key={msg._id} className="p-2 rounded bg-gray-100">
                                    <p className="text-sm text-gray-600">
                                        <strong>{msg.sender?.name || 'Usuario desconocido'}</strong>: {msg.text}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2">
                    <div className="flex">
                        <input
                            name="message"
                            value={values.message}
                            onChange={handleChange}
                            className="flex-1 border p-2 rounded-l"
                            placeholder="Mensaje para el equipo..."
                            disabled={isSubmitting}
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 rounded-r"
                            disabled={isSubmitting}
                        >
                            Enviar
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