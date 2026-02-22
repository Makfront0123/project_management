import { MoreHorizontal } from "lucide-react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { AppDropdown, type DropdownItem } from "@/shared/components/AppDropdown"

interface TeamCardProps {
    name: string
    role: string
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
    role,
    createdAt,
    members,
    onClick,
    onEdit,
    onDelete,
    onLeave,
    isAdmin
}: TeamCardProps) {
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
    return (
        <Card
            onClick={onClick}
            className="hover:shadow-md transition cursor-pointer relative"
        >
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>{name}</CardTitle>

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