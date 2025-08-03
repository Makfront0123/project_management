import authService from "../services/auth_service.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const imagePath = req.file ? req.file.path : null;


        const user = await authService.register({ name, email, password, image: imagePath });


        res.status(200).json({
            message: "User created successfully. OTP sent to email.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image || null,
                password: user.password
            },
        });


    } catch (error) {
        console.error("Registration error:", error.message);
        res.status(500).json({ message: error.message || "An unexpected error occurred" });
    }
};
export const login = async (req, res) => {
    try {
        const user = await authService.login(req.body);
        return res.status(200).json({
            message: "User logged in successfully",
            user,
        });
    } catch (error) {
        const msg = error.message || "Internal Server Error";


        if (msg === "User does not exist") return res.status(404).json({ message: msg });
        if (msg === "Invalid password") return res.status(401).json({ message: msg });
        return res.status(500).json({ message: msg });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        });

        res.status(200).json({ message: "User logged out" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const authVerify = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await authService.verifyOtp(email, otp);
        res.status(200).json({
            message: "OTP verified successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image || null,
            },
        });
    } catch (error) {
        const msg = error.message || "Internal Server Error";
        if (msg === "OTP expired") return res.status(401).json({ message: msg });
        if (msg === "Invalid OTP") return res.status(401).json({ message: msg });
        return res.status(500).json({ message: msg });
    }
};


export const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await authService.resendOtp(email);
        res.status(200).json({
            message: "OTP sent to email",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image || null,
            },
        });
    } catch (error) {
        const msg = error.message || "Internal Server Error";
        if (msg === "User not found") return res.status(404).json({ message: msg });
        if (msg === "User already verified") return res.status(400).json({ message: msg });
        return res.status(500).json({ message: msg });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await authService.forgotPassword(email);
        res.status(200).json({
            message: "OTP sent to email",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image || null,
            },
        });
    } catch (error) {
        const msg = error.message || "Internal Server Error";
        if (msg === "User not found") return res.status(404).json({ message: msg });
        return res.status(500).json({ message: msg });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, password,confirmPassword } = req.body;
        const user = await authService.resetPassword(email, password,confirmPassword);
        res.status(200).json({
            message: "Password reset successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image || null,
            },
        });
    } catch (error) {
        const msg = error.message || "Internal Server Error";
        if (msg === "Invalid password") return res.status(401).json({ message: msg });
        return res.status(500).json({ message: msg });
    }
};

export const verifyForgotOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await authService.verifyOtpForgotPassword(email, otp);
        res.status(200).json({
            message: "OTP verified successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image || null,
            },
        });
    } catch (error) {
        const msg = error.message || "Internal Server Error";
        if (msg === "OTP expired") return res.status(401).json({ message: msg });
        if (msg === "Invalid OTP") return res.status(401).json({ message: msg });
        return res.status(500).json({ message: msg });
    }
};

export const resendForgotPasswordOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await authService.resendOtpForgotPassword(email);
        res.status(200).json({
            message: "OTP sent to email",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image || null,
            },
        });
    } catch (error) {
        const msg = error.message || "Internal Server Error";
        if (msg === "User not found") return res.status(404).json({ message: msg });
        if (msg === "User already verified") return res.status(400).json({ message: msg });
        return res.status(500).json({ message: msg });
    }
};