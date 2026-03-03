import PasswordForm from "@/features/user/components/PasswordForm"
import ProfileForm from "@/features/user/components/ProfileForm"
import { usePasswordForm } from "@/features/user/hook/UsePasswordForm"

import { useProfileForm } from "@/features/user/hook/useProfileForm"
import { Link } from "react-router"

const ProfilePage = () => {
    const profileForm = useProfileForm()
    const passwordForm = usePasswordForm()

    return (
        <div className="max-w-3xl mx-auto py-10">

            <Link to="/dashboard" className="flex gap-x-2 mb-2">
                <button className="text-sm text-gray-500 hover:underline border border-gray-600 rounded-lg px-3">
                    Back to tasks
                </button>
            </Link>

            <h1 className="text-2xl font-bold">Profile Information</h1>
            <span className="text-gray-600 font-light">
                Manage your profile information
            </span>

            <div className="bg-white dark:bg-black border rounded-xl p-6 space-y-8 mt-8">

                <ProfileForm form={profileForm} />

                <hr className="border-gray-200 dark:border-gray-800" />

                <PasswordForm form={passwordForm} />

            </div>
        </div>
    )
}

export default ProfilePage