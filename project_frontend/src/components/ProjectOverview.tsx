import { Card } from "./ui/card"
import ProjectCard from "./ProjectCard"
import type { Project } from "@/types/projects"
import { usePagination } from "@/hooks/usePagination";

interface Props {
  projects: Project[];
  loading: boolean;
}

const ProjectOverview = ({ projects, loading }: Props) => {

  const {
    page,
    totalPages,
    items: paginatedProjects,
    nextPage,
    prevPage,
  } = usePagination(projects, 2);

  if (loading) {
    return (
      <Card className="p-6 min-w-3xl">
        Loading projects...
      </Card>
    );
  }

  if (!projects.length) {
    return (
      <Card className="p-6 min-w-3xl flex flex-col items-center justify-center text-gray-400">
        <h3 className="font-semibold">No tienes proyectos</h3>
        <p className="text-sm">Crea tu primer proyecto para comenzar</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 min-w-3xl max-h-[130vh] -space-y-2">

      <h3 className="font-semibold text-lg">Project Overview</h3>
      <div className="flex flex-col gap-5 overflow-y-auto">
        <ProjectCard
          projects={paginatedProjects}
          variant="list"
        />
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">

          <button
            onClick={prevPage}
            disabled={page === 1}
            className="px-3 py-1 rounded border disabled:opacity-40"
          >
            Anterior
          </button>

          <span className="text-sm text-gray-500">
            Página {page} de {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={page === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-40"
          >
            Siguiente
          </button>

        </div>
      )}

    </Card>
  );
};

export default ProjectOverview;