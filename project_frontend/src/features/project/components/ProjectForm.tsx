import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { useForm } from "@/shared/hooks/useForm";

import { Button } from "@/shared/components/ui/button";
import { useEffect } from "react";


interface ProjectFormProps {
    initialValues: {
        name: string;
        description: string;
    };
    onSubmit: (values: FormValues) => Promise<void>;
    isSubmitting?: boolean;
    submitLabel?: string;
}


export interface FormValues {
    name: string;
    description: string;
}

interface ProjectFormProps {
    initialValues: FormValues;
    onSubmit: (values: FormValues) => Promise<void>;
    submitLabel?: string;
}

export const ProjectForm = ({
    initialValues,
    onSubmit,
    submitLabel = "Save Changes",
}: ProjectFormProps) => {
    const form = useForm<FormValues>({
        initialValues,
        validate: (values) => {
            const errors: Partial<Record<keyof FormValues, string>> = {};
            if (!values.name.trim()) errors.name = "Name is required";
            return errors;
        },
        onSubmit,
    });

    // 🔹 reinicializa valores si cambian los initialValues
    useEffect(() => {
        form.setValues(initialValues);
        form.setErrors({});
    }, [initialValues]);

    return (
        <form
            onSubmit={form.handleSubmit}
            className="space-y-4 border min-w-[70vh] border-gray-200 rounded-lg p-6"
        >
            <h1 className="font-bold">Project Details</h1>

            <div>
                <label className="block text-sm font-medium">Project name</label>
                <Input
                    name="name"
                    value={form.values.name}
                    onChange={form.handleChange}
                    placeholder="Project name"
                />
                {form.errors.name && (
                    <p className="text-sm text-red-500">{form.errors.name}</p>
                )}
            </div>

            <div className="flex flex-col">
                <label className="block text-sm font-medium">Description</label>
                <Textarea
                    name="description"
                    value={form.values.description}
                    onChange={form.handleChange}
                    placeholder="Description"
                />
            </div>

            <Button type="submit" disabled={form.isSubmitting} className="mx-auto flex container">
                {form.isSubmitting ? "Saving..." : submitLabel}
            </Button>
        </form>
    );
};