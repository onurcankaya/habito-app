import { pool, type User } from "@habit-tracker/database";
import type { CreateUserDTO, PublicUser, UpdateUserDTO } from "../types";

async function getAllUsers(): Promise<PublicUser[]> {
  const [rows] = await pool.query<User[]>(
    "SELECT id, email, first_name, last_name FROM users",
  );

  return rows;
}

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

async function updateUser(userId: string, data: UpdateUserDTO): Promise<void> {
  const updates: string[] = [];
  const values: unknown[] = [];

  if (data.email !== undefined) {
    updates.push("email = ?");
    values.push(data.email);
  }
  if (data.password !== undefined) {
    updates.push("password = ?");
    values.push(data.password);
  }
  if (data.first_name !== undefined) {
    updates.push("first_name = ?");
    values.push(data.first_name);
  }
  if (data.last_name !== undefined) {
    updates.push("last_name = ?");
    values.push(data.last_name);
  }

  if (updates.length === 0) return;

  values.push(userId);

  await pool.query(
    `UPDATE users SET ${updates.join(", ")} WHERE id = ?`,
    values,
  );
}

export { getAllUsers, createUser, findUserByEmail, findUserById, updateUser };
