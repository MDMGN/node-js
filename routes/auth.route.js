import { Router } from "express";
import todoValidator from "../middlewares/todo.validator.middleware.js";
import { registerUserSchema } from "../schemas/registerUser.schema.js";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";
import { loginSchema } from "../schemas/login.schema.js";

const authRouter = Router();

authRouter.post("/login", todoValidator(loginSchema), loginController);

authRouter.post(
  "/register",
  todoValidator(registerUserSchema),
  registerController,
);

export default authRouter;
