import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { StatusFilter } from "@/features/project/hooks/useProjectFilter"

type SelectContainerProps = {
  value: string
  onChange: (value: StatusFilter) => void
}

export function SelectContainer({ value, onChange }: SelectContainerProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
