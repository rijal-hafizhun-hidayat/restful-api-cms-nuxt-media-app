import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toNotificationTypeResponse,
  toNotificationTypeResponseArray,
  type NotificationTypeRequest,
  type NotificationTypeResponse,
} from "../model/notification-type-model";
import { NotificationTypeValidation } from "../validation/notification-type-validation";
import { Validation } from "../validation/validation";

export class NotificationTypeService {
  static async getAllNotificationType(): Promise<NotificationTypeResponse[]> {
    const notificationTypes = await prisma.notification_type.findMany({});

    return toNotificationTypeResponseArray(notificationTypes);
  }

  static async storeNotificationType(
    request: NotificationTypeRequest
  ): Promise<NotificationTypeResponse> {
    const requestBody: NotificationTypeRequest = Validation.validate(
      NotificationTypeValidation.notificationTypeRequest,
      request
    );

    const isNotificationTypeExist = await prisma.notification_type.findUnique({
      where: {
        name: requestBody.name,
      },
    });

    if (isNotificationTypeExist) {
      throw new ErrorResponse(
        404,
        `notification type ${requestBody.name} already exist`
      );
    }

    const [storedNotificationType] = await prisma.$transaction([
      prisma.notification_type.create({
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toNotificationTypeResponse(storedNotificationType);
  }

  static async destroyNotificationTypeByNotificationTypeId(
    notificationTypeId: number
  ): Promise<NotificationTypeResponse> {
    const isNotificationTypeExist = await prisma.notification_type.findUnique({
      where: {
        id: notificationTypeId,
      },
    });

    if (!isNotificationTypeExist) {
      throw new ErrorResponse(404, "notification type no found");
    }

    const [destroyedNotificationType] = await prisma.$transaction([
      prisma.notification_type.delete({
        where: {
          id: notificationTypeId,
        },
      }),
    ]);

    return toNotificationTypeResponse(destroyedNotificationType);
  }
}
