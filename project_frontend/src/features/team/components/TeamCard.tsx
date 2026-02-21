import { Badge } from "@/shared/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
interface TeamCardProps {
    name: string
    role: string
    createdAt?: string
    members?: number
    onClick?: () => void
}

export function TeamCard({
    name,
    role,
    createdAt,
    members,
    onClick 
}: TeamCardProps) {
    return (
        <Card onClick={onClick} className="hover:shadow-md transition cursor-pointer">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>{name}</CardTitle>
                    <Badge variant={role === "admin" ? "default" : "secondary"}>
                        {role}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="text-sm text-gray-500 space-y-1">
                {members !== undefined && (
                    <p>{members} members</p>
                )}
                {createdAt && (
                    <p>
                        Created {new Date(createdAt).toLocaleDateString()}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}