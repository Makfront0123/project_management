import { TextInput } from "../shared/components/TextInput"

type CreateTeamPageProps = {
    form: {
        values: {
            name: string
            description: string
        }
        errors: {
            name?: string
            description?: string
        }
        handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
        handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
        isSubmitting: boolean
    }
}

const CreateTeamForm = ({ form }: CreateTeamPageProps) => {
    return (
        <form onSubmit={form.handleSubmit} className="space-y-4 overflow-hidden">
            <div>
                <TextInput
                    label="Nombre"
                    name="name"
                    placeholder="Nombre del equipo"
                    value={form.values.name}
                    error={form.errors.name}
                    onChange={form.handleChange}
                />
            </div>

            <div>
                <TextInput
                    label="Descripción"
                    name="description"
                    placeholder="Descripción del equipo"
                    value={form.values.description}
                    error={form.errors.description}
                    onChange={form.handleChange}
                />
            </div>

            <button
                type="submit"
                disabled={form.isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                {form.isSubmitting ? "Creando..." : "Crear equipo"}
            </button>
        </form>
    )
}

export default CreateTeamForm