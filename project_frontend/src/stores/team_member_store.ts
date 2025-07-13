
import { create } from 'zustand'
import { addMember, confirmJoinWithCode, deleteMember, getPendingMembersOfTeam, getPendingRequests, getTeamCode, getTeamMembers, rejectRequest, requestToJoinTeam } from '../services/team_member'
import type { TeamMember } from '../types/teamMember'
import type { UserTeamStatus } from '../types/userTeamStatus'
import { getUserTeamStatus } from '../services/auth_services'
import { getErrorMessage } from '../utils/getErrorMessage'
import toast from 'react-hot-toast'

type TeamStore = {
    teamMemberships: UserTeamStatus[]
    teamMembers: TeamMember[]
    isLoading: boolean
    requestedTeams: string[]
    getUserTeamStatus: () => Promise<void>

    fetchTeamMembers: (teamId: string) => Promise<void>
    deleteMember: (memberId: string, teamId: string) => Promise<void>
    requestToJoinTeam: (teamId: string) => Promise<void>
    getPendingRequests: () => Promise<void>
    getPendingMembersOfTeam: (teamId: string) => Promise<void>
    rejectRequest: (userId: string, teamId: string) => Promise<void>
    addMember: (userId: string, teamId: string) => Promise<void>
    confirmJoinWithCode: (teamId: string, code: string) => Promise<void>
    getTeamCode: (teamId: string) => Promise<string>
}

export const useTeamMemberStore = create<TeamStore>((set) => ({
    teamMemberships: [],
    teamMembers: [],
    isLoading: false,
    requestedTeams: [],

    getUserTeamStatus: async () => {
        set({ isLoading: true })
        try {
            const data = await getUserTeamStatus()
            set({ teamMemberships: data.teams, isLoading: false })
        } catch (error) {
            console.error("Error fetching user teams:", error)
            set({ isLoading: false })
        }
    },

    fetchTeamMembers: async (teamId: string) => {
        set({ isLoading: true })
        try {

            const data = await getTeamMembers(teamId)
            set({ teamMembers: data, isLoading: false })
        } catch (error) {
            console.error("Error fetching team members:", error)
            set({ isLoading: false })
        }
    },
    deleteMember: async (memberId: string, teamId: string) => {


        set({ isLoading: true });
        try {
            const data = await deleteMember(memberId, teamId);
            toast.success(data.message);
            const updatedMembers = await getTeamMembers(teamId);
            set({ teamMembers: updatedMembers, isLoading: false });
        } catch (error) {
            const errorMsg = getErrorMessage(error);
            toast.error(errorMsg);
            console.error("Error deleting member:", error);
            set({ isLoading: false });
        }
    },

    requestToJoinTeam: async (teamId: string) => {

        set({ isLoading: true });
        try {
            const data = await requestToJoinTeam(teamId);


            set((state) => ({
                isLoading: false,
                requestedTeams: [...state.requestedTeams, teamId]
            }));

            toast.success(data.message);
        } catch (error) {
            const errorMsg = getErrorMessage(error);
            toast.error(errorMsg);
            set({ isLoading: false });
        }
    },
    getPendingRequests: async () => {
        set({ isLoading: true })
        try {
            const data = await getPendingRequests()

            set({ requestedTeams: data, isLoading: false })
        } catch (error) {
            console.error("Error fetching pending requests:", error)
            set({ isLoading: false })
        }
    },
    getPendingMembersOfTeam: async (teamId: string) => {
        set({ isLoading: true })
        try {
            const data = await getPendingMembersOfTeam(teamId)
            set({ teamMembers: data, isLoading: false })

        } catch (error) {
            console.error("Error fetching pending requests:", error)
            set({ isLoading: false })
        }
    },
    rejectRequest: async (userId: string, teamId: string) => {
        set({ isLoading: true });
        try {
            const data = await rejectRequest(userId, teamId);
            toast.success(data.message);


            const updatedMembers = await getPendingMembersOfTeam(teamId);
            set({ teamMembers: updatedMembers, isLoading: false });
        } catch (error) {
            const errorMsg = getErrorMessage(error);
            toast.error(errorMsg);
            console.error("Error rejecting request:", error);
            set({ isLoading: false });
        }
    },
    addMember: async (userId: string, teamId: string) => {
        set({ isLoading: true });
        try {
            const data = await addMember(userId, teamId);
            toast.success(data.message);

            const updatedMembers = await getPendingMembersOfTeam(teamId);
            set({ teamMembers: updatedMembers, isLoading: false });
        } catch (error) {
            const errorMsg = getErrorMessage(error);
            toast.error(errorMsg);
            console.error("Error accepting request:", error);
            set({ isLoading: false });
        }
    },

    confirmJoinWithCode: async (teamId: string, code: string) => {
        set({ isLoading: true });
        try {
            const data = await confirmJoinWithCode(teamId, code);  
            toast.success(data.message);
            const updatedMembers = await getTeamMembers(teamId);
            set({ teamMembers: updatedMembers, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            throw error;  
        }
    }
    ,

    getTeamCode: async (teamId: string) => {
        set({ isLoading: true });
        try {
            const data = await getTeamCode(teamId); 
            set({ isLoading: false });
            return data.code;  
        } catch (error) {
            const errorMsg = getErrorMessage(error);
            toast.error(errorMsg);
            console.error("Error fetching team code:", error);
            set({ isLoading: false });
            throw error;
        }
    }



}))
