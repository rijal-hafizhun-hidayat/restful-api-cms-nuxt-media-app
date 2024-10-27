import type { NextFunction, Request, Response } from "express";
import { PostCommentService } from "../service/post-comment-service";

export class PostCommentController {
  static async getPostCommentByPostId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const postId: number = parseInt(req.params.postId);
      const result = await PostCommentService.getPostCommentByPostId(postId);
      return res.status(200).json({
        statusCode: 200,
        message: "success get post comments",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
