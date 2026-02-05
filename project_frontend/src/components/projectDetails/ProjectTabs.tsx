import type { ProjectTab } from "@/hooks/useProjectTabs";
import { Button } from "../ui/button";

interface Props {
    tabs: {
        activeTab: ProjectTab;
        setActiveTab: (tab: ProjectTab) => void;
    };
}

const ProjectTabs = ({ tabs }: Props) => {
    const { activeTab, setActiveTab } = tabs;

    const base =
        "px-4 py-2 rounded-md text-sm font-medium transition";

    const active =
        "bg-purple-600 text-white";

    const inactive =
        "bg-gray-100 text-gray-600 hover:bg-gray-200";

    return (
        <div className="flex gap-2">

            <Button
                onClick={() => setActiveTab("tasks")}
                className={`${base} ${activeTab === "tasks" ? active : inactive}`}
            >
                Tasks
            </Button>

            <Button
                onClick={() => setActiveTab("analytics")}
                className={`${base} ${activeTab === "analytics" ? active : inactive}`}
            >
                Analytics
            </Button>

            <Button
                onClick={() => setActiveTab("settings")}
                className={`${base} ${activeTab === "settings" ? active : inactive}`}
            >
                Settings
            </Button>

            <Button
                onClick={() => setActiveTab("calendar")}
                className={`${base} ${activeTab === "calendar" ? active : inactive}`}
            >
                Calendar
            </Button>

        </div>
    );
};

export default ProjectTabs;
