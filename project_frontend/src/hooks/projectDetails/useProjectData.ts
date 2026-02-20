import useAttachmentStore from "@/stores/attachment_store";
import { useProjectStore } from "@/features/project/store/project_store";
import useTagStore from "@/stores/tag_store";
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

  const team = useMemo(
    () => teamMemberships.find((t) => t.teamId === teamId),
    [teamId, teamMemberships]
  );

  const isAdmin = team?.role === "admin";

  const acceptedMembers = useMemo(
    () =>
      (teamMembers ?? []).filter(
        (m) => m.status === "accepted" && m.role !== "admin"
      ),
    [teamMembers]
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!projectId || !teamId) return;

      await getUserTeamStatus();
      await getProject(projectId, teamId);
      const loadedTasks = await getTasks(projectId);

      for (const task of loadedTasks) {
        await getAllAttachmentsForTasks([task._id], teamId);
      }

      await fetchTeamMembers(teamId);
      await getAllTags(teamId);

      if (isAdmin) {
        for (const task of loadedTasks) {
          await getAllUsersAssignedToTask(task._id, teamId);
        }
      } else {
        await getTasksToUserAssignments(projectId);
      }

      setTasksLoaded(true);
    };

    fetchData();
  }, [fetchTeamMembers, getAllAttachmentsForTasks, getAllTags, getAllUsersAssignedToTask, getProject, getTasks, getTasksToUserAssignments, getUserTeamStatus, isAdmin, projectId, teamId]);

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
  };
};