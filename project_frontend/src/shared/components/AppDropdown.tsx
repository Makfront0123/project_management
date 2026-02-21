import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuShortcut, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu"


type DropdownItem = {
    label: string
    shortcut?: string
    onClick?: (event: React.MouseEvent) => void
    variant?: "default" | "destructive"
}

type AppDropdownProps = {
    trigger: React.ReactNode
    items: DropdownItem[]
    label?: string
}

export function AppDropdown({ trigger, items, label }: AppDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {trigger}
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}

                <DropdownMenuGroup>
                    {items.map((item, index) => (
                        <DropdownMenuItem
                            key={index}
                            onClick={item.onClick}
                            className={
                                item.variant === "destructive"
                                    ? "text-red-500 focus:text-red-500"
                                    : ""
                            }
                        >
                            {item.label}
                            {item.shortcut && (
                                <DropdownMenuShortcut>
                                    {item.shortcut}
                                </DropdownMenuShortcut>
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}