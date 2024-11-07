import { boolean, string, z, type ZodType } from "zod";

export class UserValidation {
  static readonly updateIsActiveUserValidation: ZodType = z.object({
    is_active: boolean(),
  });

  static readonly updateUserRequest: ZodType = z.object({
    bio: string().min(1).max(100),
    email: string().min(1).max(100).email(),
    name: string().max(100),
  });

  static readonly storeUserRequest: ZodType = z.object({
    bio: string().min(1).max(100),
    password: string().min(1).max(100),
    email: string().min(1).max(100).email(),
    name: string().max(100),
  });
}
