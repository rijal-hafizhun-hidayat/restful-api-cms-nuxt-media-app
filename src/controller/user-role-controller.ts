import type { NextFunction, Request, Response } from "express";
import type {
  UserRoleRequest,
  UserRoleRequestArr,
} from "../model/user-role-model";
import { UserRoleService } from "../service/user-role-service";

export class UserRoleController {
  static async storeUserRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: UserRoleRequestArr = req.body as UserRoleRequestArr;
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

  static async destroyUserRoleByRoleIdUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const roleId: number = parseInt(req.params.roleId);
      const userId: number = parseInt(req.params.userId);
      const result = await UserRoleService.destroyUserRoleByRoleIdUserId(
        roleId,
        userId
      );
      return res.status(200).json({
        statusCode: 200,
        message: "success destroy user role",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
