import useAttachmentStore from "@/stores/attachment_store";
import useTagTaskStore from "@/stores/tagTask_store";
import useTaskAssignamentStore from "@/features/task/store/task_assignament_store";
import type { ProjectActions } from "@/shared/types/Modal";
import { useProjectData } from "./projectDetails/useProjectData";



export const useTaskActions = (): ProjectActions => {

    const { addTagToTask, removeTagFromTask } = useTagTaskStore();

    const {
        completeAssignedTask: completeAssignedTaskStore,
    } = useTaskAssignamentStore();

    const {
        deleteAttachment: deleteAttachmentStore,
        updateAttachment: updateAttachmentStore,
    } = useAttachmentStore();

    const { teamId } = useProjectData();

    const toggleTagOnTask = (
        taskId: string,
        tagId: string,
        isAssigned: boolean
    ) => {
        if (isAssigned) {
            removeTagFromTask(taskId, tagId);
        } else {
            addTagToTask(taskId, tagId);
        }
    };

    const completeAssignedTask = (assignmentId: string) => {
        completeAssignedTaskStore(assignmentId, teamId!);
    };

    const deleteAttachment = (attachmentId: string) => {
        if (!teamId) return;
        deleteAttachmentStore(attachmentId, teamId);
    };

    const updateAttachment = (attachmentId: string, file: File) => {
        if (!teamId) return;
        updateAttachmentStore(attachmentId, file, teamId);
    };

    return {
        deleteAttachment,
        updateAttachment,
        completeAssignedTask,
        toggleTagOnTask,
    };
};