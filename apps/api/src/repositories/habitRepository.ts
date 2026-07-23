import { pool, type Habit } from "@habit-tracker/database";
import type { CreateHabitDTO, UpdateHabitDTO } from "../types";

async function getAllHabits(userId: string): Promise<Habit[]> {
  const [rows] = await pool.query<Habit[]>(
    "SELECT h.id, h.title, h.description, h.frequency, h.user_id, h.category_id, h.created_at, h.updated_at, c.title AS category_title FROM habits h JOIN categories c ON h.category_id = c.id WHERE h.user_id = ?",
    [userId],
  );

  return rows;
}

async function getHabit(
  userId: string,
  habitId: string,
): Promise<Habit | null> {
  const [rows] = await pool.query<Habit[]>(
    "SELECT id, title, description, frequency, user_id, category_id, created_at, updated_at FROM habits WHERE user_id = ? AND id = ?",
    [userId, habitId],
  );

  return rows[0] ?? null;
}

async function createHabit(
  userId: string,
  habitId: string,
  data: CreateHabitDTO,
): Promise<void> {
  await pool.query(
    "INSERT INTO habits (id, title, description, frequency, category_id, user_id) VALUES (?, ?, ?, ?, ?, ?)",
    [
      habitId,
      data.title,
      data.description,
      data.frequency,
      data.category_id,
      userId,
    ],
  );
}

async function updateHabit(
  userId: string,
  habitId: string,
  data: UpdateHabitDTO,
): Promise<void> {
  const updates: string[] = [];
  const values: unknown[] = [];

  if (data.title !== undefined) {
    updates.push("title = ?");
    values.push(data.title);
  }
  if (data.description !== undefined) {
    updates.push("description = ?");
    values.push(data.description);
  }
  if (data.frequency !== undefined) {
    updates.push("frequency = ?");
    values.push(data.frequency);
  }
  if (data.category_id !== undefined) {
    updates.push("category_id = ?");
    values.push(data.category_id);
  }

  if (updates.length === 0) return;

  values.push(userId, habitId);

  await pool.query(
    `UPDATE habits SET ${updates.join(", ")} WHERE user_id = ? AND id = ?`,
    values,
  );
}

async function deleteHabit(userId: string, habitId: string): Promise<void> {
  await pool.query("DELETE FROM habits WHERE user_id = ? AND id = ?", [
    userId,
    habitId,
  ]);
}

export { getAllHabits, getHabit, createHabit, updateHabit, deleteHabit };
