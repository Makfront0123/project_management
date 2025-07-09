import { useState } from 'react'

type UseFormProps<T> = {
    initialValues: T
    onSubmit: (values: T) => Promise<void> | void
    validate?: (values: T) => Partial<Record<keyof T, string>>
}
export function useForm<T>({ initialValues, onSubmit, validate }: UseFormProps<T>) {
    const [values, setValues] = useState<T>(initialValues)
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setValues((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const validationErrors = validate?.(values) ?? {}

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            setIsSubmitting(false)
            return
        }

        setErrors({})
        try {
            await onSubmit(values)
        } catch (err) {
            console.error(err)
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        setValues,
        setErrors,
    }
}
