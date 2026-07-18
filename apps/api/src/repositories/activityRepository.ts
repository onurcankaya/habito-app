import { pool, type CompletedActivity } from "@habit-tracker/database";
import type { CreateActivityDTO } from "../types";

async function getAllActivities(userId: string): Promise<CompletedActivity[]> {
  const [rows] = await pool.query<CompletedActivity[]>(
    "SELECT ca.id, ca.notes, ca.completed_at, h.title AS habit_title FROM completed_activities ca JOIN habits h ON ca.habit_id = h.id WHERE ca.user_id = ?",
    [userId],
  );

  return rows;
}

async function getActivity(
  userId: string,
  activityId: string,
): Promise<CompletedActivity | null> {
  const [rows] = await pool.query<CompletedActivity[]>(
    "SELECT ca.id, ca.notes, ca.completed_at, h.title as habit_title FROM completed_activities ca JOIN habits h ON ca.habit_id = h.id WHERE ca.user_id = ? AND ca.id = ?",
    [userId, activityId],
  );

  return rows[0] ?? null;
}

async function createActivity(
  userId: string,
  habitId: string,
  activityId: string,
  data: CreateActivityDTO,
): Promise<void> {
  await pool.query(
    "INSERT INTO completed_activities (id, notes, completed_at, habit_id, user_id) VALUES (?, ?, ?, ?, ?)",
    [activityId, data.notes, data.completed_at, habitId, userId],
  );
}

async function deleteActivity(
  userId: string,
  activityId: string,
): Promise<void> {
  await pool.query(
    "DELETE FROM completed_activities WHERE user_id = ? AND id = ?",
    [userId, activityId],
  );
}

export { getAllActivities, getActivity, createActivity, deleteActivity };
