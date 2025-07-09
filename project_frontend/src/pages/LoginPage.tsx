import { useNavigate } from "react-router"
import { useAuthStore } from "../stores/auth_store"
import { useForm } from "../hooks/useForm"

const LoginPage = () => {
    const { login } = useAuthStore()
    const navigate = useNavigate()

    const form = useForm({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (values) => {
            await login(values.email, values.password)
            navigate("/dashboard")
        }
    })
    return (
        <section className="flex flex-col gap-10 w-full">
            <h1 className="text-4xl">Login Page</h1>
            <form onSubmit={form.handleSubmit} action="" className="flex flex-col gap-y-6" method="post">
                <input type="text"
                    name="email"
                    placeholder="Email"
                    value={form.values.email}
                    onChange={form.handleChange}
                    className="border border-gray-300 rounded-md p-2 mt-2 min-w-2xl"
                />
                <input type="password"
                    name="password"
                    placeholder="Password"
                    value={form.values.password}
                    onChange={form.handleChange}
                    className="border border-gray-300 rounded-md p-2 mt-2 min-w-2xl"
                />
                <button type="submit" disabled={form.isSubmitting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 cursor-pointer px-4 rounded-md">
                    Login
                </button>
            </form>
        </section>
    )
}

export default LoginPage