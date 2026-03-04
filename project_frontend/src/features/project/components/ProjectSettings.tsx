
import Modal from "@/shared/components/Modal";
import { useState } from "react";

import { useProjectWorkflows } from "../hooks/useProjectWorkflows";
import type { Project } from "../types/projects";
import { ProjectForm } from "./ProjectForm";
import { ProjectModal } from "./ProjectModal";
import { Button } from "@/shared/components/ui/button";


interface Props {
  project: Project;
  teamId: string;
}

const ProjectSettings = ({ project, teamId }: Props) => {
  console.log("project", project);
  console.log("teamId", teamId);
  const { updateProject, deleteProject } = useProjectWorkflows();

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  if (!project) return null;

  return (
    <div className="space-y-6 mt-10">
      <div className="flex justify-between max-w-6xl gap-x-5 items-start">
        <ProjectForm
          initialValues={{ name: project.name, description: project.description }}
          onSubmit={(values) =>
            updateProject({
              projectId: project._id,
              teamId: project.teamId,
              ...values,
            })
          }
        />
        <div className="border border-red-300 rounded-xl p-6 bg-white dark:bg-black space-y-4 min-w-2xl">
          <div>
            <h3 className="text-lg font-semibold text-red-600 dark:text-white">
              Danger Zone
            </h3>
            <p className="text-sm text-red-500">
              Deleting a project is irreversible.
            </p>
          </div>

          <Button
            variant="destructive"
            onClick={() => setIsConfirmModalOpen(true)}
          >
            Delete project
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Eliminar proyecto"
        footer={
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsConfirmModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                deleteProject(project._id, teamId);
                setIsConfirmModalOpen(false);
              }}
            >
              Eliminar
            </Button>
          </div>
        }
      >
        <p className="text-sm text-gray-600">
          Esta acción no se puede deshacer. ¿Estás seguro?
        </p>
      </Modal>

      <ProjectModal
        open={isProjectModalOpen}
        onOpenChange={setIsProjectModalOpen}
        teamId={teamId}
      />
    </div>
  );
};

export default ProjectSettings;