 
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPage from "../pages/ForgotPage";
 
import VerifyOtpPage from "../pages/VerifyOtpPage";
import VerifyForgotPage from "../pages/VerifyForgotPage";
import { Navigate, Route } from "react-router";
import ResetPasswordPage from "../pages/ResetPassword";
 

 
export const PublicRoutes = [
  <Route key="login" path="/login" element={<LoginPage />} />,
  <Route key="register" path="/register" element={<RegisterPage />} />,
  <Route key="forgot" path="/forgot" element={<ForgotPage />} />,
  <Route key="reset" path="/reset-password" element={<ResetPasswordPage />} />,
  <Route key="verify" path="/verify" element={<VerifyOtpPage />} />,
  <Route key="verify-forgot" path="/verify-forgot-otp" element={<VerifyForgotPage />} />,
  <Route key="*" path="*" element={<Navigate to="/login" />} />,
];
