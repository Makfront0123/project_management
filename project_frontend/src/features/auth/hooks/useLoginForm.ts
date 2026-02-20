import { useForm } from "@/shared/hooks/useForm";
import { validateLogin } from "@/shared/utils/validators";
import { useAuthStore } from "../store/auth_store";


export function useLoginForm() {
  const { login } = useAuthStore();

  return useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateLogin,
    onSubmit: async (values) => {
      await login(values.email, values.password);
    },
  });
}
