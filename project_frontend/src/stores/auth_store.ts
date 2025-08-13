import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import toast from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'

import { forgotPassword, loginUser, logoutUser, registerUser, resendForgotPasswordOtp, resendOtp, resetPassword, verifyForgotPasswordOtp, verifyOtp } from '../services/auth_services'
import { getErrorMessage } from '../utils/getErrorMessage'
import type { JwtPayload, User } from '../types/auth'



type AuthStore = {
    user: User | null
    token: string | null
    loadingAction: boolean
    loadingApp:boolean,
    login: (email: string, password: string) => Promise<string>
    register: (formData: FormData) => Promise<void>;
    restoreSession: () => void
    logout: () => void
    verifyOtp: (email: string, otp: string) => Promise<string>
    resendOtp: (email: string) => Promise<string>
    forgotPassword: (email: string) => Promise<string>
    resetPassword: (email: string, password: string, confirmPassword: string) => Promise<string>
    verifyForgotPasswordOtp: (email: string, otp: string) => Promise<string>
    resendForgotPasswordOtp: (email: string) => Promise<string>
    checkTokenExpiration: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loadingAction: false,
      loadingApp: true,

      login: async (email, password) => {
        set({ loadingAction: true });
        try {
          const data = await loginUser(email, password);
          const decoded: JwtPayload = jwtDecode(data.user.token);

          set({
            user: {
              id: decoded.id,
              email: decoded.email,
              name: decoded.name,
              image: decoded.image,
            },
            token: data.user.token,
            loadingAction: false,
          });

          toast.success(data.message);
          return data.message;
        } catch (error: unknown) {
          set({ user: null, token: null, loadingAction: false });
          toast.error(getErrorMessage(error));
          throw new Error(getErrorMessage(error));
        }
      },

      restoreSession: () => {
        const token = get().token;
        if (token) {
          try {
            const decoded: JwtPayload = jwtDecode(token);
            set({
              user: {
                id: decoded.id,
                email: decoded.email,
                name: decoded.name,
                image: decoded.image,
              },
              token,
              loadingApp: false,
            });
          } catch (e) {
            console.error("Token inválido:", e);
            get().logout();
          }
        } else {
          set({ loadingApp: false });
        }
      },

      register: async (formData) => {
        set({ loadingAction: true });
        try {
          const data = await registerUser(formData);
          set({
            user: {
              id: data.id,
              email: data.email,
              name: data.name,
              image: data.image,
            },
            loadingAction: false,
          });
          toast.success("User registered successfully");
        } catch (error: unknown) {
          set({ user: null, token: null, loadingAction: false });
          throw new Error(getErrorMessage(error));
        }
      },

      logout: async () => {
        set({ loadingAction: true });
        try {
          const data = await logoutUser();
          set({ user: null, token: null, loadingAction: false });
          toast.success(data.message);
          localStorage.removeItem('auth-store');
          return data.message;
        } catch (error: unknown) {
          set({ user: null, token: null, loadingAction: false });
          throw new Error(getErrorMessage(error));
        }
      },

      checkTokenExpiration: () => {
        const token = get().token;
        if (token) {
          try {
            const decoded: JwtPayload = jwtDecode(token);
            const now = Math.floor(Date.now() / 1000);
            if (decoded.exp < now) {
              get().logout();
            }
          } catch (e) {
            get().logout();
            console.log(e);
          }
        }
      },

      verifyOtp: async (email, otp) => {
        set({ loadingAction: true });
        try {
          const data = await verifyOtp(email, otp);
          set({ loadingAction: false });
          toast.success(data.message);
          return data.message;
        } catch (error: unknown) {
          set({ loadingAction: false });
          toast.error(getErrorMessage(error));
          throw new Error(getErrorMessage(error));
        }
      },

      resendOtp: async (email) => {
        set({ loadingAction: true });
        try {
          const data = await resendOtp(email);
          set({ loadingAction: false });
          toast.success(data.message);
          return data.message;
        } catch (error: unknown) {
          set({ loadingAction: false });
          toast.error(getErrorMessage(error));
          throw new Error(getErrorMessage(error));
        }
      },

      forgotPassword: async (email) => {
        set({ loadingAction: true });
        try {
          const data = await forgotPassword(email);
          set({ loadingAction: false });
          toast.success(data.message);
          return data.message;
        } catch (error: unknown) {
          set({ loadingAction: false });
          const message = getErrorMessage(error);
          toast.error(message);
          throw new Error(message);
        }
      },

      resetPassword: async (email, password, confirmPassword) => {
        set({ loadingAction: true });
        try {
          const data = await resetPassword(email, password, confirmPassword);
          set({ loadingAction: false });
          toast.success(data.message);
          return data.message;
        } catch (error: unknown) {
          set({ loadingAction: false });
          throw new Error(getErrorMessage(error));
        }
      },

      verifyForgotPasswordOtp: async (email, otp) => {
        set({ loadingAction: true });
        try {
          const data = await verifyForgotPasswordOtp(email, otp);
          set({ loadingAction: false });
          toast.success(data.message);
          return data.message;
        } catch (error: unknown) {
          set({ loadingAction: false });
          const msg = getErrorMessage(error);
          toast.error(msg);
          throw new Error(msg);
        }
      },

      resendForgotPasswordOtp: async (email) => {
        set({ loadingAction: true });
        try {
          const data = await resendForgotPasswordOtp(email);
          set({ loadingAction: false });
          toast.success(data.message);
          return data.message;
        } catch (error: unknown) {
          set({ loadingAction: false });
          throw new Error(getErrorMessage(error));
        }
      },
    }),
    {
      name: "auth-store",
    }
  )
);
