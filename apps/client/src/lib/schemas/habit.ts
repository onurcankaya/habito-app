import { z } from "zod";

export const createHabitSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  frequency: z.enum(["daily", "weekly"]),
  category_id: z.string().min(1, "Category id is required"),
});

export const updateHabitSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  frequency: z.enum(["daily", "weekly"]).optional(),
  category_id: z.string().optional(),
});

export type CreateHabitRequest = z.infer<typeof createHabitSchema>;
export type UpdateHabitRequest = z.infer<typeof updateHabitSchema>;
