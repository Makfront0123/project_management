import express from "express";
import { register, login, logout, authVerify, resendOtp,forgotPassword, resetPassword, verifyForgotOtp, resendForgotPasswordOtp } from "../controllers/auth_controller.js";
import { upload } from "../middlewares/upload_middleware.js"
const router = express.Router();
router.post("/register", (req, res, next) => {
    upload.single('image')(req, res, function(err) {
        if (err) {
            return res.status(500).json({ 
                message: "Error al subir la imagen.", 
                error: err.message || "Error desconocido en el middleware de Multer."
            });
        }
        next();
    });
}, register);
router.post("/login", login);
router.post("/logout", logout);
router.post('/verify', authVerify)
router.post('/resend', resendOtp)

router.post('/resend-forgot-otp', resendForgotPasswordOtp)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.post('/verify-forgot', verifyForgotOtp)

export default router;