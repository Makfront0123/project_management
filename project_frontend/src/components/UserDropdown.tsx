import { Button } from "@/components/ui/button"
 
import { useAuthStore } from "@/stores/auth_store"
import { AppDropdown } from "./AppDropdown"
export function UserDropdown() {
  const { user, logout } = useAuthStore()

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
        { label: "Profile",},
        { label: "Billing", },
        { label: "Settings"},
        {
          label: "Log out",
          onClick: logout,
          variant: "destructive",
        },
      ]}
    />
  )
}