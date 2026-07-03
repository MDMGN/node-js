import { request, response } from "express";

import * as todosModel from "../models/todos.model.js";

export const getTodos = (req = request, res = response) => {
  const todos = todosModel.getTodos();
  return res.status(200).json(todos);
};

export const getTodoById = (req = request, res = response) => {
  const todo = todosModel.getTodoById(req.params.id);
  return res.status(200).json(todo);
};

export const createTodo = (req = request, res = response) => {
  const newTodo = todosModel.createTodo(req.body.title);

  res.status(201).json({
    success: true,
    data: newTodo,
  });
};

export const updateTodo = (req = request, res = response) => {
  // Actualizamos la tarea con los datos del body
  const updatedTodo = todosModel.updateTodo(req.params.id, req.body.title);

  if (!updatedTodo) {
    return res.status(500).json({
      success: false,
      message: "Error al actualizar la tarea",
    });
  }
  // Devolvemos la respuesta con el cambios en todos
  return res.status(200).json({
    success: true,
    data: updatedTodo,
  });
};

export const deleteTodo = (req = request, res = response) => {
  // Eliminamos de la referencia de todos el elemento por su índice
  const deletedTodo = todosModel.deleteTodo(req.params.id);
  if (!deletedTodo) {
    return res.status(500).json({
      success: false,
      message: "Error al eliminar la tarea",
    });
  }
  // Devolvemos la respuesta con el cambios en todos
  return res.status(200).json({
    success: true,
    data: deletedTodo,
  });
};
