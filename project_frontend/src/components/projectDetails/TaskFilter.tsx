import type { TaskFilterProps } from "../../types/task";

export default function TaskFilter({ value, onChange }: TaskFilterProps) {
  return (
    <div className="flex gap-2 bg-black ">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as TaskFilterProps["value"])}
        className="border border-white rounded px-3 py-2 text-white bg-black w-full"
      >
        <option value="all">All tasks</option>
        <option value="open">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}
