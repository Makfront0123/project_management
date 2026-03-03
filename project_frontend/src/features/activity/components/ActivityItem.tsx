import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import type { Activity } from "../types/Activity";
import { activityMessages } from "../utils/activityMessages";

interface Props {
    activity: Activity;
}

export const ActivityItem = ({ activity }: Props) => {
    const message = activityMessages[activity.type](activity) ?? '';
    return (
        <div className="flex items-start gap-3 py-3 border-b border-border">
            <Avatar className="h-8 w-8">
                <AvatarFallback>
                    {activity.user.name.slice(0, 2)}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">
                    <strong className="text-foreground">
                        {activity.user.name}
                    </strong>{" "}
                    {message}
                </span>

                <span className="text-xs text-muted-foreground">
                    {new Date(activity.createdAt).toLocaleString()}
                </span>
            </div>
        </div>
    );
};