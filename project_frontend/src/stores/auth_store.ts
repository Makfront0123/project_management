import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import toast from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'

import { loginUser, logoutUser, registerUser } from '../services/auth_services'
import { getErrorMessage } from '../utils/getErrorMessage'
import type { JwtPayload, User } from '../types/auth'



type AuthStore = {
    user: User | null
    token: string | null
    loading: boolean
    login: (email: string, password: string) => Promise<string>
    register: (formData: FormData) => Promise<void>;
    logout: () => void
    checkTokenExpiration: () => void
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            loading: false,


            login: async (email, password) => {
                set({ loading: true });
                try {
                    const data = await loginUser(email, password);
                    const decoded: JwtPayload = jwtDecode(data.user.token);

                    set({
                        user: {
                            id: decoded.id,
                            email: decoded.email,
                            name: decoded.name,
                            image: decoded.image
                        },
                        token: data.user.token,
                        loading: false,
                    });

                    return data.message;
                } catch (error: unknown) {
                    set({ user: null, token: null, loading: false });
                    throw new Error(getErrorMessage(error));
                }
            },

            register: async (formData) => {
                set({ loading: true })
                try {
                    const data = await registerUser(formData)

                    set({
                        user: {
                            id: data.id,
                            email: data.email,
                            name: data.name,
                            image: data.image

                        },
                        loading: false
                    })

                    toast.success("Usuario registrado correctamente")
                } catch (error: unknown) {
                    set({ user: null, token: null, loading: false })
                    throw new Error(getErrorMessage(error))
                }
            }
            ,

            logout: async () => {
                set({ loading: true })
                try {
                    const data = await logoutUser()
                    set({ user: null, token: null, loading: false })
                    toast.success(data.message)
                    return data.message
                } catch (error: unknown) {
                    set({ user: null, token: null, loading: false })
                    throw new Error(getErrorMessage(error))
                }
            },

            checkTokenExpiration: () => {
                const token = get().token
                if (token) {
                    try {
                        const decoded: JwtPayload = jwtDecode(token)
                        const now = Math.floor(Date.now() / 1000)
                        if (decoded.exp < now) {
                            get().logout()
                        }
                    } catch (e) {
                        get().logout()
                        console.log(e)
                    }
                }
            }
        }),
        {
            name: 'auth-store'
        }
    )
)

