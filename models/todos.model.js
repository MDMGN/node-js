import { todos } from "../data/todos.js";
import pool from "../db/pool.db.js";

export const getTodoById = async (id) => {
  const [rows] = await pool.execute("SELECT * FROM todos WHERE id = ?", [id]);

  if (rows.length === 0) {
    return null;
  }
  const todo = rows[0];
  todo.completed = Boolean(todo.completed); // Convertimos el valor de completed a booleano
  return todo;
};

export const getTodos = async () => {
  const [rows] = await pool.execute("SELECT * FROM todos");
  return rows.map((todo) => ({
    ...todo,
    completed: Boolean(todo.completed), // Convertimos el valor de completed a booleano
  }));
};

export const createTodo = async (title) => {
  const [result] = await pool.execute("INSERT INTO todos (title) VALUES (?)", [
    title,
  ]);

  if (result.affectedRows === 0) {
    return null;
  }

  return {
    id: result.insertId,
    title,
    completed: false,
    created_at: new Date(),
  };
};

export const updateTodo = async (id, title, completed) => {
  // Actualizamos el título de la tarea

  const [result] = await pool.execute(
    "UPDATE todos SET title = ?, completed = ? WHERE id = ?",
    [title, completed, id],
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return { id, title, completed };
};

export const deleteTodo = async (todo) => {
  const [result] = await pool.execute("DELETE FROM todos WHERE id = ?", [
    todo.id,
  ]);
  // Si no se encuentra la tarea, devolvemos null
  if (result.affectedRows === 0) return null;
  // Eliminamos la tarea de la lista
  return todo;
};
