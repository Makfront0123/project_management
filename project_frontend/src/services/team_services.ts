import axios from 'axios';
import { useAuthStore } from '../stores/auth_store';
import type { PagedTeamsResponse, Team, TeamResponse } from '../types/team';

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

export const createTeam = async (
  name: string,
  description: string
): Promise<TeamResponse> => {
  const token = useAuthStore.getState().token;

  const response = await axios.post<TeamResponse>(
    `${baseUrl}/teams`,
    { name, description },
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

export const updateTeam = async (id: string, data: Partial<Team>) => {
  const token = useAuthStore.getState().token;

  const response = await axios.put<TeamResponse>(
    `${baseUrl}/teams/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
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
