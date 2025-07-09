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

        const existingUser = await authRepo.findUserByEmail(data.email)
        if (!existingUser) throw new Error("User does not exist")


        const isPassword = await bcrypt.compare(data.password, existingUser.password)
        if (!isPassword) throw new Error("Invalid password")
        const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        await authRepo.setLoginStatus(existingUser, true);
        return {
            token,
            ...data
        }
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