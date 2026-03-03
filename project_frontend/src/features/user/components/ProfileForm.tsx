import ImageUploader from "@/shared/components/ImageUploader"
import { TextInput } from "@/shared/components/TextInput"

import type { useProfileForm } from "../hook/useProfileForm"
import { Button } from "@/shared/components/ui/button"

type ProfileFormProps = {
    form: ReturnType<typeof useProfileForm>
}

const ProfileForm = ({ form }: ProfileFormProps) => {
    console.log(form.values)
    return (
        <form onSubmit={form.handleSubmit} className="space-y-6">

            <ImageUploader
                value={form.values.image}
                error={form.errors.image}
                onChange={(file) =>
                    form.setValues((prev) => ({
                        ...prev,
                        image: file,
                    }))
                }
            />

            <TextInput
                label="Name"
                name="name"
                value={form.values.name}
                error={form.errors.name}
                onChange={form.handleChange}
            />
            <div className="space-y-1">
                <TextInput
                    label="Email"
                    name="email"
                    value={form.values.email}
                    error={form.errors.email}
                    isDisabled={true}
                    onChange={form.handleChange}
                />

                <p className="text-xs text-gray-500">
                    Email cannot be changed.
                </p>
            </div>

            <Button
                variant="default"
                type="submit"
                disabled={form.isSubmitting}
                className="w-full"
            >
                {form.isSubmitting ? "Saving..." : "Save changes"}
            </Button>

        </form>
    )
}

export default ProfileForm