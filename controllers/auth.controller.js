import bcrypt from "bcrypt";
import * as authModel from "../models/auth.model.js";

export const registerController = async (req, res) => {
  const { username, password, email } = req.body;

  const existingUser = await authModel.getUserByUserNameOrEmail(
    username,
    email,
  );

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "El nombre de usuario o el correo electrónico ya están en uso",
    });
  }

  const passwordHash = bcrypt.hashSync(
    password,
    parseInt(process.env.BCRYPT_SALT_ROUNDS),
  );

  const newUser = await authModel.registerUser(username, passwordHash, email);

  res.status(201).json({
    success: true,
    data: newUser,
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await authModel.getUserByUserNameOrEmail("", email);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: `El usuario ${email} no existe`,
    });
  }

  const validatePassword = bcrypt.compareSync(password, user.password);

  if (!validatePassword) {
    return res.status(401).json({
      success: false,
      message: "El email o contraseña es incorrecto",
    });
  }

  return res.status(200).json({
    success: true,
    data: user,
  });
};
