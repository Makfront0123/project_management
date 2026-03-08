
import { useAttachments } from "../hooks/useAttachments";
import { useTeamWorkflow } from "@/features/team/hooks/useTeamWorkflows";

interface Props {
    taskId: string;
    isCompleted?: boolean;

    onUpload: (file: File, taskId: string) => Promise<void>;
    onUpdate: (attachmentId: string, file: File, taskId: string) => Promise<void>;
    onDelete: (attachmentId: string, taskId: string) => Promise<void>;
    onComplete: (taskId: string) => void;
}
const AttachmentUploader = ({
    taskId,
    isCompleted,
    onUpload,
    onUpdate,
    onDelete,
    onComplete
}: Props) => {

    const { activeTeamId } = useTeamWorkflow();

    const { attachments } = useAttachments(activeTeamId ?? "", taskId);

    return (
        <div className="bg-white dark:bg-transparent mt-7 border rounded-xl p-6 flex flex-col gap-4">

            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Attachments</h3>

                {!isCompleted && (
                    <label className="cursor-pointer bg-purple-600 text-white text-sm px-3 py-1 rounded hover:bg-purple-700">
                        Upload file
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (!file) return

                                onUpload(file, taskId)
                            }}
                        />
                    </label>
                )}
            </div>

            {attachments.length === 0 && (
                <p className="text-sm text-gray-400">
                    No attachments uploaded yet
                </p>
            )}

            {attachments.map((file) => (
                <div
                    key={file._id}
                    className="flex justify-between items-center border rounded-lg p-3"
                >
                    <a
                        href={file.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm hover:underline"
                    >
                        {file.fileName}
                    </a>

                    {!isCompleted && (
                        <div className="flex gap-3 items-center">

                            <label className="text-xs text-blue-600 cursor-pointer hover:underline">
                                Replace
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => {
                                        const newFile = e.target.files?.[0]
                                        if (!newFile) return

                                        onUpdate(file._id, newFile, taskId)
                                    }}
                                />
                            </label>

                            <button
                                className="text-xs text-red-600 hover:underline"
                                onClick={() => onDelete(file._id, taskId)}
                            >
                                Delete
                            </button>

                        </div>
                    )}
                </div>
            ))}

            {!isCompleted && (
                <button
                    onClick={() => onComplete(taskId)}
                    className="mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                >
                    Complete Task
                </button>
            )}
        </div>
    )
}
export default AttachmentUploader