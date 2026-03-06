import React from 'react'

const TeamChatPage = () => {
  return (
    <div>TeamChatPage</div>
  )
}

export default TeamChatPage


/*
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

    console.log("teamMembers", teamMembers);

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
    return (
        <div className="h-screen w-full flex p-0">

            <ChatSidebar
                teamMembers={teamMembers}
                userId={user.id}
                selectedMember={selectedMember}
                setSelectedMember={setSelectedMember}
                getGlobalMessages={() => getGlobalMessages(teamId ?? '')}
                getPrivateMessages={getPrivateMessages}
            />

            <div className="flex flex-col w-full">

                <div className="flex-1 max-h-[72vh] overflow-y-scroll bg-gray-900 p-4 rounded">
                    <ChatMessages
                        messages={messages}
                        isLoading={isLoading}
                        isAdmin={isAdmin}
                        selectedMemberId={selectedMember?.id}
                        teamId={teamId}
                        userId={user.id}
                        deleteGlobalMessages={deleteGlobalMessages}
                        deletePrivateMessages={deletePrivateMessages}
                    />
                </div>

                <ChatInput
                    value={values.message}
                    error={errors.message}
                    isSubmitting={isSubmitting}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />

            </div>

        </div>
    )
};

export default TeamChatPage;
*/