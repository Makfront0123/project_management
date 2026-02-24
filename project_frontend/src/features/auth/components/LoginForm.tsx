import { TextInput } from "@/shared/components/TextInput"


type LoginFormProps = {
    form: {
        values: {
            email: string
            password: string
        }
        errors: {
            email?: string
            password?: string
        }
        handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
        handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
        isSubmitting: boolean
    }
}

export const LoginForm = ({ form }: LoginFormProps) => {
    return (
        <form
            onSubmit={form.handleSubmit}
            className="flex flex-col items-center md:ml-0 ml-10 justify-center min-w-2xl mt-8 gap-y-6"
        >
            <TextInput
                label="Email"
                name="email"
                textColor="text-black"
                placeholder="Enter your email"
                value={form.values.email}
                error={form.errors.email}
                onChange={form.handleChange}
            />

            <TextInput
                label="Password"
                name="password"
                type="password"
                textColor="text-black"
                placeholder="Enter your password"
                value={form.values.password}
                error={form.errors.password}
                onChange={form.handleChange}
            />

            <button
                type="submit"
                disabled={form.isSubmitting}
                className="bg-black hover:opacity-80 text-white duration-200 font-bold py-3 cursor-pointer w-full rounded-md"
            >
                Login
            </button>
        </form>
    )
}
