import { z } from "zod";

export const registerUserSchema = z.object({
  username: z
    .string("El nombre de usuario es requerido")
    .trim()
    .min(
      3,
      "El nombre de usuario no puede estar vacío y debe tener al menos 3 caracteres",
    ),
  email: z
    .string("El correo electrónico es requerido")
    .email("El correo electrónico es requerido y debe ser válido"),
  // Minimo tengamos 8 caracteres, una mayuscula, una minuscula , un numero, y un caracter especial
  password: z
    .string("La contraseña es requerida")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial",
    ),
});
