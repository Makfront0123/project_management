import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useAuthStore } from "@/features/auth/store/auth_store"
import { useNavigate, useParams } from "react-router"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/shared/components/ui/card"
import { Spinner } from "@/shared/components/ui/spinner"
import { Button } from "@/shared/components/ui/button"

const AcceptInvitePage = () => {
    const { token: inviteToken } = useParams()
    const navigate = useNavigate()
    const { token } = useAuthStore()
    const [loading, setLoading] = useState(false)
    const [team, setTeam] = useState<{
        name: string;
        description: string;
        code: string;
        creator: { name: string; email: string };
    } | null>(null)
    const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
    useEffect(() => {
        if (!token) {
            navigate(`/login?redirect=/accept-invite/${inviteToken}`)
            return
        }

        const fetchInviteDetails = async () => {
            try {
                const encodedInviteToken = encodeURIComponent(inviteToken ?? '')
                const url = `${baseUrl}/teams/invite-details/${encodedInviteToken}`
                const res = await axios.get(url)
                console.log("Invite details:", res.data)
                setTeam(res.data.team)
            } catch (err) {
                toast.error("Error fetching invitation details")
                console.error(err)
            }
        }

        fetchInviteDetails()
    }, [baseUrl, inviteToken, navigate, token])
    const handleAccept = async () => {
        setLoading(true)
        try {
            const encodedInviteToken = encodeURIComponent(inviteToken ?? '')
            const url = `${baseUrl}/teams/accept-invite/${encodedInviteToken}`
            const res = await axios.get(`${url}`)
            console.log("Accepted invite:", res.data)
            console.log("url:", `${url}`)
            toast.success("Invitation accepted!")
            navigate(`/team/${res.data.teamId}`)
        } catch (err) {
            toast.error("Failed to accept invitation")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center items-center h-screen px-4">
            <Card className="max-w-md w-full">
                <CardHeader>
                    <CardTitle>Team Invitation</CardTitle>
                    <CardDescription>
                        {team ? (
                            <>
                                You have been invited to join the team <b>{team.name}</b>.<br />
                                Description: <i>{team.description}</i>.<br />
                                Created by: <b>{team.creator.name}</b> ({team.creator.email})
                            </>
                        ) : (
                            "Loading invitation details..."
                        )}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading && <Spinner className="mx-auto my-4" />}
                </CardContent>
                <CardFooter>
                    <Button onClick={handleAccept} disabled={loading} className="w-full bg-black text-white rounded-md p-2">
                        {loading ? "Accepting..." : "Accept Invitation"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default AcceptInvitePage