import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { MeController } from "../controller/me-controller";
import { UserController } from "../controller/user-controller";

const apiRouter = express();

apiRouter.use(authMiddleware);

apiRouter.get("/api/me", MeController.test);

apiRouter.get("/api/user", UserController.getAllUser);

export { apiRouter };
