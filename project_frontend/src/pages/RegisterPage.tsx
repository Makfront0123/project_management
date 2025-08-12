import { useNavigate, Link } from "react-router";
import { RegisterForm } from "../components/RegisterForm";
import { images } from "../core/images";
import { useForm } from "../hooks/useForm";
import { useAuthStore } from "../stores/auth_store";

const RegisterPage = () => {
    const { register } = useAuthStore();
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            password: "",
            image: null as File | null
        },
        validate: (values) => {
            const errors: Partial<Record<keyof typeof values, string>> = {};

            if (!values.name) errors.name = "Name is required";
            if (!values.email) errors.email = "Email is required";
            else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = "Invalid email";
            if (!values.password) errors.password = "Password is required";
            else if (values.password.length < 6) errors.password = "Min 6 characters";

            return errors;
        },
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('email', values.email);
                formData.append('password', values.password);
                if (values.image) {
                    formData.append('image', values.image);
                }


                await register(formData)
                navigate("/verify?email=" + values.email);

            }
            catch {
                // Error ya manejado con toast en el store
            }
        }
    });

    return (
        <section className="min-h-screen w-full bg-[#faf9f6] relative flex md:flex-row flex-col items-start justify-center">
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

            <div className="flex flex-col items-center gap-y-2 md:px-28 px-10 z-40">
                <div className="flex flex-col items-center justify-center mt-24 gap-2">
                    <h1 className="text-4xl">Welcome Back</h1>
                    <p className="text-gray-600 font-light">Welcome back, Please register your details</p>
                </div>
                <RegisterForm form={form} />
                <span className="mt-7 md:mb-1 mb-10 text-gray-700 font-light">you have an account? <Link to="/login" className="text-red-600 ml-1 font-regular">Login</Link></span>
            </div>
            <div className="relative w-full h-full">
                <img src={images.login} alt="" className="w-full min-h-screen" />
                <div className="absolute inset-0 bg-black opacity-70"></div>
            </div>
        </section>
    );
};

export default RegisterPage;