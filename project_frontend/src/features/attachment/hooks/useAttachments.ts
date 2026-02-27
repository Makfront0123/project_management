import useAttachmentStore from "@/features/attachment/store/attachment_store";

export const useAttachments = (teamId?: string) => {
    const {
        attachmentsByTask,
        getAllAttachmentsForTasks,
        updateAttachment,
        deleteAttachment,
        createAttachment
    } = useAttachmentStore();

    const removeAttachment = async (attachmentId: string, taskId: string) => {
        if (!teamId) return;

        await deleteAttachment(attachmentId, teamId);
        await getAllAttachmentsForTasks([taskId], teamId);
    };

    const uploadAttachment = async (file: File, taskId: string) => {
        if (!teamId) return;

        await createAttachment(taskId, teamId, file);
        await getAllAttachmentsForTasks([taskId], teamId);
    };

    const replaceAttachment = async (attachmentId: string, file: File, taskId: string) => {
        if (!teamId) return;

        await updateAttachment(attachmentId, teamId, file);
        await getAllAttachmentsForTasks([taskId], teamId);
    };

    return {
        attachmentsByTask,
        uploadAttachment,
        replaceAttachment,
        removeAttachment
    };
};