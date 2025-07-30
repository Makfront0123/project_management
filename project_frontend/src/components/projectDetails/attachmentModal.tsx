import { useState } from "react";
import useAttachmentStore from "../../stores/attachment_store";

const AttachmentModal = ({
    isOpen,
    onClose,
    taskId,
    teamId,
}: {
    isOpen: boolean;
    onClose: () => void;
    taskId: string | null;
    teamId: string;
}) => {
    const { createAttachment, isLoading } = useAttachmentStore();
    const [file, setFile] = useState<File | null>(null);

    const handleUpload = async () => {
        if (!file || !taskId) return;
        await createAttachment(taskId, teamId, file);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white p-10 rounded shadow-lg min-w-3xl space-y-4">
                <h2 className="text-lg font-semibold">📎Upload Attachment</h2>
                <input
                    type="file"

                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">
                        Cancel
                    </button>
                    <button
                        onClick={handleUpload}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                        disabled={isLoading}
                    >
                        {isLoading ? "Subiendo..." : "Subir"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AttachmentModal;