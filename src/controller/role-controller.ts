import type { NextFunction, Request, Response } from "express";
import { RoleService } from "../service/role-service";

export class RoleController {
  static async getAllRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const query: Request["query"] = req.query as Request["query"];
      const result = await RoleService.getAllRole(query);
      return res.status(200).json({
        statusCode: 200,
        message: "success get role",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getRoleByRoleId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const roleId: number = parseInt(req.params.roleId);
      const result = await RoleService.getRoleByRoleId(roleId);
      return res.status(200).json({
        statusCode: 200,
        message: "success get role by role id",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyRoleByRoleId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const roleId: number = parseInt(req.params.roleId);
      const result = await RoleService.destroyRoleByRoleId(roleId);
      return res.status(200).json({
        statusCode: 200,
        message: "success destroy role",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
