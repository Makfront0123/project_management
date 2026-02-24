import { useNavigate } from "react-router";
import { useForm } from "../shared/hooks/useForm";
import { useAuthStore } from "../features/auth/store/auth_store";
import { validateForgotPassword } from "../shared/utils/validators";

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
        validate: validateForgotPassword,
        onSubmit: async (values) => {
            try {
                await forgotPassword(values.email);
                navigate(`/verify-forgot-otp?email=${values.email}`);
            } catch {
                // Error ya manejado con toast en el store
            }
        },
    });

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-xl p-8 max-w-md w-full"
            >
                <h1 className="text-2xl font-bold mb-4 text-center text-black">
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
                    className={`w-full p-3 border text-black ${errors.email ? "border-red-500" : "border-gray-300"
                        } rounded mb-2`}
                    placeholder="your@email.com"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mb-4">{errors.email}</p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-3 rounded hover:opacity-80 transition"
                >
                    {isSubmitting ? "Sending..." : "Send OTP"}
                </button>
            </form>
        </section>
    );
};

export default ForgotPage;
