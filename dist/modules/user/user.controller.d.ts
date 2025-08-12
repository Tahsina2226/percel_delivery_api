import { Request, Response } from "express";
export declare const getAllUsers: (_req: Request, res: Response) => Promise<void>;
export declare const blockUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const unblockUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=user.controller.d.ts.map