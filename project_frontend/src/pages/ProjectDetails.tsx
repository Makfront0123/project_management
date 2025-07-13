import { useParams } from "react-router";
import { useEffect } from "react";
import { useProjectStore } from "../stores/project_store";

const ProjectDetails = () => {
 
  const { currentProject, isLoading, getProject } = useProjectStore();

 const { projectId, teamId } = useParams<{ projectId: string; teamId: string }>();
useEffect(() => {
  if (projectId && teamId) {
    getProject(projectId, teamId);
  }
}, [getProject, projectId, teamId]);

  if (isLoading) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <p className="text-gray-500">Cargando proyecto...</p>
      </div>
    );
  }

 if (!currentProject) {
  return <p className="text-gray-500 w-full h-full flex">Proyecto no encontrado</p>;
}

 console.log('currentProject', currentProject);
 


  return (
    <div className="flex w-full h-full flex-col gap-y-4 p-20">
    <h1>{currentProject.name}</h1>
    <p>{currentProject.description}</p>
    <p>Equipo: {currentProject.teamId}</p>
    </div>
  );

  
};

export default ProjectDetails;
