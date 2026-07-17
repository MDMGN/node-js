import { Router } from "express";
import { todos } from "../data/todos.js";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controllers/todos.controller.js";
import todoIdValidator from "../middlewares/todoId.validator.middleware.js";
import existsTodo from "../middlewares/existsTodo.middleware.js";

import todoValidator from "../middlewares/todo.validator.middleware.js";
import createTodoSchema from "../schemas/createTodo.schema.js";
import updateTodoSchema from "../schemas/updateTodo.schema.js";
import rateLimit from "express-rate-limit";

export const todosRouter = Router();
// Pipeline para validar el parámetro id en las rutas que lo requieran
todosRouter.param("id", todoIdValidator);

/* const todosRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1,
});

todosRouter.use(todosRateLimit); */
// READ
todosRouter.get("/", getTodos);

todosRouter.get("/:id", existsTodo, getTodoById);
//

// CREATE
todosRouter.post("/", todoValidator(createTodoSchema), createTodo);
//

// DELETE
todosRouter.delete("/:id", existsTodo, deleteTodo);

// UPDATE
todosRouter.put(
  "/:id",
  existsTodo,
  todoValidator(updateTodoSchema),
  updateTodo,
);
