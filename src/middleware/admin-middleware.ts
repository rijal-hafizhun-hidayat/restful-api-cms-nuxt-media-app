import type { NextFunction, Response } from "express";
import type { CostumeRequest } from "../interface/request-interface";
import { ErrorResponse } from "../error/error-response";

export const adminMiddleware = (
  req: CostumeRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.currentUser) {
      throw new ErrorResponse(401, "unauthorized");
    }

    if (req.currentUser.role[0].name !== "admin") {
      throw new ErrorResponse(404, "forbidden");
    }
    next();
  } catch (error) {
    next(error);
  }
};
