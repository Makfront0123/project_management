import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";
import { useForm } from "../hooks/useForm";
import { useAuthStore } from "../stores/auth_store";
import { validateResetPassword } from "../utils/validators";



export const ResetPasswordPage = () => {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    const { resetPassword } = useAuthStore();

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
    } = useForm({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validate: validateResetPassword,
        onSubmit: async (values) => {
            try {
                await resetPassword(email ?? '', values.password, values.confirmPassword);
                navigate("/login");
            } catch (error) {
                console.error(error);
                toast.error("Failed to reset password");
            }
        },
    });

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full"
            >
                <h1 className="text-2xl font-bold text-center mb-4">
                    Reset Password
                </h1>
                <p className="text-gray-600 text-sm mb-6 text-center">
                    Enter a new password for your account
                </p>

                <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="New password"
                    className="w-full p-3 border border-gray-300 rounded mb-2"
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mb-2">{errors.password}</p>
                )}

                <input
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="w-full p-3 border border-gray-300 rounded mb-2"
                />
                {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mb-4">{errors.confirmPassword}</p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
                >
                    {isSubmitting ? "Resetting..." : "Reset Password"}
                </button>
            </form>
        </section>
    );
};

export default ResetPasswordPage;
