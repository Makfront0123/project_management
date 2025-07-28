import { TextInput } from "./TextInput"
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
        <form onSubmit={form.handleSubmit} className="space-y-4">
            <div>
                <TextInput
                    label="Nombre"
                    name="name"
                    placeholder="Nombre del equipo"
                    labelColor="text-white"
                    textColor="text-white"
                    value={form.values.name}
                    error={form.errors.name}
                    onChange={form.handleChange} />
                {form.errors.name && <p className="text-red-500 text-sm mt-1">{form.errors.name}</p>}
            </div>
            <div>
                <TextInput
                    label="Descripción"
                    name="description"
                    labelColor="text-white"
                    textColor="text-white"
                    placeholder="Enter your description"
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
                {form.isSubmitting ? 'Creando...' : 'Crear equipo'}
            </button>
        </form>
    )
}

export default CreateTeamForm