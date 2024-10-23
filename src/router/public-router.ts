import express from "express";
import { AuthController } from "../controller/auth-controller";

const publicRoute = express.Router();

publicRoute.get("/api/login", AuthController.login);

export { publicRoute };
