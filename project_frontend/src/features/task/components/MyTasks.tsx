import { Card } from '@/shared/components/ui/card'
import type { Task } from '@/features/task/types/task'
import { TaskCardSkeleton } from './TaskCardSkeleton'

interface Props {
    tasks: Task[]
    loading: boolean
}
const MyTasks = ({ tasks, loading }: Props) => {
    if (loading) {
        return (
            <Card className="p-6 w-full flex flex-col items-center justify-center text-gray-400">
                <TaskCardSkeleton />
            </Card>
        )
    }

    if (!tasks.length) {
        return (
            <Card className="p-6 w-full flex flex-col items-center justify-center text-gray-400">
                No tienes tareas pendientes
            </Card>
        )
    }
    return (
        <Card className='rounded-sm w-full min-h-[58vh]  gap-x-5 p-5'>
            <h3 className="font-semibold text-lg">
                Tareas Pendientes
            </h3>

            {tasks.map((task) => (
                <div
                    key={task._id}
                    className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer"
                >
                    <h4 className="font-medium">{task.name}</h4>

                    <p className="text-sm text-gray-400">
                        {task.description || "Sin descripción"}
                    </p>
                </div>
            ))}

        </Card>
    )
}

export default MyTasks