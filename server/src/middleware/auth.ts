import type { Request, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

interface AuthReq extends Request {
    user?: {
        id: number,
        email: string,
        name: string
    }
} 

export function verifyToke(req: AuthReq, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ message: "Access Denied: No token provided." });

    jwt.verify(token, process.env.JWT_SECRET as string , { algorithms: ['HS256'] }, (err: any, decoded: any) => {
        if (err) return res.status(403).json({ message: "Invalid or Expired token." });

        req.user = decoded.user;
        next();
    });
}
