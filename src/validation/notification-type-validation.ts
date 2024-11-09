import { string, z, type ZodType } from "zod";

export class NotificationTypeValidation {
  static readonly notificationTypeRequest: ZodType = z.object({
    name: string().min(1).max(100),
  });
}
