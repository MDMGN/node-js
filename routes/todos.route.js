import { Router } from "express";
import { todos } from "../data/todos.js";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controllers/todos.controller.js";

export const todosRouter = Router();

// READ
todosRouter.get("/", getTodos);

todosRouter.get("/:id", getTodoById);
//

// CREATE
todosRouter.post("/", createTodo);
//

// DELETE
todosRouter.delete("/:id", deleteTodo);

// UPDATE
todosRouter.put("/:id", updateTodo);
