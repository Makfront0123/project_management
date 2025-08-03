import { Link } from "react-router"
import { useAuthStore } from "../stores/auth_store"
import { useForm } from "../hooks/useForm"
import { images } from "../core/images"
import { LoginForm } from "../components/LoginForm"

import { getErrorMessage } from "../utils/getErrorMessage"
import toast from "react-hot-toast"

const LoginPage = () => {
    const { login } = useAuthStore()

    const form = useForm({
        initialValues: {
            email: "",
            password: ""
        },
        validate: (values) => {
            const errors: Partial<typeof values> = {}
            if (!values.email) errors.email = "Email is required"
            else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = "Invalid email"
            if (!values.password) errors.password = "Password is required"
            else if (values.password.length < 6) errors.password = "Min 6 characters"
            return errors
        },
        onSubmit: async (values) => {
            try {
                const message = await login(values.email, values.password)
                toast.success(message)

            } catch (err: unknown) {
                const msg = getErrorMessage(err)
                toast.error(msg)
            }
        }
    });

    return (
        <section className="min-h-screen w-full bg-[#faf9f6] relative  flex md:flex-row flex-col items-start justify-center">

            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0),
        repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px),
        repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)
      `,
                    backgroundSize: "8px 8px, 32px 32px, 32px 32px",
                }}
            />

            <div className="flex flex-col items-center  gap-y-2 md:px-28 px-0  z-40">
                <div className="flex flex-col items-center justify-center mt-24 gap-2">
                    <h1 className="text-4xl">Welcome Back</h1>
                    <p className="text-gray-600 font-light">Welcome back, Please enter your details</p>
                </div>
                <LoginForm form={form} />
                <span className="mt-7 text-gray-700 font-light">Don’t have an account? <Link to="/register" className="text-red-600 ml-1 font-regular">Register Here</Link></span>
            </div>
            <div className="relative w-full h-full">
                <img src={images.login} alt="" className="w-full min-h-screen" />
                <div className="absolute inset-0 bg-black opacity-70"></div>
            </div>

        </section>
    )
}

export default LoginPage

