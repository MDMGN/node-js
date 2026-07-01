import { request, response } from "express";

import * as todosModel from "../models/todos.model.js";

export const getTodos = (req = request, res = response) => {
  const todos = todosModel.getTodos();
  res.status(200).json(todos);
};

export const getTodoById = (req = request, res = response) => {
  const todo = todosModel.getTodoById(Number(req.params.id.trim()));
  if (todo) {
    return res.status(200).json(todo);
  }
  return res.status(404).json({
    success: false,
    message: "Tarea no encontrada",
  });
};

export const createTodo = (req = request, res = response) => {
  res.status(201).json({
    success: true,
    data: newTodo,
  });
};

export const updateTodo = (req = request, res = response) => {
  if (found === -1) {
    return res.status(404).json({
      success: false,
      message: "Tarea no encontrada",
    });
  }

  const newTitle = req.body.title?.trim();

  if (!newTitle) {
    return res.status(400).json({
      success: false,
      message: "El título es requerido",
    });
  }
  // Actualizamos la tarea con los datos del body
  todos[found].title = newTitle;
  // Devolvemos la respuesta con el cambios en todos
  return res.status(200).json({
    success: true,
    data: todos[found],
  });
};

export const deleteTodo = (req = request, res = response) => {
  const found = todos.findIndex((todo) => todo.id === Number(req.params.id));
  // Si no existe, devolvemos el mensaje de error
  if (found === -1) {
    return res.status(404).json({
      success: false,
      message: "Tarea no encontrada",
    });
  }
  // Eliminamos de la referencia de todos el elemento por su índice
  const deletedTodo = todos.splice(found, 1)[0];
  // Devolvemos la respuesta con el cambios en todos
  return res.status(200).json({
    success: true,
    data: deletedTodo,
    todos,
  });
};
