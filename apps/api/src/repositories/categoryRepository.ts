import { pool, type Category, type QueryError } from "@habit-tracker/database";
import type { CreateCategoryDTO, UpdateCategoryDTO } from "../types";

async function getCategories(): Promise<Category[]> {
  const [rows] = await pool.query<Category[]>(
    "SELECT id, title, description, created_at FROM categories",
  );

  return rows;
}

async function getCategory(categoryId: string): Promise<Category | null> {
  const [rows] = await pool.query<Category[]>(
    "SELECT id, title, description, created_at FROM categories WHERE id = ?",
    [categoryId],
  );

  return rows[0] ?? null;
}

async function createCategory(
  categoryId: string,
  data: CreateCategoryDTO,
): Promise<void> {
  await pool.query(
    "INSERT INTO categories (id, title, description) VALUES (?, ?, ?)",
    [categoryId, data.title, data.description],
  );
}

async function updateCategory(
  categoryId: string,
  data: UpdateCategoryDTO,
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

  if (updates.length === 0) return;

  values.push(categoryId);

  await pool.query(
    `UPDATE categories SET ${updates.join(", ")} WHERE id = ?`,
    values,
  );
}

async function deleteCategory(categoryId: string): Promise<void> {
  try {
    await pool.query("DELETE FROM categories WHERE id = ?", [categoryId]);
  } catch (error) {
    if ((error as QueryError).code === "ER_ROW_IS_REFERENCED_2") {
      throw new Error("Cannot delete category that is in use by habits");
    }
    throw error;
  }
}

export {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
