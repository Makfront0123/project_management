import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAuthStore } from "../stores/auth_store";

const VerifyOtpPage = () => {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    const [otp, setOtp] = useState("");
    const { verifyOtp, resendOtp} = useAuthStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await verifyOtp(email ?? '', otp);
            navigate("/reset-password?email=" + email);
        } catch {
            // Error ya manejado con toast en el store
        }
    };

    const handleResend = async () => {
        try {
            await resendOtp(email ?? '');
        } catch {
            // Error ya manejado con toast en el store
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full"
            >
                <h1 className="text-2xl font-bold text-center mb-4">
                    Verify Your Email
                </h1>
                <p className="text-gray-600 text-sm mb-6 text-center">
                    Enter the 6-digit code sent to your email
                </p>

                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    pattern="\d{6}"
                    required
                    className="w-full p-3 border border-gray-300 rounded mb-4 text-center text-lg tracking-widest"
                    placeholder="______"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
                >
                    Verify
                </button>

                <button
                    type="button"
                    onClick={handleResend}
                    className="w-full mt-4 text-blue-600 hover:underline text-sm"
                >
                    Resend Code
                </button>
            </form>
        </section>
    );
};

export default VerifyOtpPage;
