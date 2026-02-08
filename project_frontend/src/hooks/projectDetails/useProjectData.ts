import { useProjectStore } from "@/stores/project_store";
import useTagStore from "@/stores/tag_store";

export const useProjectData = () => {
  const projectStore = useProjectStore();
  const tagStore = useTagStore();

  return {
    // Project
    currentProject: projectStore.currentProject,
    isLoading: projectStore.isLoadingProject,

    getProject: projectStore.getProject,
    updateProject: projectStore.updateProject,
    deleteProject: projectStore.deleteProject,

    // Tags
    tags: tagStore.tags,

    getAllTags: tagStore.getAllTags,
    deleteTag: tagStore.deleteTag,
    updateTag: tagStore.updateTag,
    createTag: tagStore.createTag,
  };
};