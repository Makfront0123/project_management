import type { ResetPasswordValues } from "../types/auth";
import type { CreateTeamFormValue } from "../types/team";

export function validateLogin(values: { email: string; password: string }) {
  const errors: Partial<Record<keyof typeof values, string>> = {};
  if (!values.email) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = "Invalid email";
  
  if (!values.password) errors.password = "Password is required";
  else if (values.password.length < 6) errors.password = "Min 6 characters";

  return errors;
}

export function validateRegister(values: {
  name: string;
  email: string;
  password: string;
  image: File | null;
}) {
  const errors: Partial<Record<keyof typeof values, string>> = {};

  if (!values.name) errors.name = "Name is required";
  if (!values.email) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = "Invalid email";
  if (!values.password) errors.password = "Password is required";
  else if (values.password.length < 6) errors.password = "Min 6 characters";
  if (!values.image) errors.image = "Profile picture is required";

  return errors;
}

export const validateForgotPassword = (values: { email: string }) => {
  const errors: Partial<Record<keyof typeof values, string>> = {};
  if (!values.email) errors.email = "Email is required";
  else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
    errors.email = "Invalid email format";
  }
  return errors;
};

export const validateResetPassword = (values: ResetPasswordValues) => {
  const errors: Partial<Record<keyof ResetPasswordValues, string>> = {};
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm your password";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export const validateCreateTeam = (values: CreateTeamFormValue) => {
  const errors: Partial<Record<keyof CreateTeamFormValue, string>> = {};
  if (!values.name.trim()) errors.name = "Name is required";
  if (!values.description.trim()) errors.description = "Description is required";
  return errors;
};