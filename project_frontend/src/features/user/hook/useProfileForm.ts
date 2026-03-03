import { useEffect } from "react"
import { useForm } from "@/shared/hooks/useForm"
import { useUserWorkflow } from "./userWorkflow"


export const useProfileForm = () => {
    const { user, updateProfile } = useUserWorkflow()
   console.log("store", user)
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
            await updateProfile(values)
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