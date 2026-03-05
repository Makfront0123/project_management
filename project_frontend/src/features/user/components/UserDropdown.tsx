import { Button } from "@/shared/components/ui/button"
import { AppDropdown } from "@/shared/components/AppDropdown"
import { useAuthStore } from "@/features/auth/store/auth_store"
import { useNavigate } from "react-router"
import { icons } from "@/shared/constants/icons"
export function UserDropdown() {
  const { user } = useAuthStore()
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()
  return (
    <AppDropdown
      label={user?.name}
      trigger={
        <Button variant="ghost">
          <img
            src={user?.image || icons.user}
            alt={`${user?.name} avatar`}
            className={`size-10 rounded-full object-cover ${user?.image ? "" : "opacity-40 p-1 bg-gray-600"}`}
          />
        </Button>
      }
      items={[
        { label: "Profile", onClick: () => navigate("/settings/profile") },
        {
          label: "Log out",
          onClick: logout,
          variant: "destructive",
        },
      ]}
    />
  )
}