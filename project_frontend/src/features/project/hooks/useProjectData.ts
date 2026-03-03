import useAttachmentStore from "@/features/attachment/store/attachment_store";
import { useProjectStore } from "@/features/project/store/project_store";
import useTagStore from "@/features/tag/store/tag_store";
import useTaskAssignamentStore from "@/features/task/store/task_assignament_store";
import useTaskStore from "@/features/task/store/task_store";
import { useTeamMemberStore } from "@/features/team/store/team_member_store";
import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router";



export const useProjectData = () => {
  const { projectId, teamId } = useParams<{ projectId: string; teamId: string }>();

  const { currentProject, isLoadingProject, getProject } = useProjectStore();
  const { tasks, getTasks } = useTaskStore();
  const { teamMemberships, fetchTeamMembers, teamMembers, getUserTeamStatus } =
    useTeamMemberStore();
  const { tags, getAllTags } = useTagStore();
  const { attachmentsByTask, getAllAttachmentsForTasks } =
    useAttachmentStore();
  const {
    getTasksToUserAssignments,
    getAllUsersAssignedToTask,
    taskAssignments,
  } = useTaskAssignamentStore();

  const [tasksLoaded, setTasksLoaded] = useState(false);

  const team = useMemo(() => {
    return teamMemberships.find(
      (t) =>
        String(t.teamId || t.teamId) === String(teamId)
    );
  }, [teamId, teamMemberships]);

  const isAdmin = team?.role === "admin";

  const acceptedMembers = useMemo(
    () =>
      (teamMembers ?? []).filter(
        (m) => m.status === "accepted" && m.role !== "admin"
      ),
    [teamMembers]
  );

  const userTasks = useMemo(() => {
    if (!taskAssignments?.length) return [];

    const assignedTaskIds = taskAssignments.map(a => a.taskId._id);

    return tasks.filter(task => assignedTaskIds.includes(task._id));
  }, [taskAssignments, tasks]);

  useEffect(() => {
    if (!projectId || !teamId || !tasksLoaded) return;

    const fetchAssignments = async () => {
      if (isAdmin) {
        for (const task of tasks) {
          await getAllUsersAssignedToTask(task._id, teamId);
        }
      } else {
        await getTasksToUserAssignments(projectId);
      }
    };

    fetchAssignments();
  }, [isAdmin, projectId, teamId, tasksLoaded, tasks, getAllUsersAssignedToTask, getTasksToUserAssignments]);
  useEffect(() => {
    const fetchProjectData = async () => {
      if (!projectId || !teamId) return;

      await getUserTeamStatus();
      await getProject(projectId, teamId);

      const loadedTasks = await getTasks(projectId);

      for (const task of loadedTasks) {
        await getAllAttachmentsForTasks([task._id], teamId);
      }

      await fetchTeamMembers(teamId);
      await getAllTags(teamId);

      setTasksLoaded(true);
    };

    fetchProjectData();
  }, [fetchTeamMembers, getAllAttachmentsForTasks, getAllTags, getProject, getTasks, getUserTeamStatus, projectId, teamId]);
  return {
    projectId,
    teamId,
    currentProject,
    isLoadingProject,
    tasks,
    teamMembers,
    tags,
    attachmentsByTask,
    taskAssignments,
    team,
    isAdmin,
    acceptedMembers,
    tasksLoaded,
    userTasks,
  };
};