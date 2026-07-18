import { pool, type User } from "@habit-tracker/database";
import type { CreateUserDTO, PublicUser } from "../types";

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

async function findUserById(userId: string): Promise<PublicUser | null> {
  const [rows] = await pool.query<User[]>(
    "SELECT id, email, first_name, last_name FROM users WHERE id = ?",
    [userId],
  );

  return rows[0] ?? null;
}

export { createUser, findUserByEmail, findUserById };
