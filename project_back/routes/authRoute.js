import express from "express";
import { register, login, logout, authVerify, resendOtp,forgotPassword, resetPassword, verifyForgotOtp, resendForgotPasswordOtp } from "../controllers/auth_controller.js";
import upload from "../middlewares/upload_middleware.js";
const router = express.Router();
router.post("/register", upload.single('image'), register);
router.post("/login", login);
router.post("/logout", logout);
router.post('/verify', authVerify)
router.post('/resend', resendOtp)

router.post('/resend-forgot-otp', resendForgotPasswordOtp)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.post('/verify-forgot', verifyForgotOtp)

export default router;