export type UserTeamStatus = {
  teamId: string // ID del team
  name: string   // Nombre del team
  role: string   // Rol del usuario en ese team (admin, member)
  status: string // Estado del usuario en ese team (pending, accepted)
}