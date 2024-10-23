import express from "express";
import { publicRoute } from "../router/public-router";
import { errorMiddleware } from "../middleware/error-middleware";
import { apiRouter } from "../router/api-router";

const web = express();

web.use(express.json());
web.use(publicRoute);
web.use(apiRouter);
web.use(errorMiddleware);
export { web };
