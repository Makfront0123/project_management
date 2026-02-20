import { useForm } from "@/shared/hooks/useForm";
import { validateRegister } from "@/shared/utils/validators";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/auth_store";


export function useRegisterForm() {
  const { register } = useAuthStore();
  const navigate = useNavigate();

  return useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      image: null as File | null,
    },
    validate: validateRegister,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("password", values.password);
        if (values.image) formData.append("image", values.image);

        await register(formData);
        navigate("/verify?email=" + values.email);
      } catch {
        // El store maneja el error
      }
    },
  });
}
