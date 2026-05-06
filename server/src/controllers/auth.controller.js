import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const loginController = async (req, res) => {
    const { username, password } = req.body;
    try {
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: "Access Denied: Incorrect Username or Password! " });
    }
};
//# sourceMappingURL=auth.controller.js.map