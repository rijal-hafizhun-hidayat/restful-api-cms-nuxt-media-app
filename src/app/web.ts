import express from "express";
import { publicRoute } from "../router/public-router";
import { errorMiddleware } from "../middleware/error-middleware";

const web = express();

web.use(express.json());
web.use(publicRoute);
web.use(errorMiddleware);
export { web };
