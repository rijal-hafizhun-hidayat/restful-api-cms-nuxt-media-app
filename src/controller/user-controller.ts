import type { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user-service";
import type { UserRequest } from "../model/user-model";

export class UserController {
  static async getAllUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await UserService.getAllUser(req.query);
      return res.status(200).json({
        statusCode: 200,
        message: "success get user",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getDetailUserByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId: number = parseInt(req.params.userId);
      const result = await UserService.getDetailUserById(userId);
      return res.status(200).json({
        statusCode: 200,
        message: "success get detail user",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateIsActiveUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId: number = parseInt(req.params.userId);
      const request: UserRequest = req.body as UserRequest;
      const result = await UserService.updateIsActiveUser(userId, request);
      return res.status(200).json({
        statusCode: 200,
        message: "success update is_active user",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
