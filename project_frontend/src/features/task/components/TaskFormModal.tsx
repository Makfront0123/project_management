import { useForm } from "@/shared/hooks/useForm";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { useTaskWorkflows } from "@/features/task/hooks/useTaskWorkflows";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import type { Task, TaskPriority } from "@/features/task/types/task";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { useTeamMembers } from "@/features/team/hooks/useTeamMembers";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    teamId: string | null;
    projectId: string | null;
    editingTask?: Task | null;
}

interface FormValues {
    name: string;
    description: string;
    priority: TaskPriority;
    assignedUserId: string | null;
}

export const TaskFormModal = ({
    open,
    onOpenChange,
    teamId,
    projectId,
    editingTask,
}: Props) => {
    const isEditing = !!editingTask;

    const members = useTeamMembers(teamId ?? "");
    const { createTask, updateTask } = useTaskWorkflows();

    const form = useForm<FormValues>({
        initialValues: {
            name: "",
            description: "",
            priority: "medium",
            assignedUserId: null,
        },

        validate: (values) => {
            const errors: Partial<Record<keyof FormValues, string>> = {};
            if (!values.name.trim()) errors.name = "Name is required";
            return errors;
        },

        onSubmit: async (values) => {
            if (!projectId) return;

            if (isEditing && editingTask) {
                await updateTask(editingTask._id, {
                    name: values.name.trim(),
                    description: values.description,
                    priority: values.priority,
                });
            } else {
                await createTask({
                    name: values.name.trim(),
                    description: values.description,
                    projectId,
                    priority: values.priority,
                    assignedUserId: values.assignedUserId,
                });
            }

            onOpenChange(false);
            form.setValues({
                name: "",
                description: "",
                priority: "medium",
                assignedUserId: null,
            });
        },
    });
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Edit Task" : "Create Task"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit} className="space-y-4">
                    <Input
                        name="name"
                        placeholder="Task name"
                        value={form.values.name}
                        onChange={form.handleChange}
                    />

                    {form.errors.name && (
                        <p className="text-sm text-red-500">
                            {form.errors.name}
                        </p>
                    )}

                    <Textarea
                        name="description"
                        placeholder="Description"
                        value={form.values.description}
                        onChange={form.handleChange}
                    />

                    <div className="flex items-center gap-x-4">
                        <Select
                            value={form.values.assignedUserId ?? "unassigned"}
                            onValueChange={(value) =>
                                form.setFieldValue(
                                    "assignedUserId",
                                    value === "unassigned" ? null : value
                                )
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Assign to" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="unassigned">
                                    Unassigned
                                </SelectItem>

                                {members.map((member) => (
                                    <SelectItem
                                        key={member.userId._id}
                                        value={member.userId._id}
                                    >
                                        {member.userId.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            value={form.values.priority}
                            onValueChange={(value) =>
                                form.setFieldValue(
                                    "priority",
                                    value as TaskPriority
                                )
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Priority" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={form.isSubmitting}>
                            {form.isSubmitting
                                ? isEditing
                                    ? "Updating..."
                                    : "Creating..."
                                : isEditing
                                    ? "Update Task"
                                    : "Create Task"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};