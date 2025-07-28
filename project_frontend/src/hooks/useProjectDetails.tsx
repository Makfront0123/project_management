import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useProjectStore } from "../stores/project_store";
import useTaskAssignamentStore from "../stores/task_assignament_store";
import useTaskStore from "../stores/task_store";
import { useTeamMemberStore } from "../stores/team_member_store";
import type { Task, TaskFormValues } from "../types/task";
import { useForm } from "./useForm";
import useTagStore from "../stores/tag_store";
import type { Tag } from "../types/tag";
import useTagTaskStore from "../stores/tagTask_store";
import useAttachmentStore from "../stores/attachment_store";
import type { Attachment } from "../types/attachment";
import type { ProjectFormValues } from "../types/projects";
import useNotificationStore from "../stores/notification_store";



export const useProjectDetails = () => {
    const { projectId, teamId } = useParams<{ projectId: string; teamId: string }>();
    const { currentProject, isLoading, getProject, updateProject, deleteProject } = useProjectStore();
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
        fetchTeamMembers,
        teamMembers,
        getUserTeamStatus,
    } = useTeamMemberStore();

    const { tags, getAllTags, deleteTag, updateTag, } = useTagStore();
    const { addTagToTask, removeTagFromTask } = useTagTaskStore();
    const { attachmentsByTask, getAllAttachmentsForTasks, updateAttachment, deleteAttachment } = useAttachmentStore();
    const { completeAssignedTask } = useTaskAssignamentStore();
    const { addNotification } = useNotificationStore();


    const navigate = useNavigate();


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
    const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
    const [attachmentTaskId, setAttachmentTaskId] = useState<string | null>(null);
    const [attachmentToEdit, setAttachmentToEdit] = useState<Attachment | null>(null);
    const [isEditAttachmentModalOpen, setIsEditAttachmentModalOpen] = useState(false);
    const [isEditingProject, setIsEditingProject] = useState(false);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);


    const [projectValues, setProjectValues] = useState<ProjectFormValues>({
        name: "",
        description: "",
    });


    const onEditProject = async () => {
        if (!currentProject) return;
        await updateProject(
            currentProject._id,
            {
                name: currentProject.name,
                description: currentProject.description,
            },
            teamId!
        );

        setProjectValues({
            name: currentProject.name,
            description: currentProject.description,
        });

        setIsEditingProject(true);
        setIsProjectModalOpen(true);
    };


    const onDeleteProject = async () => {
        if (!currentProject) return;
        await deleteProject(currentProject._id, teamId!);
        navigate(`/team/${teamId}/projects`);

    };




    const openEditAttachmentModal = (attachment: Attachment) => {
        setAttachmentToEdit(attachment);
        setIsEditAttachmentModalOpen(true);
    };

    const closeEditAttachmentModal = () => {
        setAttachmentToEdit(null);
        setIsEditAttachmentModalOpen(false);
    };

    const onCompleteAssignedTask = async (taskId: string, userId: string) => {
        await completeAssignedTask(taskId, userId);
        await getTasksToUserAssignments(projectId!);

        const completedTask = tasks.find(task => task._id === taskId);
        const projectName = currentProject?.name;

        const completedTeamMember = teamMembers.find(member => member.userId._id === userId);

    
        const adminTeamMember = teamMembers.find(member => member.role === "admin");


        if (completedTask && projectName && teamId && completedTeamMember && adminTeamMember) {
            const completedByUser = completedTeamMember.userId;
            const adminUser = adminTeamMember.userId;

            const message = `${completedTask.name} ha sido completada en el proyecto ${projectName} por ${completedByUser.name}.`;

            await addNotification({
                message,
                recipient: adminUser,
                teamId: teamId,
                read: false
            });
        }
    };
    const onDeleteAttachment = async (attachmentId: string, taskId: string) => {
        if (!teamId) return;
        await deleteAttachment(attachmentId, teamId);
        await getAllAttachmentsForTasks([taskId], teamId);
    };

    const onUpdateAttachment = async (
        attachmentId: string,
        file: File
    ): Promise<void> => {
        await updateAttachment(attachmentId, teamId!, file);
    };






    const openAttachmentModal = (taskId: string) => {
        setAttachmentTaskId(taskId);
        setIsAttachmentModalOpen(true);
    };

    const closeAttachmentModal = () => {
        setAttachmentTaskId(null);
        setIsAttachmentModalOpen(false);
    };

    const team = useMemo(() => teamMemberships.find((t) => t.teamId === teamId), [teamId, teamMemberships]);


    const acceptedMembers = useMemo(() =>
        (teamMembers ?? []).filter((m) => m.status === "accepted" && m.role !== "admin"),
        [teamMembers]
    );

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

            if (isEditingProject) {
                await updateProject(projectId, {
                    ...currentProject!,
                    ...projectValues,
                }, teamId!);
                setIsEditingProject(false);
            } else if (editingTask) {
                await updateTask(editingTask._id, formValues, projectId);
                setEditingTask(null);
            } else {
                await createTask(projectId, formValues);
            }

            setIsModalOpen(false);
            setValues({ name: "", description: "" });
            setProjectValues({ name: "", description: "" });

            await getTasks(projectId);
            await getProject(projectId, teamId!);
        }


    });



    useEffect(() => {
        const fetchData = async () => {
            if (!projectId || !teamId) return;

            await getUserTeamStatus();
            await getProject(projectId, teamId);
            await getTasks(projectId);

            const loadedTasks = useTaskStore.getState().tasks;

            for (const task of loadedTasks) {
                await getAllAttachmentsForTasks([task._id], teamId);
            }

            await fetchTeamMembers(teamId);
            await getAllTags(teamId);

            useTaskAssignamentStore.setState({ taskAssignments: [] });

            const team = useTeamMemberStore.getState().teamMemberships.find((t) => t.teamId === teamId);
            const isAdmin = team?.role === "admin";

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
    }, [fetchTeamMembers, getAllAttachmentsForTasks, getAllTags, getAllUsersAssignedToTask, getProject, getTasks, getTasksToUserAssignments, getUserTeamStatus, projectId, teamId]);

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

        isAttachmentModalOpen,
        openAttachmentModal,
        closeAttachmentModal,
        attachmentTaskId,

        attachmentsByTask,
        updateAttachment,


        attachmentToEdit,
        isEditAttachmentModalOpen,
        openEditAttachmentModal,
        closeEditAttachmentModal,
        setAttachmentToEdit,
        onDeleteAttachment,
        onUpdateAttachment,
        onCompleteAssignedTask,

        onEditProject
        ,
        isProjectModalOpen,
        setIsProjectModalOpen,
        projectValues,
        setProjectValues,
        updateProject,
        getProject,
        onDeleteProject,
    };
};
