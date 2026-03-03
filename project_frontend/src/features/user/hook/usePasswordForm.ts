import { changePassword } from "@/features/auth/services/auth_services"
import { useForm } from "@/shared/hooks/useForm"


type PasswordFormValues = {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

export const usePasswordForm = () => {
    return useForm<PasswordFormValues>({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },

        validate: (values) => {
            const errors: Partial<Record<keyof PasswordFormValues, string>> = {}

            if (!values.currentPassword) {
                errors.currentPassword = "Current password is required"
            }

            if (!values.newPassword) {
                errors.newPassword = "New password is required"
            }

            if (values.newPassword.length < 6) {
                errors.newPassword = "Password must be at least 6 characters"
            }

            if (values.newPassword !== values.confirmPassword) {
                errors.confirmPassword = "Passwords do not match"
            }

            return errors
        },

        onSubmit: async (values) => {
            await changePassword({
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword,
            })
        },
    })
}