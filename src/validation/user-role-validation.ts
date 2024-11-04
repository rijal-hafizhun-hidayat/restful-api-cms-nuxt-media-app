import { number, z, type ZodType } from "zod";

export class UserRoleValidation {
  static readonly userRoleRequest: ZodType = z.object({
    role_id: number().int(),
    user_id: number().int(),
  });
}
