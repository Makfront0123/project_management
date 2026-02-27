import useTaskStore from "@/features/task/store/task_store";
export const useTaskManager = () => {

    const tasks = useTaskStore(state => state.tasks)
    const userTasks = useTaskStore(state => state.userTasks)
    const createTask = useTaskStore(state => state.createTask)
    const updateTask = useTaskStore(state => state.updateTask)
    const deleteTask = useTaskStore(state => state.deleteTask) 
    return {
        tasks,
        userTasks,
        createTask,
        updateTask,
        deleteTask
    }
}