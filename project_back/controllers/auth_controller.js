import authService from "../services/auth_service.js";


export const register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const user = await authService.login(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
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



