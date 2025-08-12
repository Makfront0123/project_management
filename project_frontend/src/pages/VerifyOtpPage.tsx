import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAuthStore } from "../stores/auth_store";

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const { verifyOtp, resendOtp } = useAuthStore();

  const [otp, setOtp] = useState("");
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp)) return; 

    setLoadingVerify(true);
    try {
      await verifyOtp(email, otp);
      navigate("/login");
    } finally {
      setLoadingVerify(false);
    }
  };

  const handleResend = async () => {
    setLoadingResend(true);
    try {
      await resendOtp(email);
    } finally {
      setLoadingResend(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Verify Your Email</h1>
        <p className="text-gray-600 text-sm mb-6 text-center">
          Enter the 6-digit code sent to your email
        </p>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          className="w-full p-3 border border-gray-300 rounded mb-4 text-center text-lg tracking-widest"
          placeholder="______"
        />

        <button
          type="submit"
          disabled={loadingVerify}
          className={`w-full bg-blue-600 text-white py-3 rounded transition 
            ${loadingVerify ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
        >
          {loadingVerify ? "Verifying..." : "Verify"}
        </button>

        <button
          type="button"
          disabled={loadingResend}
          onClick={handleResend}
          className={`w-full mt-4 text-blue-600 hover:underline text-sm 
            ${loadingResend ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loadingResend ? "Resending..." : "Resend Code"}
        </button>
      </form>
    </section>
  );
};

export default VerifyOtpPage;
