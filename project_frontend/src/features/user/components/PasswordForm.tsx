import { TextInput } from "@/shared/components/TextInput"
import type { usePasswordForm } from "../hook/UsePasswordForm"
import { Button } from "@/shared/components/ui/button"

type PasswordFormProps = {
    form: ReturnType<typeof usePasswordForm>
}

const PasswordForm = ({ form }: PasswordFormProps) => {
    return (
        <form onSubmit={form.handleSubmit} className="space-y-4">

            <h3 className="text-lg font-semibold">
                Change Password
            </h3>

            <TextInput
                label="Current Password"
                type="password"
                name="currentPassword"
                value={form.values.currentPassword}
                error={form.errors.currentPassword}
                onChange={form.handleChange}
            />

            <TextInput
                label="New Password"
                type="password"
                name="password"
                value={form.values.newPassword}
                error={form.errors.newPassword}
                onChange={form.handleChange}
            />

            <TextInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={form.values.confirmPassword}
                error={form.errors.confirmPassword}
                onChange={form.handleChange}
            />

            <Button
                type="submit"
                variant="default"
                disabled={form.isSubmitting}
                className="w-full"
            >
                {form.isSubmitting ? "Updating..." : "Change Password"}
            </Button>

        </form>
    )
}

export default PasswordForm