import axios from 'axios'
import type { AuthResponse, User } from '../types/auth'
import { useAuthStore } from '../stores/auth_store'

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/v1`

// Crear instancia personalizada de Axios
const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
})

 
let isLoggingOut = false

 
api.interceptors.response.use(
  response => response,
  async error => {
    const status = error.response?.status

    if (status === 401 && !isLoggingOut) {
      isLoggingOut = true
      const { logout } = useAuthStore.getState()
      await logout()
      return Promise.reject()  
    }

    return Promise.reject(error)
  }
)

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/login', { email, password })
  return response.data
}

export const registerUser = async (formData: FormData): Promise<User> => {
  const response = await api.post('/register', formData)
  return response.data
}

export const logoutUser = async () => {
  const response = await api.post('/logout')
  return response.data
}

export const getUserTeamStatus = async () => {
  const token = useAuthStore.getState().token
  const response = await api.get('/users/teamStatus', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
