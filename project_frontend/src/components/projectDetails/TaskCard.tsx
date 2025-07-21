import React from "react";
import type { TaskAssignment } from "../../types/task_assignment";
import type { Task } from "../../types/task";


interface Props {
    task?: Task;
    assignment?: TaskAssignment;
    isAdmin?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
    onAssign?: () => void;
    onUnassign?: () => void;
}

const TaskCard: React.FC<Props> = ({
    task,
    assignment,
    isAdmin = false,
    onEdit,
    onDelete,
    onAssign,
    onUnassign,
}) => {
    const renderBasic = () => (
        <div className="bg-gray-100 p-4 rounded-lg flex flex-col">
            <p className="text-lg font-semibold">{assignment?.taskId.name}</p>
            <p className="text-gray-600">{assignment?.taskId.description}</p>
            <p className="text-sm text-gray-400">
                Asignado el {new Date(assignment!.createdAt).toLocaleString()}
            </p>
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
