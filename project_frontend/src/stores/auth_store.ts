import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types/auth'
import { loginUser, logoutUser, registerUser } from '../services/auth_services'
import { getErrorMessage } from '../utils/getErrorMessage' 

type AuthStore = {
    user: User | null
    token: string | null
    loading: boolean
    login: (email: string, password: string) => Promise<string>
    register: (name: string, email: string, password: string) => Promise<void>
    logout: () => void
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            loading: false,

            login: async (email, password) => {
                set({ loading: true })
                try {
                    const data = await loginUser(email, password)
                    set({
                        user: {
                            email: data.user.email
                        },
                        token: data.user.token,
                        loading: false
                    })

                    return data.message
                } catch (error: unknown) {
                    set({ user: null, token: null, loading: false })
                    throw new Error(getErrorMessage(error))
                }
            },

            register: async (name, email, password) => {
                set({ loading: true })
                try {
                    const data = await registerUser(name, email, password)
                    set({ user: data.user, token: data.user.token, loading: false })
                } catch (error: unknown) {
                    set({ user: null, token: null, loading: false })
                    throw new Error(getErrorMessage(error))
                }
            },

            logout: async () => {
                set({ loading: true })
                try {
                    const data = await logoutUser()
                    set({ user: null, token: null, loading: false })
                    return data.message
                }
                catch (error: unknown) {
                    set({ user: null, token: null, loading: false })
                    throw new Error(getErrorMessage(error))
                }
            }
        }),
        {
            name: 'auth-store'
        }
    )
)
