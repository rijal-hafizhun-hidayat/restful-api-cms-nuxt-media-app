import type { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user-service";
import type { UserIsActiveRequest, UserRequest } from "../model/user-model";

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
      const request: UserIsActiveRequest = req.body as UserIsActiveRequest;
      const result = await UserService.updateIsActiveUser(userId, request);
      return res.status(200).json({
        statusCode: 200,
        message: "success update active user",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyUserByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId: number = parseInt(req.params.userId);
      const result = await UserService.destroyUserByUserId(userId);
      return res.status(200).json({
        statusCode: 200,
        message: "success destroy user",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateEmailVerifiedAtByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId: number = parseInt(req.params.userId);
      const result = await UserService.updateEmailVerifiedAtByUserId(userId);
      return res.status(200).json({
        statusCode: 200,
        message: "success verified email user",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findUserByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId: number = parseInt(req.params.userId);
      const result = await UserService.findUserByUserId(userId);
      return res.status(200).json({
        statusCode: 200,
        message: "success get user",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUserByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId: number = parseInt(req.params.userId);
      const request: UserRequest = req.body as UserRequest;
      const result = await UserService.updateUserByUserId(userId, request);
      return res.status(200).json({
        statusCode: 200,
        message: "success update user",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async storeUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: UserRequest = req.body as UserRequest;
      const result = await UserService.storeUser(request);
      return res.status(200).json({
        statusCode: 200,
        message: "success store user",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
