import type { User } from "@/features/auth/types/auth"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { getProfile, updateUser, deleteUser } from "../services/user_services"



type UserStore = {
    user: User | null
    loading: boolean

    getUser: () => Promise<void>
    updateProfile: (values: {
        name?: string
        email?: string
        image?: File | null
    }) => Promise<void>

    deleteUser: () => Promise<void>
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            loading: false,

            getUser: async () => {
                set({ loading: true })

                try {
                    const data = await getProfile()

                    set({ user: data, loading: false })
                } catch {
                    set({ user: null, loading: false })
                }
            },

            updateProfile: async (values) => {
                set({ loading: true })

                try {
                    await updateUser(values)
                    const freshUser = await getProfile()

                    set({
                        user: freshUser,
                        loading: false
                    })

                } catch (error) {
                    set({ loading: false })
                    throw error
                }
            },
            deleteUser: async () => {
                set({ loading: true })

                try {
                    await deleteUser()

                    set({
                        user: null,
                        loading: false
                    })
                } catch (error) {
                    set({ loading: false })
                    throw error
                }
            }
        }),
        {
            name: "user-store",
        }
    )
)