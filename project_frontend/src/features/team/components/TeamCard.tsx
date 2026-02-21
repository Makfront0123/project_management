import { MoreHorizontal } from "lucide-react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { AppDropdown } from "@/shared/components/AppDropdown"

interface TeamCardProps {
    name: string
    role: string
    createdAt?: string
    members?: number
    onClick?: () => void
    onEdit?: () => void
    onDelete?: () => void
}

export function TeamCard({
    name,
    role,
    createdAt,
    members,
    onClick,
    onEdit,
    onDelete,
}: TeamCardProps) {
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
                            items={[
                                {
                                    label: "Edit",
                                    onClick: (e) => {
                                        e?.stopPropagation?.()
                                        onEdit?.()
                                    },
                                },
                                {
                                    label: "Delete",
                                    variant: "destructive",
                                    onClick: (e) => {
                                        e?.stopPropagation?.()
                                        onDelete?.()
                                    },
                                },
                            ]}
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