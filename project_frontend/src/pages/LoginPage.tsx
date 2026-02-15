import { Link } from "react-router";
import { LoginForm } from "../components/LoginForm";
import { useLoginForm } from "../hooks/useLoginForm";

const LoginPage = () => {
    const form = useLoginForm();
    return (
        <section className="min-h-screen w-full bg-[#faf9f6] relative flex md:flex-row flex-col items-start justify-center">
            <div
                className="absolute inset-0 z-0"
            />
            <div className="bg-white shadow-md rounded-lg flex flex-col items-center p-10 m-10 gap-y-2 md:px-10 px-0 z-40">
                <div className="flex flex-col items-center justify-center mt-10 gap-2">
                    <h1 className="text-4xl">Welcome Back</h1>
                    <p className="text-gray-600 font-light">
                        Welcome back, Please enter your details
                    </p>
                </div>

                <LoginForm form={form} />

                <div className="w-full text-end px-2 py-3">
                    <Link to="/forgot" className="text-sm text-blue-600 hover:underline">
                        Forgot password?
                    </Link>
                </div>

                <span className="mt-7 md:mb-1 mb-10 text-gray-700 font-light">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-[#4e38f5] ml-1 font-regular">
                        Register Here
                    </Link>
                </span>
            </div>
        </section>
    );
};

export default LoginPage;