import { Link, useNavigate } from "react-router"
import { useAuthStore } from "../stores/auth_store"
import { useForm } from "../hooks/useForm"
import { images } from "../core/images"

import { getErrorMessage } from "../utils/getErrorMessage"
import toast from "react-hot-toast"
import { RegisterForm } from "../components/RegisterForm"

const RegisterPage = () => {
    const { login } = useAuthStore()
    const navigate = useNavigate()



    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validate: (values) => {
            const errors: Partial<typeof values> = {}
            if (!values.name) errors.name = "Name is required"
            if (!values.email) errors.email = "Email is required"
            else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = "Invalid email"
            if (!values.password) errors.password = "Password is required"
            else if (values.password.length < 6) errors.password = "Min 6 characters"
            return errors
        },
        onSubmit: async (values) => {
            try {
                await login(values.email, values.password)
                navigate("/dashboard")
            }
            catch (err: unknown) {
                const msg = getErrorMessage(err)

                toast.error(msg)
            }
        }
    });

    return (
        <section className="min-h-screen w-full bg-[#faf9f6] relative flex items-start justify-center">
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

            <div className="flex flex-col items-center  gap-y-2 px-28 z-40">
                <div className="flex flex-col items-center justify-center mt-24 gap-2">
                    <h1 className="text-4xl">Welcome Back</h1>
                    <p className="text-gray-600 font-light">Welcome back, Please register your details</p>
                </div>
                <RegisterForm form={form} />
                <span className="mt-7 text-gray-700 font-light">you have an account? <Link to="/login" className="text-red-600 ml-1 font-regular">Login</Link></span>
            </div>
            <div className="relative w-full h-full">
                <img src={images.login} alt="" className="w-full min-h-screen" />
                <div className="absolute inset-0 bg-black opacity-70"></div>
            </div>

        </section>
    )
}

export default RegisterPage