import jwt from "jsonwebtoken";

export const generateInviteToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_INVITE_SECRET, {
        expiresIn: "24h",
    });
};