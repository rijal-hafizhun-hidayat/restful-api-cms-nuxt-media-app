import type { NextFunction, Request, Response } from "express";
import { PostCommentService } from "../service/post-comment-service";
import type { CostumeRequest } from "../interface/request-interface";
import type { PostCommentRequest } from "../model/post-comment-model";

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

  static async storeCommentByPostId(
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId: number = req.currentUser!.id;
      const postId: number = parseInt(req.params.postId);
      const request: PostCommentRequest = req.body as PostCommentRequest;
      const result = await PostCommentService.storePostComment(
        userId,
        postId,
        request
      );
      return res.status(200).json({
        statusCode: 200,
        message: "success store post comments",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
