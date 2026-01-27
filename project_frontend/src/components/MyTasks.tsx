import React from 'react'
import { Card } from './ui/card'
import { useDashboard } from '@/hooks/useDashboard'

const MyTasks = () => {
    const {
        tasks,
        tasksLoading,
    } = useDashboard()

    if (tasksLoading) {
        return (
            <Card className='rounded-sm w-full'>
                Loading tasks...
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
        <Card className='rounded-sm w-full min-h-[58vh]  gap-x-5'>
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
            <div className="flex justify-center">
                <button className="bg-blue-600 text-white px-8 py-2 rounded-xl cursor-pointer hover:scale-105 transition-all">
                    Crear nueva tarea
                </button>
            </div>
        </Card>
    )
}

export default MyTasks