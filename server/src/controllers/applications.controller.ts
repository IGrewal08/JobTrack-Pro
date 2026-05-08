import type { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma.js";

export const applicationController = {
    getById: (req: Request, res: Response, next: NextFunction) => {
        try {
            
        } catch (err: any) {
            console.error(`[Error] ${err.statusCode}`);
            next();
        }
    },

    
    list: (req: Request, res: Response) => {

    },

    
    search: (req: Request, res: Response) => {

    },

    
    create: (req: Request, res: Response) => {

    },

    
    update: (req: Request, res: Response) => {

    },

    
    remove: (req: Request, res: Response) => {
        
    },
};