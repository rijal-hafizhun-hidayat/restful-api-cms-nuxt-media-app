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
}