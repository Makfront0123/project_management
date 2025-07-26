import authRepo from "../repositories/auth_repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
class AuthService {
    async register(data) {
        const existingUser = await authRepo.findUserByEmail(data.email);
        if (existingUser) throw new Error("User already exists");

        if (!data.password) throw new Error("Password is required");
        if (!data.email) throw new Error("Email is required");
        if (!data.name) throw new Error("Name is required");

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await authRepo.register({
            ...data,
            password: hashedPassword
        })
        return user;
    }
    async login(data) {
        const user = await authRepo.findUserByEmail(data.email);
        if (!user) {
            throw new Error("User does not exist");
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }


        const payload = {
            id: user._id,
            email: user.email,
            name: user.name,
        };


        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });


        return {
            _id: user._id,
            email: user.email,
            name: user.name,
            token,
        };
    }
    async logout(data) {
        console.log(data.email)
        const user = await authRepo.findUserByEmail(data.email)
        if (!user) throw new Error("User does not exist")


        await authRepo.setLoginStatus(user, false);
        return { message: "User logged out" }
    }

}

export default new AuthService();