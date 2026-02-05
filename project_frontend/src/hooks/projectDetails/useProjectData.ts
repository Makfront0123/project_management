
import { useProjectStore } from "@/stores/project_store";
import useTagStore from "@/stores/tag_store";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useProjectData = (teamId?: string, projectId?: string) => {
    const {
        currentProject,
        isLoading,
        getProject,
        updateProject,
        deleteProject,
    } = useProjectStore();

    const {
        tags,
        getAllTags,
        deleteTag,
        updateTag,
        createTag,
    } = useTagStore();

    const navigate = useNavigate();

    useEffect(() => {
        if (!projectId || !teamId) return;

        // ✅ cargar proyecto actual
        getProject(projectId, teamId);

        // ✅ cargar tags
        getAllTags(teamId);

    }, [projectId, teamId, getProject, getAllTags]);


    const onEditProject = async () => {
        if (!currentProject || !teamId) return;

        await updateProject(
            currentProject._id,
            {
                name: currentProject.name,
                description: currentProject.description,
            },
            teamId
        );
    };

    const onDeleteProject = async () => {
        if (!currentProject || !teamId) return;

        await deleteProject(currentProject._id, teamId);

        navigate(`/team/${teamId}/projects`);
    };


    return {
        currentProject,
        isLoading,
        getProject,
        updateProject,
        onEditProject,
        onDeleteProject,
        tags,
        getAllTags,
        deleteTag,
        updateTag,
        createTag,
    };
};
