import React from "react";
import type { TaskAssignment } from "../../types/task_assignment";
import type { Task } from "../../types/task";
import type { Attachment } from "../../types/attachment";


interface Props {
    task?: Task;
    assignment?: TaskAssignment;
    attachments?: Attachment[];
    isAdmin?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
    onAssign?: () => void;
    onUnassign?: () => void;
    onAttachmentClick?: (taskId: string) => void;
    fetchAttachmentsForTask?: (taskId: string) => void;
    onUpdateAttachment?: (attachmentId: string, fileName: string, taskId: string) => void;
    onDeleteAttachment?: (attachmentId: string, taskId: string) => void;

}

const TaskCard: React.FC<Props> = ({
    task,
    assignment,
    isAdmin = false,
    onEdit,
    onDelete,
    onAssign,
    onUnassign,
    onAttachmentClick,
    onUpdateAttachment,
    onDeleteAttachment,
    attachments,
}) => {
    const renderBasic = () => (
        <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
            <div className="flex flex-col">
                <p className="text-lg font-semibold">{assignment?.taskId.name}</p>
                <p className="text-gray-600">{assignment?.taskId.description}</p>
                <p className="text-sm text-gray-400">
                    Asignado el {new Date(assignment!.createdAt).toLocaleString()}
                </p>
                {Array.isArray(attachments) && attachments.length > 0 && (
                    <div className="mt-2">
                        <p className="text-sm font-semibold text-gray-500">Archivos adjuntos:</p>
                        <ul className="list-disc list-inside text-sm text-blue-600 mt-2">
                            {attachments?.map((file: Attachment) => (
                                <li key={file._id} className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <a href={file.fileUrl} download={file.fileName} target="_blank" rel="noopener noreferrer">
                                            {file.fileName}
                                        </a>
                                        <button
                                            className="text-xs text-yellow-600 underline"
                                            onClick={() => {
                                                const taskId = typeof assignment?.taskId === "string"
                                                    ? assignment.taskId
                                                    : assignment?.taskId?._id;

                                                if (onUpdateAttachment && taskId) {
                                                    onUpdateAttachment(file._id, file.fileName, taskId);
                                                }
                                            }}
                                        >
                                            Renombrar
                                        </button>
                                        <button
                                            className="text-xs text-red-600 underline"
                                            onClick={() => {
                                                const taskId = typeof assignment?.taskId === "string"
                                                    ? assignment.taskId
                                                    : assignment?.taskId?._id;

                                                if (onDeleteAttachment && taskId) {
                                                    onDeleteAttachment(file._id, taskId);
                                                }
                                            }}
                                        >
                                            Eliminar
                                        </button>

                                    </div>


                                </li>
                            ))}
                        </ul>

                    </div>
                )}


            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => {
                        const taskId =
                            typeof assignment?.taskId === "string"
                                ? assignment.taskId
                                : assignment?.taskId?._id;

                        if (taskId && onAttachmentClick) {
                            onAttachmentClick(taskId);
                        }
                    }}
                    className="bg-purple-600 text-white px-3 py-1 rounded text-sm"
                >
                    📎 Adjuntar archivo
                </button>

            </div>
        </div>
    );

    const renderAdmin = () => (
        <div className="bg-gray-100 p-7 min-w-4xl rounded-lg flex justify-between items-center">
            <div className="flex flex-col">
                <p className="text-lg font-semibold">{task?.name}</p>
                <p className="text-gray-600">{task?.description}</p>
                {assignment?.userId?.name && (
                    <p className="text-sm text-gray-500 mt-1">
                        Asignada a: <strong>{assignment.userId.name}</strong>
                    </p>
                )}
                <p className="mt-5">Status: {task?.status}</p>
            </div>

            <div className="flex gap-3">
                {assignment?.userId ? (
                    <button
                        onClick={onUnassign}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Quitar asignación
                    </button>
                ) : (
                    <button
                        onClick={onAssign}
                        className="bg-purple-500 text-white px-3 py-1 rounded"
                    >
                        Asignar tarea
                    </button>
                )}

                <button onClick={onEdit} className="bg-blue-500 text-white px-3 py-1 rounded">
                    Editar
                </button>
                <button onClick={onDelete} className="bg-red-600 text-white px-3 py-1 rounded">
                    Eliminar
                </button>
            </div>
        </div>
    );

    return isAdmin ? renderAdmin() : renderBasic();
};

export default TaskCard;
