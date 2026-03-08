import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { ActivityItem } from "./ActivityItem";
import type { Activity } from "../types/Activity";

interface Props {
    activities: Activity[];
}

export const ActivityFeed = ({ activities }: Props) => {
 
    if (!activities.length) {
        return (
            <div className="text-sm text-muted-foreground p-4">
                No activity yet
            </div>
        );
    }

    return (
        <ScrollArea className="h-[500px] p-2">
            <div className="flex flex-col rounded-lg mt-2 px-2">
                {activities.map((activity) => (
                    <ActivityItem
                        key={activity._id}
                        activity={activity}
                    />
                ))}
            </div>
        </ScrollArea>
    );
};