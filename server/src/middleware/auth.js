import jwt from "jsonwebtoken";
export function verifyToke(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: "Access Denied: No token provided." });
    jwt.verify(token, String(process.env.JWT_SECRET), { algorithms: ['HS256'] }, (err, decoded) => {
        if (err)
            return res.status(403).json({ message: "Invalid or Expired token." });
        req.user = decoded.user;
        next();
    });
}
//# sourceMappingURL=auth.js.map