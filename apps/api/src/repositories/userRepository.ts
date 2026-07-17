import { pool, type User } from "@habit-tracker/database";
import type { CreateUserDTO } from "../types";

async function createUser(userId: string, data: CreateUserDTO): Promise<void> {
  await pool.query(
    "INSERT INTO users (id, email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?, ?)",
    [userId, data.email, data.password_hash, data.first_name, data.last_name],
  );
}

async function findUserByEmail(email: string): Promise<User | null> {
  const [rows] = await pool.query<User[]>(
    "SELECT id, email, password_hash, first_name, last_name FROM users WHERE email = ?",
    [email],
  );

  return rows[0] ?? null;
}

export { createUser, findUserByEmail };
