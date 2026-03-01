import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import type { TaskFilterProps } from "../types/task";


export default function TaskFilter({ value, onChange }: TaskFilterProps) {
  return (
    <div className="w-[200px]">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Filter tasks" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All tasks</SelectItem>
          <SelectItem value="open">Pending</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}