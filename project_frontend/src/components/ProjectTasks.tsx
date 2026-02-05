import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import type { Task } from "@/types/task";
import StatusBadge from "./StatusBadge";

interface Props {
    tasks: Task[];
}

const ProjectTasks = ({ tasks }: Props) => {

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

                        <TableHead>Nombre</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Creado</TableHead>
                        <TableHead>Acciones</TableHead>
                        <TableHead>Asignados</TableHead>

                    </TableRow>
                </TableHeader>


                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task._id}>

                            <TableCell className="font-medium">
                                {task.name}
                            </TableCell>

                            <TableCell>
                                <StatusBadge status={task.status} />
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


                        </TableRow>
                    ))}
                </TableBody>

            </Table>

        </div>
    );
};

export default ProjectTasks;
