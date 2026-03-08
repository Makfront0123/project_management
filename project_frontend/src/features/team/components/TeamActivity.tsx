import { ActivityFeed } from "@/features/activity/components/ActivityFeed";
import { useTeamActivity } from "@/features/activity/hooks/useTeamActivity";



const TeamActivity = ({ teamId }: { teamId: string }) => {
    const { activities, isLoading } = useTeamActivity(teamId);
if (!teamId) return null;
    if (isLoading) {
        return <div className="p-4">Loading activity...</div>;
    }

    return (
        <div className="w-full border rounded-lg border-gray-200 border-b-2 overflow-hidden">
            <h1 className="text-xl p-4 border-b">Team Activity</h1>
            <ActivityFeed activities={activities} />
        </div>
    );
};

export default TeamActivity;