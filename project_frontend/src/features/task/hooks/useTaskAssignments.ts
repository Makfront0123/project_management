import useTaskAssignamentStore from "@/features/task/store/task_assignament_store";

export const useTaskAssignments = () => {
    const {
        taskAssignments,
        assignTask,
        unassignTask,
        getTasksToUserAssignments,
        getAllUsersAssignedToTask,
        completeAssignedTask,
    } = useTaskAssignamentStore();

    const findAssignmentForTask = (taskId: string) => {
        return taskAssignments.find(a => a.taskId?._id === taskId);
    };

    return {
        taskAssignments,
        assignTask,
        unassignTask,
        getTasksToUserAssignments,
        getAllUsersAssignedToTask,
        completeAssignedTask,
        findAssignmentForTask,
    };
};
