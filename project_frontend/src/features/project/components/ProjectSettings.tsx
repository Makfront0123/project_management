
import { ProjectForm } from "./ProjectForm";
import { useProjectWorkflows } from "@/features/project/hooks/useProjectWorkflows";
import { Button } from "../../../components/ui/button";
import type { Project } from "../types/projects";

interface Props {
  project: Project;
}

const ProjectSettings = ({ project }: Props) => {
  const { updateProject, deleteProject } = useProjectWorkflows();

  if (!project) return null;
  console.log(project);

  return (
    <div className="space-y-6 mt-10">

      <div className="flex justify-between max-w-6xl gap-x-5 items-start">

        <ProjectForm
          initialValues={{
            name: project.name,
            description: project.description,
          }}
          onSubmit={(values) =>
            updateProject({
              projectId: project._id,
              teamId: project.teamId,
              ...values,
            })
          }
        />
        <div className="border border-red-300 rounded-xl p-6 bg-red-50 space-y-4 min-w-2xl">

          <div>
            <h3 className="text-lg font-semibold text-red-600">
              Danger Zone
            </h3>
            <p className="text-sm text-red-500">
              Deleting a project is irreversible.
            </p>
          </div>

          <Button
            variant="destructive"
            onClick={() =>
              deleteProject(project._id, project.teamId)
            }
          >
            Delete Project
          </Button>

        </div>


      </div>


    </div>
  );
};

export default ProjectSettings;