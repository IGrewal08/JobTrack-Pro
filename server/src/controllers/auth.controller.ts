import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { NextFunction, Request, Response } from "express";
import { getAdmin } from "../services/auth.services.js";
import { prisma } from "../config/prisma.js";

export const authController = {

    loginController: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const user = await getAdmin(email);
            if (!email) {
                return res.status(401).json({ message: "Invalid Email or Password." });
            }
            if (!user) {
                return res.status(401).json({ message: "Authentication failed" });
            }

            const match: boolean = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(401).json({ message: "Invalid Email or Password." });
            }

            jwt.sign(
                {
                    id: user.id,
                    role: user.role,
                },
                    process.env.JWT_SECRET as string,
                {
                    expiresIn: '1h'
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        message: "Login Successful",
                        token: token,
                    });
                }
            );

        } catch (err) {
            console.error(err);
            return res.status(401).json({ message: "Access Denied: Incorrect Username or Password! "});
        }
    },

    signUpController: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, user, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            if (!getAdmin(email)) return res.status(401).json({ message: "Authentication failed, Email in use." });

            await prisma.user.create({
                data: {
                    email,
                    ...(user && {user: user}),
                    hashedPassword,
                }
            });
        } catch (err) {
            console.error(err);
            return res.status(401).json({ message: "Error Creating user account." });
        }
    },

    logoutController: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Implement for Redis
        } catch (err) {
            next(err);
        }
    }
}
