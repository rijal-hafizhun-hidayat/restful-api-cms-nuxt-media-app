import type { notification_type } from "@prisma/client";

export interface NotificationTypeResponse {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface NotificationTypeRequest {
  name: string;
}

export function toNotificationTypeResponse(
  notificationType: notification_type
): NotificationTypeResponse {
  return {
    id: notificationType.id,
    name: notificationType.name,
    created_at: notificationType.created_at,
    updated_at: notificationType.updated_at,
  };
}

export function toNotificationTypeResponseArray(
  notificationTypes: notification_type[]
): NotificationTypeResponse[] {
  return notificationTypes.map((notificationType) => ({
    id: notificationType.id,
    name: notificationType.name,
    created_at: notificationType.created_at,
    updated_at: notificationType.updated_at,
  }));
}
