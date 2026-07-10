import { success } from "zod";
import { isValidToken } from "../services/jwt.services.js";

const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  //Comprobar si el token viene en el header
  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Token requerido",
    });
  }

  const token = authorization.replace("Bearer ", "").trim();

  const payload = isValidToken(token);
  // Si el token es valido, lo dejamos pasar.
  if (payload) {
    req.user = payload; // Guardamos el payload en la request
    return next();
  }
  return res.status(401).json({
    success: false,
    message: "El token es invalido o ha expirado",
  });
};

export default authMiddleware;
