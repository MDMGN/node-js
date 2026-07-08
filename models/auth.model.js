import pool from "../db/pool.db.js";

export const registerUser = async (username, password, email) => {
  const [result] = await pool.execute(
    "INSERT INTO usuarios (name, password, email) VALUES (?, ?, ?)",
    [username, password, email],
  );
  if (result.affectedRows === 0) return null;
  return {
    id: result.insertId,
    username,
    email,
    created_at: new Date(),
  };
};

export const getUserByUserNameOrEmail = async (username, email) => {
  const [rows] = await pool.execute(
    "SELECT * FROM usuarios WHERE name = ? OR email = ? LIMIT 1",
    [username, email],
  );

  if (rows.length === 0) return null;

  return rows[0];
};
