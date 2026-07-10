import { Router } from "express";
import todoValidator from "../middlewares/todo.validator.middleware.js";
import { registerUserSchema } from "../schemas/registerUser.schema.js";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";
import { loginSchema } from "../schemas/login.schema.js";
import adminAuthMiddleware from "../middlewares/admin.auth.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import rateLimit from "express-rate-limit";

const authRouter = Router();

const authRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 2,
});

authRouter.post(
  "/login",
  authRateLimit,
  todoValidator(loginSchema),
  loginController,
);

authRouter.post(
  "/register",
  authMiddleware,
  adminAuthMiddleware,
  todoValidator(registerUserSchema),
  registerController,
);

export default authRouter;
