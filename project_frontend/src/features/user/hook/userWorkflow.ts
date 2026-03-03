import { useEffect, useState } from "react"
import { useUserStore } from "../store/user_store"

export const useUserWorkflow = () => {
    const [isLoading, setIsLoading] = useState(false)

    const user = useUserStore((state) => state.user)
    const getUserStore = useUserStore((state) => state.getUser)
    const updateProfileStore = useUserStore((state) => state.updateProfile)
    const deleteUserStore = useUserStore((state) => state.deleteUser)

    useEffect(() => {
        if (!user) {
            getUserStore()
        }
    }, [user, getUserStore])

    const updateProfile = async (values) => {
        setIsLoading(true)

        try {
            await useUserStore.getState().updateProfile(values)

            await useUserStore.getState().getUser()
        } finally {
            setIsLoading(false)
        }
    }

    const deleteUser = async () => {
        setIsLoading(true)
        try {
            await deleteUserStore()
        } finally {
            setIsLoading(false)
        }
    }

    return {
        user,
        isLoading,
        updateProfile,
        deleteUser,
    }
}