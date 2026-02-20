import { useInviteMember } from "@/features/team/hooks/useInviteMember"
import type { Props } from "@/shared/types/Modal"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"



const InviteMemberForm = ({ teamId, onClose }: Props) => {
    const {
        email,
        setEmail,
        role,
        setRole,
        loading,
        inviteMember,
    } = useInviteMember(teamId ?? '')

    const handleSubmit = async () => {
        const success = await inviteMember()
        if (success) onClose()
    }

    return (
        <div className="space-y-4">
            <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@email.com"
                />
            </div>

            <div>
                <label className="text-sm font-medium">Role</label>
                <Select
                    value={role}
                    onValueChange={(v) =>
                        setRole(v as "admin" | "member")
                    }
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button
                className="w-full"
                disabled={loading}
                onClick={handleSubmit}
            >
                {loading ? "Inviting..." : "Send Invitation"}
            </Button>
        </div>
    )
}
export default InviteMemberForm