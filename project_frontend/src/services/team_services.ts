import axios from 'axios'

import { useAuthStore } from '../stores/auth_store'
import type { Team, TeamResponse } from '../types/team'

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

export const getAllTeams = async (): Promise<Team[]> => {
 
  const token = useAuthStore.getState().token

  const response = await axios.get(
    '/api/v1/teams',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
 
  return response.data;
}
