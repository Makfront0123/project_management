import authRepo from "../repositories/auth_repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
class AuthService {
    async register(data) {
        const existingUser = await authRepo.findUserByEmail(data.email);
        if (existingUser) throw new Error("User already exists");

        if (!data.password) throw new Error("Password is required");
        if (!data.email) throw new Error("Email is required");
        if (!data.name) throw new Error("Name is required");

        const hashedPassword = await bcrypt.hash(data.password, 10);


        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        const user = await authRepo.register({
            ...data,
            password: hashedPassword,
            isVerified: false,
            otp,
            otpExpires,
        })
        await sendEmail({
            to: data.email,
            subject: "Verify your account",
            text: `Your OTP is ${otp}. Please enter it in the verification page.`
        });
        return user;
    }
    async login(data) {
        const user = await authRepo.findUserByEmail(data.email);
        if (!user) {
            throw new Error("User does not exist");
        }

        if (!user.isVerified) {
            throw new Error("User is not verified");
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }


        const payload = {
            id: user._id,
            email: user.email,
            name: user.name,
            image: user.image
        };


        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });


        return {
            _id: user._id,
            email: user.email,
            name: user.name,
            image: user.image,
            token,
        };
    }
    async verifyOtp(email, otp) {
        const user = await authRepo.findUserByEmail(email);
        if (!user) throw new Error("Invalid OTP");

        if (user.otp !== otp) throw new Error("Invalid OTP");

        if (user.otpExpires < Date.now()) throw new Error("OTP expired");

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();
        return user;
    }

    async resendOtp(email) {
        const user = await authRepo.findUserByEmail(email);
        if (!user) throw new Error("User not found");
        if (user.isVerified) throw new Error("User already verified");

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();
        await sendEmail({
            to: email,
            subject: "Verify your account",
            text: `Your OTP is ${otp}. Please enter it in the verification page.`
        });
        return user;
    }
    async forgotPassword(email) {
        const user = await authRepo.findUserByEmail(email);
        if (!user) throw new Error("User not found");
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();
        await sendEmail({
            to: email,
            subject: "Reset your password",
            text: `Your OTP is ${otp}. Please enter it in the verification page.`
        });
        return user;
    }
    async resetPassword(email, password, confirmPassword) {
        if (password !== confirmPassword) throw new Error("Passwords do not match");
        if (password.length < 6) throw new Error("Password must be at least 6 characters");
        const user = await authRepo.findUserByEmail(email);
        if (!user) throw new Error("User not found");
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();
        return user;
    }

    async verifyOtpForgotPassword(email, otp) {
        const user = await authRepo.findUserByEmail(email);
        if (!user) throw new Error("Invalid OTP");

        if (user.otp !== otp) throw new Error("Invalid OTP");

        if (user.otpExpires < Date.now()) throw new Error("OTP expired");

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();
        return user;
    }

    async resendOtpForgotPassword(email) {
        const user = await authRepo.findUserByEmail(email);
        if (!user) throw new Error("User not found");

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();
        await sendEmail({
            to: email,
            subject: "Verify your account",
            text: `Your OTP is ${otp}. Please enter it in the verification page.`
        });
        return user;
    }
}

export default new AuthService();