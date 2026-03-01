import useAttachmentStore from "@/features/attachment/store/attachment_store";
import { useEffect } from "react";

export const useAttachments = (teamId?: string, taskId?: string) => {

    const {
        attachmentsByTask,
        getAllAttachmentsForTasks,
        updateAttachment,
        deleteAttachment,
        createAttachment
    } = useAttachmentStore();

    useEffect(() => {
        if (!teamId || !taskId) return;
        getAllAttachmentsForTasks([taskId], teamId);
    }, [teamId, taskId, getAllAttachmentsForTasks]);

    const removeAttachment = async (attachmentId: string) => {
        console.log("remove", attachmentId)
        if (!teamId || !taskId) return;

        await deleteAttachment(attachmentId, teamId);
        await getAllAttachmentsForTasks([taskId], teamId);
    };

    const uploadAttachment = async (file: File) => {
        if (!teamId || !taskId) return;

        await createAttachment(taskId, teamId, file);
        await getAllAttachmentsForTasks([taskId], teamId);
    };

    const replaceAttachment = async (
        attachmentId: string,
        file: File
    ) => {
        if (!teamId || !taskId) return;

        await updateAttachment(attachmentId, teamId, file);
        await getAllAttachmentsForTasks([taskId], teamId);
    };

    return {
        attachments: attachmentsByTask[taskId ?? ""] || [],
        uploadAttachment,
        replaceAttachment,
        removeAttachment
    };
};