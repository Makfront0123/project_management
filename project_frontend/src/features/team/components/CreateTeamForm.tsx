import { Button } from "@/shared/components/ui/button"
import { TextInput } from "../../../shared/components/TextInput"

type TeamFormProps = {
    form: {
        values: {
            name: string
            description: string
        }
        errors: {
            name?: string
            description?: string
        }
        handleChange: (
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => void
        handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
        isSubmitting: boolean
    }
    isEditing?: boolean
}
const CreateTeamForm = ({ form, isEditing }: TeamFormProps) => {
    return (
        <form
            onSubmit={form.handleSubmit}
            className="space-y-5"
        >
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

            <Button
                type="submit"
                disabled={form.isSubmitting}
                className="w-full bg-black text-white hover:bg-gray-800 disabled:opacity-50 transition"
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