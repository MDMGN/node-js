import { z } from "zod";

export const loginSchema = z.object({
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
