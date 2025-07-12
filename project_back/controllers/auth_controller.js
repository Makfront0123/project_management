import authService from "../services/auth_service.js";


export const register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        res.status(200).json({
            message: "Usuario creado correctamente",
            user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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
        const user = await authService.logout(req.body);
        res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'None', });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



