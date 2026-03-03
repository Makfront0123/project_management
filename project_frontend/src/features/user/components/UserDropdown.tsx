import { Button } from "@/shared/components/ui/button"
import { AppDropdown } from "@/shared/components/AppDropdown"
import { useAuthStore } from "@/features/auth/store/auth_store"
import { useNavigate } from "react-router"
export function UserDropdown() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  return (
    <AppDropdown
      label="My Account"
      trigger={
        <Button variant="ghost">
          <img
            src={user?.image}
            alt={`${user?.name} avatar`}
            className="size-10 rounded-full object-cover"
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