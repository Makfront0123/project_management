import type { Project } from "../types/projects";


interface Props {
    project: Project;
}

const MemberHeader = ({ project }: Props) => {
    return (
        <div className="rounded-sm p-4 shadow">
            <span className="text-2xl font-bold text-white">Task Pending</span>
        </div>
    );
};

export default MemberHeader;
