import type { NextFunction, Response } from "express";
import type { CostumeRequest } from "../interface/request-interface";

export class MeController {
  static async test(
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      return res.status(200).json({
        data: req.currentUser,
      });
    } catch (error) {
      next(error);
    }
  }
}
