import useAttachmentStore from "@/features/attachment/store/attachment_store";

export const useAttachments = (teamId?: string) => {
    const {
        attachmentsByTask,
        getAllAttachmentsForTasks,
        updateAttachment,
        deleteAttachment,
    } = useAttachmentStore();

    const removeAttachment = async (id: string, taskId: string) => {
        if (!teamId) return;

        await deleteAttachment(id, teamId);
        await getAllAttachmentsForTasks([taskId], teamId);
    };

    return {
        attachmentsByTask,
        getAllAttachmentsForTasks,
        updateAttachment,
        removeAttachment,
    };
};
