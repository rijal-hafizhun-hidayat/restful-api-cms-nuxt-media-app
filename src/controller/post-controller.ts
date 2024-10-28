import type { NextFunction, Request, Response } from "express";
import { PostService } from "../service/post-service";

export class PostController {
  static async getPostByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId: number = parseInt(req.params.userId);
      const result = await PostService.getPostByUserId(userId);
      return res.status(200).json({
        statusCode: 200,
        message: "success get post",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getActivityPostByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId: number = parseInt(req.params.userId);
      const result = await PostService.getActivityPostByUserId(userId);
      return res.status(200).json({
        statusCode: 200,
        message: "success get activity post",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyPostByPostId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const postId: number = parseInt(req.params.postId);
      const result = await PostService.destroyPostByPostId(postId);
      return res.status(200).json({
        statusCode: 200,
        message: "success destroy post",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
