import * as todosModel from "../models/todos.model.js";

const existsTodo = async (req, res, next) => {
  // Validamos que la tarea con el id proporcionado exista en el modelo
  const found = await todosModel.getTodoById(req.params.id);
  // Si no existe, devolvemos el mensaje de error
  if (!found) {
    return res.status(404).json({
      success: false,
      message: "Tarea no encontrada",
    });
  }
  // Si existe, continuamos con la ejecución de la ruta
  req.todo = found; // Guardamos la tarea encontrada en req.todo para que esté disponible en los controladores
  next();
};

export default existsTodo;
