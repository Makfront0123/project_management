import { useForm } from "@/hooks/useForm"
import { useTeamWorkflow } from "./useTeamWorkflows"


type FormValues = {
    name: string
    description: string
}

export const useCreateTeamForm = (onSuccess?: () => void) => {
    const { createTeam } = useTeamWorkflow()

    const form = useForm<FormValues>({
        initialValues: {
            name: "",
            description: "",
        },
        validate: (values) => {
            const errors: Partial<Record<keyof FormValues, string>> = {}
            if (!values.name.trim()) errors.name = "El nombre es obligatorio"
            if (!values.description.trim()) errors.description = "La descripción es obligatoria"
            return errors
        },
        onSubmit: async (values) => {
            await createTeam(values.name, values.description)
            onSuccess?.()
        },
    })

    return form
}