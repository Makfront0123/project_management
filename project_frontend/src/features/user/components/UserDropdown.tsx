import { Button } from "@/shared/components/ui/button"
import { AppDropdown } from "@/shared/components/AppDropdown"
import { useAuthStore } from "@/features/auth/store/auth_store"
import { useNavigate } from "react-router"
import { useUserStore } from "../store/user_store"
export function UserDropdown() {
  const { user } = useUserStore()
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  console.log("user", user)
  return (
    <AppDropdown
      label={user?.name}
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