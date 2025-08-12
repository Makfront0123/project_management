import { useForm } from "./useForm";
import { useAuthStore } from "../stores/auth_store";
import { validateLogin } from "../utils/validators";

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
