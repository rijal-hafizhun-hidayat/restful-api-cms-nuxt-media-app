import { boolean, z, type ZodType } from "zod";

export class UserValidation {
  static updateIsActiveUserValidation: ZodType = z.object({
    is_active: boolean(),
  });
}
