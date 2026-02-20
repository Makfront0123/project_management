import { useState } from 'react';

type UseFormProps<T> = {
    initialValues: T;
    onSubmit: (values: T) => Promise<void> | void;
    validate?: (values: T) => Partial<Record<keyof T, string>>;
}

export function useForm<T>({ initialValues, onSubmit, validate }: UseFormProps<T>) {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {

        const target = e.target as HTMLInputElement;
        const { name, value } = target;

        if (target.type === 'file') {
            setValues((prev) => ({
                ...prev,
                [name]: target.files && target.files.length > 0 ? target.files[0] : null
            }));
        } else {
            setValues((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const validationErrors = validate?.(values) ?? {};

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSubmitting(false);
            return;
        }

        setErrors({});
        try {
            await onSubmit(values);
        } finally {
            setIsSubmitting(false);
        }
    };

    const setFieldValue = <K extends keyof T>(field: K, fieldValue: T[K]) => {
        setValues((prev) => ({ ...prev, [field]: fieldValue }));
    };

    return {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        setValues,
        setErrors,
        setFieldValue
    };
}