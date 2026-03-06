
import type { TeamMember } from "@/features/team/types/teamMember";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { useNavigate } from "react-router";

interface Props {
    member: TeamMember
}

export const ContactCard = ({ member }: Props) => {

    const navigate = useNavigate()

    return (
        <Card
            onClick={() =>
                navigate(`/team/${member.teamId}/chat/contacts/${member._id}`)
            }
            className="max-w-[40vh] max-h-[14vh] rounded-sm shadow-sm cursor-pointer hover:shadow-md transition"
        >
            <CardHeader className="flex gap-3">
                <img
                    src={member.userId.image}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                />

                <div className="flex flex-col">
                    <CardTitle>{member.userId.name}</CardTitle>
                    <CardDescription>{member.userId.email}</CardDescription>
                </div>
            </CardHeader>
        </Card>
    );
};