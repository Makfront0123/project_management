import type { Project } from "../types/projects";


interface Props {
    project: Project;
}

const MemberHeader = ({ project }: Props) => {
    console.log(project);
    return (
        <div className="bg-white rounded-xl p-4 shadow">

            <h2 className="text-xl font-bold">
                {project.name}
            </h2>

            <p className="text-gray-600 text-sm">
                {project.description}
            </p>

        </div>
    );
};

export default MemberHeader;
