import { Request, Response, NextFunction } from "express";
interface UserPayload {
    id: string;
    role: string;
}
declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}
export declare const authenticateJWT: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const authorizeRoles: (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=authMiddleware.d.ts.map