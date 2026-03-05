
import ImageUploader from "@/shared/components/ImageUploader"
import { TextInput } from "@/shared/components/TextInput"
import { Button } from "@/shared/components/ui/button"
import type { useCreateTeamForm } from "../hooks/useCreateTeamForm"

type TeamFormProps = {
    form: ReturnType<typeof useCreateTeamForm>
    isEditing?: boolean
    onRemoveImage?: () => void
}

const CreateTeamForm = ({ form, isEditing, onRemoveImage }: TeamFormProps) => {
    return (
        <form
            onSubmit={form.handleSubmit}
            className="space-y-6"
        >
            <ImageUploader
                value={form.values.image}
                error={form.errors.image}
                onChange={(file) =>
                    form.setValues((prev) => ({
                        ...prev,
                        image: file,
                    }))
                }
                onRemove={() => {
                    form.setValues((prev) => ({
                        ...prev,
                        image: null,
                    }))
                    onRemoveImage?.()
                }}
            />

            <div className="flex flex-col gap-4">
                <TextInput
                    label="Name of the team"
                    name="name"
                    placeholder="Ex: Marketing Team"
                    value={form.values.name}
                    error={form.errors.name}
                    onChange={form.handleChange}
                />

                <TextInput
                    label="Description"
                    name="description"
                    placeholder="Describe the team"
                    value={form.values.description}
                    error={form.errors.description}
                    onChange={form.handleChange}
                />
            </div>

            <Button
                type="submit"
                disabled={form.isSubmitting}
                className="w-full bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 transition"
            >
                {form.isSubmitting
                    ? isEditing
                        ? "Updating..."
                        : "Creating..."
                    : isEditing
                        ? "Update Team"
                        : "Create Team"}
            </Button>
        </form>
    )
}

export default CreateTeamForm