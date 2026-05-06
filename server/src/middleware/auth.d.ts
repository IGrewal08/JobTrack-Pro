import type { NextFunction, Response } from "express";
interface AuthReq extends Request {
    user?: any;
    headers: any;
}
export declare function verifyToke(req: AuthReq, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=auth.d.ts.map