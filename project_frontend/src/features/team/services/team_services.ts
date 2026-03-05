import { useAuthStore } from '@/features/auth/store/auth_store';
import axios from 'axios';
import type { TeamResponse, PagedTeamsResponse, TeamDashboardResponse } from '../types/team';

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

export const createTeam = async (
  name: string,
  description: string,
  image: File | null
): Promise<TeamResponse> => {
  const token = useAuthStore.getState().token;

  const response = await axios.post<TeamResponse>(
    `${baseUrl}/teams`,
    { name, description, image },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getAllTeams = async (
  page: number,
  limit: number
): Promise<PagedTeamsResponse> => {
  const token = useAuthStore.getState().token;

  const response = await axios.get(
    `${baseUrl}/teams?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getTeamDashboard = async (teamId: string) => {
  const token = useAuthStore.getState().token

  const response = await axios.get<TeamDashboardResponse>(
    `${baseUrl}/teams/${teamId}/dashboard`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
  )

  return response.data
}
export const updateTeam = async (id: string, data: FormData) => {
  const token = useAuthStore.getState().token;

  const response = await axios.put<TeamResponse>(
    `${baseUrl}/teams/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteTeam = async (id: string) => {
  const token = useAuthStore.getState().token;

  const response = await axios.delete<TeamResponse>(
    `${baseUrl}/teams/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const leaveTeam = async (teamId: string) => {
  const token = useAuthStore.getState().token
  const response = await axios.delete(`${baseUrl}/teams/${teamId}/leave`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};
