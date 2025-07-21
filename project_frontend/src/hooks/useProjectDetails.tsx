import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useProjectStore } from "../stores/project_store";
import useTaskAssignamentStore from "../stores/task_assignament_store";
import useTaskStore from "../stores/task_store";
import { useTeamMemberStore } from "../stores/team_member_store";
import type { Task } from "../types/task";
import { useForm } from "./useForm";
import useTagStore from "../stores/tag_store";
import type { Tag } from "../types/tag";
import useTagTaskStore from "../stores/tagTask_store";


export type TaskFormValues = {
    name: string;
    description: string;
};

export const useProjectDetails = () => {
    const { projectId, teamId } = useParams<{ projectId: string; teamId: string }>();
    const { currentProject, isLoading, getProject } = useProjectStore();
    const { tasks, createTask, getTasks, deleteTask, updateTask } = useTaskStore();
    const {
        taskAssignments,
        assignTask,
        unassignTask,
        getTasksToUserAssignments,
        getAllUsersAssignedToTask,
    } = useTaskAssignamentStore();
    const {
        teamMemberships,
        getAllMembersOfTeam,
        teamMembers,
        getUserTeamStatus,
    } = useTeamMemberStore();

    const { tags, getAllTags, deleteTag, updateTag, } = useTagStore();
    const { addTagToTask, removeTagFromTask } = useTagTaskStore();

    const toggleTagOnTask = async (taskId: string, tagId: string, isAssigned: boolean) => {
        if (isAssigned) {
            await removeTagFromTask(taskId, tagId);
        } else {
            await addTagToTask(taskId, tagId);
        }
        const updatedTasks = tasks.map((task) => {
            if (task._id !== taskId) return task;

            const updatedTags = isAssigned
                ? task.tags?.filter(tag => tag._id !== tagId) 
                : [...(task.tags ?? []), tags.find(tag => tag._id === tagId)!];

            return {
                ...task,
                tags: updatedTags
            };
        });

        useTaskStore.setState({ tasks: updatedTasks });
        await getTasksToUserAssignments(projectId!);
    };




    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [tasksLoaded, setTasksLoaded] = useState(false);
    const [isTagModalOpen, setIsTagModalOpen] = useState(false);
    const [editingTag, setEditingTag] = useState<Tag | null>(null);



    const team = useMemo(() => teamMemberships.find((t) => t.teamId === teamId), [teamId, teamMemberships]);
    const acceptedMembers = useMemo(() => teamMembers.filter((m) => m.status === "accepted" && m.role !== "admin"), [teamMembers]);
    const isAdmin = team?.role === "admin";

    const validate = (values: TaskFormValues) => {
        const errors: Partial<Record<keyof TaskFormValues, string>> = {};
        if (!values.name.trim()) errors.name = "El nombre es obligatorio";
        if (!values.description.trim()) errors.description = "La descripción es obligatoria";
        return errors;
    };

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        setValues,
    } = useForm<TaskFormValues>({
        initialValues: { name: "", description: "" },
        validate,
        onSubmit: async (formValues) => {
            if (!projectId) return;

            if (editingTask) {
                await updateTask(editingTask._id, formValues, projectId);
                setEditingTask(null);
            } else {
                await createTask(projectId, formValues);
            }

            setIsModalOpen(false);
            setValues({ name: "", description: "" });
            await getTasks(projectId);
        },
    });



    useEffect(() => {
        const fetchData = async () => {
            if (!projectId || !teamId) return;

            await getUserTeamStatus();
            await getProject(projectId, teamId);
            await getTasks(projectId);

            const loadedTasks = useTaskStore.getState().tasks;

            await getAllMembersOfTeam(teamId);
            await getAllTags(teamId);

            useTaskAssignamentStore.setState({ taskAssignments: [] });

            if (isAdmin) {
                for (const task of loadedTasks) {
                    await getAllUsersAssignedToTask(task._id, teamId);
                }

                const uniqueAssignments = Array.from(
                    new Map(useTaskAssignamentStore.getState().taskAssignments.map(a => [a._id, a])).values()
                );
                useTaskAssignamentStore.setState({ taskAssignments: uniqueAssignments });

            } else {
                await getTasksToUserAssignments(projectId);
            }



            setTasksLoaded(true);
        };

        fetchData();
    }, [getUserTeamStatus, getProject, getTasks, getAllTags, projectId, teamId, getAllMembersOfTeam, getTasksToUserAssignments, getAllUsersAssignedToTask, isAdmin]);

    const findAssignmentForTask = (taskId: string) => {
        return useTaskAssignamentStore.getState().taskAssignments.find((a) => a.taskId?._id === taskId);
    };

    return {
        isModalOpen,
        setIsModalOpen,
        editingTask,
        setEditingTask,
        showAssignModal,
        setShowAssignModal,
        selectedTask,
        setSelectedTask,
        selectedUserId,
        setSelectedUserId,
        team,
        isAdmin,
        acceptedMembers,
        currentProject,
        isLoading,
        tasks,
        taskAssignments,
        values,
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        setValues,
        deleteTask,
        getTasks,
        assignTask,
        toggleTagOnTask,
        unassignTask,
        getTasksToUserAssignments,
        tasksLoaded,
        findAssignmentForTask,
        projectId,
        teamId,
        tags,
        deleteTag,
        isTagModalOpen,
        setIsTagModalOpen,
        editingTag,
        updateTag,
        setEditingTag,
    };
};
