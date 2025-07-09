import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types/auth'
import { loginUser, registerUser } from '../services/auth_services'


type AuthStore = {
    user: User | null
    token: string | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
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
                    set({ user: data.user, token: data.token, loading: false })
                } catch (error) {
                    set({ user: null, token: null, loading: false })
                    console.error('Login error:', error)
                }
            },

            register: async (name, email, password) => {
                set({ loading: true })
                try {
                    const data = await registerUser(name, email, password)
                    set({ user: data.user, token: data.token, loading: false })
                } catch (error) {
                    set({ user: null, token: null, loading: false })
                    console.error('Register error:', error)
                }
            },

            logout: () => {
                set({ user: null, token: null })
            },
        }),
        {
            name: 'auth-store',
        }
    )
)
