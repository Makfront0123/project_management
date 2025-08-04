import { useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";
import { useAuthStore } from "../stores/auth_store";



const ForgotPage = () => {
    const { forgotPassword } = useAuthStore();
    const navigate = useNavigate();

    const {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
    } = useForm({
        initialValues: {
            email: "",
        },
        validate: (values) => {
            const errors: { email?: string } = {};
            if (!values.email) {
                errors.email = "Email is required";
            } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
                errors.email = "Invalid email format";
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                await forgotPassword(values.email);
                navigate(`/verify?email=${values.email}`);
            } catch {
                // Error ya manejado con toast en el store
            }
        },
    });

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-xl p-8 max-w-md w-full"
            >
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Forgot Password
                </h1>
                <p className="text-gray-600 text-sm mb-6 text-center">
                    Enter your email to receive a 6-digit OTP
                </p>

                <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className={`w-full p-3 border ${errors.email ? "border-red-500" : "border-gray-300"
                        } rounded mb-2`}
                    placeholder="your@email.com"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mb-4">{errors.email}</p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
                >
                    {isSubmitting ? "Sending..." : "Send OTP"}
                </button>
            </form>
        </section>
    );
};

export default ForgotPage;
