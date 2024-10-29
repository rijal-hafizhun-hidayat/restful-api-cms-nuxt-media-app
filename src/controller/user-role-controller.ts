import type { NextFunction, Request, Response } from "express";
import type { UserRoleRequest } from "../model/user-role-model";
import { UserRoleService } from "../service/user-role-service";

export class UserRoleController {
  static async storeUserRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: UserRoleRequest = req.body as UserRoleRequest;
      const result = await UserRoleService.storeUserRole(request);
      return res.status(200).json({
        statusCode: 200,
        message: "success store user role",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
