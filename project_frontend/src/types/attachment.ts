export interface Attachment {
    _id: string;
    taskId: string;
    teamId: string;
    fileName: string;
    fileUrl: string;
    uploadedBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface RenameAttachmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentName: string;
    onSubmit: (newName: string) => void;
}
