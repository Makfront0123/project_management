import { TextInput } from "./TextInput"

type RegisterFormProps = {
    form: {
        values: {
            name: string
            email: string
            password: string
            image: File | null
        }
        errors: {
            name?: string
            email?: string
            password?: string
            image?: string
        }
        handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
        handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
        isSubmitting: boolean
    }
}

export const RegisterForm = ({ form }: RegisterFormProps) => {
    return (
        <form
            onSubmit={form.handleSubmit}
            className="flex flex-col items-center justify-center mt-8 gap-y-6"
        >
            <TextInput
                label="Name"
                name="name"
                placeholder="Enter your name"
                value={form.values.name}
                error={form.errors.name}
                onChange={form.handleChange}
            />
            <TextInput
                label="Email"
                name="email"
                placeholder="Enter your email"
                value={form.values.email}
                error={form.errors.email}
                onChange={form.handleChange}
            />
            <TextInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                labelColor="text-black"
                textColor="text-black"
                value={form.values.password}
                error={form.errors.password}
                onChange={form.handleChange}
            />
            <div className="w-full">
                <label htmlFor="image" className="block text-black text-sm font-bold mb-2">Profile Image</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"  
                    onChange={form.handleChange} 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                />
                {form.errors.image && <p className="text-red-500 text-xs italic mt-1">{form.errors.image}</p>}
            </div>
            <button
                type="submit"
                disabled={form.isSubmitting}
                className="bg-red-600 hover:bg-red-400 text-white duration-200 font-bold py-3 cursor-pointer w-full rounded-md"
            >
                Register
            </button>
        </form>
    )
}
