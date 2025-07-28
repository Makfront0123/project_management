import axios from 'axios'

import { useAuthStore } from '../stores/auth_store'
import type { PagedTeamsResponse, Team, TeamResponse } from '../types/team'

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

export const getAllTeams = async (page: number, limit: number): Promise<PagedTeamsResponse> => {
  const token = useAuthStore.getState().token;

  const response = await axios.get(
    `/api/v1/teams?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const updateTeam = async (id: string, data: Partial<Team>) => {
  const token = useAuthStore.getState().token

  const response = await axios.put<TeamResponse>(
    `/api/v1/teams/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return response.data
}

export const deleteTeam = async (id: string) => {
  const token = useAuthStore.getState().token

  const response = await axios.delete<TeamResponse>(
    `/api/v1/teams/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return response.data
} 