import type { NextFunction, Request, Response } from "express";
import { NotificationTypeService } from "../service/notification-type-service";
import type { NotificationTypeRequest } from "../model/notification-type-model";

export class NotificationTypeController {
  static async getAllNotificationType(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await NotificationTypeService.getAllNotificationType();
      return res.status(200).json({
        statusCode: 200,
        message: "success get notification type",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async storeNotificationType(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: NotificationTypeRequest =
        req.body as NotificationTypeRequest;
      const result = await NotificationTypeService.storeNotificationType(
        request
      );
      return res.status(200).json({
        statusCode: 200,
        message: "success store notification type",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyNotificationTypeByNotificationTypeId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const notificationTypeId: number = parseInt(
        req.params.notificationTypeId
      );
      const result =
        await NotificationTypeService.destroyNotificationTypeByNotificationTypeId(
          notificationTypeId
        );
      return res.status(200).json({
        statusCode: 200,
        message: "success destroy notification type",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findNotificationTypeByNotificationTypeId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const notificationTypeId: number = parseInt(
        req.params.notificationTypeId
      );
      const result =
        await NotificationTypeService.findNotificationTypeByNotificationTypeId(
          notificationTypeId
        );
      return res.status(200).json({
        statusCode: 200,
        message: "success find notification type",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateNotificationTypeByNotificationTypeId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const notificationTypeId: number = parseInt(
        req.params.notificationTypeId
      );
      const request: NotificationTypeRequest =
        req.body as NotificationTypeRequest;
      const result =
        await NotificationTypeService.updateNotificationTypeByNotificationTypeId(
          request,
          notificationTypeId
        );
      return res.status(200).json({
        statusCode: 200,
        message: "success update notification type",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
