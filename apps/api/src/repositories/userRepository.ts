import { pool, type User } from "@habit-tracker/database";
import type { CreateUserDTO } from "../types";

async function createUser(data: CreateUserDTO): Promise<void> {
  await pool.query(
    "INSERT INTO users (email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?)",
    [data.email, data.password_hash, data.first_name, data.last_name],
  );
}

async function findUserByEmail(email: string): Promise<User | null> {
  const [rows] = await pool.query<User[]>(
    "SELECT BIN_TO_UUID(id) AS id, email, password_hash, first_name, last_name FROM users WHERE email = ?",
    [email],
  );

  return rows[0] ?? null;
}

export { createUser, findUserByEmail };
