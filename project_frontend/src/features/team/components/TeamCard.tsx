import { MoreHorizontal } from "lucide-react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { AppDropdown, type DropdownItem } from "@/shared/components/AppDropdown"
import { generateAvatar } from "@/shared/utils/generateAvatar"

interface TeamCardProps {
    name: string
    role: string
    image?: string
    createdAt?: string
    members?: number
    onClick?: () => void
    onEdit?: () => void
    onDelete?: () => void
    onLeave?: () => void
    isAdmin?: boolean
}

export function TeamCard({
    name,
    image,
    role,
    createdAt,
    members,
    onClick,
    onEdit,
    onDelete,
    onLeave,
    isAdmin
}: TeamCardProps) {
    const { color } = generateAvatar(name)
    const dropdownItems: DropdownItem[] =
        isAdmin
            ? [
                {
                    label: "Edit",
                    onClick: (e: React.MouseEvent) => {
                        e.stopPropagation()
                        onEdit?.()
                    },
                },
                {
                    label: "Delete",
                    variant: "destructive",
                    onClick: (e: React.MouseEvent) => {
                        e.stopPropagation()
                        onDelete?.()
                    },
                },
            ]
            : [
                {
                    label: "Leave Team",
                    onClick: (e: React.MouseEvent) => {
                        e.stopPropagation()
                        onLeave?.()
                    },
                },
            ]

    const avatar = image ?? generateAvatar(name).avatar

    return (
        <Card
            onClick={onClick}
            className="hover:shadow-md transition cursor-pointer relative"
            style={{ borderTop: `4px solid ${color}` }}
        >
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-x-5">
                        <img
                            src={avatar}
                            alt={name}
                            className="w-12 h-12 rounded-lg"
                        />
                        <CardTitle>{name}</CardTitle>
                    </div>

                    <div className="flex items-center gap-2">
                        <Badge variant={role === "admin" ? "default" : "secondary"}>
                            {role}
                        </Badge>

                        <AppDropdown
                            trigger={
                                <MoreHorizontal
                                    className="size-5 cursor-pointer"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            }
                            items={dropdownItems}
                        />
                    </div>
                </div>
            </CardHeader>

            <CardContent className="text-sm text-gray-500 space-y-1">
                {members !== undefined && <p>{members} members</p>}
                {createdAt && (
                    <p>
                        Created {new Date(createdAt).toLocaleDateString()}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}