import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { useRegisterForm } from "@/features/auth/hooks/useRegisterForm";
import { Link } from "react-router";

const RegisterPage = () => {
  const form = useRegisterForm();
  console.log(form)
  return (
    <section className="min-h-screen w-full bg-[#faf9f6] dark:bg-gray-900 relative flex md:flex-row flex-col items-start justify-center">
      <div
        className="absolute inset-0 z-0"
      />

      <div className="bg-white shadow-md rounded-lg flex flex-col items-center p-10 m-10 gap-y-2 md:px-10 px-0 z-40">
        <div className="flex flex-col items-center justify-center mt-0 gap-2">
          <h1 className="text-4xl text-black">Welcome Back</h1>
          <p className="text-gray-600 font-light">
            Welcome back, Please register your details
          </p>
        </div>

        <RegisterForm form={form} />

        <span className="mt-7 md:mb-1 mb-10 text-gray-700 font-light">
          You have an account?{" "}
          <Link to="/login" className="text-[#4e38f5] ml-1 font-regular">
            Login
          </Link>
        </span>
      </div>
    </section>
  );
};

export default RegisterPage;
