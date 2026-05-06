import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { getAdmin } from "../services/auth.services.js";

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await getAdmin(email);

    try {
        if (!email) {
            return res.status(401).json({ message: "Invalid Email or Password." });
        }

        const match: boolean = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Invalid Email or Password." });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
                process.env.JWT_SECRET as string,
            {
                expiresIn: '1d'
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    message: "Login Successful",
                    token: token,
                });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Access Denied: Incorrect Username or Password! "});
    }
}
