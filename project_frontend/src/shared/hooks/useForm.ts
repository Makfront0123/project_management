import { useRef, useState } from 'react';

export const useForm = <T>({
    initialValues,
    validate,
    onSubmit,
}: {
    initialValues: T;
    validate?: (values: T) => Partial<Record<keyof T, string>>;
    onSubmit: (values: T) => Promise<void> | void;
}) => {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<
        Partial<Record<keyof T, string>>
    >({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const initialRef = useRef(initialValues);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type } = e.target as HTMLInputElement;

        if (type === "file") {
            const file = (e.target as HTMLInputElement).files?.[0] || null;

            setValues((prev) => ({
                ...prev,
                [name]: file,
            }));
        } else {
            setValues((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (validate) {
            const validationErrors = validate(values);
            setErrors(validationErrors);

            if (Object.keys(validationErrors).length > 0) return;
        }

        try {
            setIsSubmitting(true);
            await onSubmit(values);
        } finally {
            setIsSubmitting(false);
        }
    };

    // ✅ AQUÍ agregamos reset
    const reset = () => {
        setValues(initialRef.current);
        setErrors({});
    };

    return {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        setValues,
        setErrors,
        reset, // 👈 IMPORTANTE
    };
};