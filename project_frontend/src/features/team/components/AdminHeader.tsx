
import type { Project } from "@/features/project/types/projects";
import { Button } from "../../../components/ui/button";



interface Props {
    project: Project | null;
    onCreateTask: () => void;
}

const AdminHeader = ({
    project,
    onCreateTask,
}: Props) => {
    return (
        <div className="p-4 flex items-center justify-between gap-4">

            <div>
                <h1 className="text-2xl font-bold flex items-center gap-x-4 mb-2">
                    {project?.name} <span className="text-sm bg-green-400 text-green-900 p-2 rounded-md uppercase">{project?.status}</span>
                </h1>

                <p className="text-gray-500 text-sm">
                    {project?.description}
                </p>
            </div>

            <div className="flex gap-3">

                <Button onClick={onCreateTask} color="primary">Nueva tarea</Button>

            </div>
        </div>
    );
};

export default AdminHeader;
