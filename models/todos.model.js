import { todos } from "../data/todos.js";

export const getTodoById = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  return todo ? todo : null;
};

export const getTodos = () => {
  return todos;
};

export const createTodo = (title) => {
  const newTodo = {
    id: todos.length + 1,
    title: title,
    completed: false,
  };
  // Agregar una nueva tarea a la lista
  todos.push(newTodo);
  return newTodo;
};

export const updateTodo = (id, title) => {
  const todo = getTodoById(id);
  // Si no se encuentra la tarea, devolvemos null
  if (!todo) return null;
  // Actualizamos el título de la tarea
  const found = todos.findIndex((currentTodo) => currentTodo.id === todo.id);
  todos[found].title = title;
  return todos[found];
};

export const deleteTodo = (id) => {
  const todo = getTodoById(id);
  // Si no se encuentra la tarea, devolvemos null
  if (!todo) return null;
  // Eliminamos la tarea de la lista
  const found = todos.findIndex((currentTodo) => currentTodo.id === todo.id);
  const deletedTodo = todos.splice(found, 1)[0];
  return deletedTodo;
};
