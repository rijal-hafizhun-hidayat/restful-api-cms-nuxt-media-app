import { number, string, z, type ZodType } from "zod";

export class PostCommentValidation {
  static readonly storePostCommentByPostIdValidation: ZodType = z.object({
    comment: string().min(1).max(100),
  });
}
