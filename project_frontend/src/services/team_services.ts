import axios from 'axios'
 
import { useAuthStore } from '../stores/auth_store'
import type { TeamResponse } from '../types/team'

export const createTeam = async (
  name: string,
  description: string
): Promise<TeamResponse> => {
  const token = useAuthStore.getState().token

  const response = await axios.post<TeamResponse>(
    '/api/v1/teams',
    { name, description },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return response.data
}
