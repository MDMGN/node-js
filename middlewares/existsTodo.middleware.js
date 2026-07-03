import * as todosModel from "../models/todos.model.js";

const existsTodo = (req, res, next) => {
  // Validamos que la tarea con el id proporcionado exista en el modelo
  const found = todosModel.getTodoById(req.params.id);
  // Si no existe, devolvemos el mensaje de error
  if (!found) {
    return res.status(404).json({
      success: false,
      message: "Tarea no encontrada",
    });
  }
  // Si existe, continuamos con la ejecución de la ruta
  next();
};

export default existsTodo;
