import { prisma } from "../config/prisma.js";
export const getAdmin = async (email) => {
    return await prisma.admin.findUnique({
        where: { email }
    });
};
//# sourceMappingURL=auth.services.js.map