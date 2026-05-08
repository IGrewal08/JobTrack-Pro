import { prisma } from "../config/prisma.js";

export const getAdmin = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email }
    });
}