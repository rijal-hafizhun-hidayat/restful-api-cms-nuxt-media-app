import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { MeController } from "../controller/me-controller";

const apiRouter = express();

apiRouter.use(authMiddleware);

apiRouter.get("/api/me", MeController.test);
export { apiRouter };
