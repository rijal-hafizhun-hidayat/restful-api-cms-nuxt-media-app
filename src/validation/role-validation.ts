import { string, z, type ZodType } from "zod";

export class RoleValidation {
  static readonly roleRequest: ZodType = z.object({
    name: string().min(1).max(100),
  });
}
