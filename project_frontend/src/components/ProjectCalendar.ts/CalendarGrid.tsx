import { useMemo, useState } from "react";
import dayjs from "dayjs";
import type { Task } from "@/types/task";
interface Props {
    tasks: Task[];
}

const CalendarGrid = ({ tasks }: Props) => {
    const [currentMonth, setCurrentMonth] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const startOfMonth = currentMonth.startOf("month");
    const daysInMonth = currentMonth.daysInMonth();
    const startDay = startOfMonth.day();

    const days = useMemo(() => {
        return Array.from({ length: daysInMonth }, (_, i) =>
            startOfMonth.add(i, "day")
        );
    }, [daysInMonth, startOfMonth]);

    const tasksByDate = useMemo(() => {
        const map: Record<string, Task[]> = {};

        tasks.forEach((task) => {
            if (!task.dueDate) return;
            const key = dayjs(task.dueDate).format("YYYY-MM-DD");

            if (!map[key]) map[key] = [];
            map[key].push(task);
        });

        return map;
    }, [tasks]);

    return (
        <div className="w-full space-y-6">

            {/* Header */}
            <div className="flex justify-between items-center">
                <button
                    onClick={() =>
                        setCurrentMonth(currentMonth.subtract(1, "month"))
                    }
                    className="text-sm hover:opacity-70"
                >
                    ◀
                </button>

                <h3 className="font-semibold">
                    {currentMonth.format("MMMM YYYY")}
                </h3>

                <button
                    onClick={() =>
                        setCurrentMonth(currentMonth.add(1, "month"))
                    }
                    className="text-sm hover:opacity-70"
                >
                    ▶
                </button>
            </div>

            {/* Week Labels */}
            <div className="grid grid-cols-7 text-sm text-muted-foreground">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center">
                        {day}
                    </div>
                ))}
            </div>

            {/* Grid */}
            <div
                className="grid grid-cols-7 gap-2 w-full"
                style={{
                    gridAutoRows: "1fr",
                }}
            >
                {/* Offset vacío para alinear el primer día */}
                {Array.from({ length: startDay }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}

                {days.map((date) => {
                    const key = date.format("YYYY-MM-DD");
                    const tasksForDay = tasksByDate[key] || [];

                    const isSelected =
                        selectedDate &&
                        dayjs(selectedDate).isSame(date, "day");

                    return (
                        <div
                            key={key}
                            onClick={() => setSelectedDate(date.toDate())}
                            className={`
                aspect-square
                rounded-lg
                p-2
                cursor-pointer
                border
                transition
                flex flex-col
                justify-between
                ${isSelected
                                    ? "bg-blue-600 text-white"
                                    : "bg-muted/40 hover:bg-muted"}
              `}
                        >
                            <span className="text-sm font-medium">
                                {date.date()}
                            </span>

                            {tasksForDay.length > 0 && (
                                <span className="text-xs opacity-70">
                                    {tasksForDay.length} tasks
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarGrid;