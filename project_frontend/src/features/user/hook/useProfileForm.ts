import { useEffect } from "react"
import { useForm } from "@/shared/hooks/useForm"
import { useUserWorkflow } from "./userWorkflow"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"

export const useProfileForm = () => {
    const { user, updateProfile } = useUserWorkflow()
    const navigate = useNavigate()

    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            image: null as File | null,
        },

        validate: (values) => {
            const errors: any = {}

            if (!values.name) {
                errors.name = "Name is required"
            }

            return errors
        },

        onSubmit: async (values) => {
            try {
                await updateProfile(values)

                toast.success("Profile updated successfully ✅")

                navigate("/dashboard")

            } catch (error: any) {
                toast.error(error?.response?.data?.message || "Something went wrong")
            }
        },
    })

    useEffect(() => {
        if (user) {
            form.setValues({
                name: user.name,
                email: user.email,
                image: null,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return form
}