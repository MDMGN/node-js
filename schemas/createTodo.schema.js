import { z } from "zod";

const createTodoSchema = z.object({
  title: z
    .string("El título es requerido")
    .trim()
    .min(1, "El título no puede estar vacío"),
});

export default createTodoSchema;
