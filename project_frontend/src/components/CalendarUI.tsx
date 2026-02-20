
import type { Task } from "@/shared/types/task";
import { useMemo, useState } from "react";
import { Calendar } from "./ui/calendar";

interface Props {
    tasks: Task[];
}

const isSameDay = (date1: Date, date2: Date) =>
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();

const CalendarUI = ({ tasks }: Props) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();

    const tasksWithDate = useMemo(
        () => tasks.filter((t) => t.dueDate),
        [tasks]
    );

    const taskDates = useMemo(
        () =>
            tasksWithDate.map((t) => new Date(t.dueDate!)),
        [tasksWithDate]
    );

    const tasksForSelectedDay = useMemo(() => {
        if (!selectedDate) return [];

        return tasksWithDate.filter((t) =>
            isSameDay(new Date(t.dueDate!), selectedDate)
        );
    }, [selectedDate, tasksWithDate]);

    return (
        <div className="space-y-6">

            <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiers={{
                    hasTask: taskDates,
                }}
                modifiersClassNames={{
                    hasTask:
                        "relative after:content-[''] after:w-2 after:h-2 after:bg-primary after:rounded-full after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2",
                }}
                className="rounded-md border"
            />

            {selectedDate && (
                <div className="space-y-3">
                    <h4 className="font-medium text-sm text-muted-foreground">
                        Tasks for {selectedDate.toLocaleDateString()}
                    </h4>

                    {tasksForSelectedDay.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            No tasks for this day
                        </p>
                    ) : (
                        tasksForSelectedDay.map((task) => (
                            <div
                                key={task._id}
                                className="border rounded-lg p-3"
                            >
                                <p className="text-sm font-medium">
                                    {task.name}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default CalendarUI;