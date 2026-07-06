import { z } from "zod";

const updateTodoSchema = z.object({
  title: z
    .string("El título es requerido")
    .trim()
    .min(1, "El título no puede estar vacío"),
  completed: z
    .enum(["true", "false"], "El valor de completed debe ser 'true' o 'false'")
    .transform((value) => value === "true")
    .optional(),
});

export default updateTodoSchema;
