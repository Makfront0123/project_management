import type { Attachment } from "@/shared/types/attachment";
import type { Tag } from "@/shared/types/tag";
import type { Task } from "@/features/task/types/task";
import { useState } from "react";


export const useProjectModals = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [selectedUserId, setSelectedUserId] = useState("");

    const [isTagModalOpen, setIsTagModalOpen] = useState(false);
    const [editingTag, setEditingTag] = useState<Tag | null>(null);

    const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
    const [attachmentTaskId, setAttachmentTaskId] = useState<string | null>(null);

    const [attachmentToEdit, setAttachmentToEdit] =
        useState<Attachment | null>(null);
    const [isEditAttachmentModalOpen, setIsEditAttachmentModalOpen] =
        useState(false);

    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

    const openAttachmentModal = (taskId: string) => {
        setAttachmentTaskId(taskId);
        setIsAttachmentModalOpen(true);
    };

    const closeAttachmentModal = () => {
        setAttachmentTaskId(null);
        setIsAttachmentModalOpen(false);
    };

    return {
        isModalOpen,
        setIsModalOpen,
        editingTask,
        setEditingTask,
        showAssignModal,
        setShowAssignModal,
        selectedTask,
        setSelectedTask,
        selectedUserId,
        setSelectedUserId,
        isTagModalOpen,
        setIsTagModalOpen,
        editingTag,
        setEditingTag,
        isAttachmentModalOpen,
        setIsAttachmentModalOpen,
        attachmentTaskId,
        setAttachmentTaskId,
        attachmentToEdit,
        setAttachmentToEdit,
        isEditAttachmentModalOpen,
        setIsEditAttachmentModalOpen,
        isProjectModalOpen,
        setIsProjectModalOpen,
        openAttachmentModal,
        closeAttachmentModal,
    };
};