import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import type { Task } from "@/types/task";
import StatusBadge from "../shared/components/StatusBadge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface Props {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (taskId: string) => void;
}

const ProjectTasks = ({ tasks = [], onEdit, onDelete }: Props) => {
    if (!tasks.length) {
        return (
            <p className="text-gray-400 text-sm">
                No hay tareas aún
            </p>
        );
    }

    return (
        <div className="rounded-md border">

            <Table>

                <TableHeader>
                    <TableRow>

                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                        <TableHead>Assigned</TableHead>

                    </TableRow>
                </TableHeader>


                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task?._id}>

                            <TableCell className="font-medium">
                                {task.name}
                            </TableCell>

                            <TableCell>
                                <StatusBadge status={task.status} />
                            </TableCell>

                            <TableCell>
                                <span className="px-3 py-1 font-normal rounded-md text-sm bg-gray-200">{task.priority}</span>
                            </TableCell>

                            <TableCell>
                                {new Date(task.createdAt).toLocaleDateString()}
                            </TableCell>


                            <TableCell>
                                <button
                                    className="text-purple-600 hover:underline"
                                >
                                    Ver
                                </button>
                            </TableCell>

                            <TableCell>
                                {task.assignedUsers && task.assignedUsers.length > 0 ? (
                                    <div className="flex flex-col gap-1">
                                        {task.assignedUsers.map((user) => (
                                            <span
                                                key={user?.id}
                                                className="text-sm text-gray-700"
                                            >
                                                {user.name}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <span className="text-gray-400">
                                        Sin asignar
                                    </span>
                                )}
                            </TableCell>

                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="p-1 rounded hover:bg-muted">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => onEdit(task)}>
                                            Editar
                                        </DropdownMenuItem>

                                        <DropdownMenuItem
                                            className="text-red-600"
                                            onClick={() => onDelete(task._id)}
                                        >
                                            Eliminar
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>


                        </TableRow>
                    ))}
                </TableBody>

            </Table>

        </div>
    );
};

export default ProjectTasks;
